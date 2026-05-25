# PhysLabs

Static React/Vite website for [physlabs.org](https://physlabs.org).

## Local Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Production Deployment

The production server is `100.85.250.88` over Tailscale. The site is designed to deploy to:

```text
/var/www/physlabs.org
```

First-time server setup requires sudo because it creates the Nginx server block:

```bash
sudo bash deploy/server-setup.sh
```

After that, GitHub Actions builds and deploys `dist/` on every push to `main`. The workflow expects these repository secrets:

```text
TS_OAUTH_CLIENT_ID
TS_OAUTH_SECRET
DEPLOY_SSH_PRIVATE_KEY
```

## DNS

Point the domain to the server public IP:

```text
physlabs.org      A      81.21.4.185
www.physlabs.org  CNAME  physlabs.org
```

After DNS resolves to the server and the Nginx config is enabled, issue HTTPS with Certbot:

```bash
sudo certbot --nginx -d physlabs.org -d www.physlabs.org
```
