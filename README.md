# HTML to Image API

Uma API Next.js simples que converte HTML em imagens PNG usando Playwright Core, otimizada para deploy no Vercel.

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

## Deploy no Vercel

### 1. Preparação
```bash
npm run build    # Verificar se o build está ok
npm run type-check    # Verificar types
```

### 2. Conectar ao Vercel
1. Instale a CLI do Vercel: `npm i -g vercel`
2. Execute: `vercel`
3. Siga as instruções para conectar o projeto

### 3. Configurar Variáveis de Ambiente
No painel do Vercel, configure:
```
API_TOKEN=seu-token-seguro-aqui
LOG_LEVEL=info
```

### 4. Deploy
```bash
vercel --prod
```

### Configurações Automáticas
- `vercel.json`: Configurações de tempo limite e região
- `next.config.js`: Otimizações para Vercel
- Playwright Core: Configurado para usar o Chrome do Vercel

### Build Local (desenvolvimento)
```bash
npm run build
npm start
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
    ├── html-to-image.ts           # Conversão com Playwright Core
    ├── logger.ts                  # Sistema de logging
    └── types.ts                   # Tipos TypeScript
```

## Mudanças para Vercel

- ✅ Substituído Puppeteer por Playwright Core (menor footprint)
- ✅ Configurado `vercel.json` com timeouts apropriados
- ✅ Adicionado `.env.example` para documentação
- ✅ Otimizado `next.config.js` para production
- ✅ Removidas dependências desnecessárias