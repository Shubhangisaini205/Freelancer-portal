let freelancers = document.getElementById("freelancer");
let report = document.getElementById("report");

let AuthToken = localStorage.getItem("AuthToken");

// private routing for freelancers paga
freelancers.addEventListener("click", () => {
    if (AuthToken) {
        window.location = "freelancers.html"
    } else {
        alert("Please Login firt to accces this page")
        window.location = "login.html"
    }
})


//private routing for report page
report.addEventListener("click", () => {
    if (AuthToken) {
        window.location = "reports.html"
    } else {
        alert("Please Login firt to accces this page")
        window.location = "login.html"
    }
})
