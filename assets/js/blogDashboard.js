document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://orbitvolunteers.atwebpages.com";
  const PROXY_URL = `https://corsproxy.io/?${encodeURIComponent}`;

  let editingBlogId = null;
  let editingCategoryId = null;

  function fetchBlogs() {
    const url = `${BASE_URL}/blogs`;
    const proxyUrl = PROXY_URL + encodeURIComponent(url);

    fetch(proxyUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
      })
      .then((data) => {
        const blogs = data.data || [];
        renderBlogs(blogs);
      })
      .catch((err) => {
        console.error("خطأ في جلب المقالات:", err);
        document.querySelector("#blogs-tbody").innerHTML =
          '<tr><td colspan="5" style="color: var(--purple-3);">حدث خطأ في تحميل المقالات</td></tr>';
      });
  }

  function renderBlogs(blogs) {
    const tbody = document.querySelector("#blogs-tbody");
    tbody.innerHTML = "";
    if (blogs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="color: var(--purple-3);">لا توجد مقالات</td></tr>';
      return;
    }
    blogs.forEach((blog) => {
      const authorName = blog.author_username || "غير معروف";
      tbody.innerHTML += `
        <tr>
          <td>${blog.id}</td>
          <td>${blog.title}</td>
          <td>${blog.category_name || "غير مصنف"}</td>
          <td>${blog.published_at || ""}</td>
          <td>${authorName}</td>
        </tr>
      `;
    });
  }

  function fetchCategories() {
    const url = `${BASE_URL}/blog-categories`;
    const proxyUrl = PROXY_URL + encodeURIComponent(url);

    fetch(proxyUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
      })
      .then((data) => {
        const categories = data.data || [];
        renderCategories(categories);
        populateCategorySelect(categories);
      })
      .catch((err) => {
        console.error("خطأ في جلب التصنيفات:", err);
        document.querySelector("#categories-tbody").innerHTML =
          '<tr><td colspan="2" style="color: var(--purple-3);">حدث خطأ في تحميل التصنيفات</td></tr>';
      });
  }

  function renderCategories(categories) {
    const tbody = document.querySelector("#categories-tbody");
    tbody.innerHTML = "";
    if (categories.length === 0) {
      tbody.innerHTML = '<tr><td colspan="2" style="color: var(--purple-3);">لا توجد تصنيفات</td></tr>';
      return;
    }
    categories.forEach((cat) => {
      tbody.innerHTML += `
        <tr>
          <td>${cat.id}</td>
          <td>${cat.name}</td>
        </tr>
      `;
    });
  }

  function populateCategorySelect(categories) {
    const select = document.querySelector("#blog-category");
    select.innerHTML = '<option value="">اختر تصنيف</option>';
    categories.forEach((cat) => {
      select.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });
  }

  document.querySelector("#showAddBlogBtn").addEventListener("click", function() {
    const container = document.querySelector("#blog-form-container");
    container.classList.toggle("hidden");
    if (!container.classList.contains("hidden")) {
      resetBlogForm();
      container.scrollIntoView({ behavior: "smooth" });
    }
  });

  document.querySelector("#blog-cancel-btn").addEventListener("click", function() {
    resetBlogForm();
    document.querySelector("#blog-form-container").classList.add("hidden");
  });

  document.querySelector("#showAddCategoryBtn").addEventListener("click", function() {
    const container = document.querySelector("#category-form-container");
    container.classList.toggle("hidden");
    if (!container.classList.contains("hidden")) {
      resetCategoryForm();
      container.scrollIntoView({ behavior: "smooth" });
    }
  });

  document.querySelector("#category-cancel-btn").addEventListener("click", function() {
    resetCategoryForm();
    document.querySelector("#category-form-container").classList.add("hidden");
  });

  document.querySelector("#blog-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const isEdit = editingBlogId !== null;
    const payload = {
      title: document.querySelector("#blog-title").value.trim(),
      category_id: parseInt(document.querySelector("#blog-category").value) || null,
      description1: document.querySelector("#blog-content").value.trim() || null,
      image1_url: document.querySelector("#blog-image").value.trim() || null,
    };

    const url = isEdit ? `${BASE_URL}/blogs/${editingBlogId}` : `${BASE_URL}/blogs`;
    const method = isEdit ? "PUT" : "POST";
    const token = localStorage.getItem("userToken");

    fetch(PROXY_URL + encodeURIComponent(url), {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          alert("غير مصرح! تأكد من صلاحيات Admin.");
          throw new Error("Unauthorized");
        }
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
      })
      .then(() => {
        alert(isEdit ? "تم تحديث المقالة بنجاح" : "تم إضافة المقالة بنجاح");
        resetBlogForm();
        document.querySelector("#blog-form-container").classList.add("hidden");
        fetchBlogs();
      })
      .catch((err) => {
        console.error(err);
        alert("فشلت العملية: " + err.message);
      });
  });

  document.querySelector("#category-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const isEdit = editingCategoryId !== null;
    const payload = {
      name: document.querySelector("#category-name").value.trim(),
    };

    const url = isEdit ? `${BASE_URL}/blog-categories/${editingCategoryId}` : `${BASE_URL}/blog-categories`;
    const method = isEdit ? "PUT" : "POST";
    const token = localStorage.getItem("userToken");

    fetch(PROXY_URL + encodeURIComponent(url), {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          alert("غير مصرح! تأكد من صلاحيات Admin.");
          throw new Error("Unauthorized");
        }
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
      })
      .then(() => {
        alert(isEdit ? "تم تحديث التصنيف بنجاح" : "تم إضافة التصنيف بنجاح");
        resetCategoryForm();
        document.querySelector("#category-form-container").classList.add("hidden");
        fetchCategories();
        fetchBlogs();
      })
      .catch((err) => {
        console.error(err);
        alert("فشلت العملية: " + err.message);
      });
  });

  function resetBlogForm() {
    editingBlogId = null;
    document.querySelector("#blog-form").reset();
    document.querySelector("#blog-form-title").textContent = "إضافة مقالة جديدة";
    document.querySelector("#blog-submit-btn").textContent = "حفظ";
  }

  function resetCategoryForm() {
    editingCategoryId = null;
    document.querySelector("#category-form").reset();
    document.querySelector("#category-form-title").textContent = "إضافة تصنيف جديد";
    document.querySelector("#category-submit-btn").textContent = "حفظ";
  }

  fetchBlogs();
  fetchCategories();
});