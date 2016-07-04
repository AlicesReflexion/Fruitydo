var editmode = false;
var currentediting = 0;



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
  $(".largetextarea").hide();
  $(".largepreview").show();
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
  $(".largetextarea").show();
  $(".largepreview").hide();
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
  currentediting = taskid;
  var form = $("#form-" + taskid);
  var eventbox = form.parent().find(".eventbox");
  $(".largepreview").html(eventbox.html());
  $(".largetextarea").val(form.parent().find(".desc_input").val());
  if (editmode === false) {
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
  $.get("/static/js/largeeditor.html", function(data) {
    $("body").append(data);
  });

  $('.editorcontainer>.editcontrols, .desc_input_form').hide();
  $('.eventbox').show();
  $('.editorcontainer>.viewcontrols>.editbutton').click(showedit);
  $('.editorcontainer>.editcontrols>.cancelbutton').click(hideedit);
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

  $(".largecontrols>.deletetaskbutton").click(function() {
    var deletebutton = $("#form-" + currentediting).parent().find(".deletetaskbutton");
    deletebutton.click();
  });

  $(".largecontrols>.saveeventbutton").click(function() {
    var savebutton = $("#form-" + currentediting).parent().find(".saveeventbutton");
    savebutton.click();
  });

  $(".largecontrols>.editbutton").click(function() {
    var editbutton = $("#form-" + currentediting).parent().find(".editbutton");
    editbutton.click();
    $(this).parent().hide("slide", {direction: "up"}, 100, function() {
      $(".largecontrols.editcontrols").show("slide", {direction: "up"}, 100);
    });
  });

  $(".largecontrols>.cancelbutton").click(function() {
    var cancelbutton = $("#form-" + currentediting).parent().find(".cancelbutton");
    cancelbutton.click();
    $(this).parent().hide("slide", {direction: "up"}, 100, function() {
      $(".largecontrols.viewcontrols").show("slide", {direction: "up"}, 100);
    });
  });

  $(".largetextarea").keypress(function() {
    $("#form-" + currentediting).find(".desc_input").val($(this).val());
  });

  $("#form-" + currentediting).find("desc_input").keypress(function() {
    $(".largetextarea").val($(this).val());
  });
});
