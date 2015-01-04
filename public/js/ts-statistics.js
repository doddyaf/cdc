jQuery(document).ready(function($) {
	var chartContainers = {};

	chartContainers.responden = {
		percentage: 'js-chart-responden-percentage-container',
		total: 'js-chart-responden-total-container'
	};

	chartContainers.work = {
		percentage: 'js-chart-work-percentage-container',
		total: 'js-chart-work-total-container'
	};

	chartContainers.salary = {
		percentage: 'js-chart-salary-percentage-container',
		total: 'js-chart-salary-total-container'
	};

	chartContainers.fow = {
		percentage: 'js-chart-fow-percentage-container',
		total: 'js-chart-fow-total-container'
	};

	chartContainers.relation = {
		percentage: 'js-chart-relation-percentage-container',
		total: 'js-chart-relation-total-container'
	};

	TracerStudy.Statistics.init( chartContainers );
});