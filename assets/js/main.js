/*  navBar scroll */
const navBarlg = document.querySelector('.navbar-lg');
document.addEventListener("scroll" , () => {
  if(window.scrollY > 0){
  navBarlg.classList.add("scrolled");
  }else{
    navBarlg.classList.remove("scrolled");
  }
})

window.addEventListener('scroll', function() { 
const home = document.querySelector("#home");
const projects = document.querySelector("#projects");
const aboutUS = document.querySelector("#aboutUS");
const articles = document.querySelector("#articles");
const ourTeam = document.querySelector("#ourTeam");

const hero  = document.querySelector(".hero");
const projectsSec  = document.querySelector(".projects");
const articlesSection  = document.querySelector(".articles-section");
const aboutusSec  = document.querySelector("#about-us");
const ourteamSec  = document.querySelector("#our-team");

let scroll = window.scrollY ; 
let heightsec = hero.offsetTop - 200;
let heightsec2 = projectsSec.offsetTop - 200;
let heightsec3 = articlesSection.offsetTop - 200;
let heightsec4 = aboutusSec.offsetTop - 200;
let heightsec5 = ourteamSec.offsetTop - 200;

    if (heightsec > scroll) {
      home.classList.add("active");
      projects.classList.remove("active");
      articles.classList.remove("active");
      aboutUS.classList.remove("active");
      ourTeam.classList.remove("active");
    }
    if (heightsec < scroll && heightsec2 > scroll) {
     home.classList.remove("active");
      projects.classList.add("active");
      articles.classList.remove("active");
      aboutUS.classList.remove("active");
      ourTeam.classList.remove("active");
     
    }
    if(heightsec < scroll && heightsec2 < scroll){
    home.classList.remove("active");
      projects.classList.remove("active");
      articles.classList.add("active");
      aboutUS.classList.remove("active");
      ourTeam.classList.remove("active");
   }
    if (heightsec2 < scroll && heightsec3 > scroll) {
      home.classList.remove("active");
      projects.classList.remove("active");
      articles.classList.remove("active");
      aboutUS.classList.add("active");
      ourTeam.classList.remove("active");
     
    }
   if( heightsec4 < scroll){
    home.classList.remove("active");
      projects.classList.remove("active");
      articles.classList.remove("active");
      aboutUS.classList.remove("active");
      ourTeam.classList.add("active");
   }
  }); 





  
/* hamburger */
  const hamburger = document.getElementById('hamburger');
  const sideMenu = document.getElementById('sideMenu');

  hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
