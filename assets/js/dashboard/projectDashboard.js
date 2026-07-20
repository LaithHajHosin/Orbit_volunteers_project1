document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://orbitvolunteers.atwebpages.com";
  const PROXY_URL = "https://corsproxy.io/?url=";

  let editingProjectId = null;
  let editingCategoryId = null;
  function fetchProjects() {
    const url = `${BASE_URL}/projects`;
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
        const projects = data.data || [];
        renderProjects(projects);
      })
      .catch((err) => {
        console.error("خطأ في جلب المشاريع:", err);
        document.querySelector("#projects-tbody").innerHTML =
          '<tr><td colspan="6" style="color: var(--purple-3); text-align: center;">حدث خطأ في تحميل المشاريع</td></tr>';
      });
  }
  function renderProjects(projects) {
    const tbody = document.querySelector("#projects-tbody");
    tbody.innerHTML = "";
    if (projects.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="color: var(--purple-3); text-align: center;">لا توجد مشاريع مضافة</td></tr>';
      return;
    }
    projects.forEach((project) => {
      // ترجمة الحالة إلى العربية
      const statusMap = {
        "need_volunteers": "يحتاج متطوعين",
        "in_progress": "قيد التنفيذ",
        "completed": "منجز",
        "on_hold": "معلق"
      };
      const statusAr = statusMap[project.status] || project.status || "غير محدد";
      tbody.innerHTML += `
        <tr>
          <td>${project.id}</td>
          <td><b>${project.title}</b></td>
          <td><span class="badge">${statusAr}</span></td>
          <td>${project.category_name || "غير مصنف"}</td>
          <td>${project.team_name || "-"}</td>
          <td>${project.published_at || "-"}</td>
        </tr>
      `;
    });
  }
  function fetchCategories() {
    const url = `${BASE_URL}/project-categories`;
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
        populateCategorySelect(categories);
      })
      .catch((err) => {
        console.error("خطأ في جلب تصنيفات المشاريع:", err);
        // بيانات وهمية في حال فشل الجلب
        populateCategorySelect([
          { id: 1, name: "تقنية" },
          { id: 2, name: "اجتماعي" },
          { id: 3, name: "تعليمي" }
        ]);
      });
  }
  function populateCategorySelect(categories) {
    const select = document.querySelector("#project-category");
    if (!select) return;
    select.innerHTML = '<option value="">اختر تصنيف...</option>';
    categories.forEach((cat) => {
      select.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });
  }

  document.querySelector("#showAddProjectBtn").addEventListener("click", function() {
    const container = document.querySelector("#project-form-container");
    container.classList.toggle("hidden");
    if (!container.classList.contains("hidden")) {
      resetProjectForm();
      container.scrollIntoView({ behavior: "smooth" });
    }
  });

  document.querySelector("#project-cancel-btn").addEventListener("click", function() {
    resetProjectForm();
    document.querySelector("#project-form-container").classList.add("hidden");
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

  document.querySelector("#project-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const isEdit = editingProjectId !== null;
    const payload = {
      title: document.querySelector("#project-title").value.trim(),
      status: document.querySelector("#project-status").value,
      category_id: parseInt(document.querySelector("#project-category").value) || null,
      team_id: parseInt(document.querySelector("#project-team").value) || null,
      description1: document.querySelector("#project-description").value.trim() || null,
      image1_url: document.querySelector("#project-image").value.trim() || null,
    };

    const url = isEdit ? `${BASE_URL}/projects/${editingProjectId}` : `${BASE_URL}/projects`;
    const method = isEdit ? "PUT" : "POST";
    const token = localStorage.getItem("userToken");
    fetch(PROXY_URL + encodeURIComponent(url), {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
        alert(isEdit ? "تم تحديث المشروع بنجاح" : "تم إضافة المشروع بنجاح");
        resetProjectForm();
        document.querySelector("#project-form-container").classList.add("hidden");
        fetchProjects();
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

    const url = isEdit ? `${BASE_URL}/project-categories/${editingCategoryId}` : `${BASE_URL}/project-categories`;
    const method = isEdit ? "PUT" : "POST";
    const token = localStorage.getItem("userToken");

    fetch(PROXY_URL + encodeURIComponent(url), {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
        fetchProjects();
      })
      .catch((err) => {
        console.error(err);
        alert("فشلت العملية: " + err.message);
      });
  });

  function resetProjectForm() {
    editingProjectId = null;
    document.querySelector("#project-form").reset();
    document.querySelector("#project-form-title").textContent = "إضافة مشروع جديد";
    document.querySelector("#project-submit-btn").textContent = "حفظ";
  }

  function resetCategoryForm() {
    editingCategoryId = null;
    document.querySelector("#category-form").reset();
    document.querySelector("#category-form-title").textContent = "إضافة تصنيف مشروع جديد";
    document.querySelector("#category-submit-btn").textContent = "حفظ";
  }

  fetchProjects();
  fetchCategories();
});