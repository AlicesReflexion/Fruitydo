const calendarhtml = `<h3>%title%</h3>
<div>
  <table class="task_calendar">
    <tr>
      <td>
	<div class="datepicker" id="%id%"></div>
      </td>
      <td>
	<div class="eventbox" id="event%id%"></div>
	<div class="editbuttons">
	  <input type="button" value="edit" class="editbutton" id="edit_button-%id%">
	  <form method="post" class="desc_input_form" id="form-%id%">
	    <textarea class="desc_input" id="textarea%id%"></textarea>
	    <input type="button" value="Save" class="saveeventbutton">
	    <input type="button" value="Delete" class="deletetaskbutton" id="deletetask-%id%">
	    <input type="button" value="Cancel" class="cancelbutton" id="cancel-%id%">
	  </form>
	</div>
      </td>
    </tr>
  </table>
</div>
`;

function makeDatepickers(datepicker) {
  datepicker.datepicker();
  datepicker.datepicker('option', {
    onSelect: function(datetext) {
      $("#event" + this.id).html(datetext);
    },
    dateFormat: "yy-mm-dd"
  });
}

$(document).ready(function() {
  var tasks = Cookies.getJSON("tasks");
  var taskhtml = "";
  if (typeof tasks === "undefined") {
    tasks = [];
  }

  tasks.forEach(function(element, index) {
    taskhtml += calendarhtml;
    taskhtml = taskhtml.replace(/%title%/g, element.title);
    taskhtml = taskhtml.replace(/%id%/g, index);
    $(".incompletetasks").html(taskhtml);
  });

  $(".datepicker").each(function() {
    makeDatepickers($(this));
  });

  $(".accordion").accordion({
    collapsible: true
  });

  $(".newtaskbutton").click(function() {
    var tasktitle = $(".task_title").val();
    var taskdue = $(".dueinput").val();
    var task = {title: tasktitle, duedate: taskdue};
    tasks.push(task);
    console.log(tasks);
    Cookies.set('tasks', tasks);
    location.reload();
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
