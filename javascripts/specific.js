
var n = 20;
$(".note").each(function() {
	var hz = Math.pow(Math.pow(2, 1/12),n - 49) * 440;
	//$(this).text(Math.round(hz));
	$(this).attr("id", Math.round(hz));

	// var color = $(this).attr("id");
	// color.length == 2 ? color = "0" + color: "";
	// color.length == 4 ? color = color.substring(1,4): "";
	// $(this).css("backgroundColor", "#" + color + "" + color);

	n++;
});

$(".note").click(function() { 

	if ($(this).attr("id") == "392")
		animateTheme();	
	else
	{
		playNote($(this));
		animateNote($(this));
	}
});

function playNote(note) {
	var data = []; // just an array

	var hz = $(this).text();

	for (var i=0; i<1000; i++)  // size of i's limit determines the length of the sound
	{	
		data[i] = 128+Math.round(127*Math.sin(i * hz)); // fill data with random samples
	}
	//880 - A note
	
	var wave = new RIFFWAVE(data); // create the wave file
	var audio = new Audio(wave.dataURI); // create the HTML5 audio element
	audio.play(); // some noise
}

function animateNote(note) {

	var color = note.attr("id");
	color.length == 2 ? color = "0" + color: "";
	color.length == 4 ? color = color.substring(1,4): "";

	note.animate({backgroundColor: "#" + color + "" + "000" + " !important;"}, "slow");

	setTimeout(function() {
		note.animate({backgroundColor: "gray"}, "slow");
	}, 2000);
}

function animateTheme() {

	setTimeout(function() {
		playNote($("#392"));
		animateNote($("#392"));
	
		setTimeout(function() {
			playNote($("#440"));
			animateNote($("#440"));

			setTimeout(function() {
				playNote($("#349"));
				animateNote($("#349"));
			
				setTimeout(function() {
					playNote($("#175"));
					animateNote($("#175"));
				
					setTimeout(function() {
						playNote($("#262"));
						animateNote($("#262"));
					}, 2000);
				}, 2000);
			}, 2000);
		}, 2000);
	}, 2000);

}








