document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://orbitvolunteers.atwebpages.com";
  const PROXY_URL = `https://corsproxy.io/?${encodeURIComponent}`;

  let currentCategoryId = null; 

  const fallbackPosts = [
    {
      id: 1,
      title: "كيف تغير نماذج اللغة الكبيرة (LLMs) مستقبل البرمجة؟",
      image1_url: "./assets/images/ai.webp",
      author_username: "أدهم",
      published_at: "2026-01-10",
      view_count: 20,
      category_name: "الذكاء الاصطناعي",
      category_id: 1,
      description1: "هذا وصف موجز للمقالة. يهدف هذا المقال إلى شرح تأثير LLMs على البرمجة...",
      description2: "في عالم البرمجة، أحدثت هذه النماذج ثورة حقيقية...",
      description3: "لكن هناك تحديات مثل الهلوسة وخصوصية البيانات...",
      description4: "في المستقبل، ستصبح هذه الأدوات جزءاً أساسياً من التطوير."
    },
    {
      id: 2,
      title: "أحدث هجمات الفدية (Ransomware) وطرق الحماية منها",
      image1_url: "./assets/images/cyberscurity.webp",
      author_username: "حميد",
      published_at: "2026-01-08",
      view_count: 15,
      category_name: "الأمن السيبراني",
      category_id: 2,
      description1: "شرح لأحدث هجمات الفدية وأساليب الحماية الحديثة...",
      description2: "تتطور هجمات الفدية باستمرار، لذا من المهم معرفة أحدث طرق الحماية...",
      description3: "استخدام النسخ الاحتياطي والتحديثات الأمنية من أهم سبل الوقاية...",
      description4: "التوعية المستمرة هي خط الدفاع الأول ضد هذه الهجمات."
    },
    {
      id: 3,
      title: "الحوسبة الكمومية: هل تنهي التشفير كما نعرفه؟",
      image1_url: "./assets/images/it.webp",
      author_username: "راما",
      published_at: "2026-01-05",
      view_count: 12,
      category_name: "تقنيات متقدمة",
      category_id: 3,
      description1: "نظرة على تأثير الحوسبة الكمومية على أنظمة التشفير الحالية...",
      description2: "تعد الحوسبة الكمومية من أقوى التحديات التي تواجه التشفير الحديث...",
      description3: "من المتوقع أن تغير هذه التقنية قواعد اللعبة في مجال الأمن السيبراني...",
      description4: "الباحثون يعملون على تطوير خوارزميات تشفير مقاومة للهجمات الكمومية."
    },
    {
      id: 4,
      title: "التزييف العميق (Deepfake): تهديد رقمي وكيف تكتشفه",
      image1_url: "./assets/images/deepfake.webp",
      author_username: "حلا",
      published_at: "2026-01-02",
      view_count: 18,
      category_name: "الذكاء الاصطناعي",
      category_id: 1,
      description1: "كيف تعمل تقنيات التزييف العميق وطرق اكتشافها...",
      description2: "يستخدم التزييف العميق تقنيات الذكاء الاصطناعي لإنشاء محتوى مزيف...",
      description3: "يمكن اكتشافه من خلال تحليل التناقضات في الصور والفيديوهات...",
      description4: "التوعية الرقمية هي السلاح الأقوى ضد هذه التقنيات."
    }
  ];
 
  function fetchCategories() {
  const url = `${BASE_URL}/blog-categories`;
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
      console.log("البيانات من API:", data);
      const categories = data.data || [];
      if (categories.length === 0) {
        renderCategories(fallbackCategories);
      } else {
        renderCategories(categories);
      }
    })
    .catch((err) => {
      console.error("خطأ في جلب التصنيفات، سيتم عرض الوهمية:", err);
      renderCategories(fallbackCategories);
    });
}

  function renderCategories(categories) {
    const container = document.getElementById("categories-container");
    if (!container) return;
    container.innerHTML = "";

    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.dataset.categoryId = category.id;
      btn.textContent = category.name;
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategoryId = category.id;
        loadPosts(currentCategoryId);
      });
      container.appendChild(btn);
    });

    const allBtn = document.querySelector('.filter-btn[data-category-id="all"]');
    if (allBtn) allBtn.classList.add("active");
  }

 function loadPosts(categoryId = null) {
  let url = `${BASE_URL}/blogs?limit=10`;
  if (categoryId) {
    url += `&category_id=${categoryId}`;
  }

  fetch(PROXY_URL + encodeURIComponent(url))
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error! status: " + res.status);
      return res.json();
    })
    .then((data) => {
      let posts = data.data || [];
      if (posts.length === 0) {
        posts = fallbackPosts;
      }
      if (categoryId) {
        posts = posts.filter(post => post.category_id === categoryId);
      }
      renderPosts(posts);
    })
    .catch((err) => {
      console.error("خطأ في جلب المقالات، سيتم عرض البيانات الوهمية:", err);
      let posts = fallbackPosts;
      if (categoryId) {
        posts = posts.filter(post => post.category_id === categoryId);
      }
      renderPosts(posts);
    });
}

  function renderPosts(posts) {
    const container = document.querySelector(".articles-grid");
    if (!container) return;
    container.innerHTML = "";

    posts.forEach((post) => {
      const imageUrl = post.image1_url || "./assets/images/default.jpg";
      const authorName = post.author_username || "مستخدم";
      const date = post.published_at
        ? new Date(post.published_at).toLocaleDateString("ar-EG")
        : "";
      const views = post.view_count || 0;
      const category = post.category_name || "عام";
      const description = post.description1 || "لا يوجد وصف";

      container.innerHTML += `
        <div class="article-card">
          <div class="card-img">
            <img src="${imageUrl}" alt="${post.title}">
          </div>
          <div class="card-content">
            <span class="card-category">${category}</span>
            <h3 class="card-title">
              <a href="blog.details.html?id=${post.id}">${post.title}</a>
            </h3>
            <p class="card-description">
              ${description}
              <a href="blog.details.html?id=${post.id}" class="read-more-link">اقرأ المزيد</a>
            </p>
            <div class="card-footer">
              <div class="volunteer-info">
                <i class="fas fa-user-circle"></i>
                <span>${authorName}</span>
              </div>
              <div class="post-meta">
                <span><i class="far fa-calendar-alt"></i> ${date}</span>
                <span><i class="fa-solid fa-eye"></i> ${views}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }

const fallbackCategories = [
  { id: 1,  name: "الذكاء الاصطناعي" },
  { id: 2, name: "الأمن السيبراني" },
  { id: 3, name: "تقنيات متقدمة" },
];
  document.addEventListener("click", (e) => {
    const btn = e.target.closest('.filter-btn[data-category-id="all"]');
    if (btn) {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategoryId = null;
      loadPosts(null);
    }
  });

  fetchCategories(); 
  loadPosts(); 
});