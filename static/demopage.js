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
	</div>
      </td>
    </tr>
  </table>
</div>
`;

$(document).ready(function() {
  var tasks = Cookies.getJSON("tasks");
  var taskhtml = "";
  if (typeof tasks === "undefined") {
    tasks = [];
  }

  tasks.forEach(function(element, index, array) {
    taskhtml += calendarhtml;
    taskhtml = taskhtml.replace(/%title%/g, element.title);
    taskhtml = taskhtml.replace(/%id%/g, index);
    $(".incompletetasks").html(taskhtml);
  });

  $(".accordion").accordion({
    collapsible: true
  });
  $(".datepicker").datepicker();

  $(".newtaskbutton").click(function() {
    var tasktitle = $(".task_title").val();
    var taskdue = $(".dueinput").val();
    var task = {title: tasktitle, duedate: taskdue};
    tasks.push(task);
    console.log(tasks);
    Cookies.set('tasks', tasks);
    location.reaload();
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
