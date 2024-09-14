document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const authMsg = document.getElementById("auth-msg");
  
      // Clear previous messages
      authMsg.textContent = "";
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          authMsg.textContent = data.errors.map((error) => error.msg).join(", ");
          authMsg.style.color = "red";
        } else {
          authMsg.textContent = "User created successfully";
          authMsg.style.color = "green";
          setTimeout(() => {
            window.location.href = "/login";
          }, 5000); // 5-second delay
        }
      } catch (err) {
        authMsg.textContent = `An error occurred: ${err.message}`;
      }
    });
  });
  