// for login page
document.getElementById("signin").addEventListener("click", function(event){
    event.preventDefault()
    console.log("Signin request")
    var email_val= document.getElementById("email").value
    var password_val= document.getElementById("password").value
    data={
        "email": email_val,
        "password": password_val
    }
    console.log(data)

    valid_email=ValidateEmail(email_val)

    if (email_val && password_val && valid_email){

        // using Async and await
        

            fetch('/login', {
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
                window.location.href = '/admin';
            else
                {
                    $(document).Toasts('create', {
                        class: 'bg-warning',
                        title: 'Warning',
                        body: 'Invalid Username or Password.'
                      })
                }
            })
            .catch((error) => {
            console.error('Error:', error);
            });

}

});

function ValidateEmail(mail) 
{
    console.log("in validate")
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
  $(document).Toasts('create', {
    class: 'bg-warning',
    title: 'Warning',
    body: 'Email format is incorrect'
  })
    return (false)
}
