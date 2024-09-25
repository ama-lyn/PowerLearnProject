import { updateUserProfile } from '/js/loadProfile.js';
import{ updateProfileAdditionalInfo } from '/js/loadProfile.js';
import{ updateImageAndLinks } from '/js/loadProfile.js';
import{ updateWasteList } from '/js/loadProfile.js';

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
        formProfileImage.reset();
        updateImageAndLinks();
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
        formSocialLinks.reset(); 
        updateImageAndLinks();
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
        formPersonalInfo.reset(); 
        updateProfileAdditionalInfo();
      }
    } catch (err) {
      authMsgPersonalInfo.textContent = `An error occurred: ${err.message}`;
      authMsgPersonalInfo.style.color = "red";
    }
  });

 // WasteForm
const formWaste = document.getElementById("form-waste");
const authMsgWaste = document.getElementById("authMsgWaste");

formWaste.addEventListener("submit", async (e) => {
  e.preventDefault();
  const type = document.getElementById("type").value;
  const source = document.getElementById("source").value;

  authMsgWaste.textContent = "";

  try {
    const response = await fetch("/api/wastes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ type, source }),
    });

    const data = await response.json();

    if (!response.ok) {
      authMsgWaste.textContent = data.errors ? data.errors.map((error) => error.msg).join(", ") : "Error adding waste.";
      authMsgWaste.style.color = "red";
    } else {
      authMsgWaste.textContent = "Added successfully";
      authMsgWaste.style.color = "green";
      formWaste.reset(); 
      updateWasteList(); 
    }
  } catch (err) {
    authMsgWaste.textContent = `An error occurred: ${err.message}`;
    authMsgWaste.style.color = "red";
  }
});

// Call to update waste list on page load
updateWasteList();
updateUserProfile();
updateImageAndLinks();
updateProfileAdditionalInfo();

});
