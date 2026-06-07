function fetchProjectDetails() {
  fetch("API_URL_HERE")
    .then((res) => res.json())
    .then((res) => {
      const project = res.project;

      appendProjectDetails(project);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

function appendProjectDetails(project) {

  document.querySelector(".details-image img").src =
    project.mainImage.url;

  document.querySelector(".details-image img").alt =
    project.mainImage.alt;

  document.querySelector(".details-info h1").textContent =
    project.title;

  document.querySelector(".details-info p").textContent =
    project.desc;

  document.querySelector(".details-stats").innerHTML = `
    <span>👁️ ${project.views}</span>
    <span>👥 ${project.volunteers.length}</span>
    <span>📌 ${project.catigory}</span>
    <span>🕒 ${project.status}</span>
  `;

  document.querySelector(".descriptions-grid").innerHTML = `
    <div class="description-card">
      <h3>التفصيل الأول</h3>
      <p>${project.full_desc.desc1}</p>
    </div>

    <div class="description-card">
      <h3>التفصيل الثاني</h3>
      <p>${project.full_desc.desc2}</p>
    </div>

    <div class="description-card">
      <h3>التفصيل الثالث</h3>
      <p>${project.full_desc.desc3}</p>
    </div>

    <div class="description-card">
      <h3>التفصيل الرابع</h3>
      <p>${project.full_desc.desc4}</p>
    </div>
  `;

  document.querySelector(".gallery-grid").innerHTML =
    project.albumPhotos
      .map(
        (photo) => `
        <img src="${photo.url}" alt="${photo.alt}">
      `
      )
      .join("");

  document.querySelector(".volunteers-list").innerHTML =
    project.volunteers
      .map(
        (volunteer) => `
        <img
          src="${volunteer.profilePhoto.url}"
          alt="${volunteer.profilePhoto.alt}"
        >
      `
      )
      .join("");
}

fetchProjectDetails();