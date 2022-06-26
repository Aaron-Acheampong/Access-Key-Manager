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



// revoke func
function handleRevoke(id, email) {

    const parameters = new URLSearchParams(window.location.search);
    const userRole = parameters.get('userRole'); 

    if (userRole !== 'admin') {
        alert('Only admin can revoke a key');
    } else {

        let keyInfo = {
            id: id,
            email: email
        };
    
        
    
        $.ajax({
            url: '/revokeKey',
            type: 'POST',
            data: JSON.stringify(keyInfo),
            dataType: 'json',
            contentType: "application/json",
            success: (result) => {
                console.log(result);
                if(result) alert(`Key with ID ${keyInfo.id} is revoked`);
               
            },
            error: (err) => {
                console.log(err);
            }
    
        });
    }

    
}



var keyList = '';



// Get all files
$(document).ready(function () {

    //get URL query parameters
    const parameters = new URLSearchParams(window.location.search);
    const userRole = parameters.get('userRole'); 
    const userEmail = parameters.get('userEmail'); 

    console.log(userRole);
    if (userRole !== 'admin'){
        $("#search_section").css("display","none");
        $(".revoke_button").css("display","none");

    }
   
    $.ajax({
        url: '/allkeys',
        type: 'GET',
        success: function(rows) {
            if (userRole === 'admin') {
               keyList = rows;
               console.log(keyList);
            } else {
                keyList = rows.filter((row) => {
                    row.email === userEmail;
                })

                console.log(keyList);
            
            }
            

        },
        error: function (err) {
            console.log(err);
        }
    })
});


///deal with purhase
const stripeHandler = StripeCheckout.configure({
    key: 'pk_test_51LCZP7A0bcxwy1Smv7LtXe98et3CMGaDWKK9HEK3CNG1Ra2ym2sM5tVHg3RRl6bY8p7RCKBspahcOTDQeLJ1pcU3005UEgL97W',
    locale: 'en',
    token: function(token) {
        let purchaseInfo = {
            stripeTokenId: token.id,
            expiry_Date: `${token.card.exp_year}-${token.card.exp_month}-01 23:59:00`,
            email: token.email
        }

        $.ajax({
            url: '/purchaseKey',
            type: 'POST',
            data: JSON.stringify(purchaseInfo),
            dataType: 'json',
            contentType: "application/json",
            success: function(key) {
                if(key.keystate === 'Exist') {
                    console.log("User has active key");
                alert("User already has an active key");
                } else {
                    console.log("Key Generated");
                alert("Thamk you for your purchase. \n Key has been generated and sent to your email");
                }
        
    
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

   

});

function purchaseClicked() {
    let price = 100;
    stripeHandler.open({
        amount: price
    })
}



//Search EndPoint
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



//Active Keys
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
                <th>Email</th>
                <th>Key Value</th>
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
                    `<tr key='${keyItem.keyId}'>
                        <td>${i + 1}</td>
                        <td>${keyItem.keyId}</td>
                        <td>${keyItem.purchasedBy}</td>
                        <td>${keyItem.keyValue}</td>
                        <td>${keyItem.expiry_Date}</td>
                        <td className='text-left'>
                            <button 
                                class='revoke_button'
                                id='${keyItem.keyId}'
                                key='${keyItem.purchasedBy}'
                                onClick='handleRevoke(this.id, this.key)'
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




//
//Expired Keys
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
                <th>Email</th>
                <th>Key Value</th>
                <th>Expiry Date</th>
            </tr>
        </thead>
        <tbody>
            ${keyList.length > 0  ? (
                keyList.map((keyItem, i) => (
                    keyItem.keyStatus === 'expired' ? 
                    `<tr key=${keyItem.keyId}>
                        <td>${i + 1}</td>
                        <td>${keyItem.keyId}</td>
                        <td>${keyItem.purchasedBy}</td>
                        <td>${keyItem.keyValue}</td>
                        <td>${keyItem.expiry_Date}</td>
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


//
//Revoked Keys
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
                <th>Email</th>
                <th>Key Value</th>
                <th>Purchase Date</th>
                <th>Expiry Date</th>
            </tr>
        </thead>
        <tbody>
            ${keyList.length > 0  ? (
                keyList.map((keyItem, i) => (
                    keyItem.keyStatus === 'revoked' ? 
                    `<tr key=${keyItem.keyId}>
                        <td>${i + 1}</td>
                        <td>${keyItem.keyId}</td>
                        <td>${keyItem.purchasedBy}</td>
                        <td>${keyItem.keyValue}</td>
                        <td>${keyItem.purchase_Date}</td>
                        <td>${keyItem.expiry_Date}</td>                 
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






