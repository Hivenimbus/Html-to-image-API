# HTML to Image API

Uma API Next.js simples que converte HTML em imagens PNG usando Puppeteer.

## Funcionalidades

- ✅ Conversão de HTML para PNG
- ✅ Autenticação por API Token
- ✅ Sistema de logging detalhado
- ✅ Configuração de qualidade e dimensões
- ✅ Resposta binária otimizada
- ✅ Health check endpoint

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Renomeie `.env.local` e configure:
```env
API_TOKEN=your-secret-api-token-here
LOG_LEVEL=info
```

### 3. Executar em desenvolvimento
```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## Uso da API

### Converter HTML para PNG
```bash
curl -X POST http://localhost:3000/api/html-to-image \
  -H "Authorization: Bearer your-secret-api-token-here" \
  -H "Content-Type: application/json" \
  -d '{"html": "<h1>Hello World</h1>"}' \
  --output image.png
```

### Parâmetros opcionais
```json
{
  "html": "<h1>Hello World</h1>",
  "width": 1200,
  "height": 800,
  "quality": 90,
  "fullPage": false
}
```

### Health Check
```bash
curl http://localhost:3000/api/html-to-image
```

## Logs

O sistema de logging registra:
- Requisições recebidas
- Tentativas de autenticação
- Conversões HTML → PNG
- Erros e performance
- Respostas HTTP

Exemplo de log:
```
[2024-01-01T12:00:00.000Z] INFO [REQUEST]: POST /api/html-to-image
[2024-01-01T12:00:01.000Z] INFO [CONVERSION]: HTML converted to PNG successfully
[2024-01-01T12:00:01.100Z] INFO [RESPONSE]: POST /api/html-to-image - 200
```

## Produção

### Build
```bash
npm run build
npm start
```

### Docker (opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/html-to-image/route.ts  # API endpoint
│   ├── layout.tsx                  # Layout da aplicação
│   └── page.tsx                    # Página de documentação
└── lib/
    ├── auth.ts                     # Autenticação por token
    ├── html-to-image.ts           # Conversão com Puppeteer
    ├── logger.ts                  # Sistema de logging
    └── types.ts                   # Tipos TypeScript
```

 sudo apt-get update && sudo apt-get install -y libnss3 libnss3-dev libatk-bridge2.0-0
  libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 libasound2 libpangocairo-1.0-0
   libatk1.0-0 libcairo-gobject2 libgtk-3-0 libgdk-pixbuf2.0-0 libxss1 libgconf-2-4

  Alternatively, you can install Google Chrome directly, which includes all dependencies:

  wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
  echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee
  /etc/apt/sources.list.d/google-chrome.list
  sudo apt-get update
  sudo apt-get install -y google-chrome-stable