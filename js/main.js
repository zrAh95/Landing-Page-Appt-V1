(function($,sr) {
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
				                  func.apply(obj, args);
				timeout = null;
			}
			;
			if (timeout)
			              clearTimeout(timeout); else if (execAsap)
			              func.apply(obj, args);
			timeout = setTimeout(delayed, threshold || 100);
		}
		;
	}
	// smartresize 
	jQuery.fn[sr] = function(fn) {
		return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
	}
	;
}
)(jQuery,'smartresize');


$(document).ready(function() {
	///////////////////////////////
	// Set Home Slideshow Height
	///////////////////////////////
	function setHomeBannerHeight() {
		var windowHeight = jQuery(window).height();
		jQuery('#header').height(windowHeight);
	}
	///////////////////////////////
	// Center Home Slideshow Text
	///////////////////////////////
	function centerHomeBannerText() {
		var bannerText = jQuery('#header > .center');
		var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header > .center').actual('height')/2) - 20;
		bannerText.css('padding-top', bannerTextTop+'px');
		bannerText.show();
	}
	setHomeBannerHeight();
	centerHomeBannerText();
	//Resize events
	jQuery(window).smartresize(function() {
		setHomeBannerHeight();
		centerHomeBannerText();
	});
	
	function scroll() {
		if ($(window).scrollTop() == 0 ) {
			//$('.nav > li').removeClass('active');
			console.log($(window).scrollTop());
		} else {
			
		}
	}
	document.onscroll = scroll;
	var $scrollDownArrow = $('#scrollDownArrow');
	var animateScrollDownArrow = function() {
		$scrollDownArrow.animate( {
			top: 5,
		}
		, 400, "linear", function() {
			$scrollDownArrow.animate( {
				top: -5,
			}
			, 400, "linear", function() {
				animateScrollDownArrow();
			}
			);
		});
	}
	animateScrollDownArrow();
	//Set Down Arrow Button
	jQuery('#scrollDownArrow').click(function(e) {
		e.preventDefault();
		jQuery.scrollTo("#story", 1000, {
			offset:-(jQuery('#header #menu').height()), axis:'y'
		}
		);
	});
	jQuery('.nav > li > a, #logo a').click(function(e) {
		e.preventDefault();

		jQuery.scrollTo(jQuery(this).attr('href'), 400, {
			offset:-(jQuery('#header #menu').height()), axis:'y'
		}
		);
	});

	var $orderForm = jQuery('#orderForm');
	if ($orderForm.length) {
		$orderForm.on('submit', function(e) {
			e.preventDefault();

			var whatsappNumber = '628997491674';
			var customerName = jQuery('#customer_name').val();
			var customerPhone = jQuery('#customer_phone').val();
			var orderProduct = jQuery('#order_product').val();
			var orderQuantity = jQuery('#order_quantity').val();
			var orderUnit = jQuery('#order_unit').val();
			var pickupDate = jQuery('#pickup_date').val();
			var orderNotes = jQuery('#order_notes').val() || '-';

			var message = [
				'Halo, saya mau pesan ayam potong.',
				'',
				'Nama: ' + customerName,
				'No. WhatsApp: ' + customerPhone,
				'Produk: ' + orderProduct,
				'Jumlah: ' + orderQuantity + ' ' + orderUnit,
				'Tanggal ambil/kirim: ' + pickupDate,
				'Catatan: ' + orderNotes
			].join('\n');

			var whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
			window.open(whatsappUrl, '_blank');
		});
	}


});
