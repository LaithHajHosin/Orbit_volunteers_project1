 fetch(`http://volunteerorbit.atwebpages.com/api.php/user/1`)
 .then(res=>res.json())
 .then(res=>
 {
  console.log(res)
  return res
 }
 )
 .then(res=>{
  console.log(res);
   const user=res.user
  
    try{
      document.getElementById("info-container").innerHTML = `
      <div id="userDetails">
        <div id="userInfo">
           <h1>${user.firstname} ${user.lastname}</h1>
          <h3 id="username">${user.username}</h3>
          <p class="join-date">انضم في ${user.created_at}</p>
          <div class="user-meta">
            <div class="meta-badge">${user.nationality}</div>
            <div class="meta-badge">${user.role}</div>
            <div class="meta-badge">${user.specialization}</div>
          </div>
          <p id="bio">${user.bio}</p>
          <div class="links_container"> 
           <div class="social_links">
             <i class="fa-solid fa-envelope"></i>
             <span>${user.email}</span>
           </div>
           <div class="social_links">
             <i class="fa-brands fa-linkedin"></i>
             <span>${user.linkedin_url}</span>
           </div>
           <div class="social_links">
             <i class="fa-brands fa-github"></i>
             <span>${user.github_url}</span>
           </div>
           <div class="social_links">
             <i class="fa-brands fa-facebook"></i>
             <span>${user.facebook_url}</span>
           </div>
             <div class="social_links">
             <i class="fa-solid fa-phone"></i>
             <span>${user.mobile_phone}</span>
           </div>
         </div>
        </div>
        <div id="userImage">
          <img src="${user.photo_url}"/>
        </div>
        
      </div>
      
    ` 
     document.getElementById("skills_info").innerHTML=`
         
           ${user.skills?.map(skill=>{
               return `
               <div class="skill"> 
                 <div class="skill_header"> 
                    <h2> ${skill.skill_name} </h2>
                    <h3 id="skill_level">  ${skill.proficiency_level}</h3>
                 </div>
                <h3> ${skill.display_order} </h3>
                <div class="date">
                <p>${skill.created_at}  </p>
                <span> -></span>
                <p>${skill.updated_at} </p>
                </div>
               </div>
               
               `

           }).join("")}
    `
     document.getElementById("experience_info").innerHTML=`
      <div class="experiences-flex">
      ${user.experiences?.map(experience=>{
        return `
        <div class="experience-card">
          <div class="exp-header">
            <h3 class="exp-title">${experience.title}</h3>
            <div class="exp-company">${experience.company}</div>
          </div>
          <div class="exp-location">${experience.location}</div>
          <p class="exp-desc">${experience.description}</p>
          <div class="exp-dates">
            <time class="exp-start">${experience.start_date}</time>
            <span class="exp-sep">—</span>
            <time class="exp-end">${experience.end_date || 'Present'}</time>
          </div>
        </div>
        `
      }).join("")}
      </div>
     `
     document.getElementById("education_info").innerHTML=`
   
      ${user.education?.map(edu=>{
        return `
         <div class="education_card"> 
           <h3 id="degree"> <span class="card_title"> Degree: </span> ${edu.degree} </h2>
           <h3 id="field_of_study"> <span class="card_title">  Field of study: </span> ${edu.field_of_study} </h2>
           <h3> <span class="card_title">Institution: </span> ${edu.institution} </h3>
            <p id="edu-desc">
            ${edu.description}
            </p>
           <div class="date"> 
           <span> ${edu.start_date} </span>
           <span> -> </span>
           <span> ${edu.end_date} </span>
           </div>
           <div> 
           
           </div>
         </div>
        `
      })}
    
     `
//  projects
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
            <h3 class="card-title">
            
            ${title}
            </h3>
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
    catch(error){
      console.log(error)
    }
 })