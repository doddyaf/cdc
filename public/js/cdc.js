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

		var monthShortNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		Handlebars.registerHelper('breaklines', function(text) {
			text = Handlebars.Utils.escapeExpression(text);
			text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
			return new Handlebars.SafeString(text);
		});

		Handlebars.registerHelper('convertToDate', function( text ) {
			text = Handlebars.Utils.escapeExpression( text );
			var date = new Date(text);
			text = monthShortNames[ date.getMonth() ] + ' ' + date.getDate() + ', ' + date.getFullYear();
			return new Handlebars.SafeString( text );
		});

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
		$('#cdc-form').submit( function (event) {
			event.preventDefault();

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
			console.log(msg);

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