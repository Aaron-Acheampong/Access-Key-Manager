const menu_btn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');

menu_btn.addEventListener('click', () => {
    menu_btn.classList.toggle('active');
    navMenu.classList.toggle('active');
})

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    menu_btn.classList.remove('active');
    navMenu.classList.remove('active');
}))


function changeBg(button){
    if(button.id == "active"){
        button.style.background = "white";
        document.getElementById("expired").style.background = "rgb(212, 209, 209)";
        document.getElementById("revoked").style.background = "rgb(212, 209, 209)";
    }
    else if(button.id == "expired") { 
        button.style.background = "white";
        document.getElementById("active").style.background = "rgb(212, 209, 209)";
        document.getElementById("revoked").style.background = "rgb(212, 209, 209)";
    }
    else {
        button.style.background = "white";
        document.getElementById("active").style.background = "rgb(212, 209, 209)";
        document.getElementById("expired").style.background = "rgb(212, 209, 209)";
    }
}



function showModal() {
    document.getElementById("overlay").style.display = "block";
}

function closeModal() {
    document.getElementById("overlay").style.display = "none";
}

//get URL query parameters
function getParamenter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}


var keyList =[];



// Get all files
$(document).ready(function () {
    

    let userRole = getParamenter('userRole'); 
    // let userId = getParamenter('userId'); 

    console.log(userRole);
    // console.log(userId);
    if (userRole === 'admin'){
        // $("#show_modal_btn").css("display") = "block";
        // document.getElementById("show_modal_btn").style.display = "block";
        $("#serach_form").css("display","block");

    }
    // else {
        
    // }
    $.ajax({
        url: '/allkeys',
        type: 'GET',
        success: function(rows) {
            keyList = rows;

        },
        error: function (err) {
            console.log(err);
        }
    })
});


$('#keypurchaseform').submit(function (e) {
    e.preventDefault();
    let purchaseInfo = {
        search: $('#search_input').val()
    }

    $.ajax({
        url: '/purchaseKey',
        type: 'POST',
        data: JSON.stringify(purchaseInfo),
        dataType: 'json',
        contentType: "application/json",
        success: function(key) {
            console.log("Key Generated");
            alert("Key has been generated and sent to your email");


        },
        error: function (err) {
            console.log(err);
        }
    })

});


$('#search_btn').click(function (e) {
    e.preventDefault();
    let keyInfo = {
        email: $('#search_input').val()
    }
    $.ajax({
        url: '/keySearch',
        type: 'GET',
        data: JSON.stringify(keyInfo),
        dataType: 'json',
        contentType: "application/json",
        success: function(rows) {


            if (rows) {
               var activeKey = rows.filter((row) => {
                return row.keyStatus === "active";
               });
               alert(`Status Code: 200.\n ${activeKey}`);
            }else{
                alert("Status Code: 404.\n User has no active Key");
            }

        },
        error: function (err) {
            console.log(err);
        }
    })
});



$('#active').click(function (e) {
    e.preventDefault();
    
});



$('#expired').click(function (e) {
    e.preventDefault();
    
});



$('#revoked').click(function (e) {
    e.preventDefault();
    
});




