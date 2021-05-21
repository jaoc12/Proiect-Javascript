window.onload = function(){
    var buton = document.getElementById("buton");
    buton.onclick = function(){
        window.location = "/";
    }
    var t = document.createTextNode("Cum ai ajuns aici");
    document.getElementById("text").appendChild(t);
}