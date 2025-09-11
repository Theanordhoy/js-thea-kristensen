export function showAlert(message, duration = 5000) {
    const alertBox = document.querySelector(".alert-box")
    if (alertBox) {
        alertBox.textContent = message
        alertBox.style.display = "block"
        setTimeout(() => {
            alertBox.style.display = "none"
        }, duration)
    } else {
        alert(message) 
    }
}