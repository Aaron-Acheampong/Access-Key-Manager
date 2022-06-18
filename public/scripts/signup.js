$("#sign_up").click((e) => {
    e.preventDefault();

    let signupInfo = {
        email: $("#email").val(),
        password: $("#password").val()
    }
    // console.log(signupInfo);
    $.ajax({
        url: 'C:\Users\TECHNICAL\Desktop\C++Dev\JS\Access-Key-Manager/signUp',
        type: 'POST',
        data: JSON.stringify(signupInfo),
        dataType: 'json',
        contentType: "application/json",
        success: (users) => {
            window.location.href = `/views/index.html`;
            alert("Account Created. You can now login");
            
            // console.log(result);
            // if (users.length !== 0){
            //     users.forEach(user => {
            //     console.log(user.userRole);
            //     // window.location.href = `http://127.0.0.1:5501/templates/feed.html?userRole=${user.userRole}`;
            //     });
            // } else {
            //     alert("Invalid User");
            // } 
            
            
        },
        error: (err) => {
            console.log(err);
        }

    });
})