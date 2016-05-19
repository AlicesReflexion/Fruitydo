$.ajaxSetup({async:false});
//DEPRECATED. DON'T DO THIS.
$(function() {
	$(".datepicker").datepicker();
	$(".datepicker").each(function() {
		$(this).datepicker('option', 'altField', "#desc" + this.id);
		$(this).datepicker('option', 'dateFormat', "yy-mm-dd");
		dates = fetchdates(this.id, $.datepicker.formatDate("mm",$(this).datepicker("getDate")));
		$(this).datepicker('option', 'beforeShowDay', function(date){return highlightdays(date, dates)});
		$(this).datepicker('option', 'onChangeMonthYear', changemonth)
		$(this).datepicker('option', 'onSelect', insertdesc)
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

function insertdesc(dateText)
{
	taskid = this.id
	$.post("/accounts/profile/event_fetch_fancy", {
		date: dateText,
		task: taskid,
		csrfmiddlewaretoken: csrftoken
	})
	.done(function(data){
		$('#event' + taskid).html(data);
	});
	dates = fetchdates(this.id, $.datepicker.formatDate("mm",$(this).datepicker("getDate")));

}

function changemonth(year, month){
	dates = fetchdates(this.id, month)
}

$(document).ready(function(){
	$('.editbutton').click(function(){
		var words = this.id.split('-');
		var taskid = words[1];
		$("#form-" + taskid).css({"display":"inline"});
		$("#event" + taskid).css({"display":"none"});
		$("#" + this.id).css({"display":"none"});

		var pickeddate = $("#" + taskid).datepicker("getDate");
		var datetext = $.datepicker.formatDate('yy-mm-dd', pickeddate);
		$.post("/accounts/profile/event_fetch_raw", {
			date: datetext,
			task: taskid,
			csrfmiddlewaretoken: csrftoken,
		})
		.done(function(rawdata){
			$("#textarea" + taskid).val(rawdata);
		});
	});

	$('.deletetaskbutton').click(function(){
		var words = this.id.split('-');
		var taskid = words[1];
		if (confirm('Are you sure you want to delete this task? This cannot be undone.')) {
			$.post("/accounts/profile/task_delete", {
				task: taskid,
				csrfmiddlewaretoken: csrftoken,
			})
			.done(function(){
				location.reload();
			});
		}
	});

});

function fetchdates(taskid, month) {
	$.post("/accounts/profile/event_dates", {
		task: taskid,
		csrfmiddlewaretoken: csrftoken,
		month: month
		},function(data){returndates = data;},'json');
	return returndates;
}

function highlightdays(date, highdates) {
	for (var i = 0; i < highdates.length; i++) {
		if ($.datepicker.formatDate("yy-mm-dd", date) == highdates[i]) {
			return [true, 'event'];
		}
	}
	return [true, ''];
}
