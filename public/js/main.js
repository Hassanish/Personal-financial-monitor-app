console.log("test")



//If the sign-up submit button is clicked...
$(".sign-up").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var signUpData = {
        firstName: $("#firstName").val().trim(),
        lastName: $("#lastName").val().trim(),
        username: $("#username1").val().trim(),
        password: $("#password1").val().trim(),
        email: $("#email").val().trim(),
        phone: $("#phone").val().trim(),
    }
    console.log(signUpData)
    $.ajax("/api/users", {
        type: "POST",
        data: signUpData
    }).done(
        function (data) {
            console.log(data)
            location.reload()
        })
        .fail(function (err) {
            console.log("getting an error from the database", err.status, err.statusText);
            console.log(err.status);
            console.log(err.responseJSON.errors["0"]);
            $(".modal-title").text("HTTP Error : " + err.status + " " + err.statusText);
            $("#error-text").text(err.responseJSON.errors["0"].message);
            $(".modal").modal('toggle');
        });


});
//If the sign-in button is clicked...
$(".sign-in").on("submit",function(event){
event.preventDefault();
})

$("#submit").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    var signInData = {
        username: $("#username2").val().trim(),
        password: $("#password2").val().trim(),
    }
    event.preventDefault();
    console.log(signInData)
    $.ajax("/api/users", {
        type: "GET",
        data: signInData
    }).then(
        function (data) {
            console.log(data)
            localStorage.setItem("userID", data.id);
            var localVarStored = localStorage.getItem("userID");

            localStorage.setItem("firstName", data.firstName);

            console.log(localVarStored)
            //renderExpenses();
            if (data) {
                window.location = "/expenses"
            }
            else{
                $(".modal-title").text("Invalid");
            $("#error-text").text("Username or password is incorrect.");
            $(".modal").modal('toggle');
            }
        }

    );


});

$("#display-signup").on("click", function (event) {

    $("#sign-in-card").hide(700);

})