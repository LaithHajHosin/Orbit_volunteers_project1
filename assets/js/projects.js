/* projects */

 function fetchProjects() {
   fetch("////.limit[6]")
    .then((res) => res.json())
     .then((res) => {
      const projectsData = res.projects;
      projectsData.forEach((item) => {
        appendNewitem(item.mainImage,
      item.title,
      item.desc,
      item.volunteers,
      item.status,
      item.views,
      item.catigory,);
      });
    });
 
 
}

function appendNewitem(mainImage ,
  title,
  desc,
  volunteers,
  status,
  views,
  catigory,
) {
  const container = document.querySelector(".projects-container");
  const volunteersImagesHTML = volunteers && volunteers.length > 0 
    ? volunteers.map(vol => `
        <img 
          src="${vol.profilePhoto.url}" 
          alt="${vol.profilePhoto.alt || 'متطوع'}" 
          class="volunteer-avatar"
          title="متطوع ${vol.id}" 
        />
      `).join(''): '<span class="no-volunteers">لا يوجد متطوعين بعد</span>';

  container.innerHTML += ` <div class="project-card">
  <div class="card-container-img">
              <img
                class="card-image"
                src=${mainImage.url}
                alt=${mainImage.alt}
              />
            </div>
            <h3 class="card-title">${title}</h3>
            <p class="card-description">
             ${desc}
              <a href="./project.details.html">اقرأ المزيد</a>
            </p>
        <p class="card-details">
              <span><i class="fa-solid fa-users"></i>${volunteersImagesHTML}</span><span><i class="fa-solid fa-clock"></i>${status}</span>
              <span><i class="fa-solid fa-eye">${views}</span>><span><i class="fa-solid fa-layer-group"></i>${category}/span>
            </p>
            <div class="card-cta">
              <button class="home-bottons">انضم للمشروع</button>
            </div
 
  </div> `;
}


function sendContactMessage(name, email, message) {
  fetch("////contact", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName: name,
      email: email,
      contentMessage: message
    })
  })
  .then(res => res.json())
  .then(data => alert("تم إرسال رسالتك بنجاح!"));
}