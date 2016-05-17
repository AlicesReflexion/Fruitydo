$(function() {
	$(".datepicker").each(function() {
		$(this).datepicker('option', 'altField', "#desc" + this.id);
		$(this).datepicker('option', 'dateFormat', "yy-mm-dd");
		$(this).datepicker('option', 'beforeShowDay', highlightdays)
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

function highlightdays(date) {
	if ($.datepicker.formatDate("yy-mm-dd", date) == '2016-05-05')
		return [true, 'event']
	else
		return [true, '']
}
