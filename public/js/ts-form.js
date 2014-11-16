TracerStudyForm = {};

TracerStudyForm.init = function() {
	
	// Check if user is already fill the form
	$.get('http://localhost:3000/api/ts/check', function(data, textStatus, xhr) {
		var isUserHadFillTheForm = data;
		
		$('#loader-container').addClass('hidden');

		if (isUserHadFillTheForm) {
			$('#information-container').removeClass('hidden');

			$('#button-submit').addClass('disabled');
			document.getElementById('button-submit').disabled = true;
		}
		else {
			$('#form-container').removeClass('hidden');
		}
	});

	// Handling Form Submit
	$('#tracer-study-form').on('submit', function(event) {
		event.preventDefault();

		$('#button-submit').val('Sending..');
		$('#button-submit').addClass('disabled');
		document.getElementById('button-submit').disabled = true;

		$.post('http://localhost:3000/api/ts', $('#tracer-study-form').serialize(), function(data, textStatus, xhr) {
			console.log(data);

			if (data == 'success') {
				$('#form-container').addClass('hidden');
				$('#information-container').removeClass('hidden');
			}
		});
	});
};

jQuery(document).ready(function($) {

	TracerStudyForm.init();

});
