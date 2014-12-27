/*
* TracerStudy Namespace, make sure to include jQuery and Highchart.js before this file
*/
var siteURL = window.location.origin;

var TracerStudy = {};

TracerStudy.Form = {

	init: function() {

		$loaderContainer = $('#loader-container');
		$informationContainer = $('#information-container');
		$formContainer = $('#form-container');
		$tracerStudyForm = $('#tracer-study-form');
		$inputStatus = $('#input-status');
		$inputGroupWork = $('#input-group-work');
		$buttonSubmit = $('#button-submit');

		// Check if user is already fill the form
		$.get(siteURL + '/api/ts/check', function (data, textStatus, xhr) {
			var isUserHadFillTheForm = data;
			
			$loaderContainer.addClass('hidden');

			if (isUserHadFillTheForm) {
				$informationContainer.removeClass('hidden');

				$buttonSubmit.addClass('disabled');
				document.getElementById('button-submit').disabled = true;
			}
			else {
				$formContainer.removeClass('hidden');
			}
		});

		$inputStatus.change( function (event) {
			var value = $(this).val();
			
			if (value == 1) {
				$inputGroupWork.removeClass('hidden');
			}
			else {
				$inputGroupWork.addClass('hidden');
			}
		});

		// Handling Form Submit
		$tracerStudyForm.on('submit', function (event) {
			event.preventDefault();

			$buttonSubmit.html('Sending..');
			$buttonSubmit.addClass('disabled');
			document.getElementById('button-submit').disabled = true;

			$.post(siteURL + '/api/ts', $tracerStudyForm.serialize(), function (data, textStatus, xhr) {
				console.log(data);

				if (data == 'success') {
					$formContainer.addClass('hidden');
					$informationContainer.removeClass('hidden');
				}
			});
		});

	}

};

TracerStudy.Statistics = {

	allYears: [],

	/*
	* Initialize Tracer Study statistics
	* @param container_id_first -> the id of first chart container
	* @param container_id_second -> the id of second chart container
	*/
	init: function (container_id_first, container_id_second) {

		var currentDate = new Date();

		var currentYear = currentDate.getFullYear();

		var lastGraduation = currentYear;

		var yearStart = 2005;

		var allPercentage;

		for (var i = yearStart; i <= lastGraduation; i++) {

			TracerStudy.Statistics.allYears.push( yearStart );

			yearStart++;

		}

		console.log( TracerStudy.Statistics.allYears );

		this.getAllPercentage( container_id_first, TracerStudy.Statistics.allYears );

		// TODO
		// All Statistics

	},

	getAllPercentage: function (percentageContainer, allYears) {

		$.get(siteURL + '/api/ts/percentage', function (data) {

			$('#' + percentageContainer).highcharts({
				title: {
					text: 'Persentase yang telah bekerja',
					x: -20 //center
				},
				subtitle: {
					text: 'Per angkatan dan jurusan',
					x: -20
				},
				xAxis: {
					title : {
						text: 'Angkatan'
					},
					categories: allYears
				},
				yAxis: {
					title: {
						text: 'Persentase (%)'
					},
					plotLines: [{
						value: 0,
						width: 100,
						color: '#808080'
					}]
				},
				tooltip: {
					valueSuffix: '%'
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series: data
			});
		});

	}

};