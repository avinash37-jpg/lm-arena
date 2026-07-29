# Ludo Live

A responsive Ludo board, mobile dice controller, and admin console. The app includes Firebase Realtime Database service functions for live game state, remote dice rolls, and controller presence.

## Run locally

```bash
npm install
npm run dev
```

## Firebase setup

The supplied Ludo Firebase project configuration is in `src/lib/firebase.ts`.

1. In Firebase Authentication, enable **Anonymous** sign-in for player/controller sessions. Use email/password and custom claims for the production admin panel.
2. Create a Realtime Database in the Firebase project.
3. Review and deploy the starter rules before testing writes:

```bash
firebase deploy --only database
```

`firebase.json` is set up to deploy the Vite production output (`dist`) to Firebase Hosting:

```bash
npm run build
firebase deploy --only hosting
```

## Deploy on Vercel

This project includes `vercel.json` for Vite and single-page-app routing. Push this folder to a Git repository, then import it at [vercel.com/new](https://vercel.com/new). Leave the defaults as `npm run build` and `dist`, then click **Deploy**. No environment variables are required for the current Firebase project configuration.

For a CLI deployment:

```bash
npm install -g vercel
vercel
```

> Firebase web API keys identify a Firebase project and are expected in browser code. Database Rules and Firebase Authentication enforce data access. Production games should validate moves and privileged admin actions in trusted Cloud Functions rather than relying only on browser code.
