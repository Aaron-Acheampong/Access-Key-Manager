$("#login_btn").click((e) => {
    e.preventDefault();

    let loginInfo = {
        email: $("#email").val(),
        password: $("#password").val()
    }
    // console.log(loginInfo);
    $.ajax({
        url: 'C:\Users\TECHNICAL\Desktop\C++Dev\JS\Access-Key-Manager/login',
        type: 'POST',
        data: JSON.stringify(loginInfo),
        dataType: 'json',
        contentType: "application/json",
        success: (users) => {
            // console.log(result);
            if (users.length !== 0){
                users.forEach(user => {
                console.log(user.userRole);
                window.location.href = `/views/feed.html?userRole=${user.userRole}&userEmail=${user.email}`;
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