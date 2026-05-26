# PhysLabs

Blank Vite/React placeholder for [physlabs.org](https://physlabs.org).

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

The production server is `100.85.250.88` over Tailscale. The site deploys to:

```text
/var/www/physlabs.org
```

First-time server setup requires sudo because it creates the Nginx server block:

```bash
sudo bash deploy/server-setup.sh
```

GitHub Actions runs lint and build checks on every push to `main`.

Manual production deploy:

```bash
npm run build
rsync -az --delete dist/ 100.85.250.88:/var/www/physlabs.org/dist/
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
