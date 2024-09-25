document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  //Profile Image Form
  const formProfileImage = document.getElementById("form-profile-image");
  const authMsgProfileImage = document.getElementById("authMsgProfileImage");

  formProfileImage.addEventListener("submit", async (e) => {
    e.preventDefault();
    const profile_image = document.getElementById("profile_image").value;
    authMsgProfileImage.textContent = "";

    try {
      console.log("Token:", token); // Log token for debugging
      const response = await fetch("/api/user-profile/profile-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ profile_image }),
      });

      const data = await response.json();

      if (!response.ok) {
        authMsgProfileImage.textContent = data.errors.map((error) => error.msg).join(", ");
        authMsgProfileImage.style.color = "red";
      } else {
        authMsgProfileImage.textContent = "Added successfully";
        authMsgProfileImage.style.color = "green";
        formProfileImage.reset(); // Reset form fields
      }
    } catch (err) {
      authMsgProfileImage.textContent = `An error occurred: ${err.message}`;
      authMsgProfileImage.style.color = "red";
    }
  });

  // Social Links Form
  const formSocialLinks = document.getElementById("form-social-links");
  const authMsgSocialLinks = document.getElementById("authMsgSocialLinks");

  formSocialLinks.addEventListener("submit", async (e) => {
    e.preventDefault();
    const facebook_link = document.getElementById("facebook_link").value;
    const linkedin_link = document.getElementById("linkedin_link").value;
    const instagram_link = document.getElementById("instagram_link").value;
    authMsgSocialLinks.textContent = "";

    try {
      const response = await fetch("/api/user-profile/social-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ facebook_link, linkedin_link, instagram_link }),
      });

      const data = await response.json();

      if (!response.ok) {
        authMsgSocialLinks.textContent = data.errors.map((error) => error.msg).join(", ");
        authMsgSocialLinks.style.color = "red";
      } else {
        authMsgSocialLinks.textContent = "Added successfully";
        authMsgSocialLinks.style.color = "green";
        formSocialLinks.reset(); // Reset form fields
      }
    } catch (err) {
      authMsgSocialLinks.textContent = `An error occurred: ${err.message}`;
      authMsgSocialLinks.style.color = "red";
    }
  });

  // Personal Info Form
  const formPersonalInfo = document.getElementById("form-personal-info");
  const authMsgPersonalInfo = document.getElementById("authMsgPersonalInfo");

  formPersonalInfo.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const gender = document.getElementById("gender").value;
    const phone_number = document.getElementById("phone_number").value;
    const national_id_number = document.getElementById("national_id_number").value;
    const location = document.getElementById("location").value;
    authMsgPersonalInfo.textContent = "";

    try {
      const response = await fetch("/api/user-profile/personal-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title, gender, phone_number, national_id_number, location
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        authMsgPersonalInfo.textContent = data.errors.map((error) => error.msg).join(", ");
        authMsgPersonalInfo.style.color = "red";
      } else {
        authMsgPersonalInfo.textContent = "Added successfully";
        authMsgPersonalInfo.style.color = "green";
        formPersonalInfo.reset(); // Reset form fields
      }
    } catch (err) {
      authMsgPersonalInfo.textContent = `An error occurred: ${err.message}`;
      authMsgPersonalInfo.style.color = "red";
    }
  });
});
