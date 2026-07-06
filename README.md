# 🎨 UI Vault: Modern UI Component Library & Developer Toolkit

🚀 **Live Demo:** https://ui-vault11.vercel.app/

---

## 🎥 See it in Action

[UI-Vault.webm](https://github.com/user-attachments/assets/9ca55e63-1099-49e9-a998-35b1b0fcc61a)


## 📖 Overview

UI Vault is a modern developer-focused UI component library built to simplify frontend development workflows.

The platform provides a curated collection of reusable UI components with live previews, source code access, dark mode support, and instant copy functionality.

Designed with scalability and usability in mind, UI Vault enables developers to quickly discover, preview, customize, and integrate production-ready UI components into their projects.

---

## ✨ Features

### 🔍 Global Component Search

Search components instantly across categories using React Context API powered state management.

### 📋 Copy-to-Clipboard Support

One-click code copying for rapid integration into existing projects.

### 🌙 Dark Mode Support

Fully responsive dark theme with consistent UI styling.

### 🧩 Reusable Component Architecture

Modular and scalable component organization for easy maintenance and extension.

### ⚡ Live Component Preview

View component behavior and appearance before integration.

### 📱 Responsive Design

Optimized layouts for desktop, tablet, and mobile devices.

### 🏷️ Multiple Component Categories

Includes:

- Buttons
- Cards
- Forms
- Navigation Bars
- Checkboxes
- Toggles
- Loaders

---

## 🏗️ Application Architecture

```text
Search Context Provider
        │
        ▼
Global Search State
        │
        ▼
Layout Component
        │
        ▼
┌──────────────────────────────────┐
│ Buttons │ Cards │ Forms │ Loader │
└──────────────────────────────────┘
        │
        ▼
Component Viewer
        │
        ▼
Preview + HTML + CSS
```

---

## 💻 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

### Routing

- React Router DOM

### UI Components

- Shadcn UI
- Lucide React

### State Management

- React Context API

### Deployment

- Vercel

---

## 📂 Project Structure

```text
src/
│
├── components/
│   ├── Layout.tsx
│   ├── SidebarNav.tsx
│   ├── ComponentCard.tsx
│   ├── ComponentViewer.tsx
│   └── ui/
│
├── pages/
│   ├── Index.tsx
│   └── components/
│       ├── ButtonsPage.tsx
│       ├── CardsPage.tsx
│       ├── FormsPage.tsx
│       ├── NavigationPage.tsx
│       ├── LoadersPage.tsx
│       └── SearchContext.tsx
│
├── hooks/
├── lib/
├── App.tsx
└── main.tsx
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/AtharvaVKadam/UIVault.git
cd UIVault
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🧠 Engineering Highlights

### Global Search with Context API

Implemented centralized search state using React Context API to eliminate prop drilling and provide cross-page component discovery.

### Reusable Component Architecture

Designed reusable component viewers and cards to reduce code duplication and simplify future expansion.

### Optimized Frontend Workflow

Leveraged Vite's lightning-fast HMR and build system to improve development efficiency and reduce production bundle generation times.

### Modular Design System

Organized UI elements into scalable categories allowing seamless addition of future components and design patterns.

---

## 📈 Future Enhancements

- Component tagging and advanced filtering
- Favorites and bookmarks
- Command palette (`Ctrl + K`)
- Component usage analytics
- AI-powered component generation

---

## 🌐 Deployment

The project is deployed using **Vercel**.

Live Demo:

https://ui-vault11.vercel.app/

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

## 👨‍💻 Author

**Atharva Kadam**

- GitHub: https://github.com/AtharvaVKadam
- LinkedIn: https://www.linkedin.com/in/atharvakadam11/

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

It helps support future development and improvements.

⭐ Star this repository if you found it helpful!
