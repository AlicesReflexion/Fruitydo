$(function() {
	$(".datepicker").each(function() {
		$(this).datepicker('option', 'altField', "#desc" + this.id);
		$(this).datepicker('option', 'dateFormat', "yy-mm-dd");
		$(this).datepicker('option', 'beforeShowDay', function(date){return highlightdays(date, dates)});
	})
});

$(function() {
	$(".accordion").accordion({
		collapsible: true
	});
});
var csrftoken = Cookies.get('csrftoken');

$(document).ready(function(){
	$('.editbutton').click(function(){
		words = this.id.split('-');
		$("#form-" + words[1]).css({"display":"inline"});
		$("#event" + words[1]).css({"display":"none"});
		$("#" + this.id).css({"display":"none"});
	});
});

var dates = ['2016-05-05', '2016-05-12', '2016-05-18'];

function highlightdays(date, highdates) {

	for (var i = 0; i < highdates.length; i++) {
		if ($.datepicker.formatDate("yy-mm-dd", date) == highdates[i]) {
			return [true, 'event'];
		}
	}
	return [true, ''];
}
