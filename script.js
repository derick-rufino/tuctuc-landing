/* ══════════════════════════════════════════════════════════════
   Tuctuc — Landing page
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Configuração do APK ──────────────────────────────────────
     Ajuste ao gerar uma nova build. O arquivo .apk deve ficar na
     MESMA pasta deste site (ao lado de index.html) com o nome em
     APK.file — é o que faz o botão baixar na hora, sem redirecionar. */
  var APK = {
    file: "tuctuc.apk",
    version: "0.5.0-beta.1",   // espelha package.json / app.json do app
    size: "~40 MB",
  };

  /* ── Ano no rodapé ── */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Data de hoje (reforça "disponível apenas hoje") ── */
  var today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  document.querySelectorAll("[data-today]").forEach(function (el) {
    el.textContent = " (" + today + ")";
  });

  /* ── Versão / tamanho a partir da config ── */
  document.querySelectorAll("[data-apk-version]").forEach(function (el) {
    el.textContent = "Versão " + APK.version;
  });
  document.querySelectorAll("[data-apk-size]").forEach(function (el) {
    el.textContent = APK.size;
  });

  /* ── Sombra/borda no header ao rolar ── */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Detecção de plataforma ──────────────────────────────────
     Em não-Android, avisa que o APK é para Android (sem bloquear). */
  var ua = navigator.userAgent || "";
  var isAndroid = /android/i.test(ua);
  var isIOS = /iphone|ipad|ipod/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);

  var hint = document.getElementById("downloadHint");
  if (hint) {
    if (isIOS) {
      hint.textContent = "Você está no iOS. O download é um APK para Android — abra esta página no celular Android para instalar.";
      hint.hidden = false;
    } else if (!isAndroid) {
      hint.textContent = "Dica: o arquivo é um APK para Android. Baixe aqui e transfira para o aparelho, ou abra esta página no celular Android.";
      hint.hidden = false;
    }
  }

  /* ── Botão principal → aponta para o APK ── */
  var mainBtn = document.getElementById("downloadBtn");
  if (mainBtn) {
    mainBtn.setAttribute("href", "./" + APK.file);
    mainBtn.setAttribute("download", "Tuctuc-" + APK.version + ".apk");
  }

  /* ── Valida se o APK existe antes de baixar (evita link quebrado
     enquanto o build ainda não foi publicado). Só via http(s). ── */
  if (mainBtn && location.protocol.indexOf("http") === 0) {
    mainBtn.addEventListener("click", function (e) {
      if (mainBtn.dataset.verified === "ok") return;
      e.preventDefault();
      fetch("./" + APK.file, { method: "HEAD" })
        .then(function (res) {
          if (res.ok) {
            mainBtn.dataset.verified = "ok";
            window.location.href = "./" + APK.file;
          } else {
            showUnavailable();
          }
        })
        .catch(function () {
          mainBtn.dataset.verified = "ok";
          window.location.href = "./" + APK.file;
        });
    });
  }

  function showUnavailable() {
    if (!hint) return;
    hint.textContent = "O arquivo do app ainda não está disponível aqui. Tente novamente em instantes.";
    hint.hidden = false;
    hint.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ── Scroll suave para âncoras internas ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
