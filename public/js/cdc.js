var socket = io();

var CDC = {

	API: {

		jobPost: '/api/cdc'

	},

	sourceCdcPost: '',

	cdcPostTemplate: '',

	sourceCdcPostItem: '',

	cdcPostItemTemplate: '',

	init: function () {

		CDC.sourceCdcPost = $("#cdc-post-template").html();
		CDC.cdcPostTemplate = Handlebars.compile(CDC.sourceCdcPost);

		CDC.sourceCdcPostItem = $("#cdc-post-item-template").html();
		CDC.cdcPostItemTemplate = Handlebars.compile(CDC.sourceCdcPostItem);

		CDC.getAllJobsPosts();

		CDC.setFormListener();

		CDC.setSocketListener();

	},

	getAllJobsPosts: function () {

		// Ambil Semua Postingan CDC
		$.get(CDC.API.jobPost, function(data) {
			var postsJSON = $.parseJSON(data);

			var htmlCdcPost = CDC.cdcPostTemplate(postsJSON);

			$('#posts').prepend(htmlCdcPost);
		});

	},

	setFormListener: function () {

		// Fungsi pada saat cdc form di-submit
		$('#cdc-form').submit( function() {
			var cdcPost = {};
			cdcPost.content = $('#cdc-form-content').val();
			cdcPost.post_category_id = $('#cdc-form-category').val();

			socket.emit('cdc post', cdcPost);

			// Clear all inputs
			$('#cdc-form-content').val('');
			$('#cdc-form-category').prop('selectedIndex', 0);

			return false;
		});

	},

	setSocketListener: function () {

		// Real-Time CDC Post
		socket.on('cdc post', function(msg) {

			if (msg.post_category_id == 1) {
				msg.category_name = "Walk Interview";
			}
			else if (msg.post_category_id == 2) {
				msg.category_name = "Job Fair";
			}

			var htmlCdcPost = CDC.cdcPostItemTemplate(msg);

			$('#posts').prepend(htmlCdcPost);
		});

	}

};

jQuery(document).ready(function($) {
	CDC.init();
});