$(window).load(function() {

	// Display appropriate section on load
	subpage = window.location.hash.substring(1);
	if (subpage != "") {
		$("#" + subpage + "_section").show();
	}
	else {
		$("#home_section").show();
	}
	$("#footer").show();

	// Page transitions
	$("#title a, #navigation a").click(function() {
		target = $(this).attr("href");
		$("#main > div").hide();
		$(target + "_section").fadeIn();
	});

	// Add theme color to footer
	$(function (){
		var color = rgb2hex($('#top_banner').css('background-color')).toUpperCase();
		$("#color").html("<a href='http://www.colourlovers.com/color/" + color + "'target='_blank'><span>#" + color + "</span></a>")
	});

	// Contact form submission
	$(function() {  
		$('.error').hide();  
		$(".button").click(function() {  						
			// Validate and process form here  
			var form = true;
			$('.error').hide();  

			var name = $("input#name").val();  
			name = $.trim(name);
			if (name == "") {  
				$("label#name_error").show(500);  
				$("input#name").focus(); 
				form = false;  
			}

			var email = $("input#email").val();  
			email = $.trim(email);
			if (email == "") {  
				$("label#email_error").show(500);  
				$("input#email").focus();  
				form = false;  
			}  

			var message = $("textarea#message").val();  
			message = $.trim(message);
			if (message == "") {  
				$("label#message_error").show(500);  
				$("textarea#message").focus();  
				form = false;
			}  
			
			if (form == false) {
				return false;
			}
			
			var dataString = 'name=' + name + '&email=' + email + '&message=' + message;   
			$.ajax({  
				type: "POST",  
				url: "bin/process.php",  
				data: dataString,  
				success: function() {  
					$('#contact_form').html("<div id='success'></div>");  
					$('#success').html("<p>Thanks! I'll be in touch soon.</p>")  
					.hide()  
					.fadeIn(300);  
				}  
			});  
			return false;  			  
			
		});  
}); 

	// Initialize slider

	$("#slider").bjqs({
		animtype: 'fade',
		height: 270,
		width: 480,
		usecaptions: true,
		showmarkers: false,
		animduration: 600,
		animspeed: 6000,
		nexttext: "&rarr;",
		prevtext: "&larr;"
	});  	   				
});

// HTML5 Grayscale Image Hover - http://webdesignerwall.com/tutorials/html5-grayscale-image-hover
// Image desaturation
$(window).load(function(){
	
	// Fade in images to eliminate color "pop"
	$("img").fadeIn(500);
	
	// Clone image
	$("img").each(function(){
		var el = $(this);
		el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block; margin: 0'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
			var el = $(this);
			el.parent().css({"width":this.width - 30,"height":this.height});
			el.dequeue();
		});
		this.src = grayscale(this.src);
	});
	
	// Image hover effect
	$("img").mouseover(function(){
		$(this).parent().find('img:first').stop().animate({opacity:1}, 100);
	})
	$("img").mouseout(function(){
		$(this).stop().animate({opacity:0}, 100);
	});		

	// Project div hover effect
	$(".project").mouseover(function(){
		$(this).find('img:first').stop().animate({opacity:1}, 100);
	})
	$(".project").mouseout(function(){
		$(this).find('img:first').stop().animate({opacity:0}, 100);
	});		
});

// Makes things grayscale using canvas
function grayscale(src){
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var imgObj = new Image();
	imgObj.src = src;
	canvas.width = imgObj.width;
	canvas.height = imgObj.height; 
	ctx.drawImage(imgObj, 0, 0); 
	var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for(var y = 0; y < imgPixels.height; y++){
		for(var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
			imgPixels.data[i] = avg; 
			imgPixels.data[i + 1] = avg; 
			imgPixels.data[i + 2] = avg;
		}
	}
	ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	return canvas.toDataURL();
}

// Converts rgb values to hexadecimal
function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}