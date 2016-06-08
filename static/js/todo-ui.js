var editmode = false;

/**
 * hide the edit controls for this even.
 *
 * {this} input with class cancelbutton
 */
function hideedit() {
  var form = $(this).parent().parent().find(".desc_input_form");
  $(this).parent().hide("slide", {direction: "right"}, 200, function() {
    $(this).parent().find(".viewcontrols").show("fade", 50);
  });
  form.parent().find(".eventbox").show();
  form.hide();
  editmode = false;
}

/**
 * Shows the edit controls for this event.
 *
 * {this} input with class editbutton
 */
function showedit() {
  var form = $(this).parent().parent().find(".desc_input_form");
  form.show();
  form.parent().find(".eventbox").hide();
  $(this).parent().hide("fade", 50, function() {
    $(this).parent().find(".editcontrols").show("slide", {direction: "right"}, 200);
  });
  editmode = true;
}
/**
 * Shows the fullscreen editor/viewer.
 *
 * {this} button with class expandbutton
 */
function showlarge() {
  var taskid = $(this).parent().parent().find("input[name=task]").val();
  var form = $("#form-" + taskid);
  var eventbox = form.parent().find(".eventbox");
  if (editmode === false) {
    $(".largeeditor").html(eventbox.html());
    $(".largeeditor").show("slide", {direction: "up"}, 250, function() {
      $(".largecontrols.viewcontrols").show("slide", {direction: "up"}, 150);
    });
  } else {
    $(".largeeditor").show("slide", {direction: "up"}, 250, function() {
      $(".largecontrols.editcontrols").show("slide", {direction: "up"}, 150);
    });
  }
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
  $('td>.editcontrols, .desc_input_form').hide();
  $('.eventbox').show();
  $('td>.viewcontrols>.editbutton').click(showedit);
  $('td>.editcontrols>.cancelbutton').click(hideedit);
  $('.expandbutton').click(showlarge);
  $('.fade, .contractbutton').click(hidelarge);

  $(".dueinput").focus(function() {
    $(".duecalendar").slideDown(400);
  });
  $(".dueinput").focusout(function() {
    $(".duecalendar").slideUp(400);
  });

  $(".accordion").accordion({
    collapsible: true
  });
});
