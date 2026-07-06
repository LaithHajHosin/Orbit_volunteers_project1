document.addEventListener("DOMContentLoaded", () => {

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id') || '1'; 

 
  const backendUrl = `http://volunteerorbit.atwebpages.com/api.php/user/${userId}`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(backendUrl)}`;

  fetch(proxyUrl)
    .then(res => {
      if (!res.ok) throw new Error("فشل السيرفر في الاستجابة");
      return res.json();
    })
    .then(res => {
      console.log("البيانات المستلمة الأصلية:", res);
      

      let user = null;
      if (res.user) {
        user = res.user;
      } else if (Array.isArray(res)) {
        user = res[0];
      } else {
        user = res;
      }


      if (!user) {
        console.error("لم يتم العثور على بيانات مستخدم متوافقة.");
        return;
      }

      try {

        const infoContainer = document.getElementById("info-container");
        if (infoContainer) {
          infoContainer.innerHTML = `
            <div id="userDetails">
              <div id="userInfo">
                <h1>${user.firstname || ''} ${user.lastname || ''}</h1>
                <h3 id="username">${user.username || ''}</h3>
                <p class="join-date">انضم في ${user.created_at || ''}</p>
                <div class="user-meta">
                  <div class="meta-badge">${user.nationality || 'غير محدد'}</div>
                  <div class="meta-badge">${user.role || ''}</div>
                  <div class="meta-badge">${user.specialization || ''}</div>
                </div>
                <p id="bio">${user.bio || 'لا يوجد نبذة شخصية حتى الآن.'}</p>
                <div class="links_container"> 
                  <div class="social_links">
                    <i class="fa-solid fa-envelope"></i>
                    <span>${user.email || 'لا يوجد'}</span>
                  </div>
                  <div class="social_links">
                    <i class="fa-brands fa-linkedin"></i>
                    <span>${user.linkedin_url || 'لا يوجد'}</span>
                  </div>
                  <div class="social_links">
                    <i class="fa-brands fa-github"></i>
                    <span>${user.github_url || 'لا يوجد'}</span>
                  </div>
                  <div class="social_links">
                    <i class="fa-brands fa-facebook"></i>
                    <span>${user.facebook_url || 'لا يوجد'}</span>
                  </div>
                  <div class="social_links">
                    <i class="fa-solid fa-phone"></i>
                    <span>${user.mobile_phone || 'لا يوجد'}</span>
                  </div>
                </div>
              </div>
              <div id="userImage">
                <img src="${user.photo_url || './assets/images/test.jpg'}" alt="${user.username || 'user'}"/>
              </div>
            </div>
          `;
        }

        // طباعة المهارات
        const skillsInfo = document.getElementById("skills_info");
        if (skillsInfo) {
          skillsInfo.innerHTML = user.skills && user.skills.length > 0 
            ? user.skills.map(skill => `
                <div class="skill"> 
                  <div class="skill_header"> 
                    <h2>${skill.skill_name}</h2>
                    <h3 id="skill_level">${skill.proficiency_level}</h3>
                  </div>
                  <h3>الترتيب: ${skill.display_order || '1'}</h3>
                  <div class="date">
                    <p>${skill.created_at || ''}</p>
                    <span> -> </span>
                    <p>${skill.updated_at || ''}</p>
                  </div>
                </div>
              `).join("")
            : '<p>لا توجد مهارات مضافة بعد.</p>';
        }


        const experienceInfo = document.getElementById("experience_info");
        if (experienceInfo) {
          experienceInfo.innerHTML = user.experiences && user.experiences.length > 0
            ? `
              <div class="experiences-flex">
                ${user.experiences.map(experience => `
                  <div class="experience-card">
                    <div class="exp-header">
                      <h3 class="exp-title">${experience.title}</h3>
                      <div class="exp-company">${experience.company}</div>
                    </div>
                    <div class="exp-location">${experience.location || ''}</div>
                    <p class="exp-desc">${experience.description || ''}</p>
                    <div class="exp-dates">
                      <time class="exp-start">${experience.start_date}</time>
                      <span class="exp-sep">—</span>
                      <time class="exp-end">${experience.end_date || 'الحاضر'}</time>
                    </div>
                  </div>
                `).join("")}
              </div>
            `
            : '<p>لا توجد خبرات مضافة.</p>';
        }

      
        const educationInfo = document.getElementById("education_info");
        if (educationInfo) {
          educationInfo.innerHTML = user.education && user.education.length > 0
            ? user.education.map(edu => `
                <div class="education_card"> 
                  <h3 id="degree"><span class="card_title">Degree:</span> ${edu.degree}</h3>
                  <h3 id="field_of_study"><span class="card_title">Field of study:</span> ${edu.field_of_study}</h3>
                  <h3><span class="card_title">Institution:</span> ${edu.institution}</h3>
                  <p id="edu-desc">${edu.description || ''}</p>
                  <div class="date"> 
                    <span>${edu.start_date}</span>
                    <span> -> </span>
                    <span>${edu.end_date}</span>
                  </div>
                </div>
              `).join("")
            : '<p>لا توجد معلومات تعليمية مضافة.</p>';
        }

        const projectsContainer = document.querySelector(".projects-container");
        if (projectsContainer) {
          if (user.projects && user.projects.length > 0) {
            projectsContainer.innerHTML = ""; // تنظيف الداتا الـ Static
            user.projects.forEach(project => {
              const volunteersImagesHTML = project.volunteers && project.volunteers.length > 0 
                ? project.volunteers.map(vol => `
                    <img src="${vol.profilePhoto?.url || './assets/images/test.jpg'}" class="volunteer-avatar" title="متطوع" />
                  `).join('')
                : '<span class="no-volunteers">لا يوجد متطوعين</span>';

              projectsContainer.innerHTML += `
                <div class="project-card">
                  <div class="card-container-img">
                    <img class="card-image" src="${project.mainImage?.url || './assets/images/test.jpg'}" alt="Project Image" />
                  </div>
                  <h3 class="card-title">${project.title || 'عنوان المشروع'}</h3>
                  <p class="card-description">
                    ${project.desc || 'وصف المشروع غير متاح حالياً'}
                    <a href="./project.details.html">اقرأ المزيد</a>
                  </p>
                  <p class="card-details">
                    <span><i class="fa-solid fa-users"></i> ${volunteersImagesHTML}</span>
                    <span><i class="fa-solid fa-clock"></i> ${project.status || 'مستمر'}</span>
                    <span><i class="fa-solid fa-eye"></i> ${project.views || 0}</span>
                    <span><i class="fa-solid fa-layer-group"></i> ${project.category || 'عام'}</span>
                  </p>
                  <div class="card-cta">
                    <button class="home-bottons">انضم للمشروع</button>
                  </div>
                </div>
              `;
            });
          } else {
            projectsContainer.innerHTML = '<p>لا توجد مشاريع مضافة لهذا المستخدم.</p>';
          }
        }

     
        const articlesGrid = document.querySelector(".articles-grid");
        if (articlesGrid) {
          const articles = user.blogs || user.articles;
          if (articles && articles.length > 0) {
            articlesGrid.innerHTML = ""; 
            articles.forEach(article => {
              articlesGrid.innerHTML += `
                <div class="article-card">
                  <div class="card-img">
                    <img src="${article.image_url || './assets/images/ai.webp'}" alt="${article.title || 'المقالة'}" />
                  </div>
                  <div class="card-content">
                    <span class="card-category">${article.category || 'تقنية'}</span>
                    <h3 class="card-title">
                      <a href="article.html?id=${article.id}">${article.title || 'عنوان المقال'}</a>
                    </h3>
                    <p class="card-description">
                      ${article.summary || article.content || 'محتوى المقال غير متاح حالياً...'}
                      <a href="article.html?id=${article.id}" class="read-more-link">اقرأ المزيد</a>
                    </p>
                    <div class="card-footer">
                      <div class="volunteer-info">
                        <i class="fas fa-user-circle"></i>
                        <span>${user.firstname || 'كاتب مجهول'}</span>
                      </div>
                      <div class="post-meta">
                        <span><i class="far fa-calendar-alt"></i> ${article.created_at || 'مؤخراً'}</span>
                        <span><i class="far fa-clock"></i> ${article.read_time || '5'} دقائق</span>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            });
          } else {
            articlesGrid.innerHTML = '<p>لا توجد مقالات منشورة بواسطة هذا المستخدم بعد.</p>';
          }
        }

      } catch (error) {
        console.error("خطأ أثناء معالجة الـ DOM وعرض البيانات ومطابقتها:", error);
      }
    })
    .catch(error => {
      console.error("خطأ في الاتصال بالـ API:", error);
    });
});