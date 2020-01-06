window.onload = function(){
    showPrimaParte();
    var rg = document.getElementsByTagName("input")[0];
    rg.oninput = function(){
        updateRange(rg.value);
    }
    var buton = document.getElementById("buton");
    buton.onclick = function(){
        removePrimaParte();
        showParteaADoua();
    }
}

function updateRange(val){
    document.getElementById("labelRange").innerHTML = val;
}

function showPrimaParte(){
    var filme = ["Joker", "Zombieland:Double Tap", "Doctor Sleep", "Gemini Man"];
    var principal = document.getElementsByTagName("main")[0];
    var selector = document.createElement("select");
    var dv = document.createElement("div");
    var titlu = document.createElement("h2");
    var rg = document.createElement("input");
    var buton = document.createElement("button");
    // select
    dv.classList.add("selector"); principal.appendChild(dv); 
    titlu.innerHTML = "Alege ce film vrei sa vezi"; dv.appendChild(titlu);
    dv.appendChild(selector);
    for(let i = 0; i < 4; i++){
        var opt = document.createElement("option");
        opt.innerHTML = filme[i];
        selector.appendChild(opt);
    }
    // range
    dv = document.createElement("div"); dv.classList.add("range");  principal.appendChild(dv);
    titlu = document.createElement("h2"); titlu.innerHTML = "Ce varsta ai?"; dv.appendChild(titlu);
    titlu = document.createElement("label"); titlu.id ="labelRange"; titlu.innerHTML = 50; dv.appendChild(titlu);
    rg.type = "range"; rg.name = "Varsta"; rg.min = 3; rg.max = 90;  dv.appendChild(rg);
    // text
    dv = document.createElement("div"); dv.classList.add("text"); principal.appendChild(dv);
    titlu = document.createElement("h2"); titlu.innerHTML = "Care este numele tau?"; dv.appendChild(titlu);
    rg = document.createElement("input"); rg.type = "text"; rg.name = "nume"; dv.appendChild(rg);
    // radio
    dv = document.createElement("div"); dv.classList.add("radio"); principal.appendChild(dv);
    titlu = document.createElement("h2"); titlu.innerHTML = "Doriti si ochelari 3D?"; dv.appendChild(titlu);
    titlu = document.createElement("label"); titlu.innerHTML = "Da"; dv.appendChild(titlu);
    rg = document.createElement("input"); rg.type ="radio"; rg.name = "3D"; rg.value = "da"; dv.appendChild(rg);
    titlu = document.createElement("label"); titlu.innerHTML = "Nu"; dv.appendChild(titlu);
    rg = document.createElement("input"); rg.type ="radio"; rg.name = "3D"; rg.value = "nu"; dv.appendChild(rg);
    // buton next
    dv = document.createElement("div"); dv.classList.add("buton"); principal.appendChild(dv);
    buton.id = "buton"; buton.innerHTML = "Mai departe"; dv.appendChild(buton);
}

function removePrimaParte(){
    const principal = document.getElementsByTagName("main")[0];
    while(principal.firstChild){
        principal.removeChild(principal.firstChild);
    }
}

function showParteaADoua(){
    var principal = document.getElementsByTagName("main")[0];
    var dv = document.createElement("div"); principal.appendChild(dv);
    var lab = document.createElement("label"); lab.innerHTML = "Locuri ocupate: 0"; lab.id = "locuriOcupate";
    dv.style.background = "black"; dv.style.color = "orange"; dv.appendChild(lab);
    showLocuri();
}

function showLocuri(){
    var principal = document.getElementsByTagName("main")[0];
    var dvPrincipal = document.createElement("div"); dvPrincipal.style.display = "grid"; principal.appendChild(dvPrincipal);
    for(let i = 1; i <= 28; i++){
        let dv = document.createElement("div"); dv.id = "div" + i; dv.style.gridRow = Math.floor((i - 1) / 7) + 1;
        dv.style.textAlign = "center"; dvPrincipal.appendChild(dv);
        var paragraf = document.createElement("p"); paragraf.innerHTML = i;
        paragraf.style.background = "green"; paragraf.style.border = "1px solid orange"; dv.appendChild(paragraf);
        paragraf.onclick = function(){
            selectare(dv.id);
        }
    }
}

function selectare(idDiv){
    var dv = document.getElementById(idDiv);
    var paragraf = dv.firstChild;
    if(dv.classList.contains("selectat") == false){ 
        dv.classList.add("selectat");
        paragraf.style.background = "brown";
    }
    else{
        dv.classList.remove("selectat");
        paragraf.style.background = "green";
    }
    var locuriOcupate = document.getElementById("locuriOcupate");
    var nr = document.querySelectorAll("div.selectat").length;
    locuriOcupate.innerHTML = "Locuri ocupate: " + nr;
}