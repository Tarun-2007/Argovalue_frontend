# Backend Deployment

Deploy this `backend` folder to a Java/Docker-capable host, then set these environment variables.

If you deploy MySQL on Railway, you can set these variables on the backend service using Railway reference variables:

```text
MYSQLHOST=${{MySQL.MYSQLHOST}}
MYSQLPORT=${{MySQL.MYSQLPORT}}
MYSQLDATABASE=${{MySQL.MYSQLDATABASE}}
MYSQLUSER=${{MySQL.MYSQLUSER}}
MYSQLPASSWORD=${{MySQL.MYSQLPASSWORD}}
CORS_ALLOWED_ORIGIN_PATTERNS=https://argovalue-fullstack.vercel.app,https://*.vercel.app
```

You can also use generic database variables instead:

```text
DB_URL=jdbc:mysql://<host>:<port>/<database>
DB_USERNAME=<mysql_username>
DB_PASSWORD=<mysql_password>
```

The app uses `PORT` automatically when the host provides it. Locally it falls back to port `5000`.

After deployment, set this environment variable in Vercel for the frontend:

```text
REACT_APP_API_URL=https://<your-backend-domain>/api
```
