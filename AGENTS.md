# AGENTS.md: Social Music

Instructions for any AI coding agent working here. `CLAUDE.md` only imports this file.
Workspace rules in `../AGENTS.md` and `../../AGENTS.md` also apply; this file wins where they conflict.

**Status: dormant (2023).** A school project, not running anywhere on this PC. Don't
modernize or refactor it unless the owner asks. An earlier version lives in `Social-Music` at the workspace root.

## Purpose

A social website for music: accounts, music interests, friends, posts and comments about albums,
artists and songs. See `README.md` for the full feature list.

## Hard rules

| # | Rule |
|---|---|
| R1 | Database credentials and cloud keys stay out of git (`server/config/`); never commit real values. |
| R2 | Ask the owner before reviving, deploying or publishing it. |

## File map

```
client/                React front end (create-react-app)
server/server.js       Express entry point
server/routes/         one route file per resource (albums, artists, comments, friends, login, posts, songs, users)
server/query/          SQL queries per resource, as JSON
server/config/         database and storage settings
```

## Data flow

Browser (React, `client/`) calls the Express API (`server/routes/`), which runs the SQL in
`server/query/` against a MySQL database.

## Run

```powershell
cd client; npm install; npm start          # front end
cd server; npm install; npx nodemon server.js   # API (needs the database configured in server/config)
```

## Test

No automated tests. Check by running both halves and using the site.

## Common changes

- None recorded; add recipes here if the project becomes active again.
