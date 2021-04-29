let id = "user_s4AHNLxcCCPhwyB5E6t3Z";
let token = "8c9711b1ce9f5b026de69259c1fa5263";

(function () {
    // https://dashboard.emailjs.com/admin/integration
    emailjs.init(id);
})();

function sendMail(contactForm) {
    emailjs.send("wxbrief", "contact-form", {
            "first_name": contactForm.fname.value,
            "last_name": contactForm.lname.value,
            "from_email": contactForm.email.value,
            "message": contactForm.message.value
        })
        .then(
            function (response) {
                console.log("SUCCESS", response);
            },
            function (error) {
                console.log("Failed", error)
            }
        )
    return false;
}