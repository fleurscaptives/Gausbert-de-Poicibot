function gestorePanel() {

    document.addEventListener("click", function (e) {

        // manoscritto
        if (e.target.matches(".mss_btn")) {

            var id = e.target.textContent.trim();

            document.querySelectorAll(".mss_btn").forEach(function (button) {
                button.classList.remove("active");
            });

            document.querySelectorAll(".pgg_btn").forEach(function (button) {
                button.classList.remove("active");
            });

            document.querySelectorAll(".mss-pages").forEach(function (pages) {
                pages.classList.remove("active");
            });

            document.getElementById("current-image").src = "";

            e.target.classList.add("active");

            var pages = document.querySelector(
                '.mss-pages[data-mss="' + id + '"]'
            );
            
        // folia
        if (pages) {

                pages.classList.add("active");

                // primo folium
                var pg1 = pages.querySelector(".pgg_btn");

                if (pg1) {

                    pg1.classList.add("active");

                    document.getElementById("current-image").src =
                        pg1.dataset.image;
                }
            }
        }


        // cambio folia
        if (e.target.matches(".pgg_btn")) {

            var image = document.getElementById("current-image");

            image.src = e.target.dataset.image;

            document.querySelectorAll(".pgg_btn").forEach(function (button) {
                button.classList.remove("active");
            });

            e.target.classList.add("active");
        }

    });
}

document.addEventListener("DOMContentLoaded", gestorePanel);


function showPanel() {

    var openButton = document.querySelector("#apri_mss");
    var closeButton = document.querySelector("#chiudi_mss");
    var panel = document.querySelector("#mss-panel");

    if (!openButton || !closeButton || !panel) return;

    panel.classList.add("nascosto");

    openButton.addEventListener("click", () => {
        panel.classList.remove("nascosto");
    });
    

    closeButton.addEventListener("click", () => {

        panel.classList.add("nascosto");

        // reset
        document.querySelectorAll(".mss_btn")
            .forEach(btn => btn.classList.remove("active"));
            
        document.querySelectorAll(".pgg_btn")
            .forEach(btn => btn.classList.remove("active"));

        document.querySelectorAll(".mss-pages")
            .forEach(pages => pages.classList.remove("active"));

        document.querySelector("#current-image").src = "";
    });
}

document.addEventListener("DOMContentLoaded", showPanel);


function toggleDifferenze() {

    var critico = document.querySelector("#txt_critico");
    var costellazione = document.querySelector("#txt_cst");

    if (!critico || !costellazione) return;

    var rootCritico = critico.shadowRoot;
    var rootCostellazione = costellazione.shadowRoot;

    if (!rootCritico || !rootCostellazione) return;

    var diff = rootCritico.querySelectorAll(".diff");
    var diffCst = rootCostellazione.querySelectorAll(".diff_cst");

    diff.forEach(element => {
        element.classList.toggle("diff-attivo");
    });

    diffCst.forEach(element => {
        element.classList.toggle("diff_cst-attivo");
    });

    var button = document.querySelector("#btn_diff");

    if (button) {
        button.classList.toggle("attivo");
    }
}


function initDifferenze() {

    var button = document.querySelector("#btn_diff");

    if (!button) return;

    button.addEventListener("click", toggleDifferenze);
}


document.addEventListener("DOMContentLoaded", initDifferenze);


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


function allineaExtra() {

    var extra = document.getElementById("extra_container");
    var view = document.getElementById("txt_cst");

    if (!extra || !view) return;

    if (!view.shadowRoot) return;

    var cobla = view.shadowRoot.querySelector("#extra");

    if (!cobla) return;

    var parent = extra.parentElement;

    if (!parent) return;

    var coblaRect = cobla.getBoundingClientRect();
    var parentRect = parent.getBoundingClientRect();

    var y = coblaRect.top - parentRect.top;
    var x = coblaRect.right - parentRect.left + 40;

    extra.style.top = y + "px";
    extra.style.left = x + "px";
}

