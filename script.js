"use strict"; 

showLoader(); 
window.addEventListener("DOMContentLoaded", start); 
window.addEventListener("resize", checkScreensize); 

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


        checkScreensize();
        showLoader(); 

        //index.html

        if (document.querySelector("#logind_knap")) {

            document.querySelector("#logind_section").classList.remove("hide");
            document.querySelector("#logind_section").classList.add("fadeinup"); 

            if (sessionStorage.logind == "yes") {
                location.href = "forside.html"; 
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
                location.href = "forside.html"; 
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

            document.querySelector("#august_forside").classList.add("fadeinx"); 
            
        }

        if (document.querySelector("#logud_knap")) {
            document.querySelector("#logud_knap").addEventListener("click", logUd); 
        }

        if (document.querySelector("#om_knap")) {
            document.querySelector("#om_knap").addEventListener("click", visOm); 
        }

        // index.html / log ud

        if (sessionStorage.logind == "no") {
            document.querySelector("#logind_section").classList.add("hide"); 
            document.querySelector("#logud_section").classList.remove("hide");  
            document.querySelector("#logud_section").classList.add("fadeinup");

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

            document.querySelector("#indhold_container").classList.add("fadein"); 
            
            startIndhold(); 
        }


        // Om

        if (document.querySelector("#om_main")) {
           
            startOm();
        }

       
    
}

async function hentData(json, callback) {
    const response = await fetch(json);
    let jsonData  = await response.json();

    callback(jsonData); 

}

function checkScreensize() {
    if (document.querySelector("header")) {
        if (window.innerWidth > "600") {
            document.querySelector("header").classList = ""; 
        } else {
            if (param) {
                if (param == "musik" || param == "inden" || param == "under") {
                    document.querySelector("header").classList.add("musik_body"); 
                } else if (param == "akupressur" || param == "efter") {
                    document.querySelector("header").classList.add("akupressur_body"); 
                } else if (param == "meditation" || param == "hjemme") {
                    document.querySelector("header").classList.add("meditation_body"); 
                } else if (param == "alle") {
                    document.querySelector("header").classList.add("alle_body"); 
                }
            } else {
                document.querySelector("header").classList.add("alle_body"); 
            }
            
        }
    }
   

    if (document.querySelector("#talebobbel")) {
        if (window.innerWidth > "700") {
            document.querySelector("#talebobbel").src = "img/talebobbel_side.png"; 
        } else if (window.innerWidth < "700") {
            document.querySelector("#talebobbel").src = "img/talebobbel_ned.png"; 
        }
    }
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
            location.href = "forside.html"; 
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
location.href = "index.html"
}
}

function visTbTxt(jsonData) {
    document.querySelector("#tb_tekst").textContent = jsonData[0].velkommen; 
    console.log(jsonData); 

    document.querySelector("#videre_knap").addEventListener("click", () => {
        document.querySelector("#tb_tekst").textContent = jsonData[0].velkommen2; 

        document.querySelector("#videre_knap").addEventListener("click", () => {
            document.querySelector("#talebobbel").classList.add("zoomud");
            document.querySelector("#tb_indhold").classList.add("hide");
            document.querySelector("#august_forside").classList.add("fadeoutx")

            document.querySelector("#august_forside").addEventListener("animationend", () => {
                document.querySelector("#august_forside").classList.add("hide")
            })
            
            document.querySelector("#talebobbel").addEventListener("animationend", () => {
                document.querySelector("#talebobbel").classList.add("hide");
                
                
                visValg(); 
        })

       
            
        })
        
    }); 

}

function visValg() {
    
    document.querySelector("#august_forside").classList.add("hide"); 

    document.querySelector("#talebobbel").classList.add("hide");
    document.querySelector("#tb_indhold").classList.add("hide");
    document.querySelector("#valg_section").classList.remove("hide"); 
        document.querySelector("#valg_section").classList.add("fadein"); 
    document.querySelector("#valg_section").classList.add("valg_section"); 

    clickValg();
    
}

