Brew & Bean Coffee Shop
=======================

A complete, responsive coffee shop website built with HTML, CSS, and vanilla JavaScript.

How to run (required)
---------------------
This site loads each section with fetch(). Opening index.html directly (file://) will not load the sections.

1. Open this folder in Visual Studio Code.
2. Install the "Live Server" extension by Ritwick Dey if you do not already have it.
3. Right-click index.html and choose "Open with Live Server".
4. The site will open in your browser at a local address such as http://127.0.0.1:5500/.

Project structure
-----------------
index.html                 Main page. Contains the navbar, footer, and containers for all sections.
html/home.html             Home / hero section
html/about.html            About Us section
html/menu.html             Menu section
html/gallery.html          Gallery (and testimonials)
html/contact.html          Contact section and demo form
css/style.css              Shared colors, fonts, reset, navbar, footer, buttons
css/home.css               Home layout
css/about.css              About layout
css/menu.css               Menu cards
css/gallery.css            Gallery grid and reviews
css/contact.css            Contact layout and form
js/script.js               Section loading, mobile nav, smooth scroll, form validation
images/                    Local coffee photographs used throughout the site

Images
------
All required photographs were downloaded from Unsplash and saved locally in images/:
  hero-coffee.jpg, coffee-shop.jpg, espresso.jpg, americano.jpg,
  latte.jpg, cappuccino.jpg, caramel-macchiato.jpg,
  gallery-1.jpg through gallery-6.jpg

No images need to be downloaded manually.

Notes
-----
- The contact form is a front-end demo. It validates name, email, and message, then shows a success notice. It does not send email.
- Prices are shown in Philippine pesos (₱).
- Navigation links smoothly scroll to each section on the single-page layout.
