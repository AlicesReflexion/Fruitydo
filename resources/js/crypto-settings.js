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

  $("#disablebutton").click(function() {
    Cookies.remove("decryptedpass");
    var encpass = $("#currentpass_disable").val();
    $.get("/settings/crypto_key").done(function(data){
      encryptedkey = data;
      decryptedpass = sjcl.decrypt(encpass, encryptedkey);
      $.get("/settings/crypto_settings/all_tasks").done(function(data) {
        for (i=0; i < data.length; i++){
          decryptedevent = sjcl.decrypt(decryptedpass, data[i]["description"]);
          $.post("/todo/create_event", {
            event_description: decryptedevent,
            task: data[i]["id"],
            pub_date: data[i]["pub_date"],
            csrfmiddlewaretoken: csrftoken
          })
        }
        $.get("/settings/crypto_settings/disable_crypto").done(function() {
          window.location.replace("/settings")
        });
      });
    });
  });
});
