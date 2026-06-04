class MainNavbar extends HTMLElement {
  connectedCallback() {

    this.innerHTML = `
      <nav class="navbar-lg fcb">
        <div class="home-actions">
          <button class="home-bottons"><a href="./login.html">تسجيل الدخول</a></button>
          <button class="home-bottons"><a href="./register.html">انضم الآن</a></button>
        </div>
        <ul class="home-menu fca">
          <li><a href="#contact-section">تواصل معنا</a></li>
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
              <button class="home-bottons"><a href="./login.html">تسجيل الدخول</a></button>
              <button class="home-bottons"><a href="./register.html">انضم الآن</a></button>
            </div>
          </li>
        </ul>
      </div>
    `;

  }



}


customElements.define("main-navbar", MainNavbar);



/* hamburger */
  const hamburger = document.getElementById('hamburger');
  const sideMenu = document.getElementById('sideMenu');

  hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });




/* footer */

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
                <a href="#"
                  ><i class="cta-text-icon fa-brands fa-facebook-f"></i
                ></a>
                <a href="#">
                  <i class="cta-text-icon fa-brands fa-github"></i
                ></a>
                <a href="#">
                  <i class="cta-text-icon fa-brands fa-linkedin"></i
                ></a>
                <a href="#"> <i class="cta-text-icon fa-solid fa-globe"></i></a>
                <a href="#">
                  <i class="cta-text-icon fa-brands fa-instagram"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="copyright-area fce">
          <div class="footer-menu">
            <ul>
              <li  class="active"><a href="#">Home</a></li>
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

  
    this.fetchFooterData();
  }

  fetchFooterData() {
    const apiUrl = ""; 

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("فشل في جلب بيانات الفوتر");
        return res.json();
      })
      .then((res) => {
        const footerData = res.footer;
        
        if (footerData.callUs) this.renderCallUs(footerData.callUs);
        if (footerData.socialLinks) this.renderSocialLinks(footerData.socialLinks);
      })
      .catch((error) => {
        console.error("خطأ في الـ Footer API:", error);
      });
  }

  renderCallUs(callUsArray) {
    const container = this.querySelector("#web-component-call-us");
    if (!container) return;

    container.innerHTML = ""; 

    callUsArray.forEach((item) => {
      container.innerHTML += `
        <div class="footer-cta-item">
          <i class="cta-text-icon ${item.icon}"></i>
          <div class="cta-text">
            <h3>${item.title}</h3>
            <span>${item.info}</span>
          </div>
        </div>
      `;
    });
  }

 
  renderSocialLinks(socialArray) {
    const container = this.querySelector("#web-component-social-icons");
    if (!container) return;

    container.innerHTML = "";

    socialArray.forEach((item) => {

      const linkKey = Object.keys(item).find(key => key !== "icon");
      const linkUrl = item[linkKey] || "#";

      container.innerHTML += `
        <a href="${linkUrl}" target="_blank" rel="noopener noreferrer">
          <i class="cta-text-icon ${item.icon}"></i>
        </a>
      `;
    });
  }
}

customElements.define("main-footer", MainFooter);