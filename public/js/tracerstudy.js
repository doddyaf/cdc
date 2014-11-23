/*
* TracerStudy namespace, make sure include jQuery and Highchart.js before this file
*/
var TracerStudy = {};

TracerStudy.Form = {};

TracerStudy.Form.init = function() {

    $('#input-status').change(function(event) {
        var value = $(this).val();
        var inputGroupWork = $('#input-group-work');
        
        if (value == 1) {
            inputGroupWork.removeClass('hidden');
        }
        else {
            inputGroupWork.addClass('hidden');
        }
    });

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

TracerStudy.Statistics = {};

/*
* Initialize Tracer Study statistics
* @param container_id_first -> the id of first chart container
* @param container_id_second -> the id of second chart container
*/
TracerStudy.Statistics.init = function(container_id_first, container_id_second) {
    var currentDate = new Date();

    var currentYear = currentDate.getFullYear();

    var lastGraduation = 2010;

    var yearStart = 1983;

    var allYears = [];

    for (var i = yearStart; i <= lastGraduation; i++) {
        allYears.push(yearStart);
        yearStart++;
    }

    console.log(allYears);

    var allPercentage;

    $.get('http://localhost:3000/api/ts/percentage', function(data) {
        allPercentage = data;

        $('#' + container_id_first).highcharts({
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
            series: allPercentage
        });
    });
};
