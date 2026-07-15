document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://orbitvolunteers.atwebpages.com";
  const PROXY_URL = "https://corsproxy.io/?";

  function getAuthToken() {
    return localStorage.getItem("userToken") || '';
  }

  // 1. جلب وعرض الفرق من الـ API
  function loadTeams() {
    const tbody = document.querySelector("#teams-tbody");
    const targetUrl = `${BASE_URL}/teams`;
    const proxyUrl = PROXY_URL + encodeURIComponent(targetUrl);
    const token = getAuthToken();

    fetch(proxyUrl, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
      })
      .then((response) => {
        tbody.innerHTML = "";
        const teams = response.data || [];
        
        if (teams.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="color: var(--purple-3);">لا توجد فرق مضافة حالياً.</td></tr>';
          return;
        }

        teams.forEach((team) => {
          const leaderName = team.team_leader_name || team.team_leader_id || "-";
          const tr = document.createElement("tr");
          tr.id = `team-row-${team.id}`;
          
          tr.innerHTML = `
              <td>${team.id}</td>
              <td class="team-name">${team.name}</td>
              <td class="team-slug">${team.slug}</td>
              <td class="team-desc">${team.description || "لا يوجد وصف"}</td>
              <td class="team-leader">${leaderName}</td>
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

          const memberIds = Array.isArray(team.members) 
            ? team.members.map(member => member.user_id) 
            : [];

          tr.querySelector(".edit-btn").addEventListener("click", () => {
            populateFormForEdit(team.id, team.name, team.slug, team.team_leader_id || "", team.description || "", memberIds);
          });

          tr.querySelector(".delete-btn").addEventListener("click", () => {
            deleteTeam(team.id);
          });

          tbody.appendChild(tr);
        });
      })
      .catch((err) => {
        console.error("خطأ في جلب الفرق:", err);
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">حدث خطأ في تحميل الفرق.</td></tr>';
      });
  }

  // 2. معالجة إرسال النموذج (إنشاء/تعديل الفريق + ربط الأعضاء بالـ Endpoint المنفصل)
  document.querySelector("#team-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const token = getAuthToken();
    const teamId = document.querySelector("#team-id").value;
    const isEdit = teamId !== "";

    // تحويل نص المدخلات إلى مصفوفة نظيفة من المعرفات
    const membersInput = document.querySelector("#team-members").value;
    const membersArray = membersInput
      ? membersInput.split(",").map(id => parseInt(id.trim())).filter(id => !isNaN(id))
      : [];

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

    // الخطوة أ: حفظ كائن الفريق الأساسي أولاً
    fetch(proxyUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(teamData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("فشلت عملية حفظ بيانات الفريق الحيوية.");
        return res.json();
      })
      .then((result) => {
        // استخراج معرف الفريق (سواء من التحديث أو الإضافة الجديدة)
        const finalTeamId = isEdit ? teamId : (result.id || (result.data && result.data.id));
        
        if (!finalTeamId) {
          throw new Error("لم يتم استرجاع معرّف الفريق من السيرفر لإلحاق الأعضاء.");
        }

        // الخطوة ب: بناءً على الدوكيومنتيشن المفصل، إذا وُجد أعضاء نقوم بعمل طلب إلحاق منفصل لكل عضو عبر POST /teams/{id}/members
        if (membersArray.length > 0) {
          const memberPromises = membersArray.map(userId => {
            const memberUrl = `${BASE_URL}/teams/${finalTeamId}/members`;
            const memberProxy = PROXY_URL + encodeURIComponent(memberUrl);
            
            return fetch(memberProxy, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                user_id: userId,
                role: "Developer", // القيمة الافتراضية كما في التوثيق
                display_order: 1
              })
            });
          });

          // الانتظار حتى يتم إلحاق كافة الأعضاء بنجاح للـ API
          return Promise.all(memberPromises);
        }
      })
      .then(() => {
        alert(isEdit ? "تم تحديث الفريق وتحديث طاقم الأعضاء!" : "تم إنشاء الفريق وإلحاق الأعضاء به بنجاح!");
        resetForm();
        document.querySelector("#form-container").classList.add("hidden");
        loadTeams();
      })
      .catch((err) => {
        console.error(err);
        alert("حدث خطأ أثناء معالجة طلبات الفريق والأعضاء المتزامنة.");
      });
  });

  // 3. تعبئة النموذج لتعديله
  function populateFormForEdit(id, name, slug, leaderId, description, members) {
    document.querySelector("#team-id").value = id;
    document.querySelector("#team-name").value = name;
    document.querySelector("#team-slug").value = slug;
    document.querySelector("#team-leader").value = leaderId;
    document.querySelector("#team-description").value = description;
    document.querySelector("#team-members").value = Array.isArray(members) ? members.join(", ") : "";

    document.querySelector("#form-title").innerText = "تعديل بيانات الفريق";
    document.querySelector("#submit-btn").innerText = "تحديث التعديلات";
    
    const container = document.querySelector("#form-container");
    container.classList.remove("hidden");
    container.scrollIntoView({ behavior: "smooth" });
  }

  // 4. حذف الفريق
  function deleteTeam(id) {
    if (!confirm("هل أنتِ متأكدة من رغبتك في حذف هذا الفريق بشكل نهائي؟")) return;

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
          alert("فشلت عملية الحذف، تأكدي من امتلاك صلاحية الـ Admin الصارمة.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("خطأ غير متوقع أثناء معالجة الحذف.");
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
    const container = document.querySelector("#form-container");
    container.classList.remove("hidden");
    container.scrollIntoView({ behavior: "smooth" });
  });

  document.querySelector("#cancel-btn").addEventListener("click", () => {
    document.querySelector("#form-container").classList.add("hidden");
    resetForm();
  });

  // التنفيذ عند التشغيل
  loadTeams();
});