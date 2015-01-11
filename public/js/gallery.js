var Gallery = {

	API: {

		gallery: '/api/gallery'

	},

	templateSource: '',

	template: '',

	init: function () {

		$galleryTemplate = $("#gallery-template");
		$galleryContainer = $('#gallery-container');

		

		// Gallery.initGalleryGrid();

		// Gallery.getAllGalleries();

	},

	getAllGalleries: function () {

		Gallery.templateSource = $galleryTemplate.html();
		Gallery.template = Handlebars.compile(Gallery.templateSource);

		$.get(Gallery.API.gallery, function(data) {

			var htmlGalleries = Gallery.template(data);

			$galleryContainer.prepend(htmlGalleries).promise().done(function() {
				
				$galleryContainer.packery({
					layoutMode: 'packery',
					itemSelector: '.col-thumbnail'
				});

			});

		});

	},

	initGalleryGrid: function () {
		$galleryContainer.packery({
			layoutMode: 'packery',
			itemSelector: '.col-thumbnail'
		});
	}

};

jQuery(document).ready(function($) {
	Gallery.init();
});