# Guia de Instalação - HTML to Image API

Este guia fornece instruções completas para instalar e configurar a HTML to Image API em sistemas Linux.

## Índice
- [Requisitos do Sistema](#requisitos-do-sistema)
- [Dependências do Sistema](#dependências-do-sistema)
- [Instalação do Node.js](#instalação-do-nodejs)
- [Instalação do Chrome/Chromium](#instalação-do-chromechromium)
- [Configuração do Projeto](#configuração-do-projeto)
- [Verificação da Instalação](#verificação-da-instalação)
- [Solução de Problemas](#solução-de-problemas)
- [Produção](#produção)

## Requisitos do Sistema

### Sistemas Operacionais Suportados
- Ubuntu 18.04 LTS ou superior
- Debian 9 ou superior
- CentOS 7 ou superior / RHEL 7 ou superior
- Fedora 30 ou superior
- Arch Linux
- Amazon Linux 2

### Requisitos Mínimos
- **RAM:** 2GB (recomendado 4GB)
- **Espaço em disco:** 2GB livres
- **Node.js:** Versão 18.0.0 ou superior
- **npm:** Versão 8.0.0 ou superior

## Dependências do Sistema

### Ubuntu/Debian

```bash
# Atualizar lista de pacotes
sudo apt-get update

# Instalar dependências essenciais
sudo apt-get install -y \
    curl \
    wget \
    gnupg2 \
    ca-certificates \
    lsb-release

# Dependências para Puppeteer/Chromium
sudo apt-get install -y \
    libnss3-dev \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcairo-gobject2 \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0 \
    libxss1 \
    libgconf-2-4 \
    libxcursor1 \
    libxdg-utils \
    libxinerama1 \
    libxft2 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    fonts-liberation \
    libu2f-udev \
    libvulkan1
```

### CentOS/RHEL/Fedora

```bash
# Para CentOS/RHEL
sudo yum update -y

# Para Fedora
sudo dnf update -y

# Instalar dependências essenciais
sudo yum install -y curl wget gnupg2 ca-certificates
# ou para Fedora: sudo dnf install -y curl wget gnupg2 ca-certificates

# Dependências para Puppeteer/Chromium
sudo yum install -y \
    nss \
    atk \
    at-spi2-atk \
    cups-libs \
    drm \
    gtk3 \
    libXcomposite \
    libXdamage \
    libXrandr \
    libXss \
    libXtst \
    pango \
    alsa-lib \
    xorg-x11-fonts-100dpi \
    xorg-x11-fonts-75dpi \
    xorg-x11-fonts-cyrillic \
    xorg-x11-fonts-misc \
    xorg-x11-fonts-Type1 \
    xorg-x11-utils
```

### Arch Linux

```bash
# Atualizar sistema
sudo pacman -Syu

# Instalar dependências
sudo pacman -S --noconfirm \
    curl \
    wget \
    gnupg \
    ca-certificates \
    nss \
    atk \
    at-spi2-atk \
    libcups \
    libdrm \
    gtk3 \
    libxcomposite \
    libxdamage \
    libxrandr \
    libxss \
    libxtst \
    pango \
    alsa-lib \
    ttf-liberation
```

## Instalação do Node.js

### Método 1: Via Package Manager (Recomendado)

#### Ubuntu/Debian
```bash
# Adicionar repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

#### CentOS/RHEL
```bash
# Adicionar repositório NodeSource
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# Instalar Node.js
sudo yum install -y nodejs

# Verificar instalação
node --version
npm --version
```

#### Fedora
```bash
# Adicionar repositório NodeSource
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# Instalar Node.js
sudo dnf install -y nodejs

# Verificar instalação
node --version
npm --version
```

#### Arch Linux
```bash
# Instalar Node.js
sudo pacman -S nodejs npm

# Verificar instalação
node --version
npm --version
```

### Método 2: Via NVM (Node Version Manager)

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recarregar o shell
source ~/.bashrc

# Instalar Node.js LTS
nvm install --lts
nvm use --lts

# Definir como padrão
nvm alias default node

# Verificar instalação
node --version
npm --version
```

## Instalação do Chrome/Chromium

### Opção 1: Google Chrome (Recomendado)

#### Ubuntu/Debian
```bash
# Adicionar chave GPG do Google
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -

# Adicionar repositório do Chrome
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list

# Atualizar e instalar
sudo apt-get update
sudo apt-get install -y google-chrome-stable
```

#### CentOS/RHEL/Fedora
```bash
# Criar arquivo de repositório
sudo tee /etc/yum.repos.d/google-chrome.repo <<EOF
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/x86_64
enabled=1
gpgcheck=1
gpgkey=https://dl.google.com/linux/linux_signing_key.pub
EOF

# Instalar Chrome
sudo yum install -y google-chrome-stable
# ou para Fedora: sudo dnf install -y google-chrome-stable
```

#### Arch Linux
```bash
# Instalar via AUR (usando yay)
yay -S google-chrome

# Ou instalar Chromium do repositório oficial
sudo pacman -S chromium
```

### Opção 2: Chromium

#### Ubuntu/Debian
```bash
sudo apt-get install -y chromium-browser
```

#### CentOS/RHEL/Fedora
```bash
sudo yum install -y chromium
# ou para Fedora: sudo dnf install -y chromium
```

## Configuração do Projeto

### 1. Clonar o Repositório

```bash
# Clonar o projeto
git clone <URL_DO_REPOSITORIO>
cd Html-to-image-API
```

### 2. Instalar Dependências

```bash
# Instalar dependências do Node.js
npm install
```

### 3. Configurar Variáveis de Ambiente

```bash
# Criar arquivo de ambiente
cp .env.local.example .env.local

# Editar configurações
nano .env.local
```

Configurar as seguintes variáveis:
```env
# Token de autenticação da API
API_TOKEN=seu-token-secreto-aqui

# Nível de log (debug, info, warn, error)
LOG_LEVEL=info

# Caminho do executável do Chrome/Chromium (opcional)
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
# ou para Chromium: PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
```

### 4. Verificação de Tipo

```bash
# Executar verificação de tipos
npm run type-check
```

### 5. Executar em Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## Verificação da Instalação

### 1. Health Check

```bash
# Verificar se a API está funcionando
curl http://localhost:3000/api/html-to-image
```

Resposta esperada:
```json
{
  "status": "healthy",
  "message": "HTML to Image API is running",
  "version": "1.0.0"
}
```

### 2. Teste de Conversão

```bash
# Testar conversão HTML para PNG
curl -X POST http://localhost:3000/api/html-to-image \
  -H "Authorization: Bearer seu-token-secreto-aqui" \
  -H "Content-Type: application/json" \
  -d '{"html": "<h1 style=\"color: red;\">Teste de Conversão</h1>"}' \
  --output teste.png
```

### 3. Verificar Arquivo Gerado

```bash
# Verificar se o arquivo PNG foi criado
file teste.png
```

Resultado esperado: `teste.png: PNG image data`

## Solução de Problemas

### Erro: "Chrome executable not found"

**Solução:**
```bash
# Verificar se o Chrome está instalado
which google-chrome-stable
which chromium

# Definir caminho no .env.local
echo "PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable" >> .env.local
```

### Erro: "No sandbox errors"

**Solução:**
O projeto já está configurado com `--no-sandbox`. Se ainda houver problemas:

```bash
# Executar Chrome como usuário atual
sudo chown -R $USER:$USER ~/.cache/puppeteer/
```

### Erro de dependências de sistema

**Ubuntu/Debian:**
```bash
# Reinstalar dependências essenciais
sudo apt-get install --reinstall -y libnss3 libgconf-2-4 libxss1 libappindicator1 libindicator7
```

**CentOS/RHEL:**
```bash
# Verificar dependências faltantes
ldd /usr/bin/google-chrome-stable | grep "not found"
```

### Erro de fontes

```bash
# Ubuntu/Debian
sudo apt-get install -y fonts-liberation fonts-noto-color-emoji

# CentOS/RHEL
sudo yum install -y liberation-fonts
```

### Problemas de Memória

```bash
# Aumentar swap (temporário)
sudo swapon --show
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Debug de Puppeteer

Adicionar ao `.env.local`:
```env
DEBUG=puppeteer:*
LOG_LEVEL=debug
```

## Produção

### Build do Projeto

```bash
# Criar build de produção
npm run build

# Iniciar em modo produção
npm start
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Definir caminho do Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copiar e instalar dependências
COPY package*.json ./
RUN npm ci --only=production

# Copiar código
COPY . .

# Build da aplicação
RUN npm run build

# Usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
```

### Systemd Service

Criar arquivo `/etc/systemd/system/html-to-image-api.service`:

```ini
[Unit]
Description=HTML to Image API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/html-to-image-api
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Ativar serviço:
```bash
sudo systemctl enable html-to-image-api
sudo systemctl start html-to-image-api
sudo systemctl status html-to-image-api
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoramento

### Logs da Aplicação

```bash
# Visualizar logs em tempo real
npm run dev | tee logs/app.log

# Ou em produção
pm2 logs html-to-image-api
```

### Recursos do Sistema

```bash
# Monitorar uso de CPU e memória
htop

# Monitorar processos Chrome
ps aux | grep chrome
```

---

## Suporte

Para problemas específicos:

1. Verificar logs da aplicação
2. Testar dependências individualmente
3. Consultar documentação do Puppeteer
4. Abrir issue no repositório do projeto

**Versões testadas:**
- Node.js: 18.x, 20.x
- npm: 8.x, 9.x, 10.x
- Google Chrome: 120+
- Ubuntu: 20.04, 22.04
- CentOS: 7, 8
- Debian: 10, 11