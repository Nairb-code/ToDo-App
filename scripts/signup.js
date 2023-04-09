window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const name = document.querySelector("#inputNombre")
    const lastname = document.querySelector("#inputApellido")
    const email = document.querySelector("#inputEmail")
    const password = document.querySelector("#inputPassword")
    const passwordRepeat = document.querySelector("#inputPasswordRepetida")
    const form = document.forms[0]
    const url = 'https://todo-api.ctd.academy/v1'

    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
       event.preventDefault()
        const data = {
            firstName: name.value,
            lastName: lastname.value,
            email: email.value,
            password: password.value
          }

        const settings = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        realizarRegister(settings)
        form.reset()
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        fetch(`${url}/users`, settings)
            .then( response => {
                console.log("Promesa complida: ", response)
                if (response.ok != true) {
                    alert("Alguno de los datos son incorrectos.")
                }

                return response.json()
            })
            .then( data => {
                console.log("Promesa complida")
                if(data.jwt){
                    localStorage.setItem("jwt",JSON.stringify(data))
                    location.replace("./mis-tareas.html")
                }

            })
            .catch(err => {
                console.log("Promesa rechazada")
                console.log(err)
            })


    };


});