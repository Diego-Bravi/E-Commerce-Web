document.getElementById("signupButton").addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    
    if (name === "" || lastName === "" || email === "" || password === "") {
        alert("Por favor, complete todos los campos.");
    } else {
        let user = {
            name: name,
            lastName: lastName,
            email: email,
            password: password
        };

        let userJSON = JSON.stringify(user);

        sessionStorage.setItem(email, userJSON);

        document.getElementById("name").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

        alert("Registro exitoso. Los datos se han guardado en el Local Storage.");
    }
});