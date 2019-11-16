window.onload = function() {
	document.getElementById("acum").onclick = function() {
		showHide("container-viitor","container-acum");
	};
	document.getElementById("viitor").onclick = function() {
		showHide("container-acum","container-viitor");
	};
};

function showHide(container1, container2) {
	var x = document.getElementById(container1);
	var y = document.getElementById(container2);
	x.style.display = "none";
	y.style.display = "block";
};