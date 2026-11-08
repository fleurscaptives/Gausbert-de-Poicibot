
function gestorePanel() {
  var view = document.querySelector("#view-facsimili");
  if (!view) return;

  view.addEventListener("click", function (e) {
    var path = e.composedPath();

    var mssBtn = path.find(
      el => el instanceof Element && el.matches(".mss_btn")
    );

    if (!mssBtn) return;

    var root = view.shadowRoot;
    if (!root) return;

    var manus = mssBtn.closest(".mss");
    var pages = manus.querySelectorAll(".mss-pages");

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
      var root = view.shadowRoot;

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



function allineaCoblas() {

    var crt = document.getElementById("txt_critico");
    var cst = document.getElementById("txt_cst");

    var bodyCrt = crt?.shadowRoot?.querySelector(".tei-body");
    var bodyCst = cst?.shadowRoot?.querySelector(".tei-body");

    if (!bodyCrt || !bodyCst) return;

    var anchorsCrt = [...bodyCrt.querySelectorAll(
        ".tei-anchor[id^='anchor-crt']"
    )];

    var anchorsCst = [...bodyCst.querySelectorAll(
        ".tei-anchor[id^='anchor-cos']"
    )];

    if (!anchorsCrt.length || anchorsCrt.length !== anchorsCst.length) return;

    // recupera div.tei-l e span.num-versi
    // utile nel caso in cui coblas abbiano numeri di versi non fisso o ineguale
    function recuperaElementi(anchor, nextAnchor) {

        var versi = [];
        var numeri = [];

        let nodo = anchor.nextElementSibling;

        while (nodo && nodo !== nextAnchor) {

            if (nodo.matches(".tei-l.num_versi")) {
                numeri.push(nodo);
            } else if (nodo.matches(".tei-l")) {
                versi.push(nodo);
            }

            nodo = nodo.nextElementSibling;
        }

        return { versi, numeri };
    }


    // recupera primo elemento (verso) visibile nelle coblas
    function primoElem(elementi) {
        return elementi.find(el => el.getClientRects().length > 0);
    }

    var intervalliCrt = anchorsCrt.map((anchor, i) =>
        recuperaElementi(anchor, anchorsCrt[i + 1])
    );

    var intervalliCst = anchorsCst.map((anchor, i) =>
        recuperaElementi(anchor, anchorsCst[i + 1])
    );


    // allineamento tramite metodo getBoundingRect()
    intervalliCst.forEach((elementi, i) => {

        var primoCrt = primoElem(intervalliCrt[i].versi);
        var primoCst = primoElem(elementi.versi);

        if (!primoCrt || !primoCst) return;

        var diff =
            primoCrt.getBoundingClientRect().top -
            primoCst.getBoundingClientRect().top;
        
        // creo array unico per versi e numeri
        [...elementi.versi, ...elementi.numeri].forEach(el => {
            el.style.position = "relative";
            el.style.top = diff + "px";
        });
    });


    // gestione tornadas senza corrispettivo nel testo critico della canzone 14
    cst.shadowRoot.querySelectorAll(".trnd14").forEach((tornada, i) => {
        tornada.style.marginTop = i === 0 ? "23rem" : "1.5rem";
    });

    cst.style.marginBottom = "50px";
}


function aspettaRendering(callback) {

    function controlla() {

        var crt = document.getElementById("txt_critico");
        var cst = document.getElementById("txt_cst");

        var ok =
            crt?.shadowRoot?.querySelector("#anchor-crt1") &&
            cst?.shadowRoot?.querySelector("#anchor-cos1");
        if (ok) {
            requestAnimationFrame(() => {
                requestAnimationFrame(callback);
            });
        } else {
            requestAnimationFrame(controlla);
        }
    }

    controlla();
}

document.addEventListener("DOMContentLoaded", () => {
    aspettaRendering(allineaCoblas);
});

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


function allineaExtra() {

    var extra = document.getElementById("extra_container");
    var view = document.getElementById("txt_cst");

    if (!extra || !view) return;

    var extraView = extra.querySelector("pb-view");

    if (!extraView || !extraView.shadowRoot || !view.shadowRoot) return;

    var anchor = extraView.shadowRoot.querySelector(".lg-corresp");

    if (!anchor) return;

    var cstId = anchor.dataset.corresp;

    var cobla = view.shadowRoot.getElementById("anchor-" + cstId);

    if (!cobla) return;

    var parent = extra.parentElement;

    if (!parent) return;

    var coblaRect = cobla.getBoundingClientRect();
    var parentRect = parent.getBoundingClientRect();
    var viewRect = view.getBoundingClientRect();

    var y = coblaRect.top - parentRect.top;
    var x = viewRect.right - parentRect.left - 20;
    extra.style.top = y  + 200 + "px";
    extra.style.left = x + "px";
}