
  fetch("https://volunteer.gt.tc/api_user.php?user_id=2")
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    document.getElementById("info-container").innerHTML=`
    <div>
     <div id="bc-image">
       <img src= ${data.profilePhoto}/>
      </div>
     <div id="basic-info">
        <h1> ${data.fullName} </h1>  
        <h2> ${data.role} </h2> 
        <p>  ${data.bio} </p>
      <div id="special-info"> 
      <a href="#"> 
        <i class="fa-solid fa-location-dot"></i>
         <span>  ${data.contact.location}</span>
      </a>
      <a href="#"> 
        <i class="fa-regular fa-envelope"></i>
        <span>  ${data.social.email}</span>
      </a>
      </div>
  
     </div>
     <div id="social">
      <a href="#"> 
        <i class="fa-brands fa-github"></i>
         <span>  ${data.social.github}</span>
      </a>
       <a href="#"> 
       <i class="fa-brands fa-linkedin"></i>
         <span>  ${data.social.linkedIn}</span>
       </a>
       <a href="#"> 
          <i class="fa-brands fa-facebook"></i>
         <span>  ${data.social.facebook}</span>
        </a>
      </div>
    </div>
     
    `
    document.getElementById("skills-container").innerHTML=`
    <div id="skills"> 
     ${data.skills.map(skill=>`
      <div> 
      <h3> ${skill.skillName} </h3>
      </div>`).join("")}
    </div>
    `
    document.getElementById("projects-container").innerHTML=`
    <div> 
       ${data.projects.map(project=>`
        <div id="project"> 
          <div> 
         <img src=${project.projectImage}/>
         <h3> ${project["start_date"]} </h3>
         <h3> ${project["end_date"]} </h3>
         <a href=${project["gh-pages"]}> 
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
         
         </a>
         </div>
          <h2> ${project.title} </h2> 
          <p> ${project.desc}</p>
        </div>
      ` ).join("")}
    </div>
    `
    document.getElementById("articles-container").innerHTML=`
    <div> 
       ${data.articles.map(article=>`
        <div id="article"> 
        <div> 
         <img src=${article.articleImage}/>
         <h3> ${article["start-published"]} </h3>
        </div>
          <h2> ${article.title} </h2> 
          <h3> ${article.volunteerName} </h3>
          <p> ${article.content}</p>
        </div>
      ` ).join("")}
    </div>
    `
  }).catch(err=>console.log(err))
   
   
    
