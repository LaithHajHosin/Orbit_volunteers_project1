document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL =  "http://orbitvolunteers.atwebpages.com";
  const PROXY_URL = "https://corsproxy.io/?";

   const token = localStorage.getItem("userToken");

  function getAuthToken() {
    return localStorage.getItem("userToken") || '';
  }

  function loadTeams() {
    const tbody = document.querySelector("#teams-tbody");
    const targetUrl = `${BASE_URL}/teams`;
   
    const proxyUrl = PROXY_URL + encodeURIComponent(targetUrl);

    fetch(proxyUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
      })
      .then((teams) => {
        tbody.innerHTML = "";
       
        if (!teams || teams.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="color: var(--purple-3);">لا توجد فرق مضافة حالياً.</td></tr>';
          return;
        }

        teams.forEach((team) => {
          const leaderId = team.team_leader_id || "-";
         
          const tr = document.createElement("tr");
          tr.id = `team-row-${team.id}`;
          tr.innerHTML = `
              <td>${team.id}</td>
              <td class="team-name">${team.name}</td>
              <td class="team-slug">${team.slug}</td>
              <td class="team-desc">${team.description || "لا يوجد وصف"}</td>
              <td class="team-leader">${leaderId}</td>
              <td>
                  <div class="actions-buttons-container">
                      <button class="btn btn-edit btn-sm edit-btn">
                          <i class="fa-solid fa-pen"></i> تعديل
                      </button>
                      <button class="btn btn-delete btn-sm delete-btn">
                          <i class="fa-solid fa-trash"></i> حذف
                      </button>
                  </div>
              </td>
          `;

          tr.querySelector(".edit-btn").addEventListener("click", () => {
            populateFormForEdit(team.id, team.name, team.slug, team.team_leader_id || "", team.description || "");
          });

          tr.querySelector(".delete-btn").addEventListener("click", () => {
            deleteTeam(team.id);
          });

          tbody.appendChild(tr);
        });
      })
      .catch((err) => {
        console.error("خطأ في جلب الفرق:", err);
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">حدث خطأ في تحميل الفرق</td></tr>';
      });
  }

  document.querySelector("#team-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const token = getAuthToken();
    const teamId = document.querySelector("#team-id").value;
    const isEdit = teamId !== "";

    const teamData = {
      name: document.querySelector("#team-name").value.trim(),
      slug: document.querySelector("#team-slug").value.trim(),
      team_leader_id: document.querySelector("#team-leader").value ? parseInt(document.querySelector("#team-leader").value) : null,
      description: document.querySelector("#team-description").value.trim(),
    };

    const endpoint = isEdit ? `/teams/${teamId}` : "/teams";
    const targetUrl = `${BASE_URL}${endpoint}`;
    const proxyUrl = PROXY_URL + encodeURIComponent(targetUrl);
    const method = isEdit ? "PUT" : "POST";

    fetch(proxyUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(teamData),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          alert("غير مصرح لك! الرجاء تسجيل الدخول كمسؤول (Admin).");
          throw new Error("Unauthorized");
        }
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
      })
      .then(() => {
        alert(isEdit ? "تم تحديث بيانات الفريق بنجاح!" : "تم إضافة الفريق بنجاح!");
        resetForm();
        document.querySelector("#form-container").classList.add("hidden");
        loadTeams();
      })
      .catch((err) => {
        console.error(err);
        alert("حدث خطأ في معالجة العملية.");
      });
  });

  function populateFormForEdit(id, name, slug, leaderId, description) {
    document.querySelector("#team-id").value = id;
    document.querySelector("#team-name").value = name;
    document.querySelector("#team-slug").value = slug;
    document.querySelector("#team-leader").value = leaderId;
    document.querySelector("#team-description").value = description;

    document.querySelector("#form-title").innerText = "تعديل بيانات الفريق";
    document.querySelector("#submit-btn").innerText = "تحديث";
   
    const container = document.querySelector("#form-container");
    container.classList.remove("hidden");
    container.scrollIntoView({ behavior: "smooth" });
  }

  function deleteTeam(id) {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا الفريق نهائياً؟")) return;

    const token = getAuthToken();
    const targetUrl = `${BASE_URL}/teams/${id}`;
    const proxyUrl = PROXY_URL + encodeURIComponent(targetUrl);

    fetch(proxyUrl, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("تم حذف الفريق بنجاح.");
          loadTeams();
        } else {
          alert("فشلت عملية الحذف، قد لا تملك الصلاحيات الكافية كـ Admin.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("حدث خطأ أثناء محاولة الحذف.");
      });
  }

  function resetForm() {
    document.querySelector("#team-form").reset();
    document.querySelector("#team-id").value = "";
    document.querySelector("#submit-btn").innerText = "حفظ";
  }
document.querySelector("#show-add-form-btn").addEventListener("click", () => {
  resetForm(); 
  document.querySelector("#form-title").innerText = "إضافة فريق جديد";
  document.querySelector("#submit-btn").innerText = "حفظ";
 
  const container = document.querySelector("#form-container");
  container.classList.remove("hidden");
  container.scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#cancel-btn").addEventListener("click", () => {
  document.querySelector("#form-container").classList.add("hidden");
  resetForm();
});

  loadTeams();
});