---
## Frontend README.md

## 📚 Library Management System Frontend
<img src="https://img.shields.io/badge/React-v18-blue" alt="React"> <img src="https://img.shields.io/badge/Vite-v4-purple" alt="Vite"> <img src="https://img.shields.io/badge/TailwindCSS-v3-teal" alt="Tailwind"> <img src="https://img.shields.io/badge/Framer_Motion-Animations-pink" alt="Framer Motion">

## 📖 Description
This is the frontend for a responsive Library Management System built with React.js (Vite build tool) as part of a full-stack development internship assignment. It integrates with the backend API to allow users to view, search, borrow, and return books. Admins can add/update/delete books. Features include state management, notifications, and authentication (login/register/logout).
Exceeds assignment: Includes Context API for state, notifications with close button, animations, icons, and responsive UI with Tailwind CSS.

## ✨ Features

- 🔐 Authentication: Login/Register/Logout with JWT
- 👥 Roles: Admin (add/update/delete books), Member (borrow/return)
- 📖 Book List: View all books with search, status (In Stock/Out of Stock/Borrowed by You)
- 📤 Borrow/Return: Real-time updates with refetch
- 🔔 Notifications: Top-right alerts (success/error/pending) with auto-hide (2s) and close button
- 🎨 UI Enhancements: Animations (Framer Motion), Icons (React Icons), Responsive Grid
- 🔍 Search: By title/author

## 🛠 Tech Stack
### Category, Technologies/Tools
- Framework,React.js v18
-Build Tool,Vite v4
- Styling,Tailwind CSS v3
- State Mgmt,Context API
- HTTP Client,Axios
- Animations,Framer Motion
- Icons,React Icons
- Routing,React Router DOM


## 🚀 Getting Started
#### Prerequisites

- Node.js (v16+ recommended)
- Backend server running (see backend README)

# Installation
1. Clone the repository:
`git clone <repo-url>`
`cd frontend`
2. Install dependencies:
`npm install`
3. Create .env file in the root and add:
`VITE_API_URL=http://localhost:5000/api  # Or deployed backend URL`

## Running Locally
- Start the development server:
`npm run dev`
- `Open http://localhost:5173 in your browser.` # deployed frontend URL - `Open deployed Link https://library-management-system-frontend-sand.vercel.app/`

## 🖥 Usage

- Login/Register: Use /login or /register routes.
- Home Page: Search and view books. Members see Borrow/Return buttons based on status.
- Admin Panel: Add/Update/Delete books via forms/buttons.
- Notifications: Appear top-right; close manually or auto-hide after 2s.
- Responsive: Works on mobile/desktop with grid layouts.

## Screenshots

- Home Page: Animated book cards with icons and status.
- Notification: 📢 Top-right with ❌ close button.

## ⚙️ Deployment

#### Vercel Deployment:

- Push code to GitHub.
- Create a new project on Vercel.com.
- Import repo, set build command: npm run build, output dir: dist.
- Add environment variable: VITE_API_URL=<backend-url>.
- Deploy and access the live URL.


#### Verify: Test login, book operations on deployed site.

## 🐛 Troubleshooting

- API Errors: Check console; ensure backend is running and VITE_API_URL is correct.
- Auth Issues: Clear localStorage and retry login.
- UI Overflow: Tailwind classes handle truncation/breaking for long text.

## 📝 License
- MIT License. Feel free to use and modify.
- For questions, contact [mdmozammil112002@gmail.com](mdmozammil112002@gmail.com).