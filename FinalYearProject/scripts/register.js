var email = document.getElementById("email");
var password = document.getElementById("password");
var cpassword = document.getElementById("cpassword");
var userName = document.getElementById("name");
var phone = document.getElementById("phone");



function register() {
    if(email.value == "") return alert("Please enter your email");
    if(password.value == "") return alert("Please enter your password");
    if(phone.value == "") return alert("Please enter your mobile number");
    if(userName.value == "") return alert("Please enter your Name");

    if(password.value != cpassword.value) return alert("Passwords not matched");
    console.log(email.value);
    console.log(password.value);

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {

            var user = userCredential.user;
            console.log(user);
            saveData();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}


function saveData() {
    var user = firebase.auth().currentUser;
    firebase.firestore().collection("Users").doc(user.uid).set({
        name: userName.value,
        phone: phone.value,
        email: user.email
    })
        .then(() => {
            console.log("Document successfully written!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}