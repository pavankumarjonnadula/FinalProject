const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

const product = urlParams.get('id')
console.log(product);

var list = [];

document.getElementById("items").innerHTML = '<div class="col-12"><h1 class="menu-section-heading" id="cname">'+urlParams.get('name')+'</h1></div>';


firebase.firestore().collection("Food Items").where("id", "==", urlParams.get('id') )
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            list.push({doc, "quantity": 1});
            console.log(doc.id, " => ", doc.data());
            document.getElementById("items").innerHTML += '<div class="col-12 col-md-6 col-lg-3"> <div class="shadow menu-item-card p-3 mb-3"> <img src="'+doc.data().img+'" class="menu-item-image w-100"/> <h1 class="menu-card-title">'+doc.data().name+'</h1> <select onchange="quanSelected(this)"> <option value="1"> 1 </option> <option value="2"> 2 </option> <option value="3"> 3 </option> <option value="4"> 4 </option> <option value="5"> 5 </option> </select> <button class="btn btn-primary" onclick="orderFoodItem(this)">Add to cart</button> </div></div>';
        });
        console.log(list);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    
function orderFoodItem(data) {
    var parent = data.parentNode.parentNode.parentNode;
    var child = data.parentNode.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child) -1;
    console.log(index);
    console.log(child);
    firebase.firestore().collection("Orders").doc().set({
        email: firebase.auth().currentUser.email,
        itemID: list[index].doc.id,
        quantity: list[index].quantity,
        uid: firebase.auth().currentUser.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
            console.log("Document successfully written!");
            alert("Food Item is ordered successfully");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function quanSelected(data) {
    var parent = data.parentNode.parentNode.parentNode;
    var child = data.parentNode.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, child) -1;
    list[index]['quantity'] = data.value;
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    
    } else {
     window.location.href = "loginpage.html"
    }
  });