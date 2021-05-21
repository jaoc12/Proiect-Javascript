
var globalSelect;
var globalRange;
var globalText;
var globalRadio;

window.onload = function(){
    showPrimaParte();
    globalRange = document.getElementsByTagName("input")[6];
    globalSelect = document.getElementsByTagName("select")[0];
    globalText = document.getElementsByTagName("input")[7];
    globalRadio = document.getElementsByTagName("input")[8];
    globalRange.oninput = function(){
        updateRange(globalRange.value);
    }
    var buton = document.getElementById("buton");
    buton.onclick = function(){
        if(primaParte()){
            removePrimaParte();
            showParteaADoua();
        }
    }
}

function primaParte(){
    var filme = {"Joker": 15, "Zombieland: Double Tap": 15, "Doctor Sleep": 18, "Gemini Man": 12};
    if(globalText.value && document.getElementById("logat")){
        var selectat = globalSelect.options[globalSelect.selectedIndex];
        if(parseInt(filme[selectat.value]) <= parseInt(globalRange.value)){
            document.getElementsByTagName("input")[0].value = selectat.text;
            document.getElementsByTagName("input")[1].value = globalRange.value;
            document.getElementsByTagName("input")[2].value = globalText.value;
            if(globalRadio.checked == true){
                document.getElementsByTagName("input")[3].value = true;
            }
            else{
                document.getElementsByTagName("input")[3].value = false;
            }
            return true;
        }
        else{
            window.alert("Nu ai varsta potrivita pentru a viziona acest film");
            window.location = "/";
            return false;
        }
    }
    window.alert("Trebuie sa completezi toate campurile si sa fii logat");
    return false;
}

function updateRange(val){
    document.getElementById("labelRange").innerHTML = val;
}

function showPrimaParte(){
    document.getElementsByTagName("form")[0].style.display = "none";
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
    rg = document.createElement("input"); rg.type ="radio"; rg.name = "3D"; rg.value = "nu"; rg.checked = true; dv.appendChild(rg);
    // buton next
    dv = document.createElement("div"); dv.classList.add("buton"); principal.appendChild(dv);
    buton.id = "buton"; dv.appendChild(buton);
    var t = document.createTextNode("Mai departe");
    dv.appendChild(t);
    //buton.innerHTML = "Mai departe";
}

function removePrimaParte(){
    const principal = document.getElementsByTagName("main")[0];
    while(principal.children.length > 1){
        principal.removeChild(principal.lastElementChild);
    }
}

function showParteaADoua(){
    var principal = document.getElementsByTagName("main")[0];
    var dv = document.createElement("div"); principal.appendChild(dv);
    var lab = document.createElement("label"); lab.innerHTML = "Locuri ocupate: 0"; lab.id = "locuriOcupate";
    dv.style.background = "black"; dv.style.color = "orange"; dv.appendChild(lab);
    showLocuri();
    var dv = document.createElement("div"); dv.classList.add("buton"); principal.appendChild(dv);
    var buton = document.createElement("button"); buton.id = "buton"; buton.innerHTML = "Finalizeaza comanda"; dv.appendChild(buton);
    buton.onclick = function(){
        var locuri ="";
        let i = 0;
        var scaune = document.querySelectorAll("div.loc");
        for(let scaun of scaune){
            i++;
            if(scaun.classList.contains("selectat")){
                locuri = locuri + i + ",";
            }
        }
        document.getElementsByTagName("input")[4].value = locuri;
        localStorage.clear();
        document.getElementsByTagName("form")[0].submit();
    }
}

function showLocuri(){
    var principal = document.getElementsByTagName("main")[0];
    var dvPrincipal = document.createElement("div"); dvPrincipal.style.display = "grid"; principal.appendChild(dvPrincipal);
    var ocupate = [];
    if(localStorage.getItem("Ocupate") == null){
        for(let i = 0; i < 7; i++){
            var k = Math.floor(Math.random() * 28) + 1;
            ocupate.push(k);
            localStorage.setItem("Ocupate",JSON.stringify(ocupate));
        }
    }
    else{
        ocupate = JSON.parse(localStorage.getItem("Ocupate"));
    }
    for(let i = 1; i <= 28; i++){
        let dv = document.createElement("div"); dv.id = "div" + i; dv.style.gridRow = Math.floor((i - 1) / 7) + 1;
        dv.style.textAlign = "center"; dvPrincipal.appendChild(dv); dv.classList.add("loc");
        var paragraf = document.createElement("p"); paragraf.innerHTML = i;
        paragraf.style.background = "green"; paragraf.style.border = "1px solid orange"; dv.appendChild(paragraf);
        if(ocupate.includes(i) == false){
            paragraf.onclick = function(){
                selectare(dv.id);
            }
            paragraf.onmousemove = function(){
                showInformatii(dv.id, event);
            }
            paragraf.onmouseout = function(){
                removeInformatii(dv.id);
            }
        }
        else{
            paragraf.style.background = "gray";
            dv.classList.add("ocupat");
        }
    }
    document.onkeypress = resetareSelectare;
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

function resetareSelectare(e){
    var key = e.which;
    if(key == 114){
        var locuriOcupate = document.querySelectorAll("div.selectat");
        for(var loc of locuriOcupate){
            loc.classList.remove("selectat");
            loc.firstChild.style.background = "green";
        }
        var locuriOcupate = document.getElementById("locuriOcupate").innerHTML = "Locuri ocupate: 0";
    }
}

function showInformatii(idDiv, event){
    var paragraf = document.getElementById(idDiv).firstElementChild;
    var dv = document.getElementById("informatii");
    if(!dv){
        dv = document.createElement("div"); dv.style.position = "absolute"; dv.id = "informatii"; dv.style.background = "orange";
        var lab = document.createElement("label"); dv.appendChild(lab);
        var nrLoc = parseInt(idDiv[3] + idDiv[4])%7;
        if(nrLoc >= 3 && nrLoc <= 5){
            lab.innerHTML = "Pret: 20Ron<br>Grad confort: A";
        }
        else{
            lab.innerHTML = "Pret: 15Ron<br>Grad confort: B";
        }
        lab = document.createElement("label"); dv.appendChild(lab);
        var urmator = document.getElementById(idDiv).nextElementSibling;
        if(urmator!=null){
            if(urmator.classList.contains("ocupat")){
                lab.innerHTML = "<br>Locul din dreapta este ocupat";
            }
            else{
                lab.innerHTML = "<br>Locul din dreapta este liber";
            }
        }
        lab = document.createElement("label"); dv.appendChild(lab);
        var trecut = document.getElementById(idDiv).previousElementSibling;
        if(trecut!=null){
            if(trecut.classList.contains("ocupat")){
                lab.innerHTML = "<br>Locul din stanga este ocupat";
            }
            else{
                lab.innerHTML = "<br>Locul din stanga este liber";
            }
        }
    }
    var x = event.clientX; var y = event.clientY;
    dv.style.left = x + "px"; dv.style.top = y + "px";
    document.body.appendChild(dv);
}

function removeInformatii(idDiv){
    document.body.removeChild(document.getElementById("informatii"));
}