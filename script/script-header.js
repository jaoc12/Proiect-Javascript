var interval = window.setInterval(animatie,30000);

function animatie(){
	var camera = document.getElementById("camera");
	var pos = 0;
	var intervalIntern = window.setInterval(animatieInterna,5);
	function animatieInterna() {
		if(pos == document.getElementById("titlu").offsetWidth - 75){
			clearInterval(intervalIntern);
			camera.style.left = 0;
		}
		else{
			pos++;
			camera.style.left = pos + "px";
		}
	}
}