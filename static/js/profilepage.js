// NON-ASYNC REQUESTS ARE DEPRECATED. DON'T DO THIS.
$.ajaxSetup({async: false});
var csrftoken = Cookies.get('csrftoken');

$(function() {
  $(".datepicker").datepicker();
  $(".datepicker").each(function() {
    var yymm = $.datepicker.formatDate("yy-mm", $(this).datepicker("getDate"));
    var dates = fetchdates(this.id, yymm);
    var eventdates = dates.eventdates;
    var duedate = dates.due_date;
    $(this).datepicker('option', {
      altField: "#desc" + this.id,
      dateFormat: "yy-mm-dd",
      beforeShowDay: function(date) {
        var highlightevent = highlightday(date, eventdates, 'event');
        var highlightdue = highlightday(date, duedate, 'due');
        var compare = [true, ""].toString();
        if (highlightevent.toString() === compare) {
          return highlightdue;
        }
        return highlightevent;
      },
      onChangeMonthYear: function(year, month) {
        yymm = year + "-" + month;
        dates = fetchdates(this.id, yymm);
        eventdates = dates.eventdates;
        duedate = dates.due_date;
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
  $('.cancelbutton').click(hideedit);

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
  $(".expandbutton.leftmost").hide("fade", 50);
  $(this).hide("fade", 50, function() {
    $("#hiddenbuttons-" + taskid).show("slide", {direction: "right"}, 200);
  });
  $("#textarea" + taskid).show();
  $("#event" + taskid).hide();

  // get current date from associated datepicker, format in "yy-mm-dd"
  var pickeddate = $("#" + taskid).datepicker("getDate");
  var datetext = $.datepicker.formatDate('yy-mm-dd', pickeddate);

  // get the unformatted markdown so it can be inserted in the textarea.
  $.post("/todo/event_fetch_raw", {
    date: datetext,
    task: taskid,
    csrfmiddlewaretoken: csrftoken
  })
  .done(function(rawdata) {
    $("#textarea" + taskid).val(rawdata);
  });
}

/**
 * hide the edit controls for this even.
 *
 * {this} input with class cancelbutton
 */
function hideedit() {
  var words = this.id.split('-');
  var taskid = words[1];

  $("#hiddenbuttons-" + taskid).hide("slide",
      {direction: "right"},
      200,
      function() {
        $("#edit_button-" + taskid).show("fade", 50);
        $(".expandbutton.leftmost").show("fade", 50);
      });
  $("#event" + taskid).show();
  $("#textarea" + taskid).hide();
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
    $.post("/todo/task_delete", {
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
  $.post("/todo/event_fetch_fancy", {
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
  $.post("/todo/event_dates", {
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
 * @param {string} objclass class to give the date
 * @return {array} with true/false for selectable and css name.
 */
function highlightday(date, highdates, objclass) {
  for (var i = 0; i < highdates.length; i++) {
    if ($.datepicker.formatDate("yy-mm-dd", date) === highdates[i]) {
      return [true, objclass];
    }
  }
  return [true, ''];
}
