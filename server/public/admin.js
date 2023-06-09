document.getElementById("login-btn").addEventListener("click", check);

function check(event) {
    event.preventDefault();
    const aname = document.getElementById("username").value;
    const apass = document.getElementById("password").value;
    
    if (aname == "hishan" && apass == "2023") {
      window.location.href = "add-question"; // redirect to success page
    } else {
      alert("Invalid username or password");
    }
}
