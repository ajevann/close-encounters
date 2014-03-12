var count = 1;
$(".note").each(function() {
	$(this).text(count++);
});

$(".note").click(function() { 
	var data = []; // just an array

	for (var i=0; i<100000; i++)  // size of i's limit determines the length of the sound
		data[i] = 128+Math.round(127*Math.sin(i * 880)); // fill data with random samples

	//880 - A note
	
	var wave = new RIFFWAVE(data); // create the wave file
	var audio = new Audio(wave.dataURI); // create the HTML5 audio element
	audio.play(); // some noise
});


