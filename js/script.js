(function () {
  const sections = [
    { container: "home-container", file: "html/home.html", css: "css/home.css" },
    { container: "about-container", file: "html/about.html", css: "css/about.css" },
    { container: "menu-container", file: "html/menu.html", css: "css/menu.css" },
    { container: "gallery-container", file: "html/gallery.html", css: "css/gallery.css" },
    { container: "contact-container", file: "html/contact.html", css: "css/contact.css" }
  ];

  const loader = document.getElementById("page-loader");
  const errorBox = document.getElementById("load-errors");
  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  function ensureStylesheet(href) {
    if (document.querySelector('link[rel="stylesheet"][href="' + href + '"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  async function loadSection(section) {
    ensureStylesheet(section.css);
    const target = document.getElementById(section.container);
    try {
      const response = await fetch(section.file);
      if (!response.ok) {
        throw new Error("Could not load " + section.file + " (" + response.status + ")");
      }
      target.innerHTML = await response.text();
    } catch (error) {
      target.innerHTML =
        '<section class="container" style="padding:48px 0"><p>This section could not be loaded. Please run the site with Live Server.</p></section>';
      showError(error.message);
    }
  }

  function showError(message) {
    errorBox.hidden = false;
    const p = document.createElement("p");
    p.textContent = message + " Open this project with VS Code Live Server (fetch does not work from file://).";
    errorBox.appendChild(p);
  }

  function watchImages() {
    document.addEventListener(
      "error",
      function (event) {
        const el = event.target;
        if (el && el.tagName === "IMG") {
          el.classList.add("img-error");
          el.alt = (el.alt || "Image") + " — unavailable";
        }
      },
      true
    );
  }

  function setActiveLink() {
    const fromTop = window.scrollY + 120;
    const ids = ["home", "about", "menu", "gallery", "contact"];
    let current = "home";
    ids.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= fromTop) current = id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
    });
  }

  function smoothScrollTo(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  function initNavigation() {
    navToggle.addEventListener("click", function () {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    document.addEventListener("click", function (event) {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      smoothScrollTo(hash);
    });

    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
      setActiveLink();
    });
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setFieldError(form, field, message) {
    const node = form.querySelector('[data-error-for="' + field + '"]');
    if (node) node.textContent = message || "";
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form || form.dataset.bound === "true") return;
    form.dataset.bound = "true";
    const success = document.getElementById("form-success");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.classList.add("is-invalid");
      success.hidden = true;

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      let valid = true;

      if (!name) {
        setFieldError(form, "name", "Please enter your name.");
        valid = false;
      } else {
        setFieldError(form, "name", "");
      }

      if (!email) {
        setFieldError(form, "email", "Please enter your email address.");
        valid = false;
      } else if (!isValidEmail(email)) {
        setFieldError(form, "email", "Please enter a valid email address.");
        valid = false;
      } else {
        setFieldError(form, "email", "");
      }

      if (!message) {
        setFieldError(form, "message", "Please write a message.");
        valid = false;
      } else {
        setFieldError(form, "message", "");
      }

      if (!valid) return;

      form.classList.remove("is-invalid");
      form.reset();
      success.hidden = false;
    });
  }

  async function init() {
    watchImages();
    initNavigation();

    if (window.location.protocol === "file:") {
      showError("This page was opened as a local file.");
    }

    try {
      await Promise.all(sections.map(loadSection));
      initContactForm();
      setActiveLink();

      if (window.location.hash) {
        setTimeout(function () {
          smoothScrollTo(window.location.hash);
        }, 50);
      }
    } finally {
      loader.classList.add("is-hidden");
    }
  }

  init();
})();
