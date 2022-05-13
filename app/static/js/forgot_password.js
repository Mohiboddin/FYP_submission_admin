
// for Forgot password page

document.getElementById("forgot_password").addEventListener("click", function(event){
    event.preventDefault()
    console.log("for got password request")
    var email_val= document.getElementById("email").value
    // var password_val= document.getElementById("password").value
    data={
        "email": email_val    
    }
    console.log(data)
    validate_email=ValidateEmail(email_val)
    if (email_val && validate_email){

        // using Async and await
        
            fetch('/forgotpassword', {
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
                {
                    $("#email").attr("disabled","");
                    $("#otp_div").removeClass( "d-none" );
                    $("#forgot_password").addClass("d-none" );
                    $("#otp_button").removeClass( "d-none" );
                    // call modal
                    $(document).Toasts('create', {
               
                        title: 'Enter OTP',
                        body: 'OTP has been sent to your email id, please enter it within 2 minute'
                      })
                }
            else if(data["code"]==2){
                    // call modal
                    $(document).Toasts('create', {
                        class: "bg-warning",
                        title: 'Warning',
                        body: "The user dosen't exist."
                      })
            }
            
            else if(data["code"]==3)
                {
                    $("#email").attr("disabled","");
                    $("#otp_div").removeClass( "d-none" );
                    $("#forgot_password").addClass("d-none" );
                    $("#otp_button").removeClass( "d-none" );
                    // call modal
                    $(document).Toasts('create', {
               
                        title: 'Warning',
                        body: 'Something went wrong in server'
                      })
                }
                else if(data["code"]==4)
                {
                    $("#email").attr("disabled","");
                    $("#otp_div").removeClass( "d-none" );
                    $("#forgot_password").addClass("d-none" );
                    $("#otp_button").removeClass( "d-none" );
                    // call modal
                    $(document).Toasts('create', {
               
                        title: 'Warning',
                        body: 'OTP already sent check email'
                      })
                }
            })
            .catch((error) => {
            console.error('Error:', error);
            });

}

});



// for Forgot password page

document.getElementById("otp_button").addEventListener("click", function(event){
    event.preventDefault()
    console.log("for got password request")
    var email_val= document.getElementById("email").value
    var otp_val= parseInt(document.getElementById("otp").value)
    // var password_val= document.getElementById("password").value
    data={
        "email": email_val,
        "otp": otp_val
    }
    console.log(data)
    validate_email=ValidateEmail(email_val)
    if (email_val && otp_val && validate_email){
        
            fetch('/otpverify', {
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
                {
                    window.location.href = '/recovery';
                }
            else if(data["code"]==2){
                    // call modal

                    $(document).Toasts('create', {
                        class: "bg-warning",
                        title: 'Warning',
                        body: "Wrong OTP Or the 2 min time limit exceeded"
                      })
            
            }
            else if(data["code"]==3){
                    // call modal

                    $(document).Toasts('create', {
                        class: "bg-warning",
                        title: 'Warning',
                        body: "OTP already sent please check your email."
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
