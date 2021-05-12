$(document).ready(function () {
    emailjs.init(KEY.emailjs);

    $("#contact-form").on("submit", function (e) {
        e.preventDefault();
        $('#submittedModal').modal('show');
        $('form').get(0).reset();
    });
});

function sendMail(contactForm) {
    emailjs.send("wxbrief", "contact-form", {
            "first_name": contactForm.fname.value,
            "last_name": contactForm.lname.value,
            "from_email": contactForm.email.value,
            "message": contactForm.message.value
        })
        .then(
            function (response) {
                console.log("Success", response);
            },
            function (error) {
                console.log("Failed", error);
            }
        )
    return false;
}