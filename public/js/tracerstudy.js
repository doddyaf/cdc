var TracerStudy = {};

TracerStudy.Form = {};

TracerStudy.Form.init = function() {
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
* Initialize Tracer Study statistics, make sure include highchart.js before this file
* @param container_id_first -> the id of first chart container
* @param container_id_second -> the id of second chart container
*/
TracerStudy.Statistics.init = function(container_id_first, container_id_second) {
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
            categories: ['1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000']
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
        series: [{
            name: 'Informatika',
            data: [95,90,80,76,82,66,70,88,78]
        }, {
            name: 'Teknik Kimia',
            data: [90,89,83,72,86,62,71,84,79]
        }, {
            name: 'Teknik Industri',
            data: [92,91,86,74,83,61,73,87,74]
        }, {
            name: 'Teknik Mesin',
            data: [98,98,87,71,89,67,75,89,73]
        }]
    });
};
