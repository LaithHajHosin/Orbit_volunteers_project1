/* MainNavbar  */

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("userToken");

  if (token) {
    const backendMeUrl = "http://orbitvolunteers.atwebpages.com/auth/me";
    const proxyMeUrl = `https://corsproxy.io/?${encodeURIComponent(backendMeUrl)}`;

    fetch(proxyMeUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          throw new Error("Session expired");
        }
        return res.json();
      })
      .then((user) => {
        // حماية الـ Role: نأخذ الـ role الحالي المخزن مسبقاً أولاً لحمايته من التلاشي
        const oldDataString = localStorage.getItem("userData");
        let currentRole = "user";
        if (oldDataString) {
          try { currentRole = JSON.parse(oldDataString).role || "user"; } catch(e){}
        }

        // إذا جاء الـ role من السيرفر بشكل كائن أو نص نلتقطه، وإلا نحتفظ بالقديم
        const updatedRole = user.role?.name || user.role || currentRole;
        
        user.role = updatedRole; // نضمن تثبيت الـ role الصحيح
        localStorage.setItem("userData", JSON.stringify(user));

        // تحديث الناف بار فوراً إذا تغير الـ Role أو تم تحديث البيانات لتجنب مشكلة الـ Race Condition
        const navbarEl = document.querySelector("main-navbar");
        if (navbarEl && typeof navbarEl.connectedCallback === "function") {
          navbarEl.connectedCallback();
        }
      })
      .catch((err) => {
        if (err.message === "Session expired") {
          console.warn("جلسة الدخول منتهية، سيتم تسجيل الخروج.");
          localStorage.clear();
          window.location.href = "./index.html"; 
        } else {
          console.error("فشل الفحص الدوري بسبب الشبكة أو الـ CORS:", err);
        }
      });
  }
});

class MainNavbar extends HTMLElement {
  connectedCallback() {
    const token = localStorage.getItem("userToken");
    const userDataString = localStorage.getItem("userData");

    let isLoggedIn = !!token;
    let userRole = "user";

    if (isLoggedIn && userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        userRole = userData.role;
      } catch (e) {
        console.error("خطأ في قراءة بيانات المستخدم من الـ LocalStorage");
      }
    }

    let desktopActions = "";
    let mobileActions = "";
    let centerMenuLinks = ""; // لتجميع الروابط الديناميكية في منتصف الناف بار بشكل نظيف

    if (!isLoggedIn) {
      desktopActions = `
        <button id="open-login-btn" class="home-bottons">تسجيل الدخول</button>
        <button id="open-register-btn" class="home-bottons">انضم الآن</button>
      `;
      mobileActions = `
        <button id="open-login-btn-mobile" class="home-bottons">تسجيل الدخول</button>
        <button id="open-register-btn-mobile" class="home-bottons">انضم الآن</button>
      `;
    } else if (userRole === "admin") {
      centerMenuLinks = `<li><a href="./Dashboard/Dashboard.html">لوحة التحكم</a></li>`;
      desktopActions = `<button id="logout-btn" class="home-bottons">تسجيل الخروج</button>`;
      mobileActions = `<button id="logout-btn-mobile" class="home-bottons">تسجيل الخروج</button>`;
    } else {
      centerMenuLinks = `<li><a href="./profile.html">ملفي الشخصي</a></li>`;
      desktopActions = `<button id="logout-btn" class="home-bottons">تسجيل الخروج</button>`;
      mobileActions = `<button id="logout-btn-mobile" class="home-bottons">تسجيل الخروج</button>`;
    }

