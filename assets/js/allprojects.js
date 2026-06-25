/* All Projects */

let allProjectsData = [];

const backendAllProjectsUrl =
  "http://orbitvolunteers.atwebpages.com/projects";

const proxyAllProjectsUrl =
  `https://corsproxy.io/?${encodeURIComponent(backendAllProjectsUrl)}`;

function fetchAllProjects() {
  fetch(proxyAllProjectsUrl)
    .then((res) => {
      if (!res.ok)
        throw new Error("HTTP error! status: " + res.status);

      return res.json();
    })
    .then((res) => {

      allProjectsData = res.data;

      if (!allProjectsData) return;

      createCategoryFilters();

      const allProjectsContainer =
        document.querySelector(".allprojects-container");

      if (allProjectsContainer)
        allProjectsContainer.innerHTML = "";

      allProjectsData.forEach((item) => {
        appendNewAllProjectsItem(
          item.id,
          item.category_id,
          item.team_id,
          item.image1_url,
          item.title,
          item.description1,
          item.team_name,
          item.status,
          item.view_count,
          item.category_name
        );
      });
    })
    .catch((err) =>
      console.error("خطأ أثناء جلب البيانات:", err)
    );
}

function appendNewAllProjectsItem(
  id,
  category_id,
  team_id,
  image1_url,
  title,
  description1,
  team_name,
  status,
  view_count,
  category_name
) {
  const allProjectsContainer =
    document.querySelector(".allprojects-container");

  if (!allProjectsContainer) return;

  const imageUrl =
    image1_url
      ? image1_url
      : "./assets/images/test.jpg";

  const displayTeam =
    team_name
      ? team_name
      : "متطوع مستقل";

  allProjectsContainer.innerHTML += `
    <div
      class="project-card"
      id="${id}"
      data-category="${category_name}"
    >

      <div class="card-container-img">
        <img class="card-image" src="${imageUrl}" />
      </div>

      <div class="card-details-container">

        <h3 class="card-title">
          ${title}
          <span class="category-title">
            (${category_name})
          </span>
        </h3>

        <p class="card-description">
          ${description1}
          <a href="./project.details.html?id=${id}">
            اقرأ المزيد
          </a>
        </p>

        <p class="card-details">
          <span>
            <i class="fa-solid fa-users"></i>
            <a href="./team.profile.html?id=${team_id}">
              ${displayTeam}
            </a>
          </span>

          <span>
            <i class="fa-solid fa-clock"></i>
            ${status}
          </span>

          <span>
            <i class="fa-solid fa-eye"></i>
            ${view_count}
          </span>
        </p>

      </div>

      <div class="card-cta">
        <button class="home-bottons">
          انضم للمشروع
        </button>
      </div>

    </div>
  `;
}

function createCategoryFilters() {

  const filtersContainer =
    document.querySelector(".filters-right");

  if (!filtersContainer) return;

  const categories = [
    ...new Set(
      allProjectsData.map(
        (project) => project.category_name
      )
    ),
  ];

  filtersContainer.innerHTML = `
    <button
      class="project-button"
      onclick="filterProjects('all')"
    >
      عرض الجميع
    </button>
  `;

  categories.forEach((category) => {

    filtersContainer.innerHTML += `
      <button
        class="project-button"
        onclick="filterProjects('${category}')"
      >
        ${category}
      </button>
    `;
  });
}

function filterProjects(category) {

  const cards =
    document.querySelectorAll(".project-card");

  cards.forEach((card) => {

    const cardCategory =
      card.dataset.category;

    if (
      category === "all" ||
      cardCategory === category
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

fetchAllProjects();