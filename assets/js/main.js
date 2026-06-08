/* MainNavbar*/
class MainNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar-lg fcb">
        <div class="home-actions">
          <button id="open-login-btn" class="home-bottons">تسجيل الدخول</button>
          <button class="home-bottons"><a href="./register.html">انضم الآن</a></button>
        </div>
        <ul class="home-menu fca">
          <li><a href="./contact us.html">تواصل معنا</a></li>
          <li><a href="#our-team">فريقنا</a></li>
          <li><a href="#about-us">من نحن</a></li>
          <li><a href="#articles-section">المقالات</a></li>
          <li><a href="#projects">المشاريع</a></li>
          <li><a href="./index.html">الرئيسية</a></li>
        </ul>
        <h1 class="home-logo"><a href="./index.html" style="color:inherit; text-decoration:none;">متطوع</a></h1>
      </nav>

      <nav class="mobile-nav">
        <div class="hamburger" id="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 class="home-logo"><a href="./index.html" style="color:inherit; text-decoration:none;">متطوع</a></h1>
      </nav>

      <div class="side-menu" id="sideMenu">
        <ul>
          <li><a href="#contact-section">تواصل معنا</a></li>
          <li><a href="#our-team">فريقنا</a></li>
          <li><a href="#about-us">من نحن</a></li>
          <li><a href="#articles-section">المقالات</a></li>
          <li><a href="#projects">المشاريع</a></li>
          <li><a href="./index.html">الرئيسية</a></li>
          <li>
            <div class="home-actions">
              <button id="open-login-btn-mobile" class="home-bottons">تسجيل الدخول</button>
              <button class="home-bottons"><a href="./register.html">انضم الآن</a></button>
            </div>
          </li>
        </ul>
      </div>
    `;

  
    const hamburger = this.querySelector('#hamburger');
    const sideMenu = this.querySelector('#sideMenu');
    if (hamburger && sideMenu) {
      hamburger.addEventListener('click', () => {
        sideMenu.classList.toggle('open');
        hamburger.classList.toggle('open');
      });
    }

  
    const openLoginBtn = this.querySelector("#open-login-btn");
    const openLoginBtnMobile = this.querySelector("#open-login-btn-mobile");

    const setupLoginClick = (btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          const loginModal = document.getElementById("login-modal");
          if (loginModal) {
            loginModal.classList.add("active");
            // إغلاق قائمة الموبايل الجانبية إذا ضغط المستخدم على دخول من الموبايل
            if (sideMenu) {
              sideMenu.classList.remove('open');
              hamburger.classList.remove('open');
            }
          }
        });
      }
    };

    setupLoginClick(openLoginBtn);
    setupLoginClick(openLoginBtnMobile);
  }
}
customElements.define("main-navbar", MainNavbar);



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
            <div class="footer-cta-item">
              <i class="cta-text-icon far fa-envelope-open"></i>
              <div class="cta-text">
                <h3>راسلنا</h3>
                <span>mail@info.com</span>
              </div>
            </div>
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
                <li><a href="#">الرئيسية</a></li>
                <li><a href="#">من نحن</a></li>
                <li><a href="#">المشاريع</a></li>
                <li><a href="#">تواصل معنا</a></li>
                <li><a href="#">فريقنا</a></li>
                <li><a href="#">المقالات</a></li>
                <li><a href="#">آخر الاخبار</a></li>
              </ul>
            </div>
            <div class="footer-links">
              <div class="footer-content-heading">
                <h3>روابط مفيدة</h3>
              </div>
              <ul>
                <li><a href="#">الرئيسية</a></li>
                <li><a href="#">من نحن</a></li>
                <li><a href="#">المشاريع</a></li>
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



document.addEventListener("DOMContentLoaded", () => {
  
  const loginModal = document.getElementById("login-modal");
  const closeLoginBtn = document.getElementById("close-login-btn");


  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener("click", () => {
      loginModal.classList.remove("active");
    });
  }


  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove("active");
    }
  });


  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); 

      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      const loginData = {
        username: username,
        password: password
      };

      if (loginMessage) {
        loginMessage.style.color = "#c18c15";
        loginMessage.textContent = "جاري التحقق من البيانات...";
      }

      fetch("http://volunteerorbit.atwebpages.com/api.php/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData) 
      })
      .then(res => {
        if (!res.ok) {
          throw new Error("اسم المستخدم أو كلمة السر غير صحيحة");
        }
        return res.json();
      })
      .then(data => {
        console.log("استجابة السيرفر بنجاح:", data);
        
        if (loginMessage) {
          loginMessage.style.color = "green";
          loginMessage.textContent = "تم تسجيل الدخول بنجاح! جاري التوجيه...";
        }

        if (data.token) localStorage.setItem("userToken", data.token);
        if (data.user) localStorage.setItem("userData", JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = "index.html"; 
        }, 1500);
      })
      .catch(error => {
        console.error("خطأ أثناء تسجيل الدخول:", error);
        if (loginMessage) {
          loginMessage.style.color = "red";
          loginMessage.textContent = error.message || "فشل الاتصال بالسيرفر، يرجى المحاولة لاحقاً";
        }
      });
    });
  }
});






/* register */
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const registerMessage = document.getElementById("register-message");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault(); 

  
      const firstname = document.getElementById("reg-firstname").value;
      const lastname = document.getElementById("reg-lastname").value;
      const username = document.getElementById("reg-username").value;
      const email = document.getElementById("reg-email").value;
      const password = document.getElementById("reg-password").value;
      const gender = document.getElementById("reg-gender").value;
      const major = document.getElementById("reg-major").value;

  
   
      const registerData = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        gender: gender,
        specialization: major

      };

      registerMessage.style.color = "#c18c15";
      registerMessage.textContent = "جاري إنشاء الحساب الجديد...";


      fetch("http://volunteerorbit.atwebpages.com/api.php/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      })
      .then(res => {
   
        if (!res.ok) {
          throw new Error("فشل التسجيل. قد يكون اسم المستخدم أو البريد مستعملاً بالفعل.");
        }
        return res.json();
      })
      .then(data => {
        console.log("تم التسجيل بنجاح:", data);

        registerMessage.style.color = "green";
        registerMessage.textContent = "تم إنشاء حسابك بنجاح! جاري تحويلك لصفحة الدخول...";

   
        registerForm.reset();

      
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      })
      .catch(error => {
        console.error("خطأ أثناء عملية التسجيل:", error);
        registerMessage.style.color = "red";
        registerMessage.textContent = error.message || "حدث عطل في الاتصال بالسيرفر، حاول مجدداً.";
      });
    });
  }
});