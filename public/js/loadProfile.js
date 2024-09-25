const token = localStorage.getItem("token");

//user profile
export async function updateUserProfile() {
  try {
    const response = await fetch("/api/auth/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      const { firstName, lastName, email } = user;

      // Update the profile section
      document.getElementById("firstName").textContent = firstName || "N/A";
      document.getElementById("lastName").textContent = lastName || "N/A";
      document.getElementById("email").textContent = email || "N/A";
    } else {
      console.error("Failed to fetch user data:", response.statusText);
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
}

//user profile Addditional Info
export async function updateProfileAdditionalInfo() {
  try {
    const response = await fetch("/api/user-profile/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      const { title, gender, phone_number, national_id_number, location } =
        userData;

      // Update the profile section
      document.getElementById("title").textContent = title || "N/A";
      document.getElementById("gender").textContent = gender || "N/A";
      document.getElementById("phone-number").textContent =
        phone_number || "N/A";
      document.getElementById("national-id").textContent =
        national_id_number || "N/A";
      document.getElementById("location").textContent = location || "N/A";
    } else {
      console.error("Failed to fetch user data:", response.statusText);
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
}

// Profile Image and Social Links
export async function updateImageAndLinks() {
  try {
    const response = await fetch("/api/user-profile/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      const { profile_image, facebook_link, linkedin_link, instagram_link } =
        user;

      // Update the profile image
      document.getElementById("profile-image").src =
        profile_image || "/images/profile.jpg";

      // Update social links
      if (facebook_link) {
        document.getElementById("facebook").href = facebook_link;
      } else {
        document.getElementById("facebook").style.display = "none"; // Hide the link if not available
      }

      if (linkedin_link) {
        document.getElementById("linkedin").href = linkedin_link;
      } else {
        document.getElementById("linkedin").style.display = "none"; // Hide the link if not available
      }

      if (instagram_link) {
        document.getElementById("instagram").href = instagram_link;
      } else {
        document.getElementById("instagram").style.display = "none"; // Hide the link if not available
      }
    } else {
      console.error("Failed to fetch user data:", response.statusText);
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
}

//Wastes
// Function to fetch and update the waste list
export async function updateWasteList() {
  try {
    const response = await fetch("/api/wastes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const wastes = await response.json();
      const wasteListContainer = document.querySelector(".waste-list");
      wasteListContainer.innerHTML = ""; // Clear previous list

      wastes.forEach((waste) => {
        const wasteItem = document.createElement("p");
        wasteItem.innerHTML = `♻️<span>${waste.type || "N/A"}</span>`;
        wasteListContainer.appendChild(wasteItem);
      });
    } else {
      console.error("Failed to fetch waste data:", response.statusText);
    }
  } catch (err) {
    console.error("Error fetching waste data:", err);
  }
}
