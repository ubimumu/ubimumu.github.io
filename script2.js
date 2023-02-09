// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyB-M5gEsrLqTwzGVwweqQRZQgzkdGNrGLM",
    authDomain: "ubihub-56d91.firebaseapp.com",
    databaseURL: "https://ubihub-56d91-default-rtdb.firebaseio.com",
    projectId: "ubihub-56d91",
    storageBucket: "ubihub-56d91.appspot.com",
    messagingSenderId: "483421633579",
    appId: "1:483421633579:web:3969d9806e5eea278f3e6e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const user = auth.currentUser;

function signUp() {
    var user = auth.currentUser;
    if (user) {
        alert("Already Logged in")
    } else {
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        auth.createUserWithEmailAndPassword(email.value, password.value).catch(e => alert(e.message));
    }
}

function signIn() {
    var user = auth.currentUser;
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    if (!(user)) {
        auth.signInWithEmailAndPassword(email.value, password.value).catch(e => alert(e.message));
alert("Success!")
    } else {
        alert("Already Logged in!");
 window.location.assign('account.html');
    }
}

function signOut() {
    var user = auth.currentUser;
    if (user) {
        if (confirm(" Are you sure to Logout?")) {
            auth.signOut().catch(e => alert(e.message));
            alert("Signed Out!");
        }
    } else {
                window.location.assign('login.html');
    }
}




firebase.auth().onAuthStateChanged((user) => {
  if (user) {
   var email_id = user.email;
      document.getElementById("usermail").innerHTML = email_id;

  var emailVerified = user.emailVerified; 
 document.getElementById("userverify").innerHTML = emailVerified;

    user.sendEmailVerification()
    var uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

function verifyy() {

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
 
    user.sendEmailVerification()
alert("Verification link has been sent!")
    var uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
    
}


     

  



