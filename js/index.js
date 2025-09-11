const container = document.querySelector("#container")
const genderFilter = document.querySelector("#genderFilter")
const API_URL = "https://v2.api.noroff.dev/rainy-days"
let allProducts = []
import { showLoading, hideLoading } from "./loading.js"

async function fetchProducts() {
    showLoading()
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        allProducts = data.data
        renderProducts(allProducts)
    }  catch (error) {
        console.error("Failed to fetch and create products", error)
    } finally {
        hideLoading()
    }
}

function renderProducts(products) {
    container.innerHTML = ""

    products.forEach(product => {
        const card = document.createElement("div")
        const image = document.createElement("img")
        const content = document.createElement("div")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const anchor = document.createElement("a")

        card.className = "product"
        image.className = "product-image"
        content.className = "content"
        title.className = "product-title"
        price.className = "price__product"

        image.src = product.image.url 
        image.alt = product.image.alt 
        title.textContent = product.title
        price.textContent = product.price
        anchor.href = `product.html?id=${product.id}`

        content.appendChild(title)
        content.appendChild(price)
        card.appendChild(image)
        card.appendChild(content)
        anchor.appendChild(card)

        container.appendChild(anchor)
})

}

genderFilter.addEventListener("change", () => {
    const selected = genderFilter.value 
    if (selected === "all") {
        renderProducts(allProducts)
    } else {
        const filtered = allProducts.filter(p => p.gender === selected)
        renderProducts(filtered)
    }
})

fetchProducts();

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