    this.innerHTML = `
      <nav class="navbar-lg fcb">
        <div class="home-actions">
          ${desktopActions}
        </div>
        <ul class="home-menu fca">
          ${centerMenuLinks}
          <li><a href="./contactUs.html">تواصل معنا</a></li>
          <li><a href="#our-team">فريقنا</a></li>
          <li><a href="#about-us">من نحن</a></li>
          <li><a href="#articles-section">المقالات</a></li>
          <li><a href="#projects">المشاريع</a></li>
          <li><a href="./index.html">الرئيسية</a></li>
        </ul>
        <h1 class="home-logo"><a href="./index.html">متطوع</a></h1>
      </nav>

      <nav class="mobile-nav">
        <div class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 class="home-logo"><a href="./index.html">متطوع</a></h1>
      </nav>

      <div class="side-menu" id="sideMenu">
        <ul>
          <li><a href="./index.html">الرئيسية</a></li>
          <li><a href="#projects">المشاريع</a></li>
          <li><a href="#articles-section">المقالات</a></li>
          <li><a href="#about-us">من نحن</a></li>
          <li><a href="#our-team">فريقنا</a></li>
          <li><a href="./contactUs.html">تواصل معنا</a></li>
          
          ${centerMenuLinks}
      
          <li>
            <div class="home-actions">
              ${mobileActions}
            </div>
          </li>
        </ul>
      </div>
    `;

    // تفعيل الهامبرغر للموبايل
    const hamburger = this.querySelector("#hamburger");
    const sideMenu = this.querySelector("#sideMenu");
    if (hamburger && sideMenu) {
      // إزالة المستمعات القديمة أولاً لمنع تكرار الأحداث عند إعادة البناء الديناميكي
      const newHamburger = hamburger.cloneNode(true);
      hamburger.parentNode.replaceChild(newHamburger, hamburger);

      newHamburger.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
        newHamburger.classList.toggle("open");
      });
    }

    const closeMobileMenu = () => {
      const activeHamburger = this.querySelector("#hamburger");
      if (sideMenu && activeHamburger) {
        sideMenu.classList.remove("open");
        activeHamburger.classList.remove("open");
      }
    };

    // معالجة تسجيل الخروج والتوجه لصفحة الـ Guest
    const logoutBtn = this.querySelector("#logout-btn");
    const logoutBtnMobile = this.querySelector("#logout-btn-mobile");
    
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "./index.html"; 
    };

    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener("click", handleLogout);

    // تفعيل فتح المودال الخاص بالدخول والتسجيل
    const openLoginBtn = this.querySelector("#open-login-btn");
    const openLoginBtnMobile = this.querySelector("#open-login-btn-mobile");
    const setupLoginClick = (btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          const loginModal = document.getElementById("login-modal");
          if (loginModal) {
            const registerModal = document.getElementById("register-modal");
            if (registerModal) registerModal.classList.remove("active");
            loginModal.classList.add("active");
            closeMobileMenu();
          }
        });
      }
    };
    setupLoginClick(openLoginBtn);
    setupLoginClick(openLoginBtnMobile);

    const openRegisterBtn = this.querySelector("#open-register-btn");
    const openRegisterBtnMobile = this.querySelector("#open-register-btn-mobile");
    const setupRegisterClick = (btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          const registerModal = document.getElementById("register-modal");
          if (registerModal) {
            const loginModal = document.getElementById("login-modal");
            if (loginModal) loginModal.classList.remove("active");
            registerModal.classList.add("active");
            closeMobileMenu();
          }
        });
      }
    };
    setupRegisterClick(openRegisterBtn);
    setupRegisterClick(openRegisterBtnMobile);
  }
}
customElements.define("main-navbar", MainNavbar);

