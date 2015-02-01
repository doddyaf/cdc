var Home = {

	API_URL: {
		NEWS: '/api/news',
		EVENTS: '/api/event'
	},

	newsTemplateSource: '',
	newsTemplate: '',
	eventTemplateSource: '',
	eventTemplate: '',

	init: function () {

		var monthShortNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		Handlebars.registerHelper('convertToDate', function( text ) {
			text = Handlebars.Utils.escapeExpression( text );
			var date = new Date(text);
			text = monthShortNames[ date.getMonth() ] + ' ' + date.getDate() + ', ' + date.getFullYear();
			return new Handlebars.SafeString( text );
		});

		Handlebars.registerHelper('getDate', function( text ) {
			text = Handlebars.Utils.escapeExpression( text );
			text = new Date(text);
			text = text.getDate();
			return new Handlebars.SafeString( text );
		});

		Handlebars.registerHelper('getMonth', function( text ) {
			text = Handlebars.Utils.escapeExpression( text );
			text = new Date(text);
			text = monthShortNames[ text.getMonth() ];
			return new Handlebars.SafeString( text );
		});

		Home.newsTemplateSource = $("#news-template").html();
		Home.newsTemplate = Handlebars.compile(Home.newsTemplateSource);

		Home.eventTemplateSource = $("#event-template").html();
		Home.eventTemplate = Handlebars.compile(Home.eventTemplateSource);

		Home.getRecentNews();
		Home.getLatestEvents();
	},

	createDateFromMysql: function ( mysql_string )
	{
		if (typeof mysql_string === 'string')
		{
			var t = mysql_string.split(/[- :]/);

			//when t[3], t[4] and t[5] are missing they defaults to zero
			return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
		}
		return null;
	},

	getRecentNews: function ()
	{
		$.get(Home.API_URL.NEWS, function ( data )
		{
			var newsJSON = $.parseJSON(data);

			var news = { news: newsJSON };

			var newsHtml = Home.newsTemplate(news);

			$('#news-container').prepend(newsHtml);
		});
	},

	getLatestEvents: function ()
	{
		$.get(Home.API_URL.EVENTS, function ( data )
		{
			var eventsJSON = $.parseJSON(data);

			var events = { events: eventsJSON };

			var eventsHtml = Home.eventTemplate(events);

			$('#event-container').prepend(eventsHtml);
		});
	}

};

jQuery(document).ready(function($) {
	Home.init();
});