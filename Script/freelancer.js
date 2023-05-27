let mainSection = document.getElementById("container");
// let form = document.getElementById("form");
let skillInput = document.getElementById("skillInput");
let RateInput = document.getElementById("RateInput");
let ProfessionInput = document.getElementById("ProfessionInput");
let idInput = document.getElementById("idInput")
let editbtnSubmit = document.getElementById("editButton")

//filters;
let Professionfilter = document.getElementById("Professionfilter")
let sortbyrate = document.getElementById("sortbyrate")
let search = document.getElementById("search")

//pagination;

let prev = document.getElementById("prev")
let next = document.getElementById("next")
let pagebutton = document.getElementById("page-button")
let freelancerData = []

window.addEventListener("load", () => {
    FetchFreelancer()
})


function FetchFreelancer() {
    fetch(" https://freelancer-portal-api.onrender.com/freelancers")
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            freelancerData = res
            RenderFreelancers(freelancerData)
        })
}



// sorting
sortbyrate.addEventListener("change", () => {
    if (sortbyrate.value != "") {
        if (sortbyrate.value == "htol") {
            fetch(" https://freelancer-portal-api.onrender.com/freelancers?_sort=hourly_rate&_order=desc")
                .then((res) => res.json())
                .then((res) => {
                    RenderFreelancers(res)
                })
        } else {
            fetch(" https://freelancer-portal-api.onrender.com/freelancers?_sort=hourly_rate&_order=asc")
                .then((res) => res.json())
                .then((res) => {
                    RenderFreelancers(res)
                })
        }
    } else {
        RenderFreelancers(freelancerData)
    }
})

//filters

Professionfilter.addEventListener("change", () => {
    if (Professionfilter.value != "") {
        let filtered = freelancerData.filter((item, i) => {
            return item.profession === Professionfilter.value
        })
        RenderFreelancers(filtered)
    } else {
        RenderFreelancers(freelancerData)
    }
})


//searching
search.addEventListener("change", () => {
    fetch(`https://freelancer-portal-api.onrender.com/freelancers?q=${search.value}`)
        .then((res) => res.json())
        .then((res) => {
            // console.log(res)
            RenderFreelancers(res)

        })
})


// populating Edit 

function EditFreelancerPopulating(id) {
    fetch(`https://freelancer-portal-api.onrender.com/freelancers/${id}`)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            idInput.value = res.id
            skillInput.value = res.skills;
            RateInput.value = res.hourly_rate;
            ProfessionInput.value = res.profession;
        }).catch((err) => console.log(err))
}

// submitting edited details
editbtnSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    let data = {
        id: idInput.value,
        skills: skillInput.value,
        hourly_rate: RateInput.value,
        profession: ProfessionInput.value
    }
    fetch(`https://freelancer-portal-api.onrender.com/freelancers/${data.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            alert("Freelancer Edited Successfully")
            FetchFreelancer()
        }).catch((err) => console.log(err))
})


//Delete Request 
function DeleteFreelancer(id) {
    fetch(`https://freelancer-portal-api.onrender.com/freelancers/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((res) => {
            alert("Freelancer Deleted Successfully")
            FetchFreelancer()
        }).catch((err) => console.log(err))

}




function HireRequest(id) {
    fetch(`https://freelancer-portal-api.onrender.com/freelancers/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ isBooked: true })
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            alert("Freelancer Hired!!")
            FetchFreelancer()
        }).catch((err) => console.log(err))
}

//Rendering the freelancer;

function RenderFreelancers(data) {
    let cardlist = `
    <div class="card-list">
    ${data.map((item, i) => GetCard(item.id, item.name, item.profile_picture, item.email, item.profession, item.skills, item.hourly_rate, item.isBooked)).join(" ")}
    </div>
    `
    mainSection.innerHTML = cardlist

    //edit
    let editcards = document.querySelectorAll(".card-edit")
    for (let editcard of editcards) {
        editcard.addEventListener("click", (e) => {
            e.preventDefault();
            let currId = e.target.dataset.id;
            console.log(currId)
            EditFreelancerPopulating(currId)
        })
    }

    //delete
    let deletecards = document.querySelectorAll(".card-delete")
    for (let card of deletecards) {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            let currId = e.target.dataset.id;
            console.log(currId)
            DeleteFreelancer(currId)
        })
    }

    //hire
    let Hirecards = document.querySelectorAll(".card-Hire")
    for (let card of Hirecards) {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            let currId = e.target.dataset.id;
            console.log(currId)
            HireRequest(currId)
        })
    }

}







function GetCard(id, name, profile_picture, email, profession, skills, hourly_rate, isBooked) {
    let card = `
 <div class="card" data-id=${id}>
 <div class="card-image">
     <img src=${profile_picture} alt="photo">
 </div>
 <div class="card-body">
    <h2 class="item-name">Name: ${name}</h2>
    <p class="item-email">Email: ${email}</p>
    <p class="item-profession">Profession:${profession}</p>
    <p class="item-skills">Skills: ${skills}</p>
    <p class="rate"> HourlyRate: ${hourly_rate}</p>
    <p class="status">Booked Status: ${isBooked ? "True" : "False"}</p>
 </div>
 <div class="button1">
     <button data-id=${id} class="card-edit">Edit</button>
     <button  data-id=${id} class="card-delete">Delete</button>
     
 </div>
 <div class="button2">
     <button ${isBooked==true?"disable":""}  data-id=${id} class="card-Hire">HIRE ME</button>
 </div>
</div>
`
    return card;

}