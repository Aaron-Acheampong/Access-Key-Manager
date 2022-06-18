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


// revoke func
function handleRevoke(id, email) {

    let keyInfo = {
        keyId: id,
        email: email
    };

    console.log(keyInfo);

    $.ajax({
        url: '/revokeKey',
        type: 'POST',
        data: JSON.stringify(keyInfo),
        dataType: 'json',
        contentType: "application/json",
        success: (result) => {
            console.log(result);
            if(result) alert(`Key with ID ${id} is revoked`);
           
        },
        error: (err) => {
            console.log(err);
        }

    });
}



const keyList ='';



// Get all files
$(document).ready(function () {
    

    let userRole = getParamenter('userRole'); 
    let userEmail = getParamenter('userEmail'); 

    console.log(userRole);
    // console.log(userId);
    if (userRole === 'admin'){
        // $("#show_modal_btn").css("display") = "block";
        // document.getElementById("show_modal_btn").style.display = "block";
        $("#search_form").css("display","block");

    }
    else {
        $("#search_form").css("display","none");
     }
    $.ajax({
        url: '/allkeys',
        type: 'GET',
        success: function(rows) {
            if (userRole === 'admin') {
                keyList = rows;
            } else {
                keyList = rows.filter((row) => {
                    row.email === userEmail;
                })
            }
            

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
        url: '/SearchKey',
        type: 'GET',
        data: JSON.stringify(keyInfo),
        dataType: 'json',
        contentType: "application/json",
        success: function(rows) {


            if (rows) {
               var activeKey = rows.filter((row) => {
                return row.keyStatus === "active";
               });

               alert(`Status Code: 200.\n ${JSON.stringify(activeKey)}`);
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

    let table = $('#contain-table');
    table.remove();
    let grid = $('#grid');
    let gridContent = `<div id='contain-table'>
    <table className='striped-table'>
        <thead>
            <tr>
                <th>No.</th>
                <th>Key ID</th>
                <th>User ID</th>
                <th>Email</th>
                <th>Key Value</th>
                <th>Purchase Date</th>
                <th>Expiry Date</th>
                <th colSpan={1} className='text-center'>
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            ${keyList.length > 0  ? (
                keyList.map((keyItem, i) => (
                    keyItem.keyStatus === 'active' ? 
                    `<tr key=${keyItem.keyId}>
                        <td>${i + 1}</td>
                        <td>${keyItem.keyId}</td>
                        <td>${keyItem.userId}</td>
                        <td>${keyItem.email}</td>
                        <td>${keyItem.keyValue}</td>
                        <td>${keyItem.expiry_Date}</td>
                        <td>${keyItem.keyStatus}</td>
                        <td className='text-left'>
                            <button 
                                onClick=${() => handleRevoke(keyItem.keyId, keyItem.email)}
                                className='button muted-button'
                            >Revoke key</button>
                        </td>
                    </tr>` : null
                ))
            ) : (
                `<tr>
                    <td colSpan={7}>No keyItems</td>
                </tr>`
            )}
        </tbody>
    </table>
</div>`;

    table.remove();
    grid.append(gridContent);
    
});



$('#expired').click(function (e) {
    e.preventDefault();

    
    let table = $('#contain-table');
    table.remove();
    let grid = $('#grid');
    let gridContent = `<div id='contain-table'>
    <table className='striped-table'>
        <thead>
            <tr>
                <th>No.</th>
                <th>Key ID</th>
                <th>User ID</th>
                <th>Email</th>
                <th>Key Value</th>
                <th>Purchase Date</th>
                <th>Expiry Date</th>
                <td>Status</td>
            </tr>
        </thead>
        <tbody>
            ${keyList.length > 0  ? (
                keyList.map((keyItem, i) => (
                    keyItem.keyStatus === 'expired' ? 
                    `<tr key=${keyItem.keyId}>
                        <td>${i + 1}</td>
                        <td>${keyItem.keyId}</td>
                        <td>${keyItem.userId}</td>
                        <td>${keyItem.email}</td>
                        <td>${keyItem.keyValue}</td>
                        <td>${keyItem.expiry_Date}</td>
                        <td>${keyItem.keyStatus}</td>
                        </td>
                    </tr>` : null
                ))
            ) : (
                `<tr>
                    <td colSpan={7}>No keyItems</td>
                </tr>`
            )}
        </tbody>
    </table>
</div>`;

    grid.append(gridContent);
    
});



$('#revoked').click(function (e) {
    e.preventDefault();

    let table = $('#contain-table');
    table.remove();
    let grid = $('#grid');
    let gridContent = `<div id='contain-table'>
    <table className='striped-table'>
        <thead>
            <tr>
                <th>No.</th>
                <th>Key ID</th>
                <th>User ID</th>
                <th>Email</th>
                <th>Key Value</th>
                <th>Purchase Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            ${keyList.length > 0  ? (
                keyList.map((keyItem, i) => (
                    keyItem.keyStatus === 'revoked' ? 
                    `<tr key=${keyItem.keyId}>
                        <td>${i + 1}</td>
                        <td>${keyItem.keyId}</td>
                        <td>${keyItem.userId}</td>
                        <td>${keyItem.email}</td>
                        <td>${keyItem.keyValue}</td>
                        <td>${keyItem.purchase_Date}</td>
                        <td>${keyItem.expiry_Date}</td>
                        <td>${keyItem.keyStatus}</td>
                        </td>
                    </tr>` : null
                ))
            ) : (
               ` <tr>
                    <td colSpan={7}>No keyItems</td>
                </tr>`
            )}
        </tbody>
    </table>
</div>`;

   
    grid.append(gridContent);
    
    
});






