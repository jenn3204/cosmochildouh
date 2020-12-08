"use strict"; 

showLoader(); 
window.addEventListener("DOMContentLoaded", start); 

let brugere = []; 
let indhold = []; 
let txt = []; 

let brugereData = "brugere.json"; 
let txtData = "txt.json"; 
let indholdData = "indhold.json"; 

const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get("id");

function showLoader() {

    let pageState = document.readyState; 
if (pageState == "loading") {
    console.log("HEJ"); 
    document.querySelector("body").classList.add("hide"); 
} else {
    console.log("NEJ"); 
    document.querySelector("body").classList.remove("hide"); 
}
}

function start() {

        showLoader(); 

        //index.html

        if (document.querySelector("#logind_knap")) {

            if (sessionStorage.logind == "yes") {
                location.href = "/forside.html"; 
            }

            document.querySelector("#kodeord_input").addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    document.querySelector("#logind_knap").click(); 
                }
            }); 

            document.querySelector("#logind_knap").addEventListener("click", () => {
                hentData(brugereData, tjekBrugere); 
            });

            
        }

        //forside.html 

        if (document.querySelector("#hjem_knap")) {
            document.querySelector("#hjem_knap").addEventListener("click", () => {
                sessionStorage.setItem("harsetintro", "yes"); 
                location.href = "/forside.html"; 
            })
        }

        if (document.querySelector("#forside_main")) {
            if (sessionStorage.harsetintro == "yes") {
                visValg(); 
            }
        }
        

        if (document.querySelector("#tb_tekst")) {
            forsideStart(); 
            hentData(txtData, visTbTxt); 
            document.querySelector("#talebobbel").classList.add("zoomind"); 
            document.querySelector("#tb_indhold").classList.add("fadein_slow"); 
            
        }

        if (document.querySelector("#logud_knap")) {
            document.querySelector("#logud_knap").addEventListener("click", logUd); 
        }

        // index.html / log ud

        if (sessionStorage.logind == "no") {
            document.querySelector("#logind_section").classList.add("hide"); 
            document.querySelector("#logud_section").classList.remove("hide");  

            document.querySelector("#logindigen_knap").addEventListener("click", () => {
                document.querySelector("#logind_section").classList.remove("hide"); 
            document.querySelector("#logud_section").classList.add("hide");
            })

            document.querySelector("#appstore_knap").addEventListener("click", () => {
                window.open("https://apps.apple.com/dk/app/cosmo-child/id1481464627?l=da"); 
            })
        }

        //indhold.html 

        

        if (document.querySelector("#indhold_main")) {

            
            
            startIndhold(); 
        }

       
    
}

async function hentData(json, callback) {
    const response = await fetch(json);
    let jsonData  = await response.json();

    callback(jsonData); 

}

function tjekBrugere(jsonData) {

    brugere = jsonData; 
    console.log(brugere); 

    let brugerValue = document.querySelector("#brugernavn_input").value; 
    let kodeValue = document.querySelector("#kodeord_input").value;
    console.log(brugerValue, kodeValue); 
    
    brugere.forEach(bruger => {
        if (bruger.brugernavn == brugerValue && bruger.kodeord == kodeValue) {
            console.log("du er logget ind"); 
            location.href = "/forside.html"; 
            sessionStorage.setItem("logind", "yes");
        } else {
            console.log("du er ikke logget ind"); 

            setTimeout(() => {
                document.querySelector("#advarsel").classList.remove("hide"); 
                document.querySelector("#brugernavn_input").value = ""; 
                document.querySelector("#kodeord_input").value = ""; 
                document.querySelector("#brugernavn_input").classList.add("not_valid"); 
                document.querySelector("#kodeord_input").classList.add("not_valid");
    
                document.querySelector("#brugernavn_input").addEventListener("keyup", () => {
                    document.querySelector("#brugernavn_input").classList.remove("not_valid"); 
                    document.querySelector("#advarsel").classList.add("hide"); 
                })
    
                document.querySelector("#kodeord_input").addEventListener("keyup", () => {
                    document.querySelector("#kodeord_input").classList.remove("not_valid"); 
                })
                
            }, 100);

        }
    })
}



function forsideStart() {
    console.log(sessionStorage); 
    let data = sessionStorage.getItem("logind")
    console.log(data); 
    if (sessionStorage.logind == "yes") {
console.log("yesyes")
} else {
location.href = "/index.html"
}
}

function visTbTxt(jsonData) {
    document.querySelector("#tb_tekst").textContent = jsonData[0].velkommen; 
    console.log(jsonData); 

    document.querySelector("#videre_knap").addEventListener("click", () => {
        document.querySelector("#talebobbel").classList.add("zoomud");
        document.querySelector("#talebobbel").addEventListener("animationend", () => {
            document.querySelector("#talebobbel").classList.add("hide");
            visValg(); 
            
        })
        
    }); 

}

