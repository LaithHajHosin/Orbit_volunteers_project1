const selectedUserName = "جميل"; 
fetch("data.json")
.then(res=>res.json())
.then(res=>{
  console.log(res)
  try{
    const selectedUser = res.ourTeam.find(team => team.userName === selectedUserName);
    document.getElementById("info-container").innerHTML = selectedUser ? `
      <div id="userDetails">
        <div id="userInfo">
          <h1>${selectedUser.userName}</h1>
          <h2>${selectedUser.role}</h2>
          <p>${selectedUser.bio}</p>
          <div class="social_links">
            <i class="fa-brands fa-linkedin"></i>
            <span>${selectedUser.social_links.linkedin}</span>
          </div>
          <div class="social_links">
            <i class="fa-brands fa-github"></i>
            <span>${selectedUser.social_links.github}</span>
          </div>
          <div class="social_links">
            <i class="fa-brands fa-facebook"></i>
            <span>${selectedUser.social_links.facebook}</span>
          </div>
        </div>
        <div id="userImage">
          <img src="${selectedUser.profilePhoto.url}" alt="${selectedUser.profilePhoto.alt}"/>
        </div>
      </div>
    ` : '<p>المستخدم غير موجود</p>';

    document.getElementById("skills_info").innerHTML=`
         <div> 
           <h2>المهارات العملية</h2>
           <p>  ${res.nav.actions.register.jobSkills}</p>
          </div>
     
          <div> 
           <h2> المهارات الشخصية </h2>
            <p>  ${res.nav.actions.register.softSkills}</p>
          </div>
     
    `
         document.getElementById("projects_info").innerHTML=

         res.projects.map(project=>{
          let currentStatus=project.status;
          return `
          <div id="project"> 
            
               <div id="status"> 
               ${project.statuses.map((status,index)=>`
                <span
                 class="${currentStatus === status ? "active_status":"status_default"}"
                >${status}</span>
              `).join("")} 
               </div>
               
               <img src="${project.mainImage.url}" alt="${project.mainImage.alt}"/>
             
             <div id="project_info"> 
               <h1>  ${project.title}</h1>
               <p>  ${project.desc}</p>
               <div> 
                 <p> المدة الزمنية للمشروع</p>
                 <span> ${project.start_date} -></span>
                 <span> ${project.expected_end}</span>
                </div>
                
                 <div id="project-interactions"> 
                  <i class="fa-solid fa-eye"> ${project.views}</i>
             
                  </div>
                  <div id="project_links"> 
                   <a href="${project.link}"> <i class="fa-solid fa-paper-plane"></i> </a>
                  <button> اقرأ المزيد</button>
                  </div>
                 
           </div>
          </div>
          ` }).join("")

          document.getElementById("articles_info").innerHTML =
            res.posts.map(post => {
              let currentStatus=post.status;
              return `
              <div class="article-card">
              <div id="status"> 
               ${post.statuses.map((status,index)=>`
                <span
                 class="${currentStatus === status ? "active_status":"status_default"}"
                >${status}</span>
              `).join("")} 
               </div>
                <img src="${post.mainImage}" alt="${post.title}" />
                <div class="article_info">
                  <h2>${post.catigory}</h2>
                  <h1>${post.title}</h1>
                  <p>${post.description}</p>
                  <div id="author_info"> 
                    <div id="author_details"> 
                      <i class="fa-solid fa-user"></i>
                      <h3>${post.author.name}</h3>
                      <span>  ${post.author.specialty}</span>
                     </div>
                     <div id="author_img"> 
                       <img src="${post.author.profile_image.url}" alt="${post.author.profile_image.alt}"/>
                     </div>

                  </div>
                  <div class="article-meta">
                    <span><i class="fa-solid fa-eye"></i> ${post.views}</span>
                    <span>تاريخ النشر: ${post.date}</span>
                  </div>
                </div>
              </div>
               ` }).join("");
     
    

  }catch(err){
    console.log(err)
  }
})