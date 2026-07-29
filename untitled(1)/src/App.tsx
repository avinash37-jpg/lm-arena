import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import {
  Activity, BarChart3, ChevronDown, CircleHelp, ClipboardList, Copy, Dices, Gamepad2,
  LayoutDashboard, LogOut, Menu, MonitorSmartphone, MoreHorizontal, Pause, Play,
  Plus, QrCode, RefreshCw, Settings, ShieldCheck, Smartphone, Sparkles, Trophy,
  Users, Volume2, X, Zap
} from 'lucide-react';

type View = 'game' | 'controller' | 'admin';
type Color = 'red' | 'blue' | 'green' | 'yellow';
const colors: Color[] = ['red','blue','green','yellow'];
const players = [
  {name:'Maya', color:'red' as Color, avatar:'M'}, {name:'Oliver', color:'blue' as Color, avatar:'O'},
  {name:'Sofia', color:'green' as Color, avatar:'S'}, {name:'Liam', color:'yellow' as Color, avatar:'L'},
];
const logItems = [
  ['NOW','Maya’s turn — waiting for dice'], ['12:48','Oliver moved 4 spaces'], ['12:47','Oliver rolled a 4'], ['12:46','Sofia captured a piece!'], ['12:45','Sofia rolled a 6'], ['12:44','Liam moved 2 spaces'],
];

function Logo(){ return <div className="logo"><span className="logo-mark"><i/><i/><i/><i/></span><b>LUDO</b><small>LIVE</small></div> }
function Pill({children, kind='' }: {children: ReactNode,kind?:string}){return <span className={'pill '+kind}>{children}</span>}

function Header({view,setView}:{view:View,setView:(x:View)=>void}){
 return <header className="topbar"><Logo/><nav>
  <button className={view==='game'?'active':''} onClick={()=>setView('game')}><Gamepad2/> Game board</button>
  <button className={view==='controller'?'active':''} onClick={()=>setView('controller')}><Smartphone/> Dice controller</button>
  <button className={view==='admin'?'active':''} onClick={()=>setView('admin')}><LayoutDashboard/> Admin</button>
 </nav><div className="header-actions"><button className="help"><CircleHelp/> Help</button><button className="profile"><span>AO</span><ChevronDown/></button></div></header>
}

function Dice({value=6,rolling=false}:{value?:number,rolling?:boolean}){ const dots = Array.from({length:value}); return <div className={'dice '+(rolling?'rolling':'')}>{dots.map((_,i)=><i key={i}/>)}</div> }
function Token({color,small=false,style}:{color:Color,small?:boolean,style?:CSSProperties}){ return <span style={style} className={`token ${color} ${small?'small':''}`}><i/></span> }

function LudoBoard(){
 const cells = Array.from({length:225});
 const position = (i:number) => {let r=Math.floor(i/15), c=i%15; let cl='';
   if(r<6&&c<6) cl='home red-home'; else if(r<6&&c>8) cl='home blue-home'; else if(r>8&&c<6) cl='home green-home'; else if(r>8&&c>8) cl='home yellow-home';
   if((c===7&&r>=0&&r<=5)||(r===7&&c>=0&&c<=5)||(c===7&&r>=9)||(r===7&&c>=9)) cl += ' path';
   if((c===6&&r===1)||(r===6&&c===13)||(c===8&&r===13)||(r===8&&c===1)) cl += ' start';
   if((r===7&&c===7)||(r===6&&c===7)||(r===7&&c===6)||(r===7&&c===8)||(r===8&&c===7)) cl += ' center';
   return cl;
 };
 return <div className="board-wrap"><div className="ludo-board">{cells.map((_,i)=><span className={position(i)} key={i}/>) }
   <div className="home-tokens red-t"><Token color="red"/><Token color="red"/><Token color="red"/><Token color="red"/></div>
   <div className="home-tokens blue-t"><Token color="blue"/><Token color="blue"/><Token color="blue"/><Token color="blue"/></div>
   <div className="home-tokens green-t"><Token color="green"/><Token color="green"/><Token color="green"/><Token color="green"/></div>
   <div className="home-tokens yellow-t"><Token color="yellow"/><Token color="yellow"/><Token color="yellow"/><Token color="yellow"/></div>
   <Token color="red" style={{position:'absolute',left:'43%',top:'36%'}}/><Token color="blue" style={{position:'absolute',right:'36%',top:'44%'}}/>
   <Token color="green" style={{position:'absolute',left:'44%',bottom:'35%'}}/>
 </div><div className="board-caption"><Sparkles/> Safe squares are marked with stars</div></div>
}

