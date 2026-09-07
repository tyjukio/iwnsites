
document.querySelector(".menu-btn")?.addEventListener("click", () => {
  document.querySelector(".nav-links")?.classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => {
  document.querySelector(".nav-links")?.classList.remove("open");
}));
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior:"smooth"}); }
    }
  });
});
const obs = new IntersectionObserver(entries => entries.forEach(e => {
  if(e.isIntersecting){ e.target.classList.add("show"); obs.unobserve(e.target); }
}), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
