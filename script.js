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
const situation = urlParams.get("id");

function showLoader() {

    let pageState = document.readyState; 
if (pageState == "loading") {
    console.log("HEJ"); 
} else {
    console.log("NEJ"); 
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

        if (sessionStorage.harsetintro == "yes") {
            visValg(); 
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

    indhold.forEach(ind => {
        if (ind.situation == situation || ind.situation2 == situation) {
            console.log(ind); 

            document.querySelector("#article2 .overskrift h2").textContent = ind.kategori[0].toUpperCase() + ind.kategori.slice(1); 
            document.querySelector("#article2 .overskrift img").src = ind.ikon; 
            document.querySelector("#article2 p").textContent = ind.beskrivelse; 

            document.querySelector("#article3 .overskrift h2").textContent = ind.overskrift; 
            document.querySelector("#article3 .overskrift img").src = ind.ikon; 

            document.querySelector("#titel1").textContent = ind.titel1; 
            document.querySelector("#kunstner1").textContent = ind.kunstner1; 

            document.querySelector("#titel2").textContent = ind.titel2; 
            document.querySelector("#kunstner2").textContent = ind.kunstner2; 

            document.querySelector("#titel3").textContent = ind.titel3; 
            document.querySelector("#kunstner3").textContent = ind.kunstner3; 

            
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
        if (t.situation == situation) {
            document.querySelector("#article1 h2").textContent = t.overskrift; 
            document.querySelector("#article1 p").textContent = t.brødtekst; 
        }
    })
}