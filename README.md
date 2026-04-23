# Todo API - Next.js + MongoDB

API REST construída com Next.js (App Router), equivalente ao projeto em .NET Minimal API.

---

## 📦 Stack

- Next.js (Route Handlers)
- TypeScript
- MongoDB (Driver oficial)
- JWT Authentication

---

## ⚙️ Configuração

Crie o arquivo `.env.local` na raiz:

```env
MONGODB_URI=mongodb+srv://rodrigoprado:123@cluster0.jqwsmpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=chave_super_segura_32_chars
DEMO_USER=rodrigo
DEMO_PASS=vini123
```

- **DB usada pela API:** `todo_db`
- **Compatibilidade:** o app aceita `MONGODB_URI` (preferencial) ou `MONGO_URI`.

---

## Rodando

```bash
pnpm  install
pnpm run dev   ou   pnpm dev
pnpm build
pnpm add jose
```

---

## 🔐 Auth

- `POST /login` (alias principal)
- `POST /api/auth/login` (mantida por compatibilidade)

Body:

```json
{
  "username": "rodrigo",
  "password": "vini123"
}
```

Retorno:

```json
{
  "token": "..."
}
```

Use o token no header:

`Authorization: Bearer <token>`

---

## ✅ Tasks

- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

Aliases originais (tambem funcionam):

- `GET /api/todos`
- `POST /api/todos`
- `PUT /api/todos/:id`
- `DELETE /api/todos/:id`