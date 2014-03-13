$(document).ready(function() {

	(function init(g){
		try {
			audio_context = new (g.AudioContext || g.webkitAudioContext);
			oscillator = audio_context.createOscillator();
		} catch (e) {
			alert('No web audio oscillator support in this browser');
		}
	}(window));

	var context = new webkitAudioContext();
	var oscillator = context.createOscillator();

	var lastNotes = [];
	var themeNotes = ["392", "440", "349", "175", "262"];

	var notes = [];

	var n = 20;
	var i = 0;
	$(".note").each(function() {
		var hz = Math.pow(Math.pow(2, 1/12),n - 49) * 440;
		//$(this).text(Math.round(hz));
		$(this).attr("id", Math.round(hz));
		notes[i++] = Math.round(hz).toString();

		// var color = $(this).attr("id");
		// color.length == 2 ? color = "0" + color: "";
		// color.length == 4 ? color = color.substring(1,4): "";
		// $(this).css("backgroundColor", "#" + color + "" + color);

		n++;
	});

	$(".note").click(function() { 

		console.log(notes);

		startShow();

		push($(this));

		playNote($(this), 1000);
		animateNote($(this), 1000);
		
		setTimeout(function() {
			if (lastNotes.toString() == themeNotes.toString())
				animateTheme(750);
		}, 2000);	

		console.log(themeNotes);
		console.log(lastNotes);
	});

	function push(note) {
		lastNotes[0] = lastNotes[1];
		lastNotes[1] = lastNotes[2];
		lastNotes[2] = lastNotes[3];
		lastNotes[3] = lastNotes[4];

		lastNotes[4] = note.attr("id").toString();
	}

	function playNote(note, interval) {

	    oscillator.type = 0;
	    oscillator.frequency.value = note.attr("id") * 2;
	    oscillator.connect(context.destination);
	    oscillator.noteOn && oscillator.noteOn(0); // this method doesn't seem to exist, though it's in the docs?

		setTimeout(function() {
	    	oscillator.disconnect(); 
			
			oscillator = context.createOscillator();
	    }, interval);
	}

	function animateNote(note, interval) {

		var color = note.attr("id");
		color.length == 2 ? color = "0" + color: "";
		color.length == 4 ? color = color.substring(1,4): "";

		note.animate({backgroundColor: "#" + color + "" + "000" + " !important;"}, "slow");

		setTimeout(function() {
			note.animate({backgroundColor: "gray"}, "slow");
		}, interval + 250);
	}

	function startShow() {
		for (var i = 0; i < 10; i++) {
			var n = Math.floor((Math.random()*60));
			var na = notes[n];
			var nc = $("#" + na);

			console.log(n + " " + na + " " + nc);

			animateNote(nc, 100000);
		}
	}

	function animateTheme(interval) {

		var q = Math.round(interval);
		var w = 4 * q;

		console.log(q);


		playNote($("#392"), q);
		animateNote($("#392"), q);

		setTimeout(function() {
			playNote($("#440"), q);
			animateNote($("#440"), q);

			setTimeout(function() {
				playNote($("#349"), q);
				animateNote($("#349"), q);
			
				setTimeout(function() {
					playNote($("#175"), q);
					animateNote($("#175"), q);
				
					setTimeout(function() {
						playNote($("#262"), w);
						animateNote($("#262"), w);

						setTimeout(function() {
							animateTheme(interval * .75);
						}, w + 100);

					}, q + 100);
				}, q + 100);
			}, q + 100);
		}, q + 100);
	}

});