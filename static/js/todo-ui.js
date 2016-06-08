var editmode = false;

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
  editmode = false;
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
  editmode = true;
}
/**
 * Shows the fullscreen editor/viewer.
 *
 * {this} button with class expandbutton
 */
function showlarge() {
  var words = this.id.split('-');
  var taskid = words[1];
  var html = "";
  if (editmode === false) {
    html = $("#event" + taskid).html();
    $(".largeeditor").html(html);
  } else {
    var textarea = "<textarea class=\"largetextarea\"></textarea>";
    html = $("#textarea" + taskid).val();
    $(".largeeditor").html(textarea);
    $(".largetextarea").val(html);
  }
  $(".largeeditor").show("slide", {direction: "up"}, 250, function() {
    $(".largecontrols").show("slide", {direction: "up"}, 150);
  });
  $(".fade").show("fade", 250);
}

/**
 * hides large editor/viewer
 */
function hidelarge() {
  $(".largecontrols").hide("slide", {direction: "up"}, 150, function() {
    $(".largeeditor").hide("slide", {direction: "up"}, 250);
  });
  $(".fade").hide("fade", 250);
}

$(document).ready(function() {
  $('.hiddenbuttons, .desc_input').hide();
  $('.eventbox, .editbutton, .expandbutton').show();
  $('.editbutton').click(showedit);
  $('.cancelbutton').click(hideedit);
  $('.expandbutton').click(showlarge);
  $('.fade, .contractbutton').click(hidelarge);
});

