const BASE_URL = 'http://orbitvolunteers.atwebpages.com';
const TOKEN_KEY = 'jwt_token';

function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY) || '';
}

document.addEventListener('DOMContentLoaded', () => {
    loadTeams();
    setupEventListeners();
});

async function loadTeams() {
    const tbody = document.getElementById('teams-tbody'); 
    try {
        const response = await fetch(`${BASE_URL}/teams`);
        if (!response.ok) throw new Error('فشل في جلب البيانات');
      
        const teams = await response.json();
      
        if (!teams || teams.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center">لا توجد فرق مضافة حالياً.</td></tr>`;
            return;
        }

        tbody.innerHTML = '';
        teams.forEach(team => {
            const leaderId = team.team_leader_id || '-';
           
            tbody.innerHTML += `
                <tr id="team-row-${team.id}">
                    <td>${team.id}</td>
                    <td class="team-name">${team.name}</td>
                    <td class="team-slug">${team.slug}</td>
                    <td class="team-desc">${team.description || 'لا يوجد وصف'}</td>
                    <td class="team-leader">${leaderId}</td>
                    <td>
                        <button class="btn btn-edit btn-sm" onclick="populateFormForEdit(${team.id}, '${team.name}', '${team.slug}', '${team.team_leader_id || ''}', \`${team.description || ''}\`)">
                            <i class="fa-solid fa-pen"></i> تعديل
                        </button>
                        <button class="btn btn-delete btn-sm" onclick="deleteTeam(${team.id})">
                            <i class="fa-solid fa-trash"></i> حذف
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error(error);
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">حدث خطأ أثناء تحميل الفرق. تأكد من اتصال الـ API.</td></tr>`;
    }
}

function setupEventListeners() {
    const showFormBtn = document.getElementById('show-add-form-btn');
    const formContainer = document.getElementById('form-container');
    const cancelBtn = document.getElementById('cancel-btn');
    const teamForm = document.getElementById('team-form');

    if (showFormBtn) {
        showFormBtn.addEventListener('click', () => {
            resetForm();
            formContainer.classList.remove('hidden');
            document.getElementById('form-title').innerText = 'إضافة فريق جديد';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            formContainer.classList.add('hidden');
            resetForm();
        });
    }
    if (teamForm) {
        teamForm.addEventListener('submit', handleFormSubmit);
    }
}

function resetForm() {
    document.getElementById('team-form').reset();
    document.getElementById('team-id').value = '';
    document.getElementById('submit-btn').innerText = 'حفظ';
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const token = getAuthToken();
    const teamId = document.getElementById('team-id').value;

    const teamData = {
        name: document.getElementById('team-name').value.trim(),
        slug: document.getElementById('team-slug').value.trim(),
        team_leader_id: document.getElementById('team-leader').value ? parseInt(document.getElementById('team-leader').value) : null,
        description: document.getElementById('team-description').value.trim()
    };

    const isEdit = teamId !== '';
    const url = isEdit ? `${BASE_URL}/teams/${teamId}` : `${BASE_URL}/teams`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(teamData)
        });

        if (response.status === 401 || response.status === 403) {
            alert('غير مصرح لك! الرجاء تسجيل الدخول كمسؤول (Admin).');
            return;
        }

        if (response.ok) {
            alert(isEdit ? 'تم تحديث بيانات الفريق بنجاح!' : 'تم إضافة الفريق بنجاح!');
            resetForm();
            document.getElementById('form-container').classList.add('hidden');
           
            loadTeams();
        } else {
            const errData = await response.json().catch(() => ({}));
            alert(`خطأ: ${errData.message || 'فشلت العملية'}`);
        }
    } catch (error) {
        alert('حدث خطأ في الاتصال بالخادم.');
    }
}

function populateFormForEdit(id, name, slug, leaderId, description) {
    document.getElementById('team-id').value = id;
    document.getElementById('team-name').value = name;
    document.getElementById('team-slug').value = slug;
    document.getElementById('team-leader').value = leaderId;
    document.getElementById('team-description').value = description;
  
    document.getElementById('form-title').innerText = 'تعديل بيانات الفريق';
    document.getElementById('submit-btn').innerText = 'تحديث';
    document.getElementById('form-container').classList.remove('hidden');
   
    document.getElementById('form-container').scrollIntoView({ behavior: 'smooth' });
}

async function deleteTeam(id) {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذا الفريق نهائياً؟')) return;
  
    const token = getAuthToken();

    try {
        const response = await fetch(`${BASE_URL}/teams/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('تم حذف الفريق بنجاح.');
            loadTeams(); 
        } else {
            alert('فشلت عملية الحذف، قد لا تملك الصلاحيات الكافية كـ Admin.');
        }
    } catch (error) {
        alert('حدث خطأ في الاتصال بالخادم أثناء محاولة الحذف.');
    }
}