# Expense Tracker

A simple and lightweight full-stack Expense Tracking application built using **Node.js**, **Express**, and a **static frontend** served from the `public/` directory.  
It allows users to add, view, update, and manage daily expenses with a clean backend structure and modular routing.

---

## Project Overview

The Expense Tracker enables users to record spending details such as amount, category, date, and description.  
The backend is built with Node.js + Express and exposes REST-style endpoints through route modules.  
The frontend UI (HTML/CSS/JS) is served from the `public/` folder for easy deployment and local use.

---

## Features

- Add new expenses (amount, date, category, description)
- View a list of all expenses
- Edit or delete existing expenses (depending on UI integration)
- API routes separated into:
  - `authRoutes.js` – Authentication endpoints (if needed)
  - `expenseRoutes.js` – Expense CRUD operations
- Centralized database configuration in `db.js`
- Static frontend served automatically by Express

---

## Tech Stack

**Backend**
- Node.js  
- Express.js  
- Custom routes (`authRoutes.js`, `expenseRoutes.js`)  
- Database config in `db.js` (modify to use MongoDB, SQL, or file-based storage)

**Frontend**
- HTML  
- CSS  
- JavaScript  
- Served from `public/`

**Package Management**
- npm  
- `package.json` & `package-lock.json`

---

## Project Structure

```
Expense-Tracker/
├── public/                # Frontend UI (HTML, CSS, JS)
├── authRoutes.js          # Authentication routes
├── expenseRoutes.js       # Expense CRUD routes
├── db.js                  # Database configuration
├── server.js              # Main server file
├── package.json
├── package-lock.json
└── README.md
```

---

## Installation / Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/s3ldc/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Install dependencies
```bash
npm install
```

---

## Configuration

The database and persistence settings are defined inside:

```
db.js
```

Depending on your preferred database:

- Update connection strings (MongoDB, SQL, LocalDB, SQLite, or file-based JSON)
- Add environment variables if needed (`.env`)

If using environment variables, create a `.env` file in the root directory.

---

## Running the App

Start the server:

```bash
npm start
```

Or:

```bash
node server.js
```

The server will start on the port defined in `server.js` (often `http://localhost:3000`).

Open the browser:

```
http://localhost:3000
```

The frontend UI will load from the `public/` folder automatically.

---

## Usage

1. Open the application in your browser.  
2. Use the form to add new expenses:
   - Amount  
   - Category  
   - Date  
   - Description  
3. View the list of saved expenses.  
4. Edit or delete expenses (depending on route integration and UI additions).  
5. Extend or customize the app by modifying `expenseRoutes.js` or the UI under `public/`.

---

## API Overview

### Expense Routes (from `expenseRoutes.js`)
Typical REST pattern:

```
GET    /api/expenses          # Fetch all expenses
POST   /api/expenses          # Create a new expense
PUT    /api/expenses/:id      # Update an expense
DELETE /api/expenses/:id      # Delete an expense
```

### Authentication Routes (from `authRoutes.js`)
If auth is implemented:

```
POST /api/auth/register
POST /api/auth/login
```

Check the route files for exact implementations.

---

## Future Improvements

- Add JWT or session-based authentication
- Add categories management (custom categories)
- Add filtering by date, amount, or category
- Add search functionality
- Add charts for visual spending analytics
- Add CSV/Excel export functionality
- Add responsive and modern UI styling
- Convert frontend to React/Vue/Angular for better UX

---

## Contributing

1. Fork the repository  
2. Create a new branch  
   ```bash
   git checkout -b feature/your-feature
   ```  
3. Make your changes  
4. Commit & push  
   ```bash
   git commit -m "Add feature description"
   git push origin feature/your-feature
   ```  
5. Open a Pull Request

---

## License

If you plan to open-source it, add a `LICENSE` file (MIT recommended).  
Otherwise treat it as a personal/academic project.

---

## Contact

Maintainer: **Sunil Biriya**  
GitHub: https://github.com/s3ldc

