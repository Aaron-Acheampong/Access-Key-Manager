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

// Get all files
$(document).ready(function () {
    

    let userRole = getParamenter('userRole'); 
    // let userId = getParamenter('userId'); 

    console.log(userRole);
    // console.log(userId);
    if (userRole === 'admin'){
        // $("#show_modal_btn").css("display") = "block";
        // document.getElementById("show_modal_btn").style.display = "block";
        $("#show_modal_btn").css("display","block");

    }
    // else {
        
    // }
    $.ajax({
        url: '/allFiles',
        type: 'GET',
        success: function(files) {
            console.log(files);
            let grid = $('#grid');
            let gridContent = "";
            files.forEach(file => {
                gridContent = `
                <div id="row" class="row">
                    <div id="action_field" class="action_field">
                    <b id="${file.fileId}" class="download_btn" onclick="download(this.id)">Download</b>
                    <b id="${file.fileId}" class="send_email" onclick="fileToEmail(this.id)">Email</b>
                    </div>
                    <div id="title_field" class="title_field">${file.title}</div>
                    <div id="file_name_${file.fileId}" onclick="DownloadEmailCount(this.id)" class="file_name_field">${file.fileName}</div>
                    <div id="description_field" class="description_field">${file.description}</div>
                </div>
                `;
                grid.append(gridContent);
            });

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
        search: $('#search_input').val()
    }
    $("#grid").html("");
    $.ajax({
        url: '/keySearch',
        type: 'POST',
        data: JSON.stringify(keyInfo),
        dataType: 'json',
        contentType: "application/json",
        success: function(key) {

            if (key) {
                let grid = $('#grid');
                let gridContent = "";
                gridContent = `
                    <div id="row" class="row">
                        <div id="action_field" class="action_field"><p id="download_btn${file.fileId}" class="download_btn">Download</p>
                        <p id="${file.fileId}" class="send_email" onclick="fileToEmail(this.id)">Email</p></div>
                        <div id="title_field" class="title_field">${file.title}</div>
                        <div id="file_name_field" class="file_name_field" onclick="fileDownloadEmailCount(this.id)">${file.fileName}</div>
                        <div id="description_field" class="description_field">${file.description}</div>
                    </div>
                    `;
                grid.append(gridContent);
            }else{
                alert("School has no active Key");
            }

        },
        error: function (err) {
            console.log(err);
        }
    })
});


