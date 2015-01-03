/*
* TracerStudy Namespace, make sure to include jQuery and Highchart.js before this file
*/
var TracerStudy = {};

TracerStudy.API = {
	general:	'/api/ts',
	check:		'/api/ts/check',
	percentage: '/api/ts/percentage',
	total:		'/api/ts/total',
	salary:		'/api/ts/salary'
};

TracerStudy.Form = {

	init: function () {

		$loaderContainer = $('#loader-container');
		$informationContainer = $('#information-container');
		$formContainer = $('#form-container');
		$tracerStudyForm = $('#tracer-study-form');
		$inputStatus = $('#input-status');
		$inputGroupWork = $('#input-group-work');
		$buttonSubmit = $('#button-submit');

		TracerStudy.Form.check();

		// Hide the group work question if user don't have job
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

	},

	check: function () {

		// Check if user is already fill the form
		$.get(TracerStudy.API.check, function (data, textStatus, xhr) {
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

	}

};

TracerStudy.Statistics = {

	allYears: [],

	/*
	* Initialize Tracer Study statistics
	* @param container_id_first -> the id of first chart container
	* @param container_id_second -> the id of second chart container
	*/
	init: function (container_id_first, container_id_second, container_id_third) {

		var currentDate = new Date();

		var currentYear = currentDate.getFullYear();

		var lastGraduation = currentYear;

		var yearStart = 2005;

		var allPercentage;

		for (var i = yearStart; i <= lastGraduation; i++) {

			TracerStudy.Statistics.allYears.push( yearStart );

			yearStart++;

		}

		TracerStudy.Statistics.getGeneralInformation();

		TracerStudy.Statistics.getAllWorkPercentage( container_id_first, TracerStudy.Statistics.allYears );

		TracerStudy.Statistics.getAllWorkTotal( container_id_second, TracerStudy.Statistics.allYears );

		TracerStudy.Statistics.getAllSalary( container_id_third );

	},

	getGeneralInformation: function () {

		$totalResponden = $('#total-responden');

		$totalRespondenWork = $('#total-responden-work');

		$totalRespondenNotWork = $('#total-responden-not-work');

		$.get(TracerStudy.API.general, function (data) {

			$totalResponden.html(data.total_answer);

			$totalRespondenWork.html(data.total_answer_work);

			$totalRespondenNotWork.html(data.total_answer_not_work);

		});

	},

	getAllWorkPercentage: function (chartContainer, allYears) {

		$workPercentageLoader = $('#' + chartContainer + ' .loader');

		$workPercentageChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.percentage, function (data) {

			$workPercentageLoader.addClass('hidden');

			$workPercentageChart.highcharts({
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

	},

	getAllWorkTotal: function (chartContainer, allYears) {

		$workTotalLoader = $('#' + chartContainer + ' .loader');

		$workTotalChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.total, function (data) {

			$workTotalLoader.addClass('hidden');

			$workTotalChart.highcharts({
				title: {
					text: 'Total yang telah bekerja',
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
						text: 'Total'
					},
					plotLines: [{
						color: '#808080'
					}]
				},
				tooltip: {
					valueSuffix: ' Alumni'
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

	},

	getAllSalary: function (chartContainer) {

		$salaryLoader = $('#' + chartContainer + ' .loader');

		$salaryChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.salary, function (data) {

			$salaryLoader.addClass('hidden');

			$salaryChart.highcharts({
				title: {
					text: 'Persentase pendapatan',
					x: -20 //center
				},
				subtitle: {
					text: 'Semua Alumni ITI',
					x: -20
				},
				xAxis: {
					title : {
						text: 'Angkatan'
					},
					categories: TracerStudy.Statistics.allYears
				},
				yAxis: {
					title: {
						text: 'Total'
					},
					plotLines: [{
						color: '#808080'
					}]
				},
				tooltip: {
					valueSuffix: ' Alumni'
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