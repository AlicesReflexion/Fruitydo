var encryptedkey;
$.get("/settings/crypto_key").done(function(data){
  encryptedkey = data;
});
console.log(encryptedkey);
var decryptedpass = Cookies.get('decryptedpass');

$(document).ready(function() {
  if(typeof decryptedpass != 'undefined'){
    $(".encryptionoverlay").hide();
  }

  $("#decbutton").click(function() {
    var userpass = $("#encpassword").val();
    try{
    decryptedpass = sjcl.decrypt(userpass, encryptedkey);
    Cookies.set('decryptedpass', decryptedpass);
    $(".encryptionoverlay").fadeOut()
    } catch(e) {
      alert("Incorrect encryption password. Try again.")
    }
  });
})

