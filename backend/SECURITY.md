# Backend Security Guidelines

- All secrets and sensitive config must be in `.env` (never commit real secrets).
- Use HTTPS in production (terminate SSL at Nginx or load balancer).
- Validate all input (Joi schemas in controllers).
- Sanitize and escape user input before using in queries.
- Use helmet and CORS middleware in Express.
- Restrict CORS origins in production.
- Keep dependencies up to date.
- Run as non-root in Docker (see Dockerfile best practices).
- Use PM2 or similar for process management in production.
- Monitor logs and set up alerts for errors or suspicious activity.
