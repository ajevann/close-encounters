
var n = 20;
$(".note").each(function() {
	var hz = Math.pow(Math.pow(2, 1/12),n - 49) * 440;
	$(this).text(Math.round(hz));
	$(this).attr("id", Math.round(hz));
	n++;
});

$(".note").click(function() { 

	if ($(this).attr("id") == "440")
		animateTheme();	
	else
	{
		playNote($(this).attr("id"));
		animateNote($(this).attr("id"));
	}


	var color = $(this).text();
	color.length == 2 ? color = "0" + color: "";
	color.length == 4 ? color = color.substring(1,4): "";

	$(this).animate({backgroundColor: "#" + color + "" + "000" + " !important;"}, "slow");

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

	var element = $(this);

	setTimeout(function() {
		element.animate({backgroundColor: "gray"}, "slow");
	}, 2000);
});

function animateTheme() {
	
	
	$("#392").animate({backgroundColor: "#" + $("#392").attr("id") + $("#392").attr("id")}, "slow");
	$("#440").animate({backgroundColor: "#" + $("#440").attr("id") + $("#440").attr("id")}, "slow");
	$("#349").animate({backgroundColor: "#" + $("#349").attr("id") + $("#349").attr("id")}, "slow");
	$("#175").animate({backgroundColor: "#" + $("#175").attr("id") + $("#175").attr("id")}, "slow");
	$("#262").animate({backgroundColor: "#" + $("#262").attr("id") + $("#262").attr("id")}, "slow");
}

function playNote(note) {
	console.log("play");
}

function animateNote(note) {
	console.log("animate");
}










