/*
* TracerStudy Namespace, make sure to include jQuery and Highchart.js before this file
*/
var socket = io();

var TracerStudy = {};

TracerStudy.API = {
	general:	'/api/ts',
	check:		'/api/ts/check',
	work: {
		percentage: '/api/ts/work/percentage',
		total: '/api/ts/work/total'
	},
	salary: {
		percentage: '/api/ts/salary/percentage',
		total: '/api/ts/salary/total'
	},
	responden: {
		percentage: '/api/ts/responden/percentage',
		total: '/api/ts/responden/total'
	},
	fow: {
		percentage: '/api/ts/fow/percentage',
		total: '/api/ts/fow/total'
	},
	relation: {
		percentage: '/api/ts/relation/percentage',
		total: '/api/ts/relation/total'
	}
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

			$.post(TracerStudy.API.general, $tracerStudyForm.serialize(), function (data, textStatus, xhr) {
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

	allProgramsCode: ["IF", "TS", "TK", "TA", "PWK", "TE", "TM", "TIP", "TI", "MT", "OT", "MJ"],

	allPrograms: ["Informatika","Teknik Sipil", "Teknik Kimia", "Teknik Arsitektur", "Perancangan Wilayah dan Kota", "Teknik Elektro", "Teknik Mesin", "Teknik Industri Pertanian", "Teknik Industri", "Mekatronika", "Otomotif", "Manajemen"],

	allSalaryCategories: ['500rb-1jt', '1-2jt', '2-3jt', '3-5jt', 'Diatas 5jt'],

	respondenTotalChart: '',

	workPercentageChart: '',

	workTotalChart: '',

	salaryPercentageChart: '',

	salaryTotalChart: '',

	fowPercentageChart: '',

	fowTotalChart: '',

	relationPercentageChart: '',

	relationTotalChart: '',

	/*
	* Initialize Tracer Study statistics
	* @param container_id_first -> the id of first chart container
	* @param container_id_second -> the id of second chart container
	*/
	init: function (chartContainers) {

		var currentDate = new Date();

		var currentYear = currentDate.getFullYear();

		var lastGraduation = currentYear;

		var yearStart = 2005;

		var allPercentage;

		for (var i = yearStart; i <= lastGraduation; i++) {

			TracerStudy.Statistics.allYears.push( yearStart );

			yearStart++;

		}

		TracerStudy.Statistics.findAllSelectors();

		TracerStudy.Statistics.getGeneralInformation();

		TracerStudy.Statistics.getAllRespondenTotal( chartContainers.responden.total );

		TracerStudy.Statistics.getAllWorkPercentage( chartContainers.work.percentage, TracerStudy.Statistics.allYears );

		TracerStudy.Statistics.getAllWorkTotal( chartContainers.work.total, TracerStudy.Statistics.allYears );

		TracerStudy.Statistics.getAllSalaryPercentage( chartContainers.salary.percentage );

		TracerStudy.Statistics.getAllSalaryTotal( chartContainers.salary.total );

		TracerStudy.Statistics.getAllFieldOfWorkPercentage( chartContainers.fow.percentage );

		TracerStudy.Statistics.getAllFieldOfWorkTotal( chartContainers.fow.total );

		TracerStudy.Statistics.getAllRelationPercentage( chartContainers.relation.percentage );

		TracerStudy.Statistics.getAllRelationTotal( chartContainers.relation.total );

		TracerStudy.Statistics.setSocketListener();

	},

	findAllSelectors: function () {

		$totalResponden = $('#total-responden');
		$totalRespondenWork = $('#total-responden-work');
		$totalRespondenNotWork = $('#total-responden-not-work');

	},

	setSocketListener: function () {

		// Real-Time TS Chart
		socket.on('ts post', function(msg) {
			console.log(msg);

			TracerStudy.Statistics.refresh();

		});

	},

	getGeneralInformation: function () {

		$.get(TracerStudy.API.general, function (data) {

			$totalResponden.html(data.total_answer);

			$totalRespondenWork.html(data.total_answer_work);

			$totalRespondenNotWork.html(data.total_answer_not_work);

		});

	},

	getAllRespondenTotal: function (chartContainer) {

		$respondenTotalLoader = $('#' + chartContainer + ' .loader');

		$respondenTotalChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.responden.total, function (data) {

			$respondenTotalLoader.addClass('hidden');

			$respondenTotalChart.highcharts({
				chart: {
					type: 'column',
					margin: 75,
					options3d: {
						enabled: true,
						alpha: 15,
						beta: 15,
						depth: 50,
						viewDistance: 25
					}
				},
				title: {
					text: 'Jumlah Responden'
				},
				subtitle: {
					text: 'Per program studi',
				},
				xAxis: {
					title : {
						text: 'Program Studi'
					}
				},
				yAxis: {
					title: {
						text: 'Jumlah'
					}
				},
				tooltip: {
					headerFormat: 'Responden<br>',
					valueSuffix: ' Alumni'
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				plotOptions: {
					column: {
						depth: 25
					}
				},
				series: data
			});

			TracerStudy.Statistics.respondenTotalChart = $respondenTotalChart.highcharts();

		});

	},

	getAllWorkPercentage: function (chartContainer, allYears) {

		$workPercentageLoader = $('#' + chartContainer + ' .loader');

		$workPercentageChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.work.percentage, function (data) {

			$workPercentageLoader.addClass('hidden');

			$workPercentageChart.highcharts({
				title: {
					text: 'Responden yang telah bekerja (Persentase)',
					x: -20 //center
				},
				subtitle: {
					text: 'Per angkatan dan program studi',
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
					valueSuffix: '%',
					headerFormat: '<span style="font-size: 13px">{point.key}</span><br/>'
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series: data
			});

			TracerStudy.Statistics.workPercentageChart = $workPercentageChart.highcharts();

		});

	},

	getAllWorkTotal: function (chartContainer, allYears) {

		$workTotalLoader = $('#' + chartContainer + ' .loader');

		$workTotalChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.work.total, function (data) {

			$workTotalLoader.addClass('hidden');

			$workTotalChart.highcharts({
				title: {
					text: 'Responden yang telah bekerja (Jumlah)',
					x: -20 //center
				},
				subtitle: {
					text: 'Per angkatan dan program studi',
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
						text: 'Jumlah'
					},
					plotLines: [{
						color: '#808080'
					}]
				},
				tooltip: {
					valueSuffix: ' Alumni',
					headerFormat: '<span style="font-size: 13px">{point.key}</span><br/>'
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series: data
			});

			TracerStudy.Statistics.workTotalChart = $workTotalChart.highcharts();

		});

	},

	getAllSalaryPercentage: function (chartContainer) {

		$salaryPercentageLoader = $('#' + chartContainer + ' .loader');

		$salaryPercentageChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.salary.percentage, function (data) {

			$salaryPercentageLoader.addClass('hidden');

			$salaryPercentageChart.highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: 'Pendapatan Bulanan (dalam persentase)'
				},
				subtitle: {
					text: 'Semua responden',
					x: -20
				},
				tooltip: {
					headerFormat: '<span style="font-size: 15px">{point.key}</span><br/>',
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series: [{
					type: 'pie',
					name: 'Persentase',
					data: data
				}]
			});

			TracerStudy.Statistics.salaryPercentageChart = $salaryPercentageChart.highcharts();

		});
	},

	getAllSalaryTotal: function (chartContainer) {

		$salaryTotalLoader = $('#' + chartContainer + ' .loader');

		$salaryTotalChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.salary.total, function (data) {

			$salaryTotalLoader.addClass('hidden');

			$salaryTotalChart.highcharts({
				chart: {
					type: 'column',
					margin: 75,
					options3d: {
						enabled: true,
						alpha: 15,
						beta: 15,
						depth: 50,
						viewDistance: 25
					}
				},
				title: {
					text: 'Pendapatan Bulanan (dalam jumlah)'
				},
				subtitle: {
					text: 'Semua responden',
				},
				yAxis: {
					title: {
						text: 'Jumlah'
					}
				},
				tooltip: {
					headerFormat: 'Pendapatan<br>',
					valueSuffix: ' Alumni'
				},
				plotOptions: {
					column: {
						depth: 25
					}
				},
				series: data
			});

			TracerStudy.Statistics.salaryTotalChart = $salaryTotalChart.highcharts();

		});

	},

	getAllFieldOfWorkPercentage: function (chartContainer) {

		$fowPercentageLoader = $('#' + chartContainer + ' .loader');

		$fowPercentageChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.fow.percentage, function (data) {

			$fowPercentageLoader.addClass('hidden');

			$fowPercentageChart.highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: 'Bidang Pekerjaan Tempat Kerja (dalam persentase)'
				},
				subtitle: {
					text: 'Semua responden',
					x: -20
				},
				tooltip: {
					headerFormat: '<span style="font-size: 15px">{point.key}</span><br/>',
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series: [{
					type: 'pie',
					name: 'Persentase',
					data: data
				}]
			});

			TracerStudy.Statistics.fowPercentageChart = $fowPercentageChart.highcharts();

		});
	},

	getAllFieldOfWorkTotal: function (chartContainer) {

		$fowTotalLoader = $('#' + chartContainer + ' .loader');

		$fowTotalChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.fow.total, function (data) {

			$fowTotalLoader.addClass('hidden');

			$fowTotalChart.highcharts({
				chart: {
					type: 'column',
					margin: 75,
					options3d: {
						enabled: true,
						alpha: 15,
						beta: 15,
						depth: 50,
						viewDistance: 25
					}
				},
				title: {
					text: 'Bidang Pekerjaan Tempat Kerja (dalam jumlah)'
				},
				subtitle: {
					text: 'Semua responden',
				},
				yAxis: {
					title: {
						text: 'Jumlah'
					}
				},
				tooltip: {
					headerFormat: 'Bidang Pekerjaan<br>',
					valueSuffix: ' Alumni'
				},
				plotOptions: {
					column: {
						depth: 25
					}
				},
				series: data
			});

			TracerStudy.Statistics.fowTotalChart = $fowTotalChart.highcharts();

		});
	},

	getAllRelationPercentage: function (chartContainer) {

		$relationPercentageLoader = $('#' + chartContainer + ' .loader');

		$relationPercentageChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.relation.percentage, function (data) {

			$relationPercentageLoader.addClass('hidden');

			$relationPercentageChart.highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: 'Hubungan antara Bidang Studi dengan Pekerjaan (dalam persentase)'
				},
				subtitle: {
					text: 'Semua responden',
					x: -20
				},
				tooltip: {
					headerFormat: '<span style="font-size: 15px">{point.key}</span><br/>',
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series: [{
					type: 'pie',
					name: 'Persentase',
					data: data
				}]
			});

			TracerStudy.Statistics.relationPercentageChart = $relationPercentageChart.highcharts();

		});
	},

	getAllRelationTotal: function (chartContainer) {

		$relationTotalLoader = $('#' + chartContainer + ' .loader');

		$relationTotalChart = $('#' + chartContainer + ' .chart');

		$.get(TracerStudy.API.relation.total, function (data) {

			$relationTotalLoader.addClass('hidden');

			$relationTotalChart.highcharts({
				chart: {
					type: 'column',
					margin: 75,
					options3d: {
						enabled: true,
						alpha: 15,
						beta: 15,
						depth: 50,
						viewDistance: 25
					}
				},
				title: {
					text: 'Hubungan antara Bidang Studi dengan Pekerjaan (dalam jumlah)'
				},
				subtitle: {
					text: 'Per program studi',
				},
				yAxis: {
					title: {
						text: 'Jumlah'
					}
				},
				tooltip: {
					headerFormat: 'Kecocokan<br>',
					valueSuffix: ' Alumni'
				},
				plotOptions: {
					column: {
						depth: 25
					}
				},
				series: data
			});

			TracerStudy.Statistics.relationTotalChart = $relationTotalChart.highcharts();

		});

	},

	refresh: function () {

		TracerStudy.Statistics.getGeneralInformation();
		TracerStudy.Statistics.updateRespondenTotal();
		TracerStudy.Statistics.updateWorkPercentage();
		TracerStudy.Statistics.updateWorkTotal();
		TracerStudy.Statistics.updateSalaryPercentage();
		TracerStudy.Statistics.updateSalaryTotal();
		TracerStudy.Statistics.updateFieldOfWorkPercentage();
		TracerStudy.Statistics.updateFieldOfWorkTotal();
		TracerStudy.Statistics.updateRelationPercentage();
		TracerStudy.Statistics.updateRelationTotal();

	},

	updateRespondenTotal: function () {

		$.get(TracerStudy.API.responden.total, function (data) {

			var newSeries = data;

			var s = 0;

			for (var i in newSeries) {
				TracerStudy.Statistics.respondenTotalChart.series[s].setData(newSeries[i].data);
				TracerStudy.Statistics.respondenTotalChart.series[s].pointStart = newSeries[i].pointStart;
				s++;
			}

		});

	},

	updateWorkPercentage: function () {

		$.get(TracerStudy.API.work.percentage, function (data) {

			var newSeries = data;

			var s = 0;

			for (var i in newSeries) {
				TracerStudy.Statistics.workPercentageChart.series[s].setData(newSeries[i].data);
				TracerStudy.Statistics.workPercentageChart.series[s].pointStart = newSeries[i].pointStart;
				s++;
			}

		});

	},

	updateWorkTotal: function () {

		$.get(TracerStudy.API.work.total, function (data) {

			var newSeries = data;

			var s = 0;

			for (var i in newSeries) {
				TracerStudy.Statistics.workTotalChart.series[s].setData(newSeries[i].data);
				TracerStudy.Statistics.workTotalChart.series[s].pointStart = newSeries[i].pointStart;
				s++;
			}

		});

	},

	updateSalaryPercentage: function () {

		$.get(TracerStudy.API.salary.percentage, function (data) {

			TracerStudy.Statistics.salaryPercentageChart.series[0].setData(data);

		});
	},

	updateSalaryTotal: function () {

		$.get(TracerStudy.API.salary.total, function (data) {

			var newSeries = data;

			var s = 0;

			for (var i in newSeries) {
				TracerStudy.Statistics.salaryTotalChart.series[s].setData(newSeries[i].data);
				TracerStudy.Statistics.salaryTotalChart.series[s].pointStart = newSeries[i].pointStart;
				s++;
			}

		});

	},

	updateFieldOfWorkPercentage: function () {

		$.get(TracerStudy.API.fow.percentage, function (data) {

			TracerStudy.Statistics.fowPercentageChart.series[0].setData(data);

		});
	},

	updateFieldOfWorkTotal: function () {

		$.get(TracerStudy.API.fow.total, function (data) {

			var newSeries = data;

			var s = 0;

			for (var i in newSeries) {
				TracerStudy.Statistics.fowTotalChart.series[s].setData(newSeries[i].data);
				TracerStudy.Statistics.fowTotalChart.series[s].pointStart = newSeries[i].pointStart;
				s++;
			}

		});
	},

	updateRelationPercentage: function () {

		$.get(TracerStudy.API.relation.percentage, function (data) {

			TracerStudy.Statistics.relationPercentageChart.series[0].setData(data);

		});
	},

	updateRelationTotal: function () {

		$.get(TracerStudy.API.relation.total, function (data) {

			var newSeries = data;

			var s = 0;

			for (var i in newSeries) {
				TracerStudy.Statistics.relationTotalChart.series[s].setData(newSeries[i].data);
				TracerStudy.Statistics.relationTotalChart.series[s].pointStart = newSeries[i].pointStart;
				s++;
			}

		});

	}

};