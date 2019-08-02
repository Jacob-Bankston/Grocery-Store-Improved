let database = firebase.database(); // Firebase Link
let storesRef = database.ref("stores"); // Reference to stores in database
let groceryItemRef = database.ref("groceryItems"); // Reference to grocery item in database

let storeNameTextBox = document.getElementById("nameTextBox"); // Store Name
let addressTextBox = document.getElementById("addressTextBox"); // Store Address
let addStoreButton = document.getElementById("addStoreButton"); // Adding Store Button

let storeList = document.getElementById("storeList"); // List of Stores

let addFoodName = document.getElementById("addFoodName"); // Food Name
let addQuantityOfFood = document.getElementById("addQuantityOfFood"); // Quantity
let addPriceOfFood = document.getElementById("addPriceOfFood"); // Price of Food
let addFoodItemButton = document.getElementById("addFoodItemButton"); // Adding Food Item Button

let foodList = document.getElementById("foodList"); // List of Food

let SelectedStoreKey = ''
let stores = []
let groceryItems = []

storesRef.on("value", snapshot => {
    stores = [];
    for (key in snapshot.val()) {
        let store = snapshot.val()[key];
        store.key = key;
        stores.push(store);
    }
    displayStores(stores);
});

groceryItemRef.on("value", snapshot => {
    groceryItems = [];
    for (key in snapshot.val()) {
        let item = snapshot.val()[key];
        item.key = key;
        groceryItems.push(item);
    }
    displayGroceryItems(groceryItems);
})

function displayStores(stores) {
    if(checkIfThereAreStores()) {
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
}

function displayGroceryItems(items) {
    if(checkIfAStoreIsSelected()) {
        checkIfAStoreIsSelected();
        let groceryItems = items.map(item => {
            if(item.storeId === SelectedStoreKey) {
                return `<div class="groceryItem">
                            <span>${item.foodName}</span>
                            <span>${item.quantityOfFood}</span>
                            <span>${item.priceOfFood}</span>
                            <button onclick='deleteGroceryItem("${item.key}")'>Delete</button>
                        </div>`;
            };
        });
        foodList.innerHTML = groceryItems.join("");
    }
}

function selectStore(key) {
    SelectedStoreKey = key;
    grocerylist.style.color = "goldenrod";
    return SelectedStoreKey;
}

function checkIfThereAreStores() {
    if(stores === undefined) {
        return false
    } else {
        return true
    }
}

function checkIfAStoreIsSelected() {
    if(SelectedStoreKey == '') {
        return false
    } else {
        return true
    }
}

addStoreButton.addEventListener("click", () => {
  let name = nameTextBox.value;
  nameTextBox.value = "";
  let address = addressTextBox.value;
  addressTextBox.value = "";
  saveStore(name, address);
});

addFoodItemButton.addEventListener("click", () => {
    checkIfAStoreIsSelected()
    let foodName = addFoodName.value;
    addFoodName.value = "";
    let quantityOfFood = addQuantityOfFood.value;
    addQuantityOfFood.value = "";
    let priceOfFood = addPriceOfFood.value;
    addPriceOfFood.value = "";
    saveGroceryItem(SelectedStoreKey, foodName, quantityOfFood, priceOfFood);
});

function deleteStore(key) {
  storesRef.child(key).remove();
}

function deleteGroceryItem(key) {
  groceryItemRef.child(key).remove();
}

function saveStore(name, address) {
    // A Store entry.
    let userStoreInput = {
      name: name,
      address: address,
      key: '',
    };
  
    // Get a key for a new Store.
    let newStoreKey = firebase.database().ref("stores").push().key;
    userStoreInput[key] = newStoreKey;
  
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
        key: '',
        store: storeId
    };
  
    // Get a key for a new Grocery Item.
    let newGroceryItemKey = firebase.database().ref("groceryItems").push().key;
    userGroceryItemInput[key] = newGroceryItemKey;
  
    // Write the new Grocery Item into the Store that was selected!
    let updates = {};
    updates['/groceryItems/' + newGroceryItemKey] = userGroceryItemInput;
  
    return firebase.database().ref().update(updates);
}

displayStores();
displayGroceryItems();