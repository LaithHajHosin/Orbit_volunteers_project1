/* teams  */
const backendAllTeamsUrl = "http://orbitvolunteers.atwebpages.com/teams";
const proxyAllTeamsUrl = `https://corsproxy.io/?${encodeURIComponent(backendAllTeamsUrl)}`;

function fetchAllTeams() {
  fetch(proxyAllTeamsUrl)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      return res.json();
    })
    .then((res) => {
      const allTeamsData = res.data;

      if (!allTeamsData) return;

      const allTeamsContainer = document.querySelector(".allteams-grid");
      if (allTeamsContainer) allTeamsContainer.innerHTML = "";

      allTeamsData.forEach((item) => {
        appendNewAllTeamItem(
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
          appendNewAllTeamMemberItem(
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

function appendNewAllTeamItem(
  id,
  name,
  slug,
  description,
  team_leader_id,
  created_at,
  updated_at,
  team_leader_name,
) {
  const allTeamsContainer = document.querySelector(".allteams-grid");
  if (!allTeamsContainer) return;

  allTeamsContainer.innerHTML += `

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

function appendNewAllTeamMemberItem(
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
  const teamMembersContainer = document.querySelector(`#team-members-${team_id}`);
  if (!teamMembersContainer) return;

  const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  const avatarHtml = photo_url
    ? `<img src="${photo_url}" alt="${username}" />`
    : `<div class="avatar-placeholder">${initials}</div>`;

  teamMembersContainer.innerHTML += `
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

fetchAllTeams();
