🍗 Chicken Mood

A responsive restaurant website built with React, Tailwind CSS, and React Router, featuring a searchable menu, direct EmailJS-powered order processing, and table reservations.

✨ Features

Home page with hero, menu highlights carousel, about section, featured food items, and customer reviews

Full menu page built from one data file: filter by category and search by name or ingredients

Live search in the navbar with dish suggestions and keyboard navigation

Serverless Order popup: choose a dish, formula/size (Seul / Menu), quantity, pickup or delivery; calculate totals live and send orders directly to the restaurant's email using EmailJS (no backend required)

Table reservations with date, time, and number of guests

Contact form and a footer that reads from a single business-info file

Sticky navbar that changes colour on scroll, with a mobile hamburger menu and smooth scrolling

Accessible, mobile-first layout

🛠️ Tech stack

Area

Tools

Frontend

React, Vite, React Router v7, @emailjs/browser

Styling

Tailwind CSS v4, daisyUI

Server (optional)

Node.js, Express, Nodemailer (email), Twilio (SMS)

🚀 Getting started

Prerequisites

Node.js 20 or newer

npm

1. Run the website

git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev


The site opens at http://localhost:5173.

Other scripts:

npm run build     # production build in /dist
npm run preview   # preview the production build locally


2. Run the server (optional)

The reservation and contact forms can send their data to an optional Node.js server. The order popup runs independently directly through EmailJS on the frontend.

cd server
npm install
cp .env.example .env     # then fill in your values (see below)
npm start


The server runs at http://localhost:5000. Check it at http://localhost:5000/api/health.

⚙️ Configuration

Website Environment Variables (.env.local in project root)

Create a .env.local file in the root directory to store your EmailJS keys:

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_API_URL=http://localhost:5000 # (Optional: backend server URL)


Variable

Description

VITE_EMAILJS_SERVICE_ID

Your EmailJS service ID (e.g., connected Gmail service)

VITE_EMAILJS_TEMPLATE_ID

Your EmailJS template ID for orders

VITE_EMAILJS_PUBLIC_KEY

Your EmailJS account public key

VITE_API_URL

(Optional) Address of the deployed Node server for contact/reservations

📩 EmailJS Template Variables

Set up your EmailJS order template with the following variables:

{{customer_name}} — Customer's full name

{{customer_phone}} — Phone number

{{order_type}} — Pickup or Delivery

{{delivery_address}} — Address (if delivery)

{{dish_name}} — Selected dish

{{dish_option}} — Selected size or formula (e.g., Menu / Seul)

{{quantity}} — Selected quantity

{{total_price}} — Calculated total price in Euros

{{notes}} — Special instructions/notes

Server Environment Variables (server/.env — Optional)

Variable

Description

PORT

Server port (default 5000)

CLIENT_ORIGIN

Website address(es) allowed to call the server, comma separated

SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

Email account used for reservations/contact

OWNER_EMAIL

Where reservations and messages are delivered

TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM

Twilio credentials for SMS notifications

OWNER_PHONE

Your phone number in international format, e.g. +33612345678

Editing Content

What

Where

Dishes, prices, sizes, categories

src/data/menuData.js

Address, phone, email, opening hours, social links

src/data/siteInfo.js

Dish photos

public/menu/<dish-name>.jpg

About and review content

AboutSection.jsx and CustomerReviews.jsx

📁 Project structure

├── public/                 # static assets & menu images
└── src/
    ├── router/Router.jsx    # routes
    ├── data/
    │   ├── menuData.js      # menu items & pricing
    │   └── siteInfo.js      # business details
    └── component/
        ├── layout/          # HomeLayout: navbar, page, footer
        ├── Navbar/          # sticky navbar with live search
        ├── footer/          # footer
        ├── Order/           # order popup with EmailJS integration
        ├── sections/        # AboutUs, Reviews, Food Items, HeroSection, Highlights      
        └── page/            # Home, Menu, About, Reservation, Contacts


📝 Notes

Orders: Orders are processed completely client-side via EmailJS. Ensure your EmailJS public key and template ID are set correctly in .env.local.

Reservations & Contact: Processed via the optional Express server or can be adapted to EmailJS in the same manner.

🌐 Deployment

Website: Deploy to any static host (Netlify, Vercel, GitHub Pages). Add your VITE_EMAILJS_* environment variables directly into your provider's deployment settings. Configure redirect rules to point all routes to index.html.