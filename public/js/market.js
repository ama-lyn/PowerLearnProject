document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const submitButton = form.querySelector("button");
  const authMsg = document.getElementById("auth-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product_name = document.getElementById("product_name").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    // Clear previous messages
    authMsg.textContent = "";

    const token = localStorage.getItem("token");

    try {
      submitButton.disabled = true;
      submitButton.textContent = "Posting...";

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_name,
          quantity,
          price,
          location,
          description,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        authMsg.textContent = data.errors.map((error) => error.msg).join(", ");
        authMsg.style.color = "red";
      } else {
        authMsg.textContent = "Product created successfully";
        authMsg.style.color = "green";

        // Reset form fields
        form.reset();
      }
    } catch (err) {
      authMsg.textContent = `An error occurred: ${err.message}`;
      authMsg.style.color = "red";
    } finally {
      // Re-enable the button and reset text
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
    }
  });
});
