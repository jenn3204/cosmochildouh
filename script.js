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

    // if (localStorage.logind == "yes") {
    //     location.href = "/forside.html"
    // }
        showLoader(); 
    loadBrugere(); 

    document.querySelector("#logind_knap").addEventListener("click", tjekBrugere);

    
}

async function loadBrugere() {
    const response = await fetch("brugere.json");
    let jsonData  = await response.json();

    brugere = jsonData; 
  console.log(brugere); 
}

function tjekBrugere() {
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