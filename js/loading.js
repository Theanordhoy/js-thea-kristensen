const loadingIndicator = document.querySelector(".loading")

export function showLoading() {
    const loading = document.getElementById("loading")
    if (loadingIndicator) loadingIndicator.style.display = "block"
}

export function hideLoading() {
    const loading = document.getElementById("loading")
    if (loadingIndicator) loadingIndicator.style.display = "none"
}