function visValg() {
    
    document.querySelector("#talebobbel").classList.add("hide");
    document.querySelector("#valg_section").classList.remove("hide"); 
        document.querySelector("#valg_section").classList.add("fadein"); 
    document.querySelector("#valg_section").classList.add("valg_section"); 

    clickValg();

    
    
}

function logUd() {
    location.href = "/index.html"; 
    sessionStorage.setItem("logind", "no");
    sessionStorage.setItem("harsetintro", "no");    
}

function clickValg() {
    document.querySelectorAll("#valg_section button").forEach(button => {
        button.addEventListener("click", () => {
            visIndhold(button.value); 
        });
    })
}

function visIndhold(value) {
    location.href = `indhold.html?id=${value}`; 
}

function startIndhold() {
        hentData(indholdData, indholdHentet);  
}

function indholdHentet(data) {
    indhold = data; 
    const skabelon = document.querySelector("#article3 template").content;
    const liste = document.querySelector("#liste"); 

    if (param == "alle") {
        visAlle();
    }

    indhold.forEach(ind => {
        if (ind.situation == param || ind.situation2 == param || ind.kategori == param) {
            console.log(ind); 

            if (ind.kategori == param) {
                document.querySelector("#article1").classList.add("hide"); 
            }

            document.querySelector("#indhold_body").classList.add(`${ind.kategori}` + "_body"); 
            document.querySelector("#indhold_main").classList.add(`${ind.kategori}` + "_main"); 

            document.querySelector("#article2 .overskrift h2").textContent = ind.kategori[0].toUpperCase() + ind.kategori.slice(1); 
            document.querySelector("#article2 .overskrift img").src = ind.ikon; 
            document.querySelector("#article2 p").textContent = ind.beskrivelse; 

            document.querySelector("#article3 .overskrift h2").textContent = ind.overskrift; 
            document.querySelector("#article3 .overskrift img").src = ind.ikon; 

            ind.filer.forEach(fil => {
                const klon = skabelon.cloneNode(true); 

                klon.querySelector("#titel").textContent = fil.titel; 
                klon.querySelector("#kunstner").textContent = fil.kunstner; 
                klon.querySelector(".play_knap").setAttribute("id", `${fil.titel}`); 

                liste.appendChild(klon); 
            })

            document.querySelectorAll(".play_knap").forEach(knap => {
                knap.addEventListener("click", (e) => {
                    console.log(knap.id);
                    visPopup(knap.id, ind.ikon);  
                })
            })
            
        }
    })

    hentInfo();

}

function hentInfo() {
    hentData(txtData, visInfo);
}

function visInfo(data) {
    txt = data; 

    txt.forEach(t => {
        if (t.situation == param) {
            document.querySelector("#article1 h2").textContent = t.overskrift; 
            document.querySelector("#article1 p").textContent = t.brødtekst; 
        }
    })
}

function visPopup(knap, ikon) {
    console.log("er den her?" + indhold); 
    document.querySelector("#pop_up").classList.remove("hide"); 

    indhold.forEach(ind => {
        console.log(ind.filer); 

        ind.filer.forEach(fil => {
            if (fil.titel == knap) {
                console.log(fil.titel); 

                document.querySelector("#pop_up img").src = ikon; 
                document.querySelector("#pop_up h3").textContent = fil.titel; 
                document.querySelector("#pop_up p").textContent = fil.kunstner; 

            }
        })
    })

    document.querySelector("#luk_popup").addEventListener("click", () => {
        document.querySelector("#pop_up").classList.add("hide"); 
    })
}

function visAlle() {
    document.querySelector("#indhold_container").classList.add("hide"); 
    document.querySelector("#alle").classList.remove("hide"); 
    document.querySelector("#indhold_main").classList.add("alle_main"); 

    const skabelonto = document.querySelector("#alle template").content; 

    indhold.forEach(type => {
        const klonto = skabelonto.cloneNode(true); 

        console.log(type.kategori + type.ikon + type.overskrift); 

        skabelonto.querySelector("img").src = type.ikon; 
        skabelonto.querySelector("img").alt = type.kategori;
        skabelonto.querySelector("img").id = type.kategori;
        skabelonto.querySelector("h3").textContent = type.overskrift; 

        document.querySelector("#liste_alle").appendChild(klonto); 
    })

    document.querySelectorAll("#alle img").forEach(img => {
        img.addEventListener("click", () => {
            location.href = `/indhold.html?id=${img.id}`; 
        })
    })
}
