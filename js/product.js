const container = document.querySelector("#container")
const API_URL = "https://v2.api.noroff.dev/rainy-days"
import { showLoading, hideLoading } from "./loading.js"
import { showAlert } from "./alert.js"

async function fetchAndCreateProduct() {
    showLoading()
    try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        if(!id) {
            container.textContent = "No product ID provided"
            showAlert("No product ID provided. Please go back to the product page.")
            return
        }

        const response = await fetch(`${API_URL}/${id}`)
        const data = await response.json()
        const product = data.data

        const productDiv = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const description = document.createElement("p")
        const color = document.createElement("p")
        const size = document.createElement("p")
        const addToCartButton = document.createElement("button")
        const backButton = document.createElement("a")
        const checkoutButton = document.createElement("a")

        addToCartButton.addEventListener("click", () => {
            addToCart(product)
        })

        productDiv.className = "product"
        image.className = "product-info-image"
        title.className = "h1-headings"
        price.className = "price__product"
        description.className = "product-details-text"
        color.className = "product-color"
        size.className = "product-size"
        addToCartButton.className = "addToCartButton"
        backButton.className = "backButton"
        checkoutButton.className = "checkoutButton"

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = `$${product.price}`
        description.textContent = product.description
        color.textContent = `Color: ${product.baseColor}`
        size.textContent = `Size: ${product.sizes.join(",")}`
        addToCartButton.textContent = "Add to cart"
        backButton.textContent = "Back to products"
        backButton.href = "index.html"
        checkoutButton.textContent = "Go to checkout"
        checkoutButton.href = "checkout.html"

        productDiv.appendChild(image)
        productDiv.appendChild(title)
        productDiv.appendChild(color)
        productDiv.appendChild(size)
        productDiv.appendChild(price)
        productDiv.appendChild(description)
        productDiv.appendChild(addToCartButton)
        productDiv.appendChild(checkoutButton)
        productDiv.appendChild(backButton)

        container.appendChild(productDiv)
    } catch (error) {
        console.error("Failed to fetch and create product", error)
        container.textContent = "Failed to load product"
        showAlert("Failed to load product. Please try again later.")
    } finally {
        hideLoading()
    }
}

fetchAndCreateProduct()

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push(product)
    localStorage.setItem("cart", JSON.stringify(cart))
    showAlert(`${product.title} has been added to your cart.`)
}

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