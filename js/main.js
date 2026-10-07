(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    function apply(theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      try {
        localStorage.setItem("theme", theme);
      } catch (e) {}
    }

    themeToggle.addEventListener("click", function () {
      var isDark = document.documentElement.classList.contains("dark");
      apply(isDark ? "light" : "dark");
    });
  }

  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    function closeNav() {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }

    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("resize", closeNav);
    window.addEventListener("orientationchange", closeNav);
  }

  var feedbackForm = document.getElementById("feedback-form");
  var formResponse = document.getElementById("form-response");
  if (feedbackForm && formResponse) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!feedbackForm.checkValidity()) {
        feedbackForm.reportValidity();
        return;
      }

      var submitBtn = feedbackForm.querySelector('button[type="submit"]');
      var data = Object.fromEntries(new FormData(feedbackForm).entries());
      data.access_key = "sf_d3eed501fb86e54ab2310df3bdfcb999";

      formResponse.hidden = true;
      formResponse.classList.remove("is-success", "is-error");
      formResponse.textContent = "";
      if (submitBtn) {
        submitBtn.disabled = true;
      }

      fetch("https://api.snapitforms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          return response.json().then(function (result) {
            return { ok: response.ok, result: result };
          });
        })
        .then(function (payload) {
          var result = payload.result || {};
          if (result.success) {
            formResponse.textContent = "Thank you! Your feedback has been sent.";
            formResponse.classList.add("is-success");
            feedbackForm.reset();
            return;
          }

          var err = result.error || "Submission failed. Please try again.";
          if (err === "Usage limit exceeded") {
            err =
              "The monthly feedback limit has been reached. Please try again later.";
          }
          throw new Error(err);
        })
        .catch(function (error) {
          formResponse.textContent =
            error && error.message
              ? error.message
              : "Something went wrong. Please try again.";
          formResponse.classList.add("is-error");
        })
        .finally(function () {
          formResponse.hidden = false;
          if (submitBtn) {
            submitBtn.disabled = false;
          }
        });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