function allineaCoblas() { 
 
    var critView = document.getElementById("txt_critico"); 
    var cstView = document.getElementById("txt_cst"); 
 
    if (!critView || !cstView) return; 
    if (!critView.shadowRoot || !cstView.shadowRoot) return; 
 
    var coblasCrit = critView.shadowRoot.querySelectorAll(".tei-lg"); 
    var coblasCst = cstView.shadowRoot.querySelectorAll(".tei-lg"); 
 
    // utile nel caso di 173.14, che include due tornadas non presenti nel testo critico
    var numeroCoblas = Math.min(coblasCrit.length, coblasCst.length);
 
    // azzero i margin-top solo delle coblas del testo di costellazione che hanno un corrispondente nel testo critico
    for (var i = 0; i < numeroCoblas; i++) { 
        coblasCst[i].style.marginTop = "0px"; 
    } 

    for (var i = 0; i < numeroCoblas; i++) { 
 
        var critRect = coblasCrit[i].getBoundingClientRect(); 
        var cstRect = coblasCst[i].getBoundingClientRect(); 
 
        var differenza = critRect.top - cstRect.top; 
 
        coblasCst[i].style.marginTop = differenza + "px"; 
    } 
}

function creaCollapseTraduzioni() {

    var txtCritico = document.querySelector("#txt_critico");
    var traduzione = document.querySelector(".traduzione pb-view");

    if (!txtCritico || !traduzione) {
        return;
    }

    var criticoRoot = txtCritico.shadowRoot;
    var tradRoot = traduzione.shadowRoot;

    if (!criticoRoot || !tradRoot) {
        return;
    }

    var coblas = criticoRoot.querySelectorAll(".tei-lg");

    var tradContent = tradRoot.querySelector(".content");

    if (!tradContent) {
        return;
    }

    // trovo label
    var numerazioni = tradContent.querySelectorAll(".tei-label.numerazione");

    coblas.forEach((cobla, i) => {

        var numerazione = numerazioni[i];

        if (!numerazione) {
            return;
        }

        var wrapper = document.createElement("div");
        wrapper.className = "traduzione-cobla";

        var collapse = document.createElement("pb-collapse");

        var trigger = document.createElement("div");
        trigger.setAttribute("slot", "collapse-trigger");
        trigger.className = "trad-collapse";
        trigger.innerHTML = "<h4>Traduzione</h4>";

        var content = document.createElement("div");
        content.setAttribute("slot", "collapse-content");
        content.className = "trad-content";

        // estraggo il nodo che include gli elementi della cobla[i] fino alla label successiva
        let nodo = numerazione.nextSibling;

        while (nodo && nodo !== numerazioni[i + 1]) {

            // clono il nodo
            content.appendChild(nodo.cloneNode(true));

            nodo = nodo.nextSibling;
        }

        collapse.appendChild(trigger);
        collapse.appendChild(content);

        wrapper.appendChild(collapse);
        
        // nodo clonato inserito dopo la cobla
        cobla.after(wrapper);
    });
}

function inizializzaTraduzioni() {

    var txtCritico = document.getElementById("txt_critico");
    var traduzione = document.querySelector(".traduzione pb-view");

    if (!txtCritico || !traduzione) return;
    if (!txtCritico.shadowRoot || !traduzione.shadowRoot) return;

    // evita doppi collapse
    if (txtCritico.shadowRoot.querySelector(".traduzione-cobla")) {
        return;
    }

    creaCollapseTraduzioni();

    allineaCoblas();

    osservaResize();
}

function osservaResize() {

    var txtCritico = document.getElementById("txt_critico");

    if (!txtCritico || !txtCritico.shadowRoot) return;

    var observer = new ResizeObserver(function() {
        // funzione di allineamento richiamata qualora il layout sia modificato
        allineaCoblas();

    });
    // host = <pb-view id="txt_critico">; l'elemento osservato che contiene lo shadow DOM del testo critico
    observer.observe(txtCritico.shadowRoot.host);
}

window.addEventListener("DOMContentLoaded", function() {

    var txtCritico = document.getElementById("txt_critico");

    if (!txtCritico) return;
    
    // il testo critico viene caricato o aggiornato
    txtCritico.addEventListener("pb-update", function() {

        inizializzaTraduzioni();

    });

});
