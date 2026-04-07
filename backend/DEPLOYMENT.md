# Backend Deployment

Deploy this `backend` folder to a Java/Docker-capable host, then set these environment variables:

```text
DB_URL=jdbc:mysql://<host>:<port>/<database>
DB_USERNAME=<mysql_username>
DB_PASSWORD=<mysql_password>
CORS_ALLOWED_ORIGIN_PATTERNS=https://argovalue-fullstack.vercel.app,https://*.vercel.app
```

The app uses `PORT` automatically when the host provides it. Locally it falls back to port `5000`.

After deployment, set this environment variable in Vercel for the frontend:

```text
REACT_APP_API_URL=https://<your-backend-domain>/api
```