function GameView(){
 const [rolling,setRolling] = useState(false); const [dice,setDice]=useState(6); const [toast,setToast]=useState('');
 const request = () => {setRolling(true); setTimeout(()=>{const d=Math.ceil(Math.random()*6);setDice(d);setRolling(false);setToast(`Dice rolled: ${d}`); setTimeout(()=>setToast(''),1800)},900)};
 return <main className="game-page">
  {toast && <div className="toast"><Zap/> {toast}</div>}
  <section className="game-heading"><div><div className="eyebrow"><span className="live-dot"/> LIVE GAME</div><h1>Family game night <button><MoreHorizontal/></button></h1><p><span className="code-label">GAME CODE</span><b> Q7M2XP</b><button className="icon-copy"><Copy/></button></p></div><div className="heading-actions"><button className="secondary"><QrCode/> Show QR</button><button className="secondary"><Settings/> Settings</button><button className="danger-outline"><LogOut/> Quit</button></div></section>
  <section className="players-row">{players.map((p,i)=><article className={'player-card '+(i===0?'current':'')} key={p.name}><div className={'avatar '+p.color}>{p.avatar}</div><div><strong>{p.name}</strong><small>{i===0?'YOUR TURN': i===1?'2 pieces out':'4 pieces home'}</small></div><div className="player-status">{i===0?<Pill kind="turn">TURN</Pill>:<><Token color={p.color} small style={{position:'relative'}}/><b>{i===3?'0':'1'}/4</b></>}</div></article>)}</section>
  <section className="game-grid"><LudoBoard/><aside className="game-side"><div className="turn-card"><div className="turn-title"><span className="turn-avatar">M</span><div><small>IT’S YOUR TURN</small><h2>Maya, roll the dice!</h2></div></div><div className="dice-stage"><Dice value={dice} rolling={rolling}/><button className="roll-button" onClick={request} disabled={rolling}>{rolling?'ROLLING…':'ROLL DICE'}</button><p><Smartphone/> Waiting for a controller to roll</p></div><div className="timer"><div><span>TURN TIME</span><b>00:24</b></div><div className="progress"><i/></div></div></div>
 <div className="side-mini-grid"><div className="mini-card"><div className="mini-icon purple"><Smartphone/></div><div><b>2</b><span>Controllers connected</span></div></div><div className="mini-card"><div className="mini-icon yellow"><Trophy/></div><div><b>0</b><span>Pieces finished</span></div></div></div>
 <div className="activity-card"><div className="card-title"><div><Activity/> GAME ACTIVITY</div><button>View all</button></div>{logItems.map(([time,text],i)=><div className="log" key={text}><span className={i===0?'now':''}>{time}</span><i className={i===0?'pulse':''}/><p>{text}</p></div>)}</div></aside></section>
 </main>
}

function ControllerView(){ const [joined,setJoined]=useState(false); const [rolling,setRolling]=useState(false); const [last,setLast]=useState<number|null>(null); const [code,setCode]=useState('Q7M2XP');
 const roll=()=>{setRolling(true); setTimeout(()=>{setLast(Math.ceil(Math.random()*6));setRolling(false)},700)};
 if(!joined) return <main className="controller-page"><div className="controller-hero"><Logo/><Pill kind="online"><span className="live-dot"/> CONTROLLER</Pill><h1>Your pocket dice,<br/><em>made social.</em></h1><p>Connect to a Ludo Live board and become the dice for your game night.</p></div><div className="join-card"><div className="phone-notch"/><h2>Connect to a game</h2><p>Enter the 6-character game code shown on the board.</p><label>GAME CODE<input value={code} maxLength={6} onChange={e=>setCode(e.target.value.toUpperCase())}/></label><button className="join-btn" onClick={()=>setJoined(true)}>Join game <Play/></button><button className="scan"><QrCode/> Scan QR code instead</button><div className="recent"><span>RECENT GAMES</span><button onClick={()=>setCode('Q7M2XP')}>Family game night <b>Q7M2XP</b></button></div></div></main>
 return <main className="controller-active"><div className="controller-top"><Logo/><button onClick={()=>setJoined(false)}><X/></button></div><div className="connected"><span className="live-dot"/> Connected to <b>Q7M2XP</b></div><div className="controller-turn"><div className="avatar red">M</div><div><small>IT’S MAYA’S TURN</small><h1>Time to roll!</h1></div></div><div className="controller-die"><Dice value={last||6} rolling={rolling}/></div><button className="big-roll" onClick={roll} disabled={rolling}>{rolling?'ROLLING…':'ROLL DICE'}</button><p className="tap-copy">Tap to roll for Maya</p>{last&&<div className="rolled-note">Nice roll! You rolled a <b>{last}</b>.</div>}<div className="controller-stats"><span><b>12</b> rolls made</span><span><b>02:14</b> connected</span><span><b>1</b> other controller</span></div></main>
}

