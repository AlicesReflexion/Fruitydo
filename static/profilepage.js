$(function() {
	$(".datepicker").datepicker();
	$(".datepicker").each(function() {
		$(this).datepicker('option', 'altField', "#desc" + this.id);
		$(this).datepicker('option', 'dateFormat', "yy-mm-dd");
	})
});

$(function() {
	$(".accordion").accordion();
});
var csrftoken = Cookies.get('csrftoken');

$(document).ready(function(){
	$('.editbutton').click(function(){
		words = this.id.split('-');
		$("#form-" + words[1]).css({"display":"inline"});
		$("#" + this.id).css({"display":"none"});
	});
});
