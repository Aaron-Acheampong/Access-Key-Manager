$("#login_btn").click((e) => {
    e.preventDefault();

    let loginInfo = {
        email: $("#email").val(),
        password: $("#password").val()
    }
    // console.log(loginInfo);
    $.ajax({
        url: '/login',
        type: 'POST',
        data: JSON.stringify(loginInfo),
        dataType: 'json',
        contentType: "application/json",
        success: (users) => {
            // console.log(result);
            if (users.length !== 0){
                users.forEach(user => {
                console.log(user.userRole);
                window.location.href = `/home.html?userRole=${user.userRole}&userEmail=${user.email}`;
                });
            } else {
                alert("Invalid User");
            } 
            
            
        },
        error: (err) => {
            console.log(err);
        }

    });
})