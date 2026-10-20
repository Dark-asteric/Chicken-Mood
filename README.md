# 🍗 Chicken Mood

A responsive restaurant website built with **React**, **Tailwind CSS**, and **React Router**. It features a searchable menu, serverless order processing powered by **EmailJS**, and table reservations.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=nodedotjs&logoColor=white)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Configuration](#️-configuration)
- [EmailJS Template Variables](#-emailjs-template-variables)
- [Editing Content](#-editing-content)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Deployment](#-deployment)

---

## ✨ Features

### Pages & Navigation
- **Home page** with hero, menu highlights carousel, about section, featured food items, and customer reviews
- **Full menu page** generated from a single data file, with category filters and search by name or ingredients
- **Live search** in the navbar with dish suggestions and keyboard navigation
- **Sticky navbar** that changes colour on scroll, with a mobile hamburger menu and smooth scrolling

### Ordering & Booking
- **Serverless order popup**
  - Choose a dish, formula/size (*Seul* / *Menu*), quantity, and pickup or delivery
  - Totals are calculated live
  - Orders are sent straight to the restaurant's email via EmailJS (no backend required)
- **Table reservations** with date, time, and number of guests
- **Contact form** and a footer that reads from a single business-info file

### Quality
- Accessible, mobile-first layout

---

## 🛠️ Tech Stack

| Area | Tools |
| --- | --- |
| **Frontend** | React, Vite, React Router v7, `@emailjs/browser` |
| **Styling** | Tailwind CSS v4, daisyUI |
| **Server** *(optional)* | Node.js, Express, Nodemailer (email), Twilio (SMS) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **20 or newer**
- npm

### 1. Run the website

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev
```

The site opens at **http://localhost:5173**.

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `/dist` |
| `npm run preview` | Preview the production build locally |

### 2. Run the server *(optional)*

The reservation and contact forms can send their data to an optional Node.js server. The order popup does **not** need it, as it works directly through EmailJS on the frontend.

```bash
cd server
npm install
cp .env.example .env     # then fill in your values (see Configuration)
npm start
```

The server runs at **http://localhost:5000**. Check its status at **http://localhost:5000/api/health**.

---

## ⚙️ Configuration

### Website environment variables

Create a `.env.local` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_API_URL=http://localhost:5000   # Optional: backend server URL
```

| Variable | Required | Description |
| --- | :---: | --- |
| `VITE_EMAILJS_SERVICE_ID` | ✅ | Your EmailJS service ID (e.g. a connected Gmail service) |
| `VITE_EMAILJS_TEMPLATE_ID` | ✅ | Your EmailJS template ID for orders |
| `VITE_EMAILJS_PUBLIC_KEY` | ✅ | Your EmailJS account public key |
| `VITE_API_URL` | ❌ | Address of the deployed Node server for contact/reservations |

### Server environment variables *(optional)*

Create `server/.env`:

| Variable | Description |
| --- | --- |
| `PORT` | Server port (default `5000`) |
| `CLIENT_ORIGIN` | Website address(es) allowed to call the server, comma separated |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Email account used for reservations/contact |
| `OWNER_EMAIL` | Where reservations and messages are delivered |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` | Twilio credentials for SMS notifications |
| `OWNER_PHONE` | Your phone number in international format, e.g. `+33612345678` |

---

## 📩 EmailJS Template Variables

Set up your EmailJS **order** template with these variables:

| Variable | Description |
| --- | --- |
| `{{customer_name}}` | Customer's full name |
| `{{customer_phone}}` | Phone number |
| `{{order_type}}` | Pickup or Delivery |
| `{{delivery_address}}` | Address (if delivery) |
| `{{dish_name}}` | Selected dish |
| `{{dish_option}}` | Selected size or formula (e.g. Menu / Seul) |
| `{{quantity}}` | Selected quantity |
| `{{total_price}}` | Calculated total price in euros |
| `{{notes}}` | Special instructions/notes |

---

## 📝 Editing Content

| What | Where |
| --- | --- |
| Dishes, prices, sizes, categories | `src/data/menuData.js` |
| Address, phone, email, opening hours, social links | `src/data/siteInfo.js` |
| Dish photos | `public/menu/<dish-name>.jpg` |
| About and review content | `AboutSection.jsx` and `CustomerReviews.jsx` |

---

## 📁 Project Structure

```text
├── public/                  # Static assets & menu images
│   └── menu/                # Dish photos
└── src/
    ├── router/
    │   └── Router.jsx       # Routes
    ├── data/
    │   ├── menuData.js      # Menu items & pricing
    │   └── siteInfo.js      # Business details
    └── component/
        ├── layout/          # HomeLayout: navbar, page, footer
        ├── Navbar/          # Sticky navbar with live search
        ├── footer/          # Footer
        ├── Order/           # Order popup with EmailJS integration
        ├── sections/        # AboutUs, Reviews, Food Items, HeroSection, Highlights
        └── page/            # Home, Menu, About, Reservation, Contacts
```

---

## 🔍 How It Works

- **Orders** are processed entirely client-side via EmailJS. Make sure your EmailJS public key, service ID, and template ID are set correctly in `.env.local`.
- **Reservations & contact** are processed by the optional Express server, or they can be adapted to EmailJS in the same way as orders.

---

## 🌐 Deployment

**Website:** deploy to any static host (Netlify, Vercel, GitHub Pages).

1. Add your `VITE_EMAILJS_*` environment variables in your provider's deployment settings.
2. Configure a redirect rule so all routes point to `index.html` (required for React Router).

**Server (optional):** deploy to any Node.js host, then set `VITE_API_URL` on the website to the server's public URL and add the site's address to `CLIENT_ORIGIN`.