function fetchProjectDetails() {

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  const backendProjectUrl =
    `http://orbitvolunteers.atwebpages.com/projects/${projectId}`;

  const proxyProjectUrl =
    `https://corsproxy.io/?${encodeURIComponent(backendProjectUrl)}`;

  fetch(proxyProjectUrl)
    .then((res) => {
      if (!res.ok)
        throw new Error("HTTP error! status: " + res.status);

      return res.json();
    })
    .then((res) => {

  const project = res.data;

  appendProjectDetails(project);

})
    .catch((err) => {
      console.error(err);
    });
}


function appendProjectDetails(project) {

  const projectImage =
    project.image1_url || "./assets/images/test.jpg";

  document.querySelector(".details-image img").src =
    projectImage;

  document.querySelector(".details-image img").alt =
    project.title;

  document.querySelector(".details-info h1").textContent =
    project.title;

  document.querySelector(".details-info p").textContent =
    project.description1;

  document.querySelector(".details-stats").innerHTML = `
    <span>👁️ ${project.view_count}</span>
    <span>📌 ${project.category_name}</span>
    <span>🕒 ${project.status}</span>
    <span>👥 ${project.team?.members?.length || 0}</span>
  `;

  document.querySelector(".descriptions-grid").innerHTML = `
    <div class="description-card">
      <h3>التفصيل الأول</h3>
      <p>${project.description1 || ""}</p>
    </div>

    <div class="description-card">
      <h3>التفصيل الثاني</h3>
      <p>${project.description2 || ""}</p>
    </div>

    <div class="description-card">
      <h3>التفصيل الثالث</h3>
      <p>${project.description3 || ""}</p>
    </div>

    <div class="description-card">
      <h3>التفصيل الرابع</h3>
      <p>${project.description4 || ""}</p>
    </div>
  `;

  document.querySelector(".gallery-grid").innerHTML =
    project.images.length > 0
      ? project.images
          .map(
            (image) => `
              <img src="${image.image_url}" alt="${image.alt}">
            `
          )
          .join("")
      : "";

document.querySelector(".volunteers-list").innerHTML =
  project.team?.members
    ?.map((member) => {

      const initials =
        `${member.firstname.charAt(0)}${member.lastname.charAt(0)}`
          .toUpperCase();

      if (member.photo_url) {
        return `
          <img
            src="${member.photo_url}"
            alt="${member.firstname}"
            title="${member.firstname} ${member.lastname}"
          >
        `;
      }

      return `
        <div class="volunteer-avatar"
             title="${member.firstname} ${member.lastname}">
          ${initials}
        </div>
      `;
    })
    .join("") || "";
}
fetchProjectDetails();