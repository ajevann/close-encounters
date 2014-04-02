$(document).ready(function() {

	var lastNotes = [];
	var themeNotes = ["33", "35", "31", "50", "5"];

	var notes = [];

	var n = 35;
	var i = 0;
	$(".note").each(function() {
		var hz = Math.pow(Math.pow(2, 1/12),n - 49) * 440;

		$(this).attr("id", i);
		$(this).attr("data-tone", Math.round(hz));
		$(this).attr("data-color", setColor(i));

		notes[i++] = Math.round(hz).toString();
		
		// var color = $(this).attr("id");
		// color.length == 2 ? color = "0" + color: "";
		// color.length == 4 ? color = color.substring(1,4): "";
		// $(this).css("backgroundColor", "#" + color + "" + color);

		n++;
		if (i%24 == 0) { n = n - 21; }
		if (i%48 == 0) { n = n - 10; }
	});

	$(".note").click(function() { 

		push($(this));

		playNote($(this), 1000);
		animateNote($(this), 1000);
		
		setTimeout(function() {
			if (lastNotes.toString() == themeNotes.toString())
				startShow();
		}, 2000);	
	});

	//Source: http://js.do/blog/sound-waves-with-javascript/
	function playNote(note, interval) {

		var sampleRate = 44.1 * interval;
		//  var samples_length = sampleRate; // divide by 2 ???
		var samples = [] //new Float32Array(samples_length);

		var frequency = note.attr("data-tone") * 2;
		var samples_length = 44.1 * interval;               // Plays for 1 second (44.1 KHz)
		for (var i=0; i < samples_length ; i++) { // fills array with samples
			var t = i/samples_length;               // time from 0 to 1
			samples[i] = Math.sin( frequency * 2*Math.PI*t ); // wave equation (between -1,+1)
			samples[i] *= (1-t);
		}

		if (samples.length==0) {
			alert("ERROR: No values in array 'samples'");
			return;
		}

		normalize_invalid_values(samples); // keep samples between [-1, +1]

		//draw_canvas_graph(samples);

		var wave = new RIFFWAVE();
		wave.header.sampleRate = sampleRate;
		wave.header.numChannels = 1;
		var audio = new Audio();
		var samples2=convert255(samples);
		wave.Make(samples2);
		audio.src=wave.dataURI;
		setTimeout(function() { audio.play(); }, 10); // page needs time to load?

	}

	//Source: http://js.do/blog/sound-waves-with-javascript/
	function convert255(data) {
		var data_0_255=[];
		for (var i=0;i<data.length;i++) {
			data_0_255[i]=128+Math.round(127*data[i]);
		}
		return data_0_255;
	}

	//Source: http://js.do/blog/sound-waves-with-javascript/
	function normalize_invalid_values(samples) {
		for (var i=0, len=samples.length; i<len; i++) {
			if (samples[i]>1) {
				samples[i] = 1;
			} else if (samples[i]<-1) {
				samples[i] = -1;
			}
		}
	}


	function push(note) {
		lastNotes[0] = lastNotes[1];
		lastNotes[1] = lastNotes[2];
		lastNotes[2] = lastNotes[3];
		lastNotes[3] = lastNotes[4];

		lastNotes[4] = note.attr("id").toString();
	}

	function animateNote(note, interval) {

		var color = note.attr("data-color");
		//console.log(color);

		note.animate({backgroundColor: "#" + color + " !important;"}, "slow");

		setTimeout(function() {
			note.animate({backgroundColor: "gray"}, "slow");
		}, interval + 250);
	}

	function startShow() {

		for (var i = 0; i < 15; i++) {
			var n = Math.floor((Math.random()*72));
			var na = notes[n];

			animateNote($("#" + n), 500);
		}
	}

	function animateTheme(interval) {

	}

	function setColor(id)
	{
		var col = id % 12;
		var row = Math.floor(id / 12);

		var color = "";

		switch (col) {
			case 0:		color = "FFFF00";		break;
			case 1:		color = "80FF00";		break;
			case 2:		color = "00FF00";		break;
			case 3:		color = "00FF80";		break;
			case 4:		color = "00FFFF";		break;
			case 5:		color = "0080FF";		break;
			case 6:		color = "0000FF";		break;
			case 7:		color = "8000FF";		break;
			case 8:		color = "FF00FF";		break;
			case 9:		color = "FF0080";		break;
			case 10:	color = "FF0000";		break;
			case 11:	color = "FF8000";		break;
		}

		var newColor = "";

		for (var i = 0; i < 5; i++) {
			var a = color.substring(i, i + 2);

			switch (a) {
				case "FF": break;
				case "80": a = (((5 - row) * 14) + 128).toString(16); break;
				case "00": a = ((5 - row) * 29).toString(16); break;
			}

			i++;

			if (a == "0") a = "00";
			newColor = newColor + "" + a;
		}

		return newColor;

	}


});































