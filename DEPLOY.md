# Deploying Ethereal Spaces on a VPS with Docker

The site runs as one Docker container and is reachable at `http://SERVER-IP:3005`.
There is no database. Content lives in `src/lib/content.ts`; enquiries are emailed (optional) and can be sent on WhatsApp.

## 1. One-time setup on the server

```bash
# Check Docker Compose is available
docker compose version

# Check the port is free (no output means it's free). Pick another port if it's taken.
ss -tlnp | grep ':3005'

# Get the code
cd /opt
git clone https://github.com/rvcjourney/eth.git ethereal-spaces
cd ethereal-spaces
```

If the repository is private, GitHub will ask for a username and a **personal access token** (not your password).
Create one at GitHub → Settings → Developer settings → Personal access tokens, with read access to the repository.

## 2. Create the settings file

```bash
cp .env.example .env
nano .env
```

Set at least:

```env
HOST_PORT=3005
NEXT_PUBLIC_SITE_URL=http://YOUR-SERVER-IP:3005
```

Add `SMTP_PASS` (a Gmail App Password) if you want enquiries emailed. Without it the form offers WhatsApp instead.
Save with `Ctrl+O`, `Enter`, then exit with `Ctrl+X`.

## 3. Build and start

```bash
docker compose up -d --build
```

The first build takes a few minutes. Then check it:

```bash
docker ps --filter name=ethereal-spaces-web     # STATUS should become "Up … (healthy)"
curl -I http://127.0.0.1:3005                    # should print HTTP/1.1 200 OK
```

Open `http://YOUR-SERVER-IP:3005` in a browser.

If the page doesn't open from outside but `curl` works on the server, allow the port through the firewall:

```bash
ufw status              # only if this says "active":
ufw allow 3005/tcp
```

## Updating after you push new code

```bash
cd /opt/ethereal-spaces
git pull
docker compose up -d --build
docker image prune -f    # optional: removes old unused images
```

## Useful commands

```bash
docker logs -f ethereal-spaces-web     # live logs (Ctrl+C to stop watching)
docker compose restart                 # restart the site
docker compose down                    # stop and remove the container
```

## Changing the port or address

Edit `HOST_PORT` and/or `NEXT_PUBLIC_SITE_URL` in `.env`, then run `docker compose up -d --build`.
The address is built into the site's SEO links, so a rebuild is needed after changing it.
