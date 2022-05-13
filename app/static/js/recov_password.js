// for login page
document.getElementById("change_password").addEventListener("click", function(event){
    event.preventDefault()
    console.log("Password change request")
    var password_val= document.getElementById("password").value
    var confirm_password_val= document.getElementById("confirm_password").value
    data={
        "password": password_val,
        "confirm_password": confirm_password_val
    }
    console.log(data)
    if(password_val===confirm_password_val)
    {

        if (password_val && confirm_password_val){

            // using Async and await
            
    
                fetch('/recovery', {
                method: 'POST', // or 'PUT'
                headers: {
                "content-type": "application/json ;charset=utf-8",
                },
                body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                console.log('Success:', data);
                if(data["code"]==1)
                    window.location.href = '/login';
                else
                    {
                        $(document).Toasts('create', {
                            class: 'bg-warning',
                            title: 'Warning',
                            body: 'Request for OTP again'
                          })
                    }
                })
                .catch((error) => {
                console.error('Error:', error);
                });
    
    }
    else{
        $(document).Toasts('create', {
            class: "bg-warning",
            title: 'Warning',
            body: "Enter Data"
          })
    }

    }
    else{
        $(document).Toasts('create', {
            class: "bg-warning",
            title: 'Warning',
            body: "Password and Confirm password not matched."
          })
    }

   

});
