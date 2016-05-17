$(function() {
	$(".datepicker").datepicker();
	$(".datepicker").each(function() {
		$(this).datepicker('option', 'altField', "#desc" + this.id);
		$(this).datepicker('option', 'dateFormat', "yy-mm-dd");
	})
	$(".duecalendar").datepicker({
		altField: ".dueinput",
		dateFormat: "yy-mm-dd",
	});

	$(".dueinput").focus(function(){
		$(".duecalendar").slideDown(400);
	});

	$(".dueinput").focusout(function(){
		$(".duecalendar").slideUp(400);
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
