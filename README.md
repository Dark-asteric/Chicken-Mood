# 🍗 Chicken Mood

A responsive restaurant website built with React, Tailwind CSS and React Router, featuring a searchable menu, an order popup and table reservations.
An optional Node/Express server sends the restaurant owner an email and an SMS for reservations and contact messages.

<!-- Add a screenshot: ![Chicken Mood](./docs/screenshot.png) -->
<!-- Live demo: https://your-site.example.com -->

## ✨ Features

- **Home page** with hero, menu highlights carousel, about section, featured food items and customer reviews
- **Full menu page** built from one data file: filter by category and search by name or ingredients
- **Live search** in the navbar with dish suggestions and keyboard navigation
- **Order popup**: choose a dish, size or formula (Seul / Menu), quantity, pickup or delivery; the total updates live
- **Table reservations** with date, time and number of guests
- **Contact form** and a footer that reads from a single business-info file
- **Sticky navbar** that changes colour on scroll, with a mobile hamburger menu and smooth scrolling
- Accessible, mobile-first layout

## 🛠️ Tech stack

| Area | Tools |
| --- | --- |
| Frontend | React, Vite, React Router v7 |
| Styling | Tailwind CSS v4, daisyUI |
| Server (optional) | Node.js, Express, Nodemailer (email), Twilio (SMS) |

## 🚀 Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### 1. Run the website

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev
```

The site opens at `http://localhost:5173`.

Other scripts:

```bash
npm run build     # production build in /dist
npm run preview   # preview the production build locally
```

### 2. Run the server (optional)

The **reservation** and **contact** forms send their data to the server. Without it, those two forms show an error message.

```bash
cd server
npm install
cp .env.example .env     # then fill in your values (see below)
npm start
```

The server runs at `http://localhost:5000`. Check it at `http://localhost:5000/api/health`.

In development you can start the server **without** any email or SMS credentials: messages are printed in the terminal instead of being sent.

To let the website reach the server during development, add a proxy to `vite.config.js`:

```js
export default defineConfig({
  // ...your plugins
  server: { proxy: { "/api": "http://localhost:5000" } },
});
```

## ⚙️ Configuration

### Server environment variables (`server/.env`)

| Variable | Description |
| --- | --- |
| `PORT` | Server port (default `5000`) |
| `CLIENT_ORIGIN` | Website address(es) allowed to call the server, comma separated |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Email account used to send messages (for Gmail, use an app password) |
| `OWNER_EMAIL` | Where reservations and messages are delivered |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` | Twilio credentials and sender number |
| `OWNER_PHONE` | Your phone number in international format, e.g. `+33612345678` |

> ⚠️ Never commit `.env` and never put these values in the React app. Only variables starting with `VITE_` are exposed to the browser.

### Website environment variable (optional, `.env` in the project root)

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Address of the deployed server, e.g. `https://api.example.com`. Leave empty in development when using the Vite proxy. |

### Editing the content

| What | Where |
| --- | --- |
| Dishes, prices, sizes, categories, sauces | `src/data/menuData.js` |
| Address, phone, email, opening hours, social links | `src/data/siteInfo.js` (empty values are simply hidden) |
| Dish photos | `public/menu/<dish-name>.jpg` (the path is set in each dish's `image` field) |
| Chef and review content | The arrays at the top of `AboutSection.jsx` and `CustomerReviews.jsx` |

`price` is the price of the item alone ("Seul") and `menuPrice` is the price with fries and a drink. Dishes with `sizes` (pizzas, tacos, bowl) list one price per size.

## 📁 Project structure

```text
├── public/                  # images served from the site root
└── src/
    ├── router/Router.jsx    # routes
    ├── data/
    │   ├── menuData.js      # the whole menu
    │   └── siteInfo.js      # business details
    └── component/
        ├── layout/          # HomeLayout: navbar, page, footer
        ├── Navbar/          # sticky navbar with live search
        ├── footer/          # footer
        ├── Order/           # order popup
        ├── sections/       # AboutUs, Customer review, Food Items, HeroSection, Highlights      
        └── page/            # Home, Menu, About, Reservation, Contacts
```

## 🔌 Server endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Shows whether email and SMS are configured |
| `POST` | `/api/reservations` | Sends a reservation request to the owner (email + SMS) |
| `POST` | `/api/contact` | Sends a contact message to the owner (email) |
| `POST` | `/api/orders` | Prices an order from the menu data and notifies the owner (email + SMS) |

The server applies a rate limit (20 requests per 15 minutes per IP) and validates every field.

## 📝 Notes

- The **order popup** collects and totals the order and passes it to an optional `onSubmit(order)` prop. It does not send the order anywhere by default; connect it to `/api/orders` or another service before taking real orders.
- Twilio trial accounts can only text verified numbers.
- Menu photos and chef/review photos are placeholders until you add the image files; the site shows an initial letter in their place.

## 🌐 Deployment

- **Website:** any static host (Netlify, Vercel, GitHub Pages). Set `VITE_API_URL` before building. Because the app uses client-side routing, configure the host to serve `index.html` for all paths.
- **Server:** any Node host (Render, Railway, Fly.io). Set the environment variables above and set `CLIENT_ORIGIN` to your website's address.