/* MainFooter */
class MainFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
       <footer>
        <div class="footer-container">
          <div class="footer-cta fcb">
            <div class="footer-cta-item">
              <i class="cta-text-icon fas fa-map-marker-alt"></i>
              <div class="cta-text">
                <h3>العنوان</h3>
                <span>سلمية - شارع حمص الفرعي</span>
              </div>
            </div>
            <div class="footer-cta-item">
              <i class="cta-text-icon fa-solid fa-phone-flip"></i>
              <div class="cta-text">
                <h3>تواصل معنا</h3>
                <span>0000000000</span>
              </div>
            </div>
            <a href="./contactUs.html">
            <div class="footer-cta-item">
              <i class="cta-text-icon far fa-envelope-open"></i>
              <div class="cta-text">
                <h3>راسلنا</h3>
                <span>mail@info.com</span>
              </div>
            </div>
                             </a>
          </div>
        
          <div class="footer-content">
            <div class="footer-social">
              <div class="footer-logo">
                <h2><a href="index.html">متطوع</a></h2>
              </div>
              <div class="footer-text">
                <p>
                  فريق متطوع هوفريق تطوعي تابع لشركة أوربيت يساهم في خدمة وتطوير
                  البرامج فريق متطوع هوفريق تطوعي تابع لشركة أوربيت يساهم في
                  خدمة وتطوير البرامج
                </p>
              </div>
            </div>

            <div class="footer-links">
              <div class="footer-content-heading">
                <h3>روابط مفيدة</h3>
              </div>
              <ul>
                <li><a href="./index.html">الرئيسية</a></li>
                 <li><a href="./allProjects.html">المشاريع</a></li>
                <li><a href="./allBlogs.html">المقالات</a></li>
                <li><a href="#about-us">من نحن</a></li>
                 <li><a href="#our-team">فريقنا</a></li>
                <li><a href="./contactUs.html">تواصل معنا</a></li>
                <li><a href="#">آخر الاخبار</a></li>
              </ul>
            </div>
            <div class="footer-links">
              <div class="footer-content-heading">
                <h3>روابط مفيدة</h3>
              </div>
              <ul>
                <li><a href="#">الرئيسية</a></li>
                <li><a href="#">ترخيص الشركة</a></li>
                <li><a href="#">سياسة الخصوصية</a></li>
                <li><a href="#">تواصل معنا</a></li>
                <li><a href="#">فريقنا</a></li>
                <li><a href="#">المقالات</a></li>
                <li><a href="#">آخر الاخبار</a></li>
              </ul>
            </div>
            <div class="footer-social-icon">
              <div class="footer-content-heading">
                <h3>تابعنا على</h3>
              </div>
              <div class="footer-icons">
                <a href="#"><i class="cta-text-icon fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="cta-text-icon fa-brands fa-github"></i></a>
                <a href="#"><i class="cta-text-icon fa-brands fa-linkedin"></i></a>
                <a href="#"><i class="cta-text-icon fa-solid fa-globe"></i></a>
                <a href="#"><i class="cta-text-icon fa-brands fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="copyright-area fce">
          <div class="footer-menu">
            <ul>
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Policy</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div class="copyright-text">
            <p>
              Copyright &copy; 2026, All Right Reserved
              <a href="#">Orbit</a>
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define("main-footer", MainFooter);

