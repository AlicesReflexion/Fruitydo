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
}

$(document).ready(function() {
  $('.hiddenbuttons, .desc_input').hide();
  $('.eventbox, .editbutton, .expandbutton').show();
  $('.editbutton').click(showedit);
  $('.cancelbutton').click(hideedit);
});

