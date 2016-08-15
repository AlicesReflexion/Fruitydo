sjcl.random.startCollectors();
var csrftoken = Cookies.get('csrftoken');

if(sjcl.random.isReady(8) === 2) {
  var randompass = sjcl.random.randomWords(1,8)[0];
  randompass += btoa(randompass);
  console.log(randompass);
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
          window.location.replace("/settings");
        });
        console.log("Encryption successfully enabled!")
      }
    }
    else {
      console.log("Passwords do not match!")
    }
  });
});

