 /* projects *//*
 const backendAllProjectsUrl = "http://orbitvolunteers.atwebpages.com/projects";
      const proxyAllProjectsUrl = `https://corsproxy.io/?${encodeURIComponent(backendAllProjectsUrl)}`;

 function fetchAllProjects() {
  fetch(proxyAllProjectsUrl)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      return res.json();
    })
    .then((res) => {
      const projectsData = res.data;

      if (!projectsData) return;

      const container = document.querySelector(".allprojects-container");
      if (container) container.innerHTML = ""; 

      projectsData.forEach((item) => {
        appendNewitem(
          item.id,
          item.images,
          item.title,
          item.description1,
          item.team_name,
          item.status,
          item.view_count,
          item.category_name
        );
      });
    })
    .catch((err) => console.error("خطأ أثناء جلب البيانات:", err));
}

 function appendNewitem(
  id,
  images,
  title,
  description1,
  team_name,
  status,
  view_count,
  category_name
) {
  const container = document.querySelector(".projects-container");
  if (!container) return;

  const imageUrl = (images && images.length > 0) ? images[0].image_url : "https://via.placeholder.com/800x500";
  const imageAlt = (images && images.length > 0) ? images[0].alt : "No project image available";
  

  const displayTeam = team_name ? team_name : "متطوع مستقل";


  container.innerHTML += `
    <div class="project-card" id="${id}">
      <div class="card-container-img">
        <img class="card-image" src="${imageUrl}" alt="${imageAlt}" />
      </div>
      
      <h3 class="card-title">${title} <span class="category-title">(${category_name})</span></h3>
      
      <p class="card-description">
        ${description1}
        <a href="./project.details.html">اقرأ المزيد</a>
      </p>
      
      <p class="card-details">
        <span><i class="fa-solid fa-users"></i> ${displayTeam}</span>
        <span><i class="fa-solid fa-clock"></i> ${status}</span>
        <span><i class="fa-solid fa-eye"></i> ${view_count}</span>
      </p>
      
      <div class="card-cta">
        <button class="home-bottons">انضم للمشروع</button>
      </div>
    </div>
  `;
}


fetchAllProjects();  */