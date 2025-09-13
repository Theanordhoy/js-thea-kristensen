const cartContainer = document.querySelector(".cart-container")
const totalPriceElement = document.querySelector(".total-price")
const clearCartButton = document.querySelector(".clear-cart-button")
import { showLoading, hideLoading } from "./loading.js"
import { showAlert } from "./alert.js"

let cart = []
    try {
        cart = JSON.parse(localStorage.getItem("cart")) || []
    } catch (error) {
        console.error("Error parsing cart from localStorage", error)
        showAlert("There was an error loading your cart. Please try again.")
    }    

const groupedCart = []

cart.forEach(product => {
    const index = groupedCart.findIndex(p => p.id === product.id)
    if (index !== -1) {
        groupedCart[index].quantity += 1
    } else {
        groupedCart.push({ ...product, quantity: 1 })
    }
})

const cartItems = groupedCart

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
        quantity.textContent = `${product.quantity}`
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
        item.appendChild(decreaseButton)
        item.appendChild(quantity)
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
    showLoading()
    try {
         if (change > 0) {
        const product = cart.find(p => p.id === productId)
        if (product) {
            cart.push({...product})
        }
    } else {
        const index = cart.findIndex(p => p.id === productId)
        if (index !== -1) {
            cart.splice(index, 1)
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    } catch (error) {
        console.error("Error updating cart", error)
        showAlert("There was an error updating your cart. Please try again.")
    } finally {
        hideLoading()
        location.reload()
    }
}

function removeFromCart(productId) {
    showLoading()
    const updatedCart = cart.filter(product => product.id !== productId)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    hideLoading()
    location.reload()
}


clearCartButton.addEventListener("click", () => {
    showLoading()
    localStorage.removeItem("cart")
    hideLoading()
    location.reload() 
    })

function clearCartButtonVisibility() {
    if (cart.length === 0) {
        clearCartButton.style.display = "none"
    } else {
        clearCartButton.style.display = "inline-block"
    }
}

clearCartButtonVisibility()

totalPriceElement.textContent = `Total: $${total.toFixed(2)}`

function totalPriceElementVisibility() {
    if (cart.length === 0) {
        totalPriceElement.style.display = "none"
    } else {
        totalPriceElement.style.display = "block"
    }
}

totalPriceElementVisibility()

function updateCartCount() {
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

