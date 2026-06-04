/* hero*/

 function fetchHero() {
   fetch("////").then((res) => res.json())
 .then((res) => {
      const item = res.hero;
      appendHeroitem(item.title, item.heroImage);
    })
}

function appendHeroitem(title, heroImage) {
  const containerHero = document.querySelector(".hero");
  containerHero.innerHTML += `   <div class="hero-img-container">
            <img class="hero-img" src=${heroImage.url} alt=${heroImage.alt} >
          </div>
          <div class="hero-text">
            <p class="hero-title">${title}</p>
            <p>مشروع +500</p>
          </div> `;
}




/* about us */

 function fetchAbout() {
   fetch("////.limit[6]")
    .then((res) => res.json())
   .then((res) => {
      const aboutData = res.aboutUs;
      aboutData.forEach((item) => {
        appendAboutitem(item.icon, item.title, item.desc);
      });
    });
}

function appendAboutitem(icon, title, desc) {
  const containerAboutUs = document.querySelector(".about-us-container");
  containerAboutUs.innerHTML += ` <div class="about-us-card">
  <p class="about-us-disc"><i class="cta-text-icon ${icon}"></i></p>
            <h3 class="about-us-disc">${title}</h3>
            <p class="about-us-disc">${desc}</p>

 
  </div> `;
}

/* our team*/

/* team */

function fetchTeam() {
  fetch("////.limit[6]")
    .then((res) => {
      return res.json(); 
    })
    .then((res) => {
      const teamData = res.team;
      
      teamData.forEach((item) => {
        appendTeamitem(
          item.usersName,
          item.role,
          item.profilePhoto,
          item.bio,
          item.social_link 
        );
      });
    })
   
}
function appendTeamitem(usersName, role, profilePhoto, bio, socialLink) {
  const containerteam = document.querySelector(".team-container");
  
  if (!containerteam) return;


  const github = socialLink ? socialLink.github : "#";
  const linkedin = socialLink ? socialLink.linkedin : "#";
  const facebook = socialLink ? socialLink.facebook : "#";

  containerteam.innerHTML += `
    <div class="team-card">
      <div class="card-container-img">
        <img
          class="card-image"
          src="${profilePhoto.url}"
          alt="${profilePhoto.alt || usersName}"
        />
      </div>
      
      <h3 class="card-title">${usersName}</h3>
      <h4 class="card-role">${role}</h4> <p class="card-description">${bio}</p>
      
      <p class="card-details">
        <a href="${github}" target="_blank">github</a> | 
        <a href="${linkedin}" target="_blank">linkedin</a> | 
        <a href="${facebook}" target="_blank">facebook</a>
      </p>
    </div>
  `;
}