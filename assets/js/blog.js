function loadPosts() {
fetch("data.json")
    .then(res => res.json())
    .then(data => {
    const posts = data.posts || [];
    renderPosts(posts);
    })
    .catch(err => console.error(err));
}
loadPosts();
 
/* hamburger */
  const hamburger = document.getElementById('hamburger');
  const sideMenu = document.getElementById('sideMenu');

  hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
