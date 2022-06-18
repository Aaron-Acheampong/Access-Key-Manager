function getParamenter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}

$(document).ready(() => {
    let email = getParamenter('email'); 
});

$("#reset_password_btn").click((e) => {
    e.preventDefault();
    let email = getParamenter('email'); 
    console.log(email);
    let newPassword = $("#new_password").val();
    let confirmPassword = $("#confirm_password").val();
    // alert('here');
    if (newPassword === confirmPassword) {
        let resetInfo = {
            email: email,
            newPassword: newPassword,
            confirmPassword:confirmPassword
        }
        console.log(resetInfo);
            $.ajax({
        url: 'C:\Users\TECHNICAL\Desktop\C++Dev\JS\Access-Key-Manager/resetPassword',
        type: 'POST',
        data: JSON.stringify(resetInfo),
        dataType: 'json',
        contentType: "application/json",
        success: (users) => {
            window.location.href = `https://fileserver-amalitech.herokuapp.com/index.html`;
            alert("Password Reset Successful. You can now login");
            
        },
        error: (err) => {
            console.log(err);
        }

    });

    } else {
        alert("Password does not match");
    }
})