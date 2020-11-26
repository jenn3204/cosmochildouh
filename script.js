"use strict"; 

showLoader(); 
window.addEventListener("DOMContentLoaded", start); 

let brugere = []; 

let brugereData = "brugere.json"; 
let txtData = "txt.json"; 

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

        if (document.querySelector("#logind_knap")) {
            document.querySelector("#logind_knap").addEventListener("click", () => {
                hentData(brugereData, tjekBrugere); 
            });
        }

        

        if (document.querySelector("#tb_tekst")) {
            forsideStart(); 
            hentData(txtData, visTbTxt); 
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

    document.querySelector("#videre_knap").addEventListener("click", visValg); 

}

function visValg() {
    document.querySelector("#talebobbel").classList.add("hide");
    document.querySelector("#valg_section").classList.remove("hide"); 
}