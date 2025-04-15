function generateTopSection(data) {
  const about = data.topSection.aboutUs;
  const contact = data.topSection.contactInfo;

  // Build About Us section
  const aboutHTML = `
  <div class="about-us">
    <h2>${about.heading}</h2>
    <p>${about.description}</p>
    <div class="owners">
      <h3 style="text-align: center;">Meet the Owners</h3>
      ${about.owners
        .map(
          (owner) => `
          <div class="owner-info">
            <img src="${owner.profile}" alt="profile" id="profile-img">
            <div class="owner-text">
              <h5>${owner.name}</h5>
              <p>"${owner.bio}"</p>
            </div>
        </div>
      `
        )
        .join("")}
    </div>
    <img src="${about.image}" alt="Meal Prep Kitchen">
  </div>
`;

  // Build Contact Info section HTML
  const socialHTML = data.topSection.contactInfo.socialMedia
    .map(
      (social) => `
      <div class="media">
        <i class="${social.iconClass}">${social.text}</i>
      </div>
  `
    )
    .join("");

  const contactHTML = `
    <div class="contact-info">
      <h2>${contact.heading}</h2>
      <p><strong>Address:</strong> ${contact.address}</p>
      <p><strong>Phone:</strong> ${contact.phone}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Hours:</strong> ${contact.hours}</p>
      <img src="${contact.image}" alt="The Prep Pantry Location">
      <div class="social-media">
        <h3>Follow Us on Social Media</h3>
        ${socialHTML}
      </div>
    </div>
  `;

  // Combine both sections into a top section container
  return `
    <div class="top-section">
      ${aboutHTML}
      ${contactHTML}
    </div>
  `;
}

// Function to generate the bottom (pricing) section
function generateBottomSection(data) {
  const pricingHTML = data.bottomSection
    .map(
      (option) => `
    <div class="pricing-box">
      <h3>${option.heading}</h3>
      <img src="${option.image}" alt="${option.heading}">
      <p><strong>Price:</strong> ${option.price}</p>
      <p>${option.description}</p>
    </div>
  `
    )
    .join("");

  return `
    <div class="bottom-section">
      ${pricingHTML}
    </div>
  `;
}

// Function to load data and display content
function loadContactPage() {
  fetch("../assets/contactData.json")
    .then((response) => response.json())
    .then((data) => {
      const mainContainer = document.querySelector("main .container");
      mainContainer.innerHTML =
        generateTopSection(data) + generateBottomSection(data);
    })
    .catch((error) => {
      console.error("Error loading contact data:", error);
    });
}

document.addEventListener("DOMContentLoaded", loadContactPage);
