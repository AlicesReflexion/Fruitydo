$(document).ready(function() {
  var tasks = Cookies.getJSON("tasks");
  if (typeof tasks === "undefined") {
    tasks = [];
  }
  console.log(tasks);

  $(".newtaskbutton").click(function() {
    var tasktitle = $(".task_title").val();
    var taskdue = $(".dueinput").val();
    var task = {title: tasktitle, duedate: taskdue};
    tasks.push(task);
    console.log(tasks);
    Cookies.set('tasks', tasks);
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
