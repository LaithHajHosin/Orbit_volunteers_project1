document.addEventListener("DOMContentLoaded", () => {

    const sidebarContainer = document.getElementById("sidebar-container");
    
    if (!sidebarContainer) return;

    sidebarContainer.innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-brand">
                <h2><i class="fa-solid fa-chart-line"></i> لوحة الإدارة</h2>
            </div>
            <div class="sidebar-menu">
                <ul>
                    <li><a href="./analytics.html" class="nav-link" id="link-analytics"><i class="fa-solid fa-gauge"></i><span>الإحصائيات</span></a></li>
                </ul>

                <ul>
                    <li><a href="./users.html" class="nav-link" id="link-users"><i class="fa-solid fa-users"></i><span>المستخدمين</span></a></li>
                    <li><a href="./projects.html" class="nav-link" id="link-projects"><i class="fa-solid fa-diagram-project"></i><span>المشاريع</span></a></li>
                    <li><a href="./teams.html" class="nav-link" id="link-teams"><i class="fa-solid fa-people-group"></i><span>الفرق</span></a></li>
                </ul>

                <ul>
                    <li><a href="./blogs.html" class="nav-link" id="link-articles"><i class="fa-solid fa-newspaper"></i><span>المقالات</span></a></li>
                    <li><a href="./comments.html" class="nav-link" id="link-comments"><i class="fa-solid fa-comments"></i><span>التعليقات</span></a></li>
                    <li><a href="./messages.html" class="nav-link" id="link-messages"><i class="fa-solid fa-envelope"></i><span>الرسائل الواردة</span></a></li>
                </ul>

                <ul>
                    <li><a href="./settings.html" class="nav-link" id="link-settings"><i class="fa-solid fa-gear"></i><span>الإعدادات العامة</span></a></li>
                    <li><a href="./logs.html" class="nav-link" id="link-logs"><i class="fa-solid fa-history"></i><span>سجل العمليات</span></a></li>
                    <li class="logout-item">
                        <a href="#" class="nav-link logout-btn" id="sidebar-logout-btn">
                            <i class="fa-solid fa-right-from-bracket"></i><span>تسجيل الخروج</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    `;

    // فحص الرابط الحالي بدقة وبدون تكرار لضمان التلوين الصحيح (Active Class)
    const currentPath = window.location.pathname;
    
    if (currentPath.includes("analytics.html") || currentPath.endsWith("/") || currentPath.endsWith("Dashboard.html")) {
        document.getElementById("link-analytics")?.classList.add("active");
    } else if (currentPath.includes("users.html")) {
        document.getElementById("link-users")?.classList.add("active");
    } else if (currentPath.includes("projects.html")) {
        document.getElementById("link-projects")?.classList.add("active");
    } else if (currentPath.includes("blogs.html")) {
        document.getElementById("link-articles")?.classList.add("active");
    } else if (currentPath.includes("teams.html")) {
        document.getElementById("link-teams")?.classList.add("active");
    } else if (currentPath.includes("comments.html")) {
        document.getElementById("link-comments")?.classList.add("active");
    } else if (currentPath.includes("messages.html")) {
        document.getElementById("link-messages")?.classList.add("active");
    } else if (currentPath.includes("settings.html")) {
        document.getElementById("link-settings")?.classList.add("active");
    } else if (currentPath.includes("logs.html")) {
        document.getElementById("link-logs")?.classList.add("active");
    }


    const dashboardLogoutBtn = document.getElementById("sidebar-logout-btn");
    if (dashboardLogoutBtn) {
        dashboardLogoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            localStorage.clear(); 
            
    
            window.location.href = "../index.html"; 
        });
    }
});