var siteURL = window.location.origin;

var Gallery = {

	API: {

		getGalleriesURL: siteURL + '/api/gallery'

	},

	init: function () {

		Gallery.getAllGalleries();

	},

	getAllGalleries: function () {

		$.get(Gallery.API.getGalleriesURL, function(data) {
			
			console.log(data);

		});

	}

};

jQuery(document).ready(function($) {
	Gallery.init();
});