function logUd() {
    location.href = "index.html"; 
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

    let data = sessionStorage.getItem("logind")
    console.log(data); 
    if (sessionStorage.logind == "yes") {
console.log("yesyes")
hentData(indholdData, indholdHentet);  
} else {
location.href = "index.html"
}
        
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

            document.querySelector("#article3 .overskrift h2").textContent = ind.type; 
            document.querySelector("#article3 .overskrift img").src = ind.ikon; 

            ind.filer.forEach(fil => {
                const klon = skabelon.cloneNode(true); 

                klon.querySelector("#titel").textContent = fil.titel; 
                klon.querySelector("#kunstner").textContent = fil.kunstner; 
                klon.querySelector(".indhold_box").setAttribute("id", `${fil.titel}`); 
                klon.querySelector(".tid").textContent = fil.tid;

                liste.appendChild(klon); 
            })

            document.querySelectorAll(".indhold_box").forEach(knap => {
                knap.addEventListener("click", (e) => {
                    console.log(knap.id);
                    visPopup(knap.id, ind.ikon, ind.kategori);  
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
            document.querySelector("#article1 h1").textContent = t.overskrift; 
            document.querySelector("#article1 p").textContent = t.brødtekst; 
        }
    })
}

function visPopup(knap, ikon, kategori) {
    console.log("er den her?" + indhold); 
    document.querySelector("#pop_up").classList.remove("hide"); 
    document.querySelector("#pop_up .audio_line").style.width = "0px"; 

    let audioElement = document.createElement("AUDIO"); 
    audioElement.id = "audio"; 
    document.querySelector("#popup_article").appendChild(audioElement); 
    const audio = document.querySelector("#audio"); 

    

    indhold.forEach(ind => {
        console.log(ind.filer); 

        ind.filer.forEach(fil => {
            if (fil.titel == knap) {
                console.log(fil.titel); 

                document.querySelector("#pop_up img").src = ikon; 
                document.querySelector("#pop_up h3").textContent = fil.titel; 
                document.querySelector("#pop_up p").textContent = fil.kunstner; 
                document.querySelector("#pop_up .audio_full").textContent = fil.tid; 
                document.querySelector("#audio").src = fil.url; 

                document.querySelector("#popup_article").classList.add(`${kategori}` + "_body"); 

            }
        })
    })

    

    document.querySelector("#pop_up .audio_knap").classList.add("play_audio"); 
    document.querySelector("#pop_up .audio_knap").classList.remove("pause_audio"); 
    document.querySelector("#pop_up .audio_knap").addEventListener("click", () => {
        document.querySelector("#pop_up .audio_knap").classList.toggle("pause_audio"); 
        if (audio.duration > 0 && !audio.paused) {
            audio.pause(); 
        } else {
            audio.play(); 
        }
        
        
    }) 

    audio.addEventListener("timeupdate", () => {
        let m = parseInt(audio.currentTime % 60); 
        document.querySelector("#pop_up .audio_current").textContent = "00:0" + m;  

        if (window.innerWidth < "630") {
            let bredde = audio.currentTime / audio.duration * 80 + "vw"; 
            document.querySelector("#pop_up .audio_line").style.width = bredde; 
        } else {
            let bredde = audio.currentTime / audio.duration * 500 + "px"; 
            document.querySelector("#pop_up .audio_line").style.width = bredde; 
        }

        
    })


    document.querySelector("#luk_popup").addEventListener("click", () => {
        // location.reload(); 

        document.querySelector("#pop_up").classList.add("hide"); 
        document.querySelector("#pop_up .audio_line").style.width = "0px"; 
        audio.currentTime  = 0;  
        audio.pause(); 
        
    })
}

function visAlle() {
    document.querySelector("#indhold_container").classList.add("hide"); 
    document.querySelector("#alle").classList.remove("hide"); 
    document.querySelector("#indhold_main").classList.add("alle_main"); 
    document.querySelector("body").classList.add("alle_body")

    const skabelonto = document.querySelector("#alle template").content; 

    indhold.forEach(type => {
        const klonto = skabelonto.cloneNode(true); 

        console.log(type.kategori + type.ikon + type.overskrift); 

        klonto.querySelector("img").src = type.ikon; 
        klonto.querySelector("img").alt = type.kategori;
        klonto.querySelector("img").id = type.kategori;
        klonto.querySelector("h3").textContent = type.kategori[0].toUpperCase() + type.kategori.slice(1); 

        document.querySelector("#liste_alle").appendChild(klonto); 
    })

    document.querySelectorAll("#alle img").forEach(img => {
        img.addEventListener("click", () => {
            location.href = `indhold.html?id=${img.id}`; 
        })
    })
}

function visOm() {
    location.href = "om.html"; 
}

function startOm() {

    if (sessionStorage.logind == "yes") {
        hentData(txtData, visOmIndhold); 
    } else {
        location.href = "index.html"
    }

    
}

function visOmIndhold(data) {
    txt = data; 

    document.querySelector("#stort_logo").classList.remove("hide"); 
    document.querySelector("#om_cc").classList.add("fadein"); 
    document.querySelector("#om1").textContent = txt[5].beskrivelse1; 
    document.querySelector("#om2").textContent = txt[5].beskrivelse2; 
    document.querySelector("#om3").textContent = txt[5].beskrivelse3; 

}