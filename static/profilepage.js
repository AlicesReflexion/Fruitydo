$(function() {
	$(".datepicker").datepicker();
	$(".datepicker").each(function() {
		$(this).datepicker('option', 'altField', "#desc" + this.id);
		$(this).datepicker('option', 'dateFormat', "yy-mm-dd");
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
			});
		}
	});
});
