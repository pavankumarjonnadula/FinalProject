var email = document.getElementById("email");
var password = document.getElementById("password");

function login() {
    if(email.value == "") return alert("Please enter your email");
    if(password.value == "") return alert("Please enter your password");
   
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          
            var user = userCredential.user;
            console.log(user);
            window.location.href = "index.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}