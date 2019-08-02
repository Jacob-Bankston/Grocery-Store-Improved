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
                <div class="storeButtons">
                    <button onclick='selectStore("${store.key}")'>Add Item</button>
                    <button onclick='deleteStore("${store.key}")'>Delete</button>
                </div>
                <span class="storeNameInfo">${store.name}</span>
                <span class="storeAddressInfo">${store.address}</span>
                <div id="${store.key}" class="groceryItemsListOnTheStore"></div>
            </div>`;
  });
  storeList.innerHTML = storeItems.join("");
}

function displayGroceryItems(items) {
  let groceryItems = items.map(item => {
    return `<div class="groceryItem">
                <span>${item.foodName}</span>
                <span>${item.quantityOfFood}</span>
                <span>${item.priceOfFood}</span>
                <button onclick='deleteGroceryItem("${item.key}")'>Delete</button>
            </div>`;
  });
  foodList.innerHTML = groceryItems.join("");
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

function deleteGroceryItem(key) {
  let groceryItemRef = storesRef.equalTo();
  groceryItemRef.child(key).remove();
}


function saveStore(name, address) {
    // A Store entry.
    let userStoreInput = {
      name: name,
      address: address,
      storeKey: '',
    };
  
    // Get a key for a new Store.
    let newStoreKey = firebase.database().ref().push().key;
    userStoreInput[storeKey] = newStoreKey;
  
    // Write the new store's data.
    let updates = {};
    updates['/stores/' + newStoreKey] = userStoreInput;
  
    return firebase.database().ref().update(updates);
}

function saveGroceryitem(storeId, foodName, quantityOfFood, priceOfFood) {
    // A Grocery Item entry.
    let userGroceryItemInput = {
        foodName: foodName,
        quantityOfFood: quantityOfFood,
        priceOfFood: priceOfFood,
        itemKey: ''
    };
  
    // Get a key for a new Grocery Item.
    let newGroceryItemtKey = firebase.database().ref().child('/stores/' + storeId).push().key;
    userGroceryItemInput[storeId] = newGroceryItemtKey;
  
    // Write the new Grocery Item into the Store that was selected!
    let updates = {};
    updates['/stores/' + storeId + '/' + newGroceryItemtKey] = userGroceryItemInput;
  
    return firebase.database().ref().update(updates);
}

displayStores();