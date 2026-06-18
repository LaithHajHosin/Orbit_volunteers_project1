/* team  */

function fetchTeam() {
  fetch("http://volunteerorbit.atwebpages.com/api.php/users")
    .then((res) => {
      return res.json(); 
    })
    .then((res) => {
      const teamData = res.users;
      
      teamData.forEach((item) => {
        appendTeamitem(
          item.id,
          item.username,
          item.role,
          item.photo_url,
          item.bio
        );
      });
    })
   
}
function appendTeamitem(id , username, role, photo_url, bio) {
  const containerteam = document.querySelector(".team-container");
  
  if (!containerteam) return;


/*   const github = socialLink ? socialLink.github : "#";
  const linkedin = socialLink ? socialLink.linkedin : "#";
  const facebook = socialLink ? socialLink.facebook : "#"; */

  containerteam.innerHTML += `
  <a href="profile.html?id=${id}" class="team-card-link">
    <div class="team-card">
      <div class="card-container-img">
        <img
          class="card-image"
          src="${photo_url}"
          alt="${photo_url || username}" 
        />
      </div>
      
      <h3 class="card-title">${username}</h3>
      <h4 class="card-role">${role}</h4> 
      <p class="card-description">${bio}</p>
      
    </div>
    </a>
  `;
}


fetchTeam();
