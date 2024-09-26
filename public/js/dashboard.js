document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("date");

  const date = new Date();

  // Define options to format the date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  // Format the date
  const formattedDate = date
    .toLocaleDateString("en-GB", options)
    .replace(",", "");

  // Set the formatted date in the HTML
  dateElement.textContent = formattedDate;

  //USER PROFILE, First Name
  async function fetchFirstName() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        const { lastName } = user;

        // Update the greeting message
        document.getElementById(
          "welcome"
        ).textContent = `Welcome Back, ${lastName} 😊`;
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }
  fetchFirstName();

//chart 
  const ctx = document.getElementById("co2Chart").getContext("2d");
  const co2Chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["CO2 Avoided", "Potential CO2"],
      datasets: [
        {
          label: "CO2 Emissions",
          data: [80, 20],
          backgroundColor: ["rgba(76, 175, 80, 0.7)", "rgba(244, 67, 54, 0.7)"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ": " + tooltipItem.raw + "%";
            },
          },
        },
      },
    },
  });
});
