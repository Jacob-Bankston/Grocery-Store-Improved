class Store {
    constructor(name, address) {
        this.name = name
        this.address = address
        this.userId = ''
        this.groceryItems = []
    }

    addGroceryItem(name, quantity, price) {
        this.groceryItems.push(name, quantity, price)
    }
}