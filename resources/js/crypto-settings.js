var encryptedkey;
var csrftoken = Cookies.get('csrftoken');
$(document).ready(function() {
  $("#changebutton").click(function() {
    Cookies.remove('decryptedpass');
    var currentpass = $("#currentpass").val();
    var newpass = $("#newpass").val();
    var confnewpass = $("#confnewpass").val();
    var accpass = $("#accpass").val();
    $.get("/settings/crypto_key").done(function(data){
      encryptedkey = data;
      try {
        var decryptedpass = sjcl.decrypt(currentpass, encryptedkey);
        if(newpass === confnewpass && newpass != ""){
          var newencrypted = sjcl.encrypt(newpass, decryptedpass);
          $.post("/settings/crypto_settings/confirm_crypto", {
            encryptedpass: newencrypted,
            accpass: accpass,
            csrfmiddlewaretoken: csrftoken 
          }).done(function() {
            window.location.replace("/settings");
          });
        }
        } catch(e) {
          alert("Incorrect encryption password! Try again.");
        }
    });
  })
})
