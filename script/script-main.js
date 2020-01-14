window.onload = function(){
     var timeoutId = window.setTimeout(popUp,5000);
     if(document.getElementById("logat")!==null){
         window.clearTimeout(timeoutId);
     }
     var text = document.createElement("textarea"); text.rows = "4"; text.cols = "50";
     text.innerHTML = "Poti sa trimiti orice sugestie, reclamatie sau mesaj de orice natura";
     var element = document.getElementsByClassName("des")[0];
     element.parentNode.insertBefore(text,element);
}

function popUp(){
    var adevar =  window.confirm("Nu esti logat, doresti sa te loghezi?");
    if(adevar){
        window.location = "/login";
    }
}