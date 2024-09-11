document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const authMsg = document.getElementById("auth-msg");
  
      // Clear previous messages
      authMsg.textContent = "";
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          localStorage.setItem("token", data.token); // Store the token
          authMsg.textContent = "Login successful, redirecting...";
          authMsg.style.color = "green";
  
          setTimeout(() => {
            window.location.href = "dashboard.html"; // Change to your desired redirect location
          }, 3000); // 3-second delay
        } else {
          authMsg.textContent = data || "An error occurred";
          authMsg.style.color = "red";
        }
      } catch (err) {
        authMsg.textContent = "An error occurred: " + err.message;
        authMsg.style.color = "red";
      }
    });
  });
  