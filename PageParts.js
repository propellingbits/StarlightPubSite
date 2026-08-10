
document.addEventListener("DOMContentLoaded", () => {
    fetch("Footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });
});
