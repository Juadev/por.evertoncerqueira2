const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

function closeMenu(){
  menuButton.classList.remove("active");
  mobileMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded","false");
  mobileMenu.setAttribute("aria-hidden","true");
}

menuButton.addEventListener("click",()=>{
  const isOpen=mobileMenu.classList.toggle("open");
  menuButton.classList.toggle("active",isOpen);
  document.body.classList.toggle("menu-open",isOpen);
  menuButton.setAttribute("aria-expanded",String(isOpen));
  mobileMenu.setAttribute("aria-hidden",String(!isOpen));
});

mobileLinks.forEach(link=>link.addEventListener("click",closeMenu));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.14});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
document.querySelector("#year").textContent=new Date().getFullYear();
