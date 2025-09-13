export function showAlert(message, duration = 5000, type = "error") {
    const alertBox = document.querySelector(".alert-box")
    if (alertBox) {
        alertBox.textContent = message
        alertBox.classList.remove("alert-error", "alert-success")
        alertBox.classList.add(`alert-${type}`)
        alertBox.style.display = "block"
        setTimeout(() => {
            alertBox.style.display = "none"
        }, duration)
    } else {
        alert(message) 
    }
}