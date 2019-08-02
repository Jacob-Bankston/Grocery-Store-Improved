let database = firebase.database(); // Firebase Link
let storesRef = database.ref("stores"); // Reference to stores in database

let storeNameTextBox = document.getElementById("nameTextBox"); // Store Name
let addressTextBox = document.getElementById("addressTextBox"); // Store Address
let addStoreButton = document.getElementById("addStoreButton"); // Adding Store Button

let storeList = document.getElementById("storeList"); // List of Stores

let addFoodName = document.getElementById("addFoodName"); // Food Name
let addQuantityOfFood = document.getElementById("addQuantityOfFood"); // Quantity
let addPriceOfFood = document.getElementById("addPriceOfFood"); // Price of Food
let addFoodItemButton = document.getElementById("addFoodButton"); // Adding Food Item Button

let foodList = document.getElementById("foodList"); // List of Food


storesRef.on("value", snapshot => {
  stores = [];
  for (key in snapshot.val()) {
    let store = snapshot.val()[key];
    store.key = key;
    stores.push(store);
  }
  displayStores(stores);
});

function displayStores(stores) {
  let storeItems = stores.map(store => {
    return `<div class="storeItem">
                <span onclick='storeSelected("${store.key}")'>${store.name} - ${store.address}</span>
                <button onclick='deleteStore("${store.key}")'>Delete</button>
            </div>`;
  });
  storeList.innerHTML = storeItems.join("");
}

function storeSelected(key) {
  displayStores(stores);
  selectedStore = key;
  let grocerylist = document.getElementById(key);
  grocerylist.insertAdjacentHTML("beforeend", " - ADD TO THIS LIST!");
  grocerylist.style.color = "goldenrod";
  return selectedStore;
}

addStoreButton.addEventListener("click", () => {
  let name = nameTextBox.value;
  nameTextBox.value = "";
  let address = addressTextBox.value;
  addressTextBox.value = "";
  saveStore(name, address);
});

addFoodItemButton.addEventListener("click", () => {
  let foodName = addFoodName.value;
  addFoodName.value = "";
  let quantityOfFood = addQuantityOfFood.value;
  addQuantityOfFood.value = "";
  let priceOfFood = addPriceOfFood.value;
  addPriceOfFood.value = "";
  saveGroceryItem(foodName, quantityOfFood, priceOfFood);
});

function deleteStore(key) {
  storesRef.child(key).remove();
}

function saveStore(name, address) {
    // A post entry.
    let userStoreInput = {
      name: name,
      address: address,
      storeKey: '',
    };
  
    // Get a key for a new Post.
    let newStoreKey = firebase.database().ref().push().key;
    userStoreInput[storeKey] = newStoreKey;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates['/stores/' + newStoreKey] = userStoreInput;
  
    return firebase.database().ref().update(updates);
}

function saveGroceryitem(storeId, foodName, quantityOfFood, priceOfFood) {
    // A post entry.
    let userGroceryItemInput = {
        foodName: foodName,
        quantityOfFood: quantityOfFood,
        priceOfFood: priceOfFood,
        itemKey: ''
    };
  
    // Get a key for a new Post.
    let newGroceryItemtKey = firebase.database().ref().child('/stores/' + storeId).push().key;
    userGroceryItemInput[storeId] = newGroceryItemtKey;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates['/stores/' + storeId + '/' + newGroceryItemtKey] = userGroceryItemInput;
  
    return firebase.database().ref().update(updates);
}

displayStores();