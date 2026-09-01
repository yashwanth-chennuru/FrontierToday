# 🌐 Frontier Today

> **Real-time Tracker & Matrix Grid for Frontier AI Model Releases, Breakthroughs & Benchmark Launches.**

[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-18-black.svg?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-black.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-black.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-black.svg?style=flat-square&logo=firebase)](https://firebase.google.com/)

**Frontier Today** is an open-source, real-time release tracker and intelligence dashboard crafted with a minimalist Scandinavian aesthetic. It monitors releases and milestones across 17+ leading AI frontier labs including **Anthropic, OpenAI, Google Gemini, Meta, xAI, DeepSeek, World Labs, Mistral, Perplexity, Cohere, Thinking Machines, Sarvam AI, and more**.

---

## ✨ Features

- 📐 **Dual-Orientation Matrix Grid**:
  - **Inverted View**: Frontier Labs on vertical axis $\downarrow$ with dates spanning horizontally $\rightarrow$.
  - **Timeline View**: Dates on vertical axis $\downarrow$ with labs spanning across columns $\rightarrow$.
- 📰 **Feed Stream View**: Linear, chronological card feed grouped by release date.
- 🌓 **Nordic Minimal Dark & Light Themes**: Handcrafted Scandinavian design system with 1-click theme switcher and OS preference auto-detection.
- ⚡ **Real-Time Cloud Synchronization**: Powered by Cloud Firestore `onSnapshot` streaming for instant updates without page refreshes.
- 🔒 **Public Read & Owner Admin Security**:
  - **Public Visitors**: Enjoy a fast, clean, distraction-free read-only interface.
  - **Administrator**: 1-click Google Sign-in unlocks create, edit, delete, and custom lab management tools.
- 🔍 **Real-Time Search & Category Filtering**: Filter by keyword, model family, tags, or domain categories (`Foundation Model`, `Agentic AI`, `Vision & Video`, `Code & Reasoning`, `Voice & Audio`, `Infrastructure & Tooling`, `Research & Benchmark`, `N/A`).
- 📅 **6-Month Timeline Navigation**: Jump between months (Sep 2026 – Feb 2027), toggle between 7-day, 14-day, and month views with fast reset to current date.
- 💾 **Data Portability**: Built-in JSON export and import capabilities for easy backups.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Scandinavian palette, Nordic shadows, typography tokens)
- **Database & Auth**: [Google Cloud Firestore](https://firebase.google.com/docs/firestore) & [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [Bun](https://bun.sh/) (or `pnpm` / `npm` / `yarn`)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yashwanth-chennuru/FrontierToday.git
cd FrontierToday
```

### 2. Install Dependencies
Using **Bun** (recommended):
```bash
bun install
```
Or using **npm** / **pnpm** / **yarn**:
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```
Open `.env` and fill in your Firebase project credentials and authorized administrator Google email:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Authorized Administrator Google Email
VITE_ADMIN_EMAIL=your_admin_email@gmail.com
```

### 4. Start Development Server
```bash
bun run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔥 Firebase Backend Setup Guide

To connect your own Firebase project:

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. In **Project Settings > General > Your Apps**, add a **Web App** (`</>`) and copy the `firebaseConfig` keys into your `.env` file.

### 2. Enable Cloud Firestore
1. Navigate to **Build > Firestore Database** and click **Create Database**.
2. Select your preferred cloud region and start in **Production mode**.

### 3. Enable Google Authentication
1. Navigate to **Build > Authentication > Sign-in method**.
2. Enable **Google** as a sign-in provider and provide a support email.

### 4. Deploy Firestore Security Rules
Deploy the security rules from `firestore.rules` (replace `YOUR_ADMIN_EMAIL@gmail.com` with your Google email):
```bash
npx firebase-tools deploy --only firestore:rules
```

---

## 🚢 Production Deployment

### Deploying to Firebase Hosting
```bash
# Build the production assets
bun run build

# Deploy Hosting
npx firebase-tools deploy --only hosting
```

### Deploying to Vercel or Netlify
1. Connect your GitHub repository.
2. Set the build command to `bun run build` (or `npm run build`).
3. Set the output directory to `dist`.
4. Add the environment variables from `.env.example` in your hosting dashboard.

---

## 📁 Project Structure

```
FrontierToday/
├── public/
│   ├── logos/              # Official lab logos (SVG / PNG / WebP)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AddCompanyModal.tsx      # Modal to add custom AI labs
│   │   ├── AdminAuthModal.tsx       # 1-click Google Sign-in modal
│   │   ├── CompanyHeaderCell.tsx    # Lab header cell with rich tooltips
│   │   ├── CompanyLogos.tsx         # Responsive brand emblems
│   │   ├── DateControls.tsx         # 6-month navigator & stepper
│   │   ├── FeedView.tsx             # Linear chronological feed stream
│   │   ├── Header.tsx               # Brand banner, theme toggle & search
│   │   ├── LaunchCard.tsx           # Category-coded release cards
│   │   ├── LaunchDetailDrawer.tsx   # Full details, links & tags drawer
│   │   ├── LaunchModal.tsx          # Create/Edit release modal form
│   │   └── TimelineGrid.tsx         # Dual-orientation matrix grid
│   ├── config/
│   │   └── firebase.ts              # Firebase app, auth & Firestore init
│   ├── data/
│   │   └── seedData.ts              # Initial 17 AI labs & sample releases
│   ├── services/
│   │   └── firestoreService.ts      # Real-time Firestore sync & CRUD
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── utils/
│   │   └── dates.ts                 # Date generation & calendar utilities
│   ├── App.tsx                      # Root application state & router
│   ├── index.css                    # Tailwind layers & scrollbars
│   └── main.tsx                     # React DOM entry point
├── .env.example                     # Environment variables template
├── .gitignore                       # Ignored files (secrets, builds, node_modules)
├── firebase.json                    # Firebase hosting & Firestore config
├── firestore.rules                  # Firestore security rules
├── LICENSE                          # MIT License
├── package.json                     # Dependencies & scripts
├── tailwind.config.js               # Scandinavian theme & Dark Mode config
├── tsconfig.json                    # TypeScript compiler options
└── vite.config.ts                   # Vite build configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — feel free to use, modify, and distribute for personal or commercial projects.
