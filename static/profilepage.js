// NON-ASYNC REQUESTS ARE DEPRECATED. DON'T DO THIS.
$.ajaxSetup({async: false});
var csrftoken = Cookies.get('csrftoken');

$(function() {
  $(".datepicker").datepicker();
  $(".datepicker").each(function() {
    var yymm = $.datepicker.formatDate("yy-mm", $(this).datepicker("getDate"));
    var dates = fetchdates(this.id, yymm);
    $(this).datepicker('option', {
      altField: "#desc" + this.id,
      dateFormat: "yy-mm-dd",
      beforeShowDay: function(date) {
	return highlightday(date, dates);
      },
      onChangeMonthYear: function(year, month) {
	yymm = year + "-" + month;
	dates = fetchdates(this.id, yymm);
      },
      onSelect: insertdesc
    });
  });
});

$(document).ready(function() {
  $(".accordion").accordion({
    collapsible: true
  });
  $('.editbutton').click(showedit);
  $('.deletetaskbutton').click(deletetask);

  // Due date input calendar.
  $(".duecalendar").datepicker({
    altField: ".dueinput",
    dateFormat: "yy-mm-dd"
  });
  $(".dueinput").focus(function() {
    $(".duecalendar").slideDown(400);
  });
  $(".dueinput").focusout(function() {
    $(".duecalendar").slideUp(400);
  });
});

/**
 * Shows the edit controls for this event.
 *
 * {this} input with class editbutton
 */
function showedit() {
  // id of the input is edit_button-{{taskid}}
  var words = this.id.split('-');
  var taskid = words[1];

  // hide edit button and display edit controls.
  $("#form-" + taskid).css({display: "inline"});
  $("#event" + taskid).css({display: "none"});
  $(this).css({display: "none"});

  // get current date from associated datepicker, format in "yy-mm-dd"
  var pickeddate = $("#" + taskid).datepicker("getDate");
  var datetext = $.datepicker.formatDate('yy-mm-dd', pickeddate);

  // get the unformatted markdown so it can be inserted in the textarea.
  $.post("/accounts/profile/event_fetch_raw", {
    date: datetext,
    task: taskid,
    csrfmiddlewaretoken: csrftoken
  })
  .done(function(rawdata) {
    $("#textarea" + taskid).val(rawdata);
  });
}

/**
 * Deletes the selected task.
 *
 * {this} input button with class deletetaskbutton.
 */
function deletetask() {
  // id of the input is deletetask-{{taskid}}
  var words = this.id.split('-');
  var taskid = words[1];

  if (confirm('Are you sure you want to delete this task? This cannot be undone.')) {
    $.post("/accounts/profile/task_delete", {
      task: taskid,
      csrfmiddlewaretoken: csrftoken
    })
    .done(function() {
      location.reload();
    });
  }
}

/**
 * inserts description for the relevant event into the associated div.
 *
 * @param {string} dateText String representing the date of the event in "yy-mm-dd".
 * @this {datepicker}
 */
function insertdesc(dateText) {
  var taskid = this.id;
  $.post("/accounts/profile/event_fetch_fancy", {
    date: dateText,
    task: taskid,
    csrfmiddlewaretoken: csrftoken
  })
  .done(function(data) {
    $('#event' + taskid).html(data);
  });
}

/**
 * Gets array of dates to highlight from the server.
 *
 * @param {int} taskid id of the task to return.
 * @param {int} month string representing month with dates in "yy-mm" format.
 * @return {returndates} array of date strings in "yy-mm-dd" format.
 */
function fetchdates(taskid, month) {
  var returndates;
  $.post("/accounts/profile/event_dates", {
    task: taskid,
    csrfmiddlewaretoken: csrftoken,
    month: month
  }, function(data) {
    returndates = data;
  }, 'json');
  return returndates;
}

/**
 * Highlightes dates in datepicker widget.
 *
 * @param {date} date object to check for highlighting.
 * @param {array} highdates array of strings representing dates to highlight in "yy-mm-dd"
 * @return {array} with true/false for selectable and css name.
 */
function highlightday(date, highdates) {
  for (var i = 0; i < highdates.length; i++) {
    if ($.datepicker.formatDate("yy-mm-dd", date) === highdates[i]) {
      return [true, 'event'];
    }
  }
  return [true, ''];
}
