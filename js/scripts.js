// HTML5 Grayscale Image Hover - http://webdesignerwall.com/tutorials/html5-grayscale-image-hover
// Image desaturation
$(window).load(function(){

	// Fade in images to eliminate color "pop"
	$("img").fadeIn(500);

	// Clone image
	$("img").each(function(){
		var el = $(this);
		el.css({"position":""}).wrap("<div class='img-wrapper' style='display: inline-block; margin: 0'>").clone().addClass('img-grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
			var el = $(this);
			el.parent().css({"width":this.width - 30,"height":"100px"});
			// el.parent().css({"width":this.width - 30,"height":this.height});
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
