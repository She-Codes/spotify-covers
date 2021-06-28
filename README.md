# Spotify Covers

## Overview
Search for an album and save the cover art.  User will be able to save or remove albums from their collection.
User should be able to login using their Spotify account and see their liked or recently played albums.  This is in case the user wants to save any of this cover art.  If not, the user can also search spotify for albums.

### App Flow
1. Log user in
1. Fetch user's activity
1. Allow user to search for specific albums
1. Allow user to save img

## Steps to run app
- Run `yarn netlify` to start netlify and Vite servers.

## Steps to create app
- Went to Spotify and created a new app in the dashboard
- Initialized a git repo and created on Github
- Initialized Yarn
- Installed Netlify CLI as a local dev dependency via Yarn
- Ran `netlify login`
- Ran `netlify init` accepting defaults to change later
- Ran @vitejs/create-app which created a nested app folder within root folder.  Had to copy/paste from one .gitignore and package.json to another and move everything to root then run `yarn` again to reinstall packages.

In hindsight, I would've run the Vite command first to create my project directory and then run my Netlify and Git commands.

- Added `netlify` command to my `scripts` in `package.json`.
- Went back and added `build` and `dev` info to `netlify.toml`
- Could now successfully run `yarn netlify` to run the Netlify and dev servers