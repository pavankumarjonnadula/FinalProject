var list = [];

firebase.firestore().collection("Rooms")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            list.push({doc,"quantity": 1});
            console.log(doc.id, " => ", doc.data());
            document.getElementById("rooms").innerHTML += '<div class="col-12 col-md-6 col-lg-3"> <div class="shadow menu-item-card p-3 mb-3"> <img src="'+doc.data().img+'" class="menu-item-image w-100"/> <h1 class="menu-card-title">'+doc.data().type+'</h1><select onchange="quanSelected(this)"><option value="1"> 1 </option> <option value="2"> 2 </option> <option value="3"> 3 </option> <option value="4"> 4 </option> <option value="5"> 5 </option> </select> <br/> <label for="from">From</label> <input class="ml-1" type="date" id="from" onchange="fromDateSelected(this)"/><br/> <label for="from">To</label> <input class="ml-4" type="date" id="to" onchange="toDateSelected(this)"/><br/><p class="cost">Rs.'+doc.data().amount+'/-</p><br/> <button class="btn btn-primary" onclick="bookRoom(this)">Book Now</button> </div></div>';
        });
        console.log(list);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

function bookRoom(data) {
    var parent = data.parentNode.parentNode.parentNode;
    var child = data.parentNode.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child);
    console.log(list[index].doc.data());
    firebase.firestore().collection("Bookings").doc().set({
        email: firebase.auth().currentUser.email,
        uid: firebase.auth().currentUser.uid,
        roomID: list[index].doc.id,
        
        quantity: list[index].quantity,
        fromDate: new Date(list[index].fromDate),
        toDate: new Date(list[index].toDate),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
            console.log("Document successfully written!");
            alert("Room is booked successfully");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function quanSelected(data) {
    var parent = data.parentNode.parentNode.parentNode;
    var child = data.parentNode.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child);
    list[index]['quantity'] = data.value;
}

function fromDateSelected(data) {
    var parent = data.parentNode.parentNode.parentNode;
    var child = data.parentNode.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child);
    list[index]['fromDate'] = data.value;
    console.log(data.value);
}

function toDateSelected(data) {
    var parent = data.parentNode.parentNode.parentNode;
    var child = data.parentNode.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child);
    list[index]['toDate'] = data.value;
    console.log(data.value);
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    
    } else {
     window.location.href = "loginpage.html"
    }
  });