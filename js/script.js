/* ==========================================================================
   OmniAssist Landing Page: JavaScript
   Satu tugas: membuat menu navigasi mobile bisa dibuka dan ditutup.

   Pembagian kerja:
   - HTML  : tombol .nav-toggle dengan aria-expanded dan aria-controls
   - CSS   : menampilkan atau menyembunyikan menu berdasarkan aria-expanded
   - JS    : hanya mengubah nilai aria-expanded (file ini)

   Kelas "js" pada <html> dipasang oleh skrip kecil di <head> (index.html).
   ========================================================================== */

(() => {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const topbar = document.querySelector(".topbar");
  if (!toggle || !topbar) return;

  // Cocok dengan breakpoint desktop di CSS (1024px)
  const desktop = window.matchMedia("(min-width: 1024px)");

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
  const setOpen = (open) => toggle.setAttribute("aria-expanded", String(open));

  // Klik tombol: buka atau tutup
  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Klik tautan menu: tutup, supaya panel tidak menutupi bagian yang dituju
  topbar.addEventListener("click", (event) => {
    if (event.target.closest(".site-nav a")) setOpen(false);
  });

  // Klik di luar header: tutup
  document.addEventListener("click", (event) => {
    if (isOpen() && !event.target.closest(".topbar")) setOpen(false);
  });

  // Tombol Escape: tutup dan kembalikan fokus ke tombol menu
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Layar melebar ke desktop: reset agar tidak tersisa status terbuka
  desktop.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
})();
