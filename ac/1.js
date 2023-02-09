firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
  } else {
  window.location.assign('login.html');
  }
});