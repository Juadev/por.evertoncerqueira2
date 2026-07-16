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
<script>
    const carrossel = document.querySelector(".carrossel-portfolio");
    const track = document.querySelector(".carrossel-track");
    const slides = document.querySelectorAll(".slide-portfolio");
    const botaoAnterior = document.querySelector(".anterior");
    const botaoProximo = document.querySelector(".proximo");
    const indicadoresContainer = document.querySelector(
        ".carrossel-indicadores"
    );

    let slideAtual = 0;
    let intervaloAutomatico;

    slides.forEach((_, indice) => {
        const indicador = document.createElement("button");

        indicador.setAttribute(
            "aria-label",
            `Ir para a foto ${indice + 1}`
        );

        indicador.addEventListener("click", () => {
            slideAtual = indice;
            atualizarCarrossel();
            reiniciarAutomatico();
        });

        indicadoresContainer.appendChild(indicador);
    });

    const indicadores = indicadoresContainer.querySelectorAll("button");

    function atualizarCarrossel() {
        track.style.transform = `translateX(-${slideAtual * 100}%)`;

        indicadores.forEach((indicador, indice) => {
            indicador.classList.toggle(
                "ativo",
                indice === slideAtual
            );
        });
    }

    function proximoSlide() {
        slideAtual = (slideAtual + 1) % slides.length;
        atualizarCarrossel();
    }

    function slideAnterior() {
        slideAtual =
            (slideAtual - 1 + slides.length) % slides.length;

        atualizarCarrossel();
    }

    function iniciarAutomatico() {
        intervaloAutomatico = setInterval(proximoSlide, 5000);
    }

    function reiniciarAutomatico() {
        clearInterval(intervaloAutomatico);
        iniciarAutomatico();
    }

    botaoProximo.addEventListener("click", () => {
        proximoSlide();
        reiniciarAutomatico();
    });

    botaoAnterior.addEventListener("click", () => {
        slideAnterior();
        reiniciarAutomatico();
    });

    carrossel.addEventListener("mouseenter", () => {
        clearInterval(intervaloAutomatico);
    });

    carrossel.addEventListener("mouseleave", iniciarAutomatico);

    atualizarCarrossel();
    iniciarAutomatico();
</script>
