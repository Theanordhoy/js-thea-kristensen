const cartContainer = document.querySelector(".cart-container")
const totalPriceElement = document.querySelector(".total-price")
const clearCartButton = document.querySelector(".clear-cart-button")

let cart = JSON.parse(localStorage.getItem("cart")) || []

const groupedCart = {}

cart.forEach(product => {
    if (groupedCart[product.id]) {
        groupedCart[product.id].quantity += 1
    } else {
        groupedCart[product.id] = { ...product, quantity: 1 }
    }
})

const cartItems = Object.values(groupedCart)

let total = 0

if (cartItems.length === 0) {
    cartContainer.textContent = "Your cart is empty"
} else {
    cartItems.forEach(product => {
        const item = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const quantity = document.createElement("p")
        const increaseButton = document.createElement("button")
        const decreaseButton = document.createElement("button")
        const removeButton = document.createElement("button")

        item.className = "cart-item"
        image.className = "cart-product-image"
        increaseButton.className = "quantity-button"
        decreaseButton.className = "quantity-button"
        removeButton.className = "remove-button"

        image.src = product.image.url 
        image.alt = product.image.alt 
        title.textContent = product.title
        price.textContent = `$${product.price}`
        quantity.textContent = `Quantity: ${product.quantity}`
        increaseButton.textContent = "+"
        decreaseButton.textContent = "-"
        removeButton.textContent = "Remove"

        increaseButton.addEventListener("click", () => {
            updateQuantity(product.id, 1)
        })
        
        decreaseButton.addEventListener("click", () => {
            updateQuantity(product.id, -1)
        })
        
        removeButton.addEventListener("click", () => {
            removeFromCart(product.id)
        })

        total += product.price * product.quantity
        
        item.appendChild(image)
        item.appendChild(title)
        item.appendChild(price)
        item.appendChild(quantity)
        item.appendChild(decreaseButton)
        item.appendChild(increaseButton)
        item.appendChild(removeButton)
        cartContainer.appendChild(item)
       
    })

    const placeOrderButton = document.createElement("a")
    placeOrderButton.className = "place-order-button"
    placeOrderButton.textContent = "Place Order"
    placeOrderButton.href = "confirmation.html"
    cartContainer.appendChild(placeOrderButton)
}

function updateQuantity(productId, change) {
    if (change > 0) {
        const product = cart.find(p => p.id === productId)
        if (product) {
            cart.push(product)
        }
    } else {
        const index = cart.findIndex(p => p.id === productId)
        if (index !== -1) {
            cart.splice(index, 1)
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    location.reload()
}

function removeFromCart(productId) {
    const updatedCart = cart.filter(product => product.id !== productId)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    location.reload()
}

if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart")
        location.reload() 
    })
}


totalPriceElement.textContent = `Total: $${total.toFixed(2)}`

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const count = cart.length
    const cartCountElement = document.querySelector(".cart-count")

    if(cartCountElement) {
        if(count > 0){
             cartCountElement.textContent = count
            cartCountElement.style.display = "inline"
    }   else {
            cartCountElement.textContent = ""
            cartCountElement.style.display = "none"
    }
        }
       
}

updateCartCount()

