let form = document.getElementById("form");
let data = []

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let formData = {
        email: form.email.value,
        password: form.password.value
    }

    fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData)
    }).then((res) => res.json())
        .then((res) => {
            
            if (res.token) {
                alert("Admin Login Successfully")
                localStorage.setItem("AuthToken", res.token)
              window.location="freelancers.html"
            }else{
                alert("Login Failed")
            }

        })
        .catch((err) => {
           
            console.log(err)
        })

})


