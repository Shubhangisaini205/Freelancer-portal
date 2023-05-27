
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
        name: form.name.value,
        profile_picture: form.profile.value,
        email: form.email.value,
        password: form.password.value,
        profession: form.profession.value,
        skills: [form.skills.value],
        hourly_rate: form.rate.value,
        isBooked:false,

    }
    console.log(data)
    RegisterUser(data)

})

// Registeration

function RegisterUser(data) {
    fetch("https://freelancer-portal-api.onrender.com/freelancers", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
    }).then((res) => res.json())
        .then((res) => {
            console.log(res)
            alert("Successfully registered.")
        })
        .catch((err) => console.log(err))
}