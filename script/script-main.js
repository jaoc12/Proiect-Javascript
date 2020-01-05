window.onload = function(){
     var timeoutId = window.setTimeout(popUp,5000);
     if(document.getElementById("logat")!==null){
         window.clearTimeout(timeoutId);
     }
}

function popUp(){
    var adevar =  window.confirm("Nu esti logat, doresti sa te loghezi?");
    if(adevar){
        window.location = "/login";
    }
}