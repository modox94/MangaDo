server {
          #listen 80;
          #listen [::]:80;

          root /home/mangado/repository/client/build;
          index index.html index.htm index.nginx-debian.html;

          server_name 104.248.88.68 mangado.site www.mangado.site;

          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-For $remote_addr;


          location / {
              try_files $uri /index.html =404;
          }

          location /api/ {
              proxy_pass http://localhost:3000/;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }


    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/mangado.site/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/mangado.site/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.mangado.site) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = mangado.site) {
        return 301 https://$host$request_uri;
    } # managed by Certbot



          server_name 104.248.88.68 mangado.site www.mangado.site;
    listen 80;
    return 404; # managed by Certbot




}
