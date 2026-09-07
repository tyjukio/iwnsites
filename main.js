const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

menuButton?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("visible"));
}

const form = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");
const submitButton = form?.querySelector(".submit-btn");
const buttonText = submitButton?.querySelector(".btn-text");

function setFieldError(field, message = "") {
  const wrapper = field.closest(".field");
  if (!wrapper) return;
  wrapper.classList.toggle("is-invalid", Boolean(message));
  const error = wrapper.querySelector(".field-error");
  if (error) error.textContent = message;
}

function validateForm() {
  let valid = true;

  const name = form.elements["name"];
  const email = form.elements["email"];
  const service = form.elements["service"];
  const message = form.elements["message"];

  [name, email, service, message].forEach(field => setFieldError(field));

  if (name.value.trim().length < 2) {
    setFieldError(name, "Podaj swoje imię.");
    valid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setFieldError(email, "Podaj poprawny adres e-mail.");
    valid = false;
  }

  if (!service.value) {
    setFieldError(service, "Wybierz rodzaj usługi.");
    valid = false;
  }

  if (message.value.trim().length < 10) {
    setFieldError(message, "Napisz przynajmniej kilka zdań o projekcie.");
    valid = false;
  }

  return valid;
}


form?.addEventListener("submit", async event => {
  event.preventDefault();

  statusBox.textContent = "";
  statusBox.className = "form-status";

  if (!validateForm()) return;
  const captchaToken = form.querySelector('[name="h-captcha-response"]')?.value;
  if (!captchaToken) {
    statusBox.textContent = "Potwierdź zabezpieczenie antyspamowe.";
    statusBox.className = "form-status error";
    return;
  }

  const accessKey = form.querySelector('input[name="access_key"]')?.value.trim();

  if (!accessKey || accessKey === "WKLEJ_TUTAJ_ACCESS_KEY_WEB3FORMS") {
    statusBox.textContent = "Formularz nie jest jeszcze aktywny — wklej access key z Web3Forms w index.html.";
    statusBox.className = "form-status error";
    return;
  }

  submitButton.disabled = true;
  submitButton.classList.add("loading");
  buttonText.textContent = "Wysyłam...";

  try {
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Nie udało się wysłać wiadomości.");
    }

    form.reset();
    statusBox.textContent = "Dziękuję! Wiadomość została wysłana. Odezwę się tak szybko, jak będę mógł.";
    statusBox.className = "form-status success";
  } catch (error) {
    statusBox.textContent = "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na e-mail.";
    statusBox.className = "form-status error";
  } finally {
    submitButton.disabled = false;
    submitButton.classList.remove("loading");
    buttonText.textContent = "Wyślij zapytanie";
  }
});
