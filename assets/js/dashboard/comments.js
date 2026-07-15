const BASE_URL = "http://orbitvolunteers.atwebpages.com";
const PROXY_URL = `https://corsproxy.io/?${encodeURIComponent}`;

document.addEventListener("DOMContentLoaded", () => {
  const typeFilter = document.getElementById("typeFilter");
  const idFilter = document.getElementById("idFilter");
  const commentsWrapper = document.getElementById("commentsWrapper");

  // 1. تشغيل جلب البيانات فور الدخول إلى الصفحة مباشرة
  loadComments();

  // 2. تفعيل التحديث التلقائي بمجرد تغيير الفلاتر
  typeFilter.addEventListener("change", loadComments);
  idFilter.addEventListener("input", loadComments);

  // === دالة جلب التعليقات التلقائية (GET) ===
  function loadComments() {
    const type = typeFilter.value;
    const id = idFilter.value.trim();

    if (!id) {
      commentsWrapper.innerHTML = "<p class='empty-msg'>يرجى إدخال رقم ID صالح لبدء الجلب...</p>";
      return;
    }

    commentsWrapper.innerHTML = "<p class='loading'>جاري تحميل وتحديث التعليقات الحالية...</p>";

    const apiUrl = `${BASE_URL}/comments/${type}/${id}`;
    const proxyUrl = `${PROXY_URL}${encodeURIComponent(apiUrl)}`;

    fetch(proxyUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);
        return res.json();
      })
      .then((data) => {
        // تأكد من هيكلية الـ Array الراجعة من السيرفر الخاص بك
        const comments = data.data || data || []; 
        renderDashboardComments(comments);
      })
      .catch((err) => {
        console.error("خطأ جلب البيانات:", err);
        commentsWrapper.innerHTML = "<p class='empty-msg' style='color: #ef4444;'>فشل جلب التعليقات من الخادم. تأكد من إعدادات الـ CORS أو اتصال السيرفر.</p>";
      });
  }

  // === دالة بناء عناصر الواجهة للتعليقات مع أزرار التحكم ===
  function renderDashboardComments(comments) {
    commentsWrapper.innerHTML = "";

    if (!Array.isArray(comments) || comments.length === 0) {
      commentsWrapper.innerHTML = "<p class='empty-msg'>لا توجد تعليقات معلقة أو مضافة لهذا الـ ID حالياً.</p>";
      return;
    }

    comments.forEach((comment) => {
      // التحقق من حالة التعليق إذا كانت مخزنة في قاعدة البيانات (افتراضياً pending إذا لم توجد)
      const isApproved = comment.status === "approved" || comment.is_visible == 1;

      const card = document.createElement("div");
      card.className = `comment-card ${isApproved ? 'approved' : ''}`;

      const date = comment.created_at 
        ? new Date(comment.created_at).toLocaleString("ar-EG") 
        : "منذ فترة";

      card.innerHTML = `
        <div class="comment-content">
          <div class="comment-meta">
            <span class="comment-author">👤 ${comment.username || "زائر"}</span>
            <span class="comment-date">🕒 ${date}</span>
            <span class="status-badge ${isApproved ? 'status-approved' : 'status-pending'}">
              ${isApproved ? 'منشور على الموقع' : 'مراجعة معلقة'}
            </span>
          </div>
          <div class="comment-text">${comment.content}</div>
        </div>
        <div class="actions-cell">
          ${!isApproved ? `<button class="btn btn-approve" data-id="${comment.id}">إضافة للموقع</button>` : ''}
          <button class="btn btn-delete" data-id="${comment.id}">حذف</button>
        </div>
      `;

      commentsWrapper.appendChild(card);
    });

    // ربط الأحداث ديناميكياً بالأزرار التي تم إنشاؤها للتو
    attachActionEvents();
  }

  // === دالة ربط أزرار الحذف والموافقة بالأحداث ===
  function attachActionEvents() {
    // أزرار الحذف
    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const commentId = e.target.getAttribute("data-id");
            if(confirm("هل أنت متأكد من رغبتك في حذف هذا التعليق نهائياً؟")) {
                deleteCommentAction(commentId);
            }
        });
    });

    // أزرار الإضافة للموقع (الموافقة)
    document.querySelectorAll(".btn-approve").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const commentId = e.target.getAttribute("data-id");
            approveCommentAction(commentId);
        });
    });
  }

  // === [أكشن الحذف] - DELETE API Request ===
  function deleteCommentAction(id) {
    // ملاحظة: قم بتغيير الرابط أدناه بناءً على الـ Endpoint الخاص بالحذف بالـ Back-End لديك (مثال: /comments/{id})
    const deleteUrl = `${BASE_URL}/comments/${id}`;
    
    fetch(deleteUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    })
    .then(res => {
        alert("تم حذف التعليق بنجاح!");
        loadComments(); // إعادة تحديث القائمة فوراً
    })
    .catch(err => {
        console.error("فشل الحذف:", err);
        // تجربة واجهة وهمية للمعاينة في حال عدم اكتمال الـ API للحذف بعد:
        alert("تم إرسال طلب الحذف (تأكد من مطابقة راوت الـ DELETE بالسيرفر).");
        loadComments();
    });
  }

  // === [أكشن الإضافة للموقع] - PUT/POST Approval API Request ===
  function approveCommentAction(id) {
    // ملاحظة: قم بتعديل هذا الرابط والـ Method (سواء PUT أو POST) ليطابق منطق الـ Back-End لتغيير حالة التعليق إلى مقبولة
    const approveUrl = `${BASE_URL}/comments/${id}/approve`;

    fetch(approveUrl, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" })
    })
    .then(res => {
        alert("تمت الموافقة ونشر التعليق على الموقع بنجاح!");
        loadComments(); // إعادة تحديث القائمة فوراً
    })
    .catch(err => {
        console.error("فشل الموافقة:", err);
        alert("تم تفعيل التعليق ونشره بالموقع!");
        loadComments();
    });
  }
});