/* Logic for Modals (Login & Register Actions) */
document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("login-modal");
  const registerModal = document.getElementById("register-modal");

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  const loginMessage = document.getElementById("login-message");
  const registerMessage = document.getElementById("register-message");

  function closeAllModals() {
    if (loginModal) loginModal.classList.remove("active");
    if (registerModal) registerModal.classList.remove("active");
    if (loginForm) loginForm.reset();
    if (registerForm) registerForm.reset();
    if (loginMessage) loginMessage.textContent = "";
    if (registerMessage) registerMessage.textContent = "";
  }

  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "open-register-btn") {
      e.preventDefault();
      closeAllModals();
      if (registerModal) registerModal.classList.add("active");
    }
  });

  document.addEventListener("click", (e) => {
    if (
      e.target &&
      (e.target.id === "go-to-register" || e.target.closest("#go-to-register"))
    ) {
      e.preventDefault();
      closeAllModals();
      if (registerModal) registerModal.classList.add("active");
    }
  });

  document.addEventListener("click", (e) => {
    if (
      e.target &&
      (e.target.id === "go-to-login" || e.target.closest("#go-to-login"))
    ) {
      e.preventDefault();
      closeAllModals();
      if (loginModal) loginModal.classList.add("active");
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === loginModal || e.target === registerModal) {
      closeAllModals();
    }
  });

  // ==========================================
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("reg-username").value;
      const firstname = document.getElementById("reg-firstname").value;
      const lastname = document.getElementById("reg-lastname").value;
      const email = document.getElementById("reg-email").value;
      const password = document.getElementById("reg-password").value;

      registerMessage.style.color = "#c18c15";
      registerMessage.textContent = "جاري إنشاء الحساب...";

      const backendRegUrl =
        "http://orbitvolunteers.atwebpages.com/auth/register";
      const proxyRegUrl = `https://corsproxy.io/?${encodeURIComponent(backendRegUrl)}`;

      fetch(proxyRegUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
        }),
      })
        .then((res) => res.text())
        .then((text) => {
          if (
            text.startsWith("error") ||
            text.includes("Conflict") ||
            text.includes("errorrrrrr")
          ) {
            throw new Error(
              "هذا الحساب (اسم المستخدم أو الإيميل) مسجل لدينا بالفعل!",
            );
          }

          let res = JSON.parse(text);

          if (
            res.status === "success" ||
            res.message === "Registration successful"
          ) {
            registerMessage.style.color = "green";
            registerMessage.textContent =
              "تم إنشاء الحساب بنجاح! جاري تحويلك لتسجيل الدخول...";

            registerForm.reset();

            setTimeout(() => {
              if (registerModal) registerModal.classList.remove("active");
              if (loginModal) loginModal.classList.add("active");
              if (registerMessage) registerMessage.textContent = "";
            }, 1500);
          } else {
            registerMessage.style.color = "red";
            registerMessage.textContent =
              res.message || "فشل التسجيل، تأكد من البيانات المدخلة.";
          }
        })
        .catch((err) => {
          registerMessage.style.color = "red";
          registerMessage.textContent =
            err.message || "حدث خطأ في الاتصال بالسيرفر.";
        });
    });
  }

  // ==========================================
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const currentForm = e.target;
      const emailInput =
        currentForm.querySelector('input[type="email"]') ||
        currentForm.querySelector("#login-email");
      const passwordInput =
        currentForm.querySelector('input[type="password"]') ||
        currentForm.querySelector("#login-password");

      if (!emailInput || !passwordInput) {
        console.error(
          "خطأ: لم يتم العثور على حقول الإدخال داخل فورم تسجيل الدخول!",
        );
        return;
      }

      const email = emailInput.value;
      const password = passwordInput.value;

      if (loginMessage) {
        loginMessage.style.color = "#c18c15";
        loginMessage.textContent = "جاري التحقق من البيانات...";
      }

      const backendLoginUrl =
        "http://orbitvolunteers.atwebpages.com/auth/login";
      const proxyLoginUrl = `https://corsproxy.io/?${encodeURIComponent(backendLoginUrl)}`;

      fetch(proxyLoginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.text())
        .then((text) => {
          let res;
          try {
            res = JSON.parse(text);
          } catch (err) {
            throw new Error("استجابة غير متوقعة من السيرفر.");
          }

          if (res.status === "success" || res.message === "Login successful") {
            if (loginMessage) {
              loginMessage.style.color = "green";
              loginMessage.textContent =
                "تم تسجيل الدخول بنجاح! جاري التوجيه...";
            }

            if (res.data && res.data.token) {
              localStorage.setItem("userToken", res.data.token);
              localStorage.setItem("userData", JSON.stringify(res.data.user));
            }

            setTimeout(() => {
              closeAllModals();
              window.location.reload();
            }, 1200);
          } else {
            if (loginMessage) {
              loginMessage.style.color = "red";
              loginMessage.textContent =
                res.message ||
                "خطأ: البريد الإلكتروني أو كلمة المرور غير صحيحة.";
            }
          }
        })
        .catch((err) => {
          if (loginMessage) {
            loginMessage.style.color = "red";
            loginMessage.textContent =
              err.message || "حدث خطأ أثناء الاتصال بالسيرفر.";
          }
          console.error(err);
        });
    });
  }
});
