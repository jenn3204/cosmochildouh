"use strict"; 

showLoader(); 
window.addEventListener("DOMContentLoaded", start); 

let brugere = []; 

function showLoader() {

    let pageState = document.readyState; 
if (pageState == "loading") {
    console.log("HEJ"); 
} else {
    console.log("NEJ"); 
}
}

function start() {

    if (localStorage.logind == "yes") {
        location.href = "/forside.html"
    } else {
        showLoader(); 
    loadBrugere(); 

    document.querySelector("#logind_knap").addEventListener("click", tjekBrugere);

    }
}

async function loadBrugere() {
    const response = await fetch("brugere.json");
    let jsonData  = await response.json();

    brugere = jsonData; 
  console.log(brugere); 
  tjekBrugere(); 
}

function tjekBrugere() {
    let brugerValue = document.querySelector("#brugernavn_input").value; 
    let kodeValue = document.querySelector("#kodeord_input").value;
    console.log(brugerValue, kodeValue); 
    
    brugere.forEach(bruger => {
        if (bruger.brugernavn == brugerValue && bruger.kodeord == kodeValue) {
            console.log("du er logget ind"); 
            location.href = "/forside.html"; 
            localStorage.setItem("logind", "yes");
        } else {
            console.log("du er ikke logget ind"); 
    
        }
    })
}