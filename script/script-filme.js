window.onload = function() {
	document.getElementById("acum").onclick = function() {
		showHide("container-viitor","container-acum");
	};
	document.getElementById("viitor").onclick = function() {
		showHide("container-acum","container-viitor");
	};
	document.getElementById("Drama").onchange = function(){
		showGen("Drama");
	};
	document.getElementById("Thriller").onchange = function(){
		showGen("Thriller");
	};
	document.getElementById("Actiune").onchange = function(){
		showGen("Actiune");
	};
	document.getElementById("Comedie").onchange = function(){
		showGen("Comedie");
	};
};

function showHide(container1, container2) {
	var x = document.getElementById(container1);
	var y = document.getElementById(container2);
	x.style.display = "none";
	y.style.display = "block";
};

function showGen(gen){
	var adevarat = document.getElementById(gen).checked;
	var divuri = document.getElementsByClassName("container");
	for(var dv of divuri){
		var filme = dv.getElementsByClassName("film");
		for(var film of filme){
			var tduri = film.getElementsByTagName("td");
			var genuri = tduri[0].innerHTML;
			if(genuri.includes(gen)){
				if(adevarat){
					film.style.display = "block";
				}
				else{
					film.style.display = "none";
				}
			}
		}
	}
};