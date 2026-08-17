# AutoWash Landing Page

A modern, high-performance, and fully responsive landing page for an unlimited car wash monthly subscription service. Built for the CodSoft Web Development internship.

![Landing Page Preview](https://github.com/user-attachments/assets/09fae7d6-4f40-42da-a86a-99e54015aff9)

---

## 📁 Clean Project Architecture

```text
Landing-Page/
├── public/                 # Static assets (images, icons, SVG graphics, favicon)
│   ├── carwash@2x.png
│   ├── clip-path-group.svg
│   ├── clip-path-group-1.svg
│   ├── favicon.svg
│   ├── frame-143726645@3x.png
│   ├── frame-1437266451@3x.png
│   ├── frame-1437266452@3x.png
│   ├── icroundplus.svg
│   ├── instagram.svg
│   ├── ionarrowup@2x.png
│   ├── ionarrowup-1@2x.png
│   ├── ionarrowup-3@2x.png
│   ├── ionarrowup-7@2x.png
│   └── right@3x.png
├── css/                    # Modular stylesheets
│   ├── global.css          # Design system variables, typography & resets
│   └── style.css           # Core layouts, reel animation, accordion & modal styles
├── js/                     # Application scripts
│   └── main.js             # Reel carousel logic, interactive modals & search filters
├── index.html              # Clean semantic HTML5 markup
├── package.json            # NPM dependencies & Parcel build scripts
├── package-lock.json       # Locked dependency versions
├── vercel.json             # Vercel deployment configuration
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

---

## ⚡ Features & Interactivity

- 🎞️ **Automatic Infinite Partner Reel**: Continuous auto-scrolling partner carousel with pause-on-hover and playback controls (`❚❚` / `▶` and `‹` / `›`).
- 🏬 **Partner Detail Modal**: Click any partner card to view services, hours, and get Google Maps directions.
- 💳 **Interactive Subscription Modal**: Plan tiers (Basic $29, Gold $49, Family $79) with email validation and instant confirmation.
- 📬 **Contact Us Modal**: Working contact form with validation and toast notification.
- 📱 **App Download Modal**: Direct App Store / Google Play links plus SMS link input.
- 🔍 **All Locations Directory**: Live real-time search and neighborhood filter tabs (Santa Monica, Venice, Culver City, Beverly Hills, Downtown LA).
- ❓ **Accessible FAQ Accordion**: 6 distinct questions with smooth expand/collapse animations.
- 🌐 **Branded Browser Tab Favicon**: High-resolution SVG favicon in brand teal.

---

## 🚀 Tech Stack

- **HTML5 & CSS3**: Vanilla CSS with custom properties
- **JavaScript (ES6+)**: DOM manipulation and interactive logic
- **Parcel**: Fast, zero-config production bundler
- **Vercel**: Automated continuous deployment

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/eleshkapri/Landing-Page.git
cd Landing-Page
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 🌐 Deployment

Configured for automatic deployment on [Vercel](https://vercel.com) via [`vercel.json`](./vercel.json).