const activeGames=[['Q7M2XP','Family game night','Playing','4','12m','2'],['HZ8L4A','Friday crew','Playing','3','28m','1'],['P9D1KC','Office break','Waiting','2','—','0'],['T4Y6MN','The Kims','Paused','4','41m','3']];
function AdminView(){const [tab,setTab]=useState('Overview'); const [paused,setPaused]=useState(false); return <main className="admin-page"><aside className="admin-nav"><Logo/><div className="admin-label">ADMIN CONSOLE</div>{[['Overview',LayoutDashboard],['Active games',Gamepad2],['Analytics',BarChart3],['Database',ClipboardList],['System health',Activity]].map(([t,I]:any)=><button className={tab===t?'selected':''} onClick={()=>setTab(t)} key={t}><I/>{t}{t==='Active games'&&<span>4</span>}</button>)}<div className="nav-spacer"/><button><Settings/> Settings</button><button><LogOut/> Sign out</button><div className="admin-user"><div>AO</div><span><b>Alex Owen</b><small>Super admin</small></span><MoreHorizontal/></div></aside><section className="admin-content"><header className="admin-header"><div><p>ADMIN / {tab.toUpperCase()}</p><h1>Good afternoon, Alex <span>👋</span></h1></div><div><button className="secondary"><RefreshCw/> Refresh</button><button className="create"><Plus/> Create game</button></div></header><div className="health"><span className="live-dot"/> All systems operational <i/> Realtime database synced <i/> Last updated just now</div><div className="metrics">{[['Total games','1,284','+12.5%','purple'],['Active now','24','+4 since last hour','blue'],['Connected controllers','38','82% of active games','orange'],['Completion rate','87.6%','+2.1% this month','green']].map(x=><div className="metric" key={x[0]}><div className={'metric-icon '+x[3]}><Gamepad2/></div><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small></div>)}</div><section className="admin-panels"><div className="games-table card"><div className="panel-head"><div><h2>Active games</h2><p>Games currently in progress or waiting</p></div><button>View all <ChevronDown/></button></div><table><thead><tr><th>GAME</th><th>STATUS</th><th>PLAYERS</th><th>STARTED</th><th>CONTROLLERS</th><th/></tr></thead><tbody>{activeGames.map((g,i)=><tr key={g[0]}><td><b>{g[0]}</b><small>{g[1]}</small></td><td><Pill kind={g[2].toLowerCase()}>{g[2]}</Pill></td><td><span className="mini-avatars">{colors.slice(0,+g[3]).map(c=><i className={c} key={c}/>)}</span> {g[3]}</td><td>{g[4]}</td><td>{g[5]}</td><td><button className="dots"><MoreHorizontal/></button>{i===0&&<button className="pause-small" onClick={()=>setPaused(!paused)}>{paused?<Play/>:<Pause/>}</button>}</td></tr>)}</tbody></table></div><div className="chart-card card"><div className="panel-head"><div><h2>Games over time</h2><p>Last 7 days</p></div><button className="period">7 days <ChevronDown/></button></div><div className="chart"><div className="chart-y"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div><svg viewBox="0 0 360 180" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#7c5ce0" stopOpacity=".28"/><stop offset="1" stopColor="#7c5ce0" stopOpacity="0"/></linearGradient></defs><path d="M0 150 L0 126 L52 113 L103 126 L154 70 L205 96 L257 45 L308 76 L360 30 L360 150Z" fill="url(#fill)"/><path d="M0 126 L52 113 L103 126 L154 70 L205 96 L257 45 L308 76 L360 30" fill="none" stroke="#7c5ce0" strokeWidth="3"/></svg><div className="chart-x"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div><div className="chart-total"><span>THIS WEEK</span><b>1,042 games</b><small>↑ 18.4% vs. last week</small></div></div></section></section></main>}

export default function App(){const [view,setView]=useState<View>('game'); useEffect(()=>{const h=location.hash.replace('#','') as View;if(['game','controller','admin'].includes(h))setView(h)},[]); const change=(v:View)=>{setView(v);history.replaceState(null,'','#'+v)};return <><Header view={view} setView={change}/>{view==='game'?<GameView/>:view==='controller'?<ControllerView/>:<AdminView/>}</>}
