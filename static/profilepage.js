// NON-ASYNC REQUESTS ARE DEPRECATED. DON'T DO THIS.
$.ajaxSetup({async: false});
$(function() {
  $(".datepicker").datepicker();
  $(".datepicker").each(function() {
    $(this).datepicker('option', 'altField', "#desc" + this.id);
    $(this).datepicker('option', 'dateFormat', "yy-mm-dd");
    dates = fetchdates(this.id, $.datepicker.formatDate("yy-mm", $(this).datepicker("getDate")));
    $(this).datepicker('option', 'beforeShowDay', function(date) {
      return highlightdays(date, dates);
    });
    $(this).datepicker('option', 'onChangeMonthYear', changemonth);
    $(this).datepicker('option', 'onSelect', insertdesc);
  });
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

$(function() {
  $(".accordion").accordion({
    collapsible: true
  });
});
var csrftoken = Cookies.get('csrftoken');

function changemonth(year, month) {
  dates = fetchdates(this.id, year + "-" + month);
}

$(document).ready(function() {
  $('.editbutton').click(showedit);

  $('.deletetaskbutton').click(deletetask);
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
 * @param {array} array of date strins to highlight in "yy-mm-dd" format.
 * @return {array} with true/false for selectable and css name.
 */
function highlightdays(date, array) {
  for (var i = 0; i < array.length; i++) {
    if ($.datepicker.formatDate("yy-mm-dd", date) === array[i]) {
      return [true, 'event'];
    }
  }
  return [true, ''];
}
