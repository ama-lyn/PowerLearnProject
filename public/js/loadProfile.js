document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // Fetching data
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      return await response.json();
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  // Update user profile information
  const updateUserProfile = async () => {
    const user = await fetchData("/api/auth/user");
    if (user) {
      const { firstName, lastName, email } = user;
      document.getElementById("firstName").textContent = firstName || "N/A";
      document.getElementById("lastName").textContent = lastName || "N/A";
      document.getElementById("email").textContent = email || "N/A";
    }
  };

  // Update additional profile info
  const updateAdditionalInfo = async () => {
    const userData = await fetchData("/api/user-profile/me");
    if (userData) {
      const { title, gender, phone_number, national_id_number, location } =
        userData;
      document.getElementById("title").textContent = title || "N/A";
      document.getElementById("gender").textContent = gender || "N/A";
      document.getElementById("phone-number").textContent =
        phone_number || "N/A";
      document.getElementById("national-id").textContent =
        national_id_number || "N/A";
      document.getElementById("location").textContent = location || "N/A";
    }
  };

  // Update profile image and social links
  const updateProfileImageAndLinks = async () => {
    const user = await fetchData("/api/user-profile/me");
    if (user) {
      const { profile_image, facebook_link, linkedin_link, instagram_link } =
        user;

      document.getElementById("profile-image").src =
        profile_image || "/images/profile.jpg";
      document.getElementById("facebook").href = facebook_link || "#";
      document.getElementById("linkedin").href = linkedin_link || "#";
      document.getElementById("instagram").href = instagram_link || "#";
    }
  };

  // Update waste list
  const updateWasteList = async () => {
    const wastes = await fetchData("/api/wastes");
    if (wastes) {
      const wasteListContainer = document.querySelector(".waste-list");
      wasteListContainer.innerHTML = "";
      wastes.forEach((waste) => {
        const wasteItem = document.createElement("p");
        wasteItem.innerHTML = `♻️<span>${waste.type || "N/A"}</span>`;
        wasteListContainer.appendChild(wasteItem);
      });
    }
  };

  updateUserProfile();
  updateAdditionalInfo();
  updateProfileImageAndLinks();
  updateWasteList();
});
