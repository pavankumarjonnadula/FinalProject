var list = [];
console.log("Hello")

document.getElementById("menu").innerHTML = '<div class="col-12"><h1 class="menu-section-heading">Explore Menu</h1></div>';

firebase.firestore().collection(" categories")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            list.push(doc);
            console.log(doc.id, " => ", doc.data());
            document.getElementById("menu").innerHTML += ' <div class="col-12 col-md-6 col-lg-3"> <div class="menu-item-card shadow p-3 mb-3"> <img src="'+doc.data().img+'" class="menu-item-image w-100"/> <h1 class="menu-card-title">'+doc.data().name+'</h1> <a href="foodItems.html?id='+doc.id+'&name='+doc.data().name+'" class="menu-item-link"> View All <svg width="16px" height="16px" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="#d0b200" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/> </svg> </a> </div></div>';
        });
        console.log("hjd")
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

function bookRoom(data) {
    var parent = data.parentNode.parentNode.parentNode;
    var child = data.parentNode.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child);
    console.log(list[index].data());
    firebase.firestore().collection("Bookings").doc().set({
        email: firebase.auth().currentUser.email,
        roomID: list[index].id,
    }).then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}