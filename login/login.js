document.getElementById("loginButton").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Por favor, complete los campos de correo electrónico y contraseña.");
    } else {
       
        const storedUserData = sessionStorage.getItem(email);

        if (storedUserData) {
            let user = JSON.parse(storedUserData);

            if (user.password === password) {
                window.location.href = "/index.html";
            } else {
                alert("La contraseña es incorrecta. Inténtalo de nuevo.");
            }

        } else {
            alert("El usuario no existe. Regístrate primero.");
        }
    }
});