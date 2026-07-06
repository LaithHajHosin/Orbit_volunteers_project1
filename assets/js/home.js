const backendHeroUrl = "http://orbitvolunteers.atwebpages.com/blocks?limit=1";
const proxyHeroUrl = `https://corsproxy.io/?${encodeURIComponent(backendHeroUrl)}`;

function fetchHero() {
  fetch(proxyHeroUrl)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      return res.json();
    })
    .then((res) => {
  
      if (!res.data || res.data.length === 0) return;
      const heroData = res.data[0]; 


      appendHeroitem(
        heroData.id,
        heroData.category_id,
        heroData.parent_id,
        heroData.description1,
        heroData.description2,
        heroData.title,
        heroData.image1_url
      );
    })
    .catch((err) => console.error("Fetch error:", err)); 
}

function appendHeroitem(id, category_id, parent_id, description1, description2, title, image1_url) {
  const containerHero = document.querySelector(".hero");
  if (!containerHero) return; 

 
  const heroImageUrl = image1_url ? image1_url : "./assets/images/test4.jpg";


  containerHero.innerHTML += `
    <div class="hero-img-container" id="${id}-${category_id}-${parent_id}">
      <img class="hero-img" src="${heroImageUrl}" alt="${title || 'Hero Image'}">
    </div>
    <div class="hero-text">
      <p class="hero-title">${description1 || ''}</p>
      <p>${description2 || ''}</p>
    </div>
  `;

}

fetchHero();



/* projects */

const backendProjectsUrl =
  "http://orbitvolunteers.atwebpages.com/projects?limit=3";
const proxyProjectsUrl = `https://corsproxy.io/?${encodeURIComponent(backendProjectsUrl)}`;

function fetchProjects() {
  fetch(proxyProjectsUrl)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      return res.json();
    })
    .then((res) => {
      const projectsData = res.data;

      if (!projectsData) return;

      const container = document.querySelector(".projects-container");
      if (container) container.innerHTML = "";

      projectsData.forEach((item) => {
        appendNewitem(
          item.id,
          item.category_id,
          item.team_id,
          item.image1_url,
          item.title,
          item.description1,
          item.team_name,
          item.status,
          item.view_count,
          item.category_name,
        );
      });
    })
    .catch((err) => console.error("خطأ أثناء جلب البيانات:", err));
}

function appendNewitem(
  id,
  category_id,
  team_id,
  image1_url,
  title,
  description1,
  team_name,
  status,
  view_count,
  category_name,
) {
  const container = document.querySelector(".projects-container");
  if (!container) return;

  const imageUrl = image1_url ? image1_url : "./assets/images/test.jpg";

  const displayTeam = team_name ? team_name : "متطوع مستقل";

  container.innerHTML += `
    <div class="project-card" id="${id}">
 
      <div class="card-container-img">
        <img class="card-image" src="${imageUrl}"  />
      </div>
      <div class='card-details-container'>
      <h3 class="card-title">${title} <span class="category-title" id=${category_id}>(${category_name})</span></h3>
      
      <p class="card-description">
        ${description1}
        <a href="./project.details.html?id=${id}">اقرأ المزيد</a>
      </p>
      
      <p class="card-details">
        <span><i class="fa-solid fa-users" ></i><a href="./team.profile.html?id=${team_id}"> ${displayTeam}</a></span>
        <span><i class="fa-solid fa-clock"></i> ${status}</span>
        <span><i class="fa-solid fa-eye"></i> ${view_count}</span>
      </p>
      </div>
      <div class="card-cta">
        <button class="home-bottons" id='open-register-btn'>انضم للمشروع</button>
      </div>

    </div>
  `;
}
fetchProjects();






/* blogs */

const backendBlogsUrl = "http://orbitvolunteers.atwebpages.com/blogs?limit=3";
const proxyBlogsUrl = `https://corsproxy.io/?${encodeURIComponent(backendBlogsUrl)}`;
function fetchBlogs() {
  fetch(proxyBlogsUrl)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      return res.json();
    })
    .then((res) => {
      const blogsData = res.data;

      if (!blogsData) return;

      const blogsContainer = document.querySelector(".articles-grid");
      if (blogsContainer) blogsContainer.innerHTML = "";

      blogsData.forEach((item) => {
        appendNewBlogitem(
          item.id,
          item.category_id,
          item.author_id,
          item.image1_url,
          item.title,
          item.url,
          item.tag,
          item.description1,
          item.comment_count,
          item.published_at,
          item.author_username,
          item.view_count,
          item.category_name,
        );
      });
    })
    .catch((err) => console.error("خطأ أثناء جلب البيانات:", err));
}
function appendNewBlogitem(
  id,
  category_id,
  author_id,
  description1,
  image1_url,
  title,
  url,
  tag,
  comment_count,
  published_at,
  author_username,
  view_count,
  category_name,
) {
  const blogsContainer = document.querySelector(".articles-grid");
  if (!blogsContainer) return;

   const imageUrl = image1_url == null ? image1_url : "./assets/images/test.jpg";
   const blogTitle = title === null ? title : "lorem lorem";
   const blogDescription1 = description1 === null ? description1 : "lorem lorem lorem lorem lorem lorem";
   
  blogsContainer.innerHTML += `

    <div class="article-card" id=${id}>
              <div class="card-img">
                <img src=${imageUrl} />
              </div>
              <div class="card-content">
                <span class="card-category" id=${category_id}>${category_name}</span>
                <h3 class="card-title">
                  <a href=${url}
                    >${blogTitle}</a>
                </h3>
                <p class="card-description">
                 ${blogDescription1}
                  <a href="./blog.details.html?id=${id}" class="read-more-link">اقرأ المزيد</a>
                </p>
                <div class="card-footer">
                  <div class="volunteer-info" ><a href="./profile.html?id=${author_id}">
                    <i class="fas fa-user-circle"></i>
                    <span>${author_username}</span>
                    </a>
                  </div>
                  <div class="post-meta">
                    <span
                      ><i class="far fa-calendar-alt"></i>${published_at}</span
                    >
                    <span>👁️${view_count} </span>
                    <span><i class="far fa-clock"></i>${comment_count} </span>
                  </div>
                </div>
              </div>
            </div>
  `;
}
fetchBlogs();






/* GOALS   */
const backendGoalsUrl = "http://orbitvolunteers.atwebpages.com/blocks";
const proxyGoalsUrl = `https://corsproxy.io/?${encodeURIComponent(backendGoalsUrl)}`;

function fetchGoals() {
  fetch(proxyGoalsUrl)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      return res.json();
    })
    .then((res) => {
      if (!res.data || res.data.length === 0) return;

      const selectedGoals = res.data.slice(1, 4); 

      const containerGoals = document.querySelector(".about-us-container");
 
      
    
      selectedGoals.forEach((goalsData) => {
        appendGoalsitem(
          goalsData.id,
          goalsData.category_id,
          goalsData.parent_id,
          goalsData.description1,
          goalsData.description2,
          goalsData.title,
          goalsData.icon_text,
        );
      });
    })
    .catch((err) => console.error("Fetch error:", err)); 
}

function appendGoalsitem(id, category_id, parent_id, description1, description2, title , icon_text) {
  const containerGoals = document.querySelector(".about-us-container");
  if (!containerGoals) return; 


  containerGoals.innerHTML += `
     <div class="about-us-card" id=${id}-${category_id}-${parent_id}>
            <p class="about-us-disc-icon">
              ${icon_text}
            </p>
            <h3 class="about-us-disc">${title}</h3>
            <p class="about-us-disc">${description1}</p>
            <p class="about-us-disc">${description2}</p>
          </div>
  `;

 
}

fetchGoals();





/* teams  */
const backendTeamsUrl = "http://orbitvolunteers.atwebpages.com/teams?limit=3";
const proxyTeamsUrl = `https://corsproxy.io/?${encodeURIComponent(backendTeamsUrl)}`;

function fetchTeams() {
  fetch(proxyTeamsUrl)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      return res.json();
    })
    .then((res) => {
      const teamsData = res.data;

      if (!teamsData) return;

      const teamsContainer = document.querySelector(".teams-grid");
      if (teamsContainer) teamsContainer.innerHTML = "";

      teamsData.forEach((item) => {
        appendNewTeamItem(
          item.id,
          item.name,
          item.slug,
          item.description,
          item.team_leader_id,
          item.created_at,
          item.updated_at,
          item.team_leader_name,
        );

        item.members.forEach((member) => {
          appendNewMemberItem(
            member.id,
            member.team_id,
            member.user_id,
            member.role,
            member.username,
            member.firstname,
            member.lastname,
            member.photo_url,
            member.bio,
          );
        });
      });
    })
    .catch((err) => console.error("خطأ أثناء جلب بيانات الفرق:", err));
}

function appendNewTeamItem(
  id,
  name,
  slug,
  description,
  team_leader_id,
  created_at,
  updated_at,
  team_leader_name,
) {
  const teamsContainer = document.querySelector(".teams-grid");
  if (!teamsContainer) return;

  teamsContainer.innerHTML += `

    <div class="team-card" id="${id}">
      <a href='./team.profile.html?id=${id}'>
      <div class="team-card-body">
        <span class="team-slug">@${slug}</span>
        <h3 class="team-title">${name}</h3>
        <p class="team-description">${description}</p>
        
        <div class="team-leader-badge" >
        <a href='./profile.html?id=${team_leader_id}'>
          <i class="fas fa-crown"></i>
          <span>القائد: ${team_leader_name}</span>
          </a>
        </div>
        
        <hr class="divider" />
        
        <div class="team-members-section">
          <h4 class="section-title"><i class="fas fa-users"></i> أعضاء الفريق:</h4>
          <div class="members-sub-container" id="team-members-${id}"></div>
        </div>
      </div>
          </a>
    </div>

  `;
}

function appendNewMemberItem(
  id,
  team_id,
  user_id,
  role,
  username,
  firstname,
  lastname,
  photo_url,
  bio,
) {
  const membersContainer = document.querySelector(`#team-members-${team_id}`);
  if (!membersContainer) return;

  const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  const avatarHtml = photo_url
    ? `<img src="${photo_url}" alt="${username}" />`
    : `<div class="avatar-placeholder">${initials}</div>`;

  membersContainer.innerHTML += `
       <a href='./profile.html?id=${id}'>
    <div class="team-member-item"  data-user-id="${user_id}" >
      <div class="member-avatar-box">
        ${avatarHtml}
      </div>
      <div class="member-details">
        <span class="member-fullname">${firstname} ${lastname}</span>
        <span class="member-role">${role}</span>
        <span class="member-role">${bio || ""}</span>
      </div>
    </div>
          </a>
  `;
}

fetchTeams();
