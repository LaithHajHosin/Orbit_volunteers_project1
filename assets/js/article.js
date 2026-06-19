const heroDiv = document.getElementById("articleHero");
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

function loadArticle() {
  fetch("data.json")
    .then(res => res.json())
    .then(data => {



























































































































































































































































































































































































































































      
      const posts = data.posts || [];
      const post = posts.find(p => p.id === postId);

      if (!post) {
        heroDiv.innerHTML = "<p style='color:red; text-align:center;'>المقالة غير موجودة</p>";
        return;
      }

      const cover = post.mainImage || "./assets/images/default.jpg";
      const authorName = post.author?.name || "غير معروف";
      const authorSpecialty = post.author?.specialty || "";
      const authorImg = post.author?.profile_image?.url || "./assets/images/profilePic.png";
      const readingTime = post.readingTime?.time || "غير محدد";
      const views = post.views || 0;
      const date = post.date || "";

      // بناء النص التفصيلي
      const fullDesc = post.full_desc;
      let fullHtml = "";
      if (fullDesc) {
        if (fullDesc.desc1) fullHtml += `<p>${fullDesc.desc1}</p>`;
        if (fullDesc.desc2) fullHtml += `<p>${fullDesc.desc2}</p>`;
        if (fullDesc.desc3) fullHtml += `<p>${fullDesc.desc3}</p>`;
        if (fullDesc.desc4) fullHtml += `<p>${fullDesc.desc4}</p>`;
      }
      if (!fullHtml && post.description) fullHtml = `<p>${post.description}</p>`;
      if (!fullHtml) fullHtml = "<p>لا يوجد محتوى تفصيلي لهذه المقالة حالياً.</p>";

      heroDiv.innerHTML = `
        <img src="${cover}" class="article-cover" alt="${post.title}">
        <div class="article-info">
          <h1>${post.title}</h1>
          <div class="author-block">
            <img src="${authorImg}" class="author-avatar-lg" alt="${authorName}">
            <div>
              <div class="author-name-lg">${authorName}</div>
              <div class="author-specialty-lg">${authorSpecialty}</div>
            </div>
          </div>
<div class="reading-time"><i class="far fa-clock"></i> ${readingTime}</div>        <div class="article-full-text-inline">${fullHtml}</div>
        </div>
      `;

      // إدراج وقت القراءة وعدد المشاهدات داخل .likes-dislikes
      const likesDislikesDiv = document.querySelector('.likes-dislikes');
      if (likesDislikesDiv) {
        // إضافة عناصر جديدة في نهاية الصف (بعد أزرار اللايك)
        const statsSpan = document.createElement('div');
        statsSpan.className = 'reading-views-stats';
        statsSpan.innerHTML = `
    <span><i class="far fa-calendar-alt"></i> ${date}</span>
          <span><i class="fa-solid fa-eye"></i> ${views}</span>
        `;
        likesDislikesDiv.appendChild(statsSpan);
      }
    })
    .catch(err => {
      console.error("خطأ في التحميل:", err);
      heroDiv.innerHTML = "<p style='color:red; text-align:center;'>حدث خطأ أثناء التحميل</p>";
    });
}

loadArticle();