sjcl.random.startCollectors();
var csrftoken = Cookies.get('csrftoken');

if(sjcl.random.isReady(8) === 2) {
  var randompass = sjcl.random.randomWords(1,8)[0];
  randompass += btoa(randompass);
  console.log(randompass);
}

function encryptall(password) {
  $.get("/settings/crypto_settings/all_tasks").done(function(data) {
    var encrypted = 0;
    for (i=0; i < data.length; i++) {
      encryptedevent = sjcl.encrypt(password, data[i]["description"]);
      $.post("/todo/create_event", {
        event_description: encryptedevent,
        task: data[i]["id"],
        pub_date: data[i]["pub_date"],
        csrfmiddlewaretoken: csrftoken
      }).done(function() {
        encrypted += 1;
        if(encrypted === data.length) {
          window.location.replace("/settings")
        }
      });
    }
  });
}

$(document).ready(function(){
  $('#enablebutton').click(function() {
    var pass = $('#encpass').val()
    var conPass = $('#encpass2').val()
    var accpass = $('#accpass').val()
    console.log(pass,conPass);
    if(pass === conPass) {
      var encryptedpass = sjcl.encrypt(pass, randompass);
      console.log(encryptedpass);
      pass = "";
      conPass = "";
      var pass = prompt("To confirm encryption was setup correctly, enter your encyrption password one more time.");
      try {
      var decryptedpass = sjcl.decrypt(pass, encryptedpass);
      } catch(e) {
        alert("An error occurred. Start the process again.")
      }
      if(decryptedpass === randompass) {
        $.post("/settings/crypto_settings/confirm_crypto", {
          encryptedpass: encryptedpass,
          accpass: accpass,
          csrfmiddlewaretoken: csrftoken
        }).done(function(data) {
          encryptall(decryptedpass);
        });
        console.log("Encryption successfully enabled!")
      }
    }
    else {
      console.log("Passwords do not match!")
    }
  });
});

