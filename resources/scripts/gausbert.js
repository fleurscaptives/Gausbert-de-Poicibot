
function gestorePanel() {
  const view = document.querySelector("#view-facsimili");
  if (!view) return;

  view.addEventListener("click", function (e) {
    var path = e.composedPath();

    var mssBtn = path.find(
      el => el instanceof Element && el.matches(".mss_btn")
    );

    if (!mssBtn) return;

    var root = view.shadowRoot;
    if (!root) return;

    var manuscript = mssBtn.closest(".mss");
    var pages = manuscript.querySelectorAll(".mss-pages");

    root.querySelectorAll(
      ".mss_btn, pb-facs-link.pgg_btn, .mss-pages"
    ).forEach(el => el.classList.remove("active")); 

    mssBtn.classList.add("active");

    pages.forEach(group => group.classList.add("active"));
  });
}


function showPanel() {
  var openBttn = document.querySelector("#apri_mss");
  var panel = document.querySelector("#mss-panel");
  var view = document.querySelector("#view-facsimili");

  if (!openBttn || !panel) return;

  panel.classList.add("nascosto");

  openBttn.addEventListener("click", () => {
    var hiddn = panel.classList.contains("nascosto");

    panel.classList.toggle("nascosto", !hiddn);
    openBttn.classList.toggle("active", hiddn);

    if (!hiddn) {
      const root = view.shadowRoot;

      root.querySelectorAll(
        ".mss_btn, pb-facs-link.pgg_btn, .mss-pages"
      ).forEach(el => el.classList.remove("active"));
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  gestorePanel();
  showPanel();
});


function toggleDifferenze() {

    var critico = document.querySelector("#txt_critico");

    if (!critico || !critico.shadowRoot) return;

    var diff = critico.shadowRoot.querySelectorAll(".diff");

    diff.forEach(function(element) {
        element.classList.toggle("diff-attivo");
    });

    var button = document.querySelector("#btn_diff");

    if (button) {
        button.classList.toggle("attivo");
    }
}


function collegaDiff() {

    var critico = document.querySelector("#txt_critico");
    var costellazione = document.querySelector("#txt_cst");
    var button = document.querySelector("#btn_diff");

    if (!critico || !costellazione || !button) return;

    var rootCritico = critico.shadowRoot;
    var rootCostellazione = costellazione.shadowRoot;

    if (!rootCritico || !rootCostellazione) return;

    rootCritico.querySelectorAll(".diff").forEach(function(locus) {

        locus.addEventListener("mouseenter", function() {

            if (!button.classList.contains("attivo")) return;

            var id = locus.getAttribute("data-corresp");

            if (!id) return;

            var corrisp = rootCostellazione.querySelector(
                "#" + id
            );

            if (corrisp) {
                corrisp.classList.add("diff_cst-attivo");
            }
        });

        locus.addEventListener("mouseleave", function() {

            var id = locus.getAttribute("data-corresp");

            if (!id) return;

            var corrisp = rootCostellazione.querySelector(
                "#" + id
            );

            if (corrisp) {
                corrisp.classList.remove("diff_cst-attivo");
            }
        });
    });
}


function initDiff() {

    var button = document.querySelector("#btn_diff");

    if (button) {
        button.addEventListener("click", toggleDifferenze);
    }

    var critico = document.querySelector("#txt_critico");

    if (critico) {
        critico.addEventListener("pb-update", collegaDiff);
    }
 }

document.addEventListener("DOMContentLoaded", initDiff);


function toggleLoci() {
    var apparato0 = document.querySelector("#app_cst");
    var apparato1 = document.querySelector("#app_crt");
    var button = document.querySelector("#btn_loci");

    var rootApp0 = apparato0.shadowRoot;
    var rootApp1 = apparato1.shadowRoot;

    var loci0 = rootApp0.querySelectorAll(".loci");
    var loci1 = rootApp1.querySelectorAll(".loci");

    loci0.forEach(element => {
        element.classList.toggle("loci-attivo");
    });

    loci1.forEach(element => {
        element.classList.toggle("loci-attivo");
    });

    button.classList.toggle("attivo");
}


function initLoci() {
    var button = document.querySelector("#btn_loci");
    
    button.addEventListener("click", toggleLoci);
}


document.addEventListener("DOMContentLoaded", initLoci);


function toggleGlos() {
    var critico = document.querySelector("#txt_critico");
    var button = document.querySelector("#btn_glos");

    var rootCritico = critico.shadowRoot;


    var glos = rootCritico.querySelectorAll(".glossario");

    glos.forEach(element => {
        element.classList.toggle("glossario-attivo");
    });

    button.classList.toggle("attivo");
}


function initGlos() {
    var button = document.querySelector("#btn_glos");
    
    button.addEventListener("click", toggleGlos);
}


document.addEventListener("DOMContentLoaded", initGlos);


function toggleExtra() {

    var check = document.getElementById("xtra");
    var txt = document.getElementById("extra_container");

    if (!check || !txt) return;

    txt.style.display = "none";

    check.addEventListener("change", function () {

        if (check.checked) {

            txt.style.display = "block";

            allineaExtra();

        } else {

            txt.style.display = "none";

        }

    });
}

document.addEventListener("DOMContentLoaded", toggleExtra);


function allineaCoblas() {
    var crt = document.getElementById("txt_critico");
    var cst = document.getElementById("txt_cst");

    if (!crt.shadowRoot || !cst.shadowRoot) return;

    var coblas = [];

    crt.shadowRoot.querySelectorAll(".lg-corresp").forEach(anchor => {
        var cstId = anchor.dataset.corresp;
        var coblaCrt = anchor.closest(".tei-lg");
        var coblaCst = cst.shadowRoot.getElementById(cstId);

        if (!coblaCrt || !coblaCst) return;
        if (coblaCst.classList.contains("trnd14")) return;

        coblaCst.style.position = "relative";
        coblaCst.style.top =
            coblaCrt.getBoundingClientRect().top -
            coblaCst.getBoundingClientRect().top + "px";

        coblas.push(coblaCst);
    });

    var tornadas = cst.shadowRoot.querySelectorAll(".tei-lg.trnd14");

    if (coblas.length > 0 && tornadas.length > 0) {
       var ultimaCobla = coblas[coblas.length - 1];

        var bordo = ultimaCobla.getBoundingClientRect().bottom;

        tornadas.forEach(tornada => {
            tornada.style.position = "relative";
            tornada.style.top = "0px";

            var diff =
                bordo - tornada.getBoundingClientRect().top + 30;

            tornada.style.top = diff + "px";

            bordo = tornada.getBoundingClientRect().bottom;
        });

        var ultimaTornada = tornadas[tornadas.length - 1];
        var bordoTornada = ultimaTornada.getBoundingClientRect().bottom;
        var bordoCst = cst.getBoundingClientRect().bottom;

        var spazio = bordoTornada - bordoCst;

        cst.style.marginBottom =
            Math.max(0, spazio + 30) + "px";
    }
}


function aspettaRendering(callback) {
    var crt = document.getElementById("txt_critico");
    var cst = document.getElementById("txt_cst");

    if (
        crt.shadowRoot.querySelector(".lg-corresp") &&
        cst.shadowRoot.querySelector(".tei-lg")
    ) {
        requestAnimationFrame(() => {
            callback();
        });
    } else {
        requestAnimationFrame(() => aspettaRendering(callback));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    aspettaRendering(allineaCoblas);
});

function allineaExtra() {

    var extra = document.getElementById("extra_container");
    var view = document.getElementById("txt_cst");

    if (!extra || !view) return;

    var extraView = extra.querySelector("pb-view");

    var anchor = extraView.shadowRoot.querySelector(".lg-corresp");

    var cstId = anchor.dataset.corresp;

    var cobla = view.shadowRoot.querySelector(
        "#" + cstId
    );

    var parent = extra.parentElement;

    if (!parent) return;

    var coblaRect = cobla.getBoundingClientRect();
    var parentRect = parent.getBoundingClientRect();

    var y = coblaRect.top - parentRect.top;
    var x = coblaRect.right - parentRect.left + 40;

    extra.style.top = y + "px";
    extra.style.left = x + "px";
}