var encryptedkey;
$.get("/settings/crypto_key").done(function(data){
  encryptedkey = data;
});
console.log(encryptedkey);

$(document).ready(function() {
  $("#decbutton").click(function() {
    var userpass = $("#encpassword").val();
    try{
    var decryptedpass = sjcl.decrypt(userpass, encryptedkey);
    $(".encryptionoverlay").fadeOut()
    } catch(e) {
      alert("Incorrect encryption password. Try again.")
    }
  });
})

