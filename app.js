let nameTextBox = document.getElementById("nameTextBox") // Store Name
let addressTextBox = document.getElementById("addressTextBox") // Store Address
let addStoreButton = document.getElementById("addStoreButton") // Adding Store Button
let storeList = document.getElementById("storeList") // List of Stores


let addFood = document.getElementById("food-nameTextBox") // Food Name
let addQuantity = document.getElementById("quantityTextBox") // Quantity
let addPrice = document.getElementById("priceTextBox") // Price of Food
let addItemButton = document.getElementById("addFoodButton") // Adding Food Item Button
let foodList = document.getElementById("foodList") // List of Food


let selectedStore = '' // Placeholder for id of store
let database = firebase.database() // Firebase Link
let storesRef = database.ref('stores') // reference to stores in database
let stores = []

storesRef.on('value',(snapshot) => {
    stores = []
    // console.log("Value Change Event Occured")
    for(key in snapshot.val()) {
        let store = snapshot.val()[key]
        store.key = key 
        // console.log(store)
        stores.push(store)
    }
    displayStores(stores)
})

/* <span id="${store.key}" onclick='storeSelected("${store.key}")'> */

function displayStores(stores) {
    let storeItems = stores.map(store => {
        return `<div class="storeItem">
                    <span id="${store.key}" onclick='storeSelected("${store.key}")'>
                        ${store.name} - ${store.address}
                    </span>
                    <button onclick='deleteStore("${store.key}")'>Delete</button>
                </div>`
    })
    storeList.innerHTML = storeItems.join('')
}

function storeSelected(key) {
    displayStores(stores)
    selectedStore = key
    let grocerylist = document.getElementById(key)
    grocerylist.insertAdjacentHTML('beforeend', " - ADD TO THIS LIST!")
    grocerylist.style.color = "goldenrod";
    return selectedStore
}


addStoreButton.addEventListener('click',() => {
    let name = nameTextBox.value 
    nameTextBox.value = ''
    let address = addressTextBox.value
    addressTextBox.value = ''
    saveStore(name, address)
})

function saveStore(name, address) {
    storesRef.push({
        name: name, 
        address: address
    })
}

function deleteStore(key) {
    storesRef.child(key).remove()
}

displayStores()