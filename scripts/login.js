window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
   const email = document.querySelector("#inputEmail")
   const password = document.querySelector("#inputPassword")
   const form = document.forms[0]
   const url = 'https://todo-api.ctd.academy/v1'
    



    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
    
        event.preventDefault()
    const data = {
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

    realizarLogin(settings)
    form.reset()
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {

    fetch(`${url}/users/login`, settings)
        .then( response => {
            console.log("Promesa complida: ", response)
            if(response.ok != true){
                alert("Algunos datos son incorrectos.")
            }
            return response.json()
        })
        .then( data => {

            console.log(data)
            if(data.jwt){
                localStorage.setItem("JWT", JSON.stringify(data.jwt))
            }

            location.replace("./mis-tareas.html")
        })
        .catch( err => {
            alert("Promesa rechazada")
            console.log(err)
        })



        
    };


});