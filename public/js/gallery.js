var Gallery = {

	API: {

		gallery: '/api/gallery'

	},

	templateSource: '',

	template: '',

	init: function () {

		Gallery.getAllGalleries();

	},

	getAllGalleries: function () {

		Gallery.templateSource = $("#gallery-template").html();
		Gallery.template = Handlebars.compile(Gallery.templateSource);

		$.get(Gallery.API.gallery, function(data) {

			var htmlGalleries = Gallery.template(data);

			$('#gallery-container').prepend(htmlGalleries);

		});

	}

};

jQuery(document).ready(function($) {
	Gallery.init();
});