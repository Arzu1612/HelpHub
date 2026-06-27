# Project Name

> A brief description of the project.

## Tech Stack

* Node.js
* Express.js
* Database (MySQL / PostgreSQL / MongoDB)
* JWT Authentication (if applicable)

---

## Prerequisites

* Node.js >= 18
* npm >= 9

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Arzu1612/HelpHub.git
cd helphub
```

### Install dependencies

```bash
npm init -y
```

### Configure environment variables

Create a `.env` file in the project root. I provied .env.example file 

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=
```

### Start the application

Development

```bash
npm run dev
```

---

## Project Structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validations/
├── app.js
── server.js
```

---

## API Documentation

Document all implemented endpoints.

| Method | Endpoint                              | Description        |
| ------ | ------------                          | ------------------ |
| POST   | api/auth/register                     | register user      |
| POST   | /api/auth/login                       | login user         |
| GET    | /api/auth/me                          | get user details   |
| GET    | /api/clients?page=1&limit=10          | get client details |
| PATCH  | /api/clients/:id/deactivate           | deactive client    |
| PATCH  | /api/clients/:id/verify               | verify client      |
| POST   | /api/tickets                          | create ticket      |
| PATCH  | /api/tickets/:id/assign               | assign tickt       |
 
---

## Scripts

| Command         | Description            |
| --------------- | ---------------------- |
| `npm run dev`   | Run development server |
