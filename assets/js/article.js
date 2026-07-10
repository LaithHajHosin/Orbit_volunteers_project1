document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://orbitvolunteers.atwebpages.com";
  const PROXY_URL = `https://corsproxy.io/?${encodeURIComponent}`;

  const heroDiv = document.getElementById("articleHero");
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

    const fallbackPost = {
    id: 1,
    title: "كيف تغير نماذج اللغة الكبيرة (LLMs) مستقبل البرمجة؟",
    image1_url: "./assets/images/ai.webp",
    author_username: "أدهم",
    published_at: "2026-01-10",
    view_count: 20,
    description1: "هذا وصف موجز للمقالة. يهدف هذا المقال إلى شرح تأثير LLMs على البرمجة...",
    description2: "في عالم البرمجة، أحدثت هذه النماذج ثورة حقيقية...",
    description3: "لكن هناك تحديات مثل الهلوسة وخصوصية البيانات...",
    description4: "في المستقبل، ستصبح هذه الأدوات جزءاً أساسياً من التطوير."
  };

function loadArticle() {
<<<<<<< HEAD
  if (!postId) {
    renderArticle(fallbackPost);
    loadComments(fallbackPost.id);   
    bindAddComment(fallbackPost.id); 
    return;
  }

const url = `${BASE_URL}/blogs/${postId}`;
const proxyUrl = PROXY_URL + encodeURIComponent(url);

fetch(proxyUrl, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      return res.json();
    })
    .then((data) => {
      const post = data.data;
      if (!post) {
        renderArticle(fallbackPost);
        loadComments(fallbackPost.id);
        bindAddComment(fallbackPost.id);
      } else {
        renderArticle(post);
        loadComments(postId);
        bindAddComment(postId);
=======
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

   
      const likesDislikesDiv = document.querySelector('.likes-dislikes');
      if (likesDislikesDiv) {

        const statsSpan = document.createElement('div');
        statsSpan.className = 'reading-views-stats';
        statsSpan.innerHTML = `
    <span><i class="far fa-calendar-alt"></i> ${date}</span>
          <span><i class="fa-solid fa-eye"></i> ${views}</span>
        `;
        likesDislikesDiv.appendChild(statsSpan);
>>>>>>> 8be4fb18d17ef0b5ea1b1e926b038869c8c48960
      }
    })
    .catch((err) => {
      console.error("خطأ في تحميل المقالة، سيتم عرض البيانات الوهمية:", err);
      renderArticle(fallbackPost);
      loadComments(fallbackPost.id);
      bindAddComment(fallbackPost.id);
    });
}
function renderArticle(post) {
  const cover = post.image1_url || "./assets/images/default.jpg";
  const authorName = post.author_username || "غير معروف";
  const authorImg = "./assets/images/profilePic.png";
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("ar-EG")
    : "";
  const views = post.view_count || 0;

  let fullHtml = "";
  if (post.description1) fullHtml += `<p>${post.description1}</p>`;
  if (post.description2) fullHtml += `<p>${post.description2}</p>`;
  if (post.description3) fullHtml += `<p>${post.description3}</p>`;
  if (post.description4) fullHtml += `<p>${post.description4}</p>`;
  if (!fullHtml) fullHtml = "<p>لا يوجد محتوى تفصيلي</p>";

  heroDiv.innerHTML = `
    <img src="${cover}" class="article-cover" alt="${post.title}">
    <div class="article-info">
      <h1>${post.title}</h1>
      <div class="author-block">
        <img src="${authorImg}" class="author-avatar-lg" alt="${authorName}">
        <div>
          <div class="author-name-lg">${authorName}</div>
          <div class="author-specialty-lg">مؤلف</div>
        </div>
      </div>
      <div class="reading-time"><i class="far fa-clock"></i> غير محدد</div>
      <div class="article-full-text-inline">${fullHtml}</div>
    </div>
  `;

  // إضافة التاريخ والمشاهدات
  const likesDislikesDiv = document.querySelector(".likes-dislikes");
  if (likesDislikesDiv) {
    const statsSpan = document.createElement("div");
    statsSpan.className = "reading-views-stats";
    statsSpan.innerHTML = `
      <span><i class="far fa-calendar-alt"></i> ${date}</span>
      <span><i class="fa-solid fa-eye"></i> ${views}</span>
    `;
    likesDislikesDiv.appendChild(statsSpan);
  }
}

  function loadComments(postId) {
  const url = `${BASE_URL}/comments/blog/${postId}`;
const proxyUrl = PROXY_URL + encodeURIComponent(url);

fetch(proxyUrl, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
      .then((res) => res.json())
      .then((data) => {
        const comments = data.data || [];
        renderComments(comments);
      })
      .catch((err) => {
        console.error("خطأ في جلب التعليقات:", err);
      });
  }

  function renderComments(comments) {
    const list = document.getElementById("commentsList");
    if (!list) return;
    list.innerHTML = "";
    if (comments.length === 0) {
      list.innerHTML = "<p>لا توجد تعليقات</p>";
      return;
    }
    comments.forEach((comment) => {
      const div = document.createElement("div");
      div.className = "comment-item";
      div.innerHTML = `
        <span class="comment-name">${comment.username || "زائر"}</span>
        <span class="comment-date">${new Date(
          comment.created_at
        ).toLocaleString("ar-EG")}</span>
        <div class="comment-text">${comment.content}</div>
      `;
      list.appendChild(div);
    });
  }
function bindAddComment(postId) {
  const btn = document.getElementById("submitCommentBtn");
  const textarea = document.getElementById("commentText");
  if (!btn || !textarea) return;

  btn.addEventListener("click", () => {
    const content = textarea.value.trim();
    if (!content) {
      alert("الرجاء كتابة نص التعليق");
      return;
    }

    const payload = {
      target_type: "blog",
      target_id: parseInt(postId),
      content: content,
      username: "زائر",
    };

    // حاول الإرسال مباشرة أولاً (بدون بروكسي)
    const directUrl = `${BASE_URL}/comments`;
    fetch(directUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status === "success" || data.message === "Comment submitted for approval") {
          textarea.value = "";
          loadComments(postId);
        } else {
          alert("فشل إضافة التعليق: " + (data.message || "خطأ غير معروف"));
        }
      })
      .catch((err) => {
  console.error("فشل الإرسال المباشر، نحاول مع وضع cors:", err);
  fetch(directUrl, {
    method: "POST",
    mode: 'cors',           // أضف هذا
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  .then(res => res.json())
  .then(data => {
    // نفس المعالجة السابقة
  })
  .catch(proxyErr => {
    console.error("فشل كلا المحاولتين:", proxyErr);
    alert("حدث خطأ أثناء إرسال التعليق. تأكد من اتصالك بالإنترنت وحاول مجدداً.");
  });
});
  });
}

  loadArticle();
});