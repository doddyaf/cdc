var socket = io();

jQuery(document).ready( function ($) {

	var sourceCdcPost = $("#cdc-post-template").html();
	var cdcPostTemplate = Handlebars.compile(sourceCdcPost);

	var sourceCdcPostItem = $("#cdc-post-item-template").html();
	var cdcPostItemTemplate = Handlebars.compile(sourceCdcPostItem);

	// Ambil Semua Postingan CDC
	var siteURL = window.location.origin;
	console.log(siteURL);

	$.get(siteURL + '/api/cdc/', function(data) {
		var postsJSON = $.parseJSON(data);

		var htmlCdcPost = cdcPostTemplate(postsJSON);

		$('#posts').prepend(htmlCdcPost);
	});

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

	// Real-Time CDC Post
	socket.on('cdc post', function(msg) {

		if (msg.post_category_id == 1) {
			msg.category_name = "Walk Interview";
		}
		else if (msg.post_category_id == 2) {
			msg.category_name = "Job Fair";
		}

		var htmlCdcPost = cdcPostItemTemplate(msg);

		$('#posts').prepend(htmlCdcPost);
	});
	
});