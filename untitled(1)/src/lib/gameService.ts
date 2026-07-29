import {
  onDisconnect, onValue, push, ref, runTransaction, serverTimestamp, set, update,
} from 'firebase/database';
import { database } from './firebase';

export type PlayerColor = 'red' | 'blue' | 'green' | 'yellow';
export interface GameSettings {
  mode: 'classic' | 'quick' | 'custom';
  allowMultipleControllers: boolean;
  autoRollTimeout: number;
  enableSafeSpots: boolean;
  enableStarShortcuts: boolean;
  piecesPerPlayer: number;
}

const palette: Record<PlayerColor, string> = {
  red: '#FF0000', blue: '#0000FF', green: '#00B75A', yellow: '#FFC107',
};
const makeCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

/** Creates an authoritative game record with the schema used by the board. */
export async function createGame(names: string[], partial: Partial<GameSettings> = {}) {
  const settings: GameSettings = {
    mode: 'classic', allowMultipleControllers: true, autoRollTimeout: 30,
    enableSafeSpots: true, enableStarShortcuts: true, piecesPerPlayer: 4, ...partial,
  };
  const gameRef = push(ref(database, 'games'));
  const players = Object.fromEntries(names.map((name, id) => {
    const color = (['red', 'blue', 'green', 'yellow'] as PlayerColor[])[id];
    return [id, {
      id, name: name.trim() || `Player ${id + 1}`, color, colorHex: palette[color],
      pieces: Array.from({ length: settings.piecesPerPlayer }, (_, piece) => ({
        id: `${color}-${piece}`, position: -1, isInSafeZone: false,
      })),
      stats: { piecesHome: settings.piecesPerPlayer, piecesOnBoard: 0, piecesFinished: 0, totalMoves: 0, piecesKilled: 0, piecesKilledBy: 0, sixesRolled: 0 },
    }];
  }));
  await set(gameRef, {
    gameInfo: { gameCode: makeCode(), status: 'waiting', numPlayers: names.length, currentTurn: 0, createdAt: serverTimestamp() },
    settings, players,
    turn: { currentPlayer: 0, rollCount: 0, diceValue: null, canRollAgain: false },
    diceControl: { requestRoll: { requested: false, requestedBy: 0, requestedAt: null, expiresAt: null }, currentRoll: { value: null, isValid: true } },
    history: [],
  });
  return gameRef.key!;
}

/** Subscribe once per mounted board; unsubscribe on component cleanup. */
export function subscribeToGame(gameId: string, callback: (game: unknown) => void) {
  return onValue(ref(database, `games/${gameId}`), (snapshot) => callback(snapshot.val()));
}

export async function requestDiceRoll(gameId: string, playerId: number, playerName: string, playerColor: PlayerColor) {
  const now = Date.now();
  await update(ref(database, `games/${gameId}`), {
    'diceControl/requestRoll': { requested: true, requestedBy: playerId, playerName, playerColor, requestedAt: now, expiresAt: now + 30_000 },
  });
}

/** Transaction prevents two controllers from fulfilling the same roll request. */
export async function submitDiceRoll(gameId: string, controllerId: string, value: number) {
  if (!Number.isInteger(value) || value < 1 || value > 6) throw new Error('A dice roll must be an integer from 1 to 6.');
  const requestRef = ref(database, `games/${gameId}/diceControl`);
  const result = await runTransaction(requestRef, (current) => {
    if (!current?.requestRoll?.requested) return;
    return {
      ...current,
      requestRoll: { ...current.requestRoll, requested: false },
      currentRoll: { value, rolledBy: controllerId, rolledAt: Date.now(), isValid: true },
    };
  });
  if (!result.committed) throw new Error('This roll request was already completed.');
}

export async function connectController(gameId: string, controllerId: string, deviceName: string) {
  const controllerRef = ref(database, `games/${gameId}/controllers/${controllerId}`);
  await set(controllerRef, { deviceName, connectedAt: serverTimestamp(), lastActiveAt: serverTimestamp(), rollsCount: 0, userAgent: navigator.userAgent });
  await onDisconnect(controllerRef).remove();
}
