const menuButton = document.querySelector(”.menu-toggle”);
const mobileMenu = document.querySelector(”.mobile-menu”);
const mobileLinks = document.querySelectorAll(”.mobile-menu a”);

function closeMenu() {
if (!menuButton || !mobileMenu) return;

menuButton.classList.remove(“active”);
mobileMenu.classList.remove(“open”);
document.body.classList.remove(“menu-open”);

menuButton.setAttribute(“aria-expanded”, “false”);
mobileMenu.setAttribute(“aria-hidden”, “true”);
}

if (menuButton && mobileMenu) {
menuButton.addEventListener(“click”, () => {
const isOpen = mobileMenu.classList.toggle(“open”);

menuButton.classList.toggle("active", isOpen);
document.body.classList.toggle("menu-open", isOpen);
menuButton.setAttribute("aria-expanded", String(isOpen));
mobileMenu.setAttribute("aria-hidden", String(!isOpen));

});
}

mobileLinks.forEach((link) => {
link.addEventListener(“click”, closeMenu);
});

const elementosReveal = document.querySelectorAll(”.reveal”);

if (“IntersectionObserver” in window) {
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add(“visible”);
observer.unobserve(entry.target);
}
});
},
{
threshold: 0.14
}
);

elementosReveal.forEach((elemento) => {
observer.observe(elemento);
});
} else {
elementosReveal.forEach((elemento) => {
elemento.classList.add(“visible”);
});
}

const yearElement = document.querySelector(”#year”);

if (yearElement) {
yearElement.textContent = new Date().getFullYear();
}

const carrossel = document.querySelector(”.carrossel-portfolio”);
const track = document.querySelector(”.carrossel-track”);
const slides = document.querySelectorAll(”.slide-portfolio”);
const botaoAnterior = document.querySelector(”.carrossel-botao.anterior”);
const botaoProximo = document.querySelector(”.carrossel-botao.proximo”);
const indicadoresContainer = document.querySelector(
“.carrossel-indicadores”
);

if (
carrossel &&
track &&
slides.length > 0 &&
botaoAnterior &&
botaoProximo &&
indicadoresContainer
) {
let slideAtual = 0;
let intervaloAutomatico = null;
const tempoEntreSlides = 5000;

indicadoresContainer.innerHTML = “”;

slides.forEach((slide, indice) => {
const indicador = document.createElement(“button”);

indicador.type = "button";
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

const indicadores =
indicadoresContainer.querySelectorAll(“button”);

function atualizarCarrossel() {
track.style.transform =
translateX(-${slideAtual * 100}%);

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

function pararAutomatico() {
if (intervaloAutomatico !== null) {
clearInterval(intervaloAutomatico);
intervaloAutomatico = null;
}
}

function iniciarAutomatico() {
pararAutomatico();

intervaloAutomatico = setInterval(
  proximoSlide,
  tempoEntreSlides
);

}

function reiniciarAutomatico() {
iniciarAutomatico();
}

botaoProximo.addEventListener(“click”, () => {
proximoSlide();
reiniciarAutomatico();
});

botaoAnterior.addEventListener(“click”, () => {
slideAnterior();
reiniciarAutomatico();
});

carrossel.addEventListener(
“mouseenter”,
pararAutomatico
);

carrossel.addEventListener(
“mouseleave”,
iniciarAutomatico
);

carrossel.addEventListener(
“focusin”,
pararAutomatico
);

carrossel.addEventListener(
“focusout”,
iniciarAutomatico
);

document.addEventListener(
“visibilitychange”,
() => {
if (document.hidden) {
pararAutomatico();
} else {
iniciarAutomatico();
}
}
);

atualizarCarrossel();

if (slides.length > 1) {
iniciarAutomatico();
} else {
botaoAnterior.style.display = “none”;
botaoProximo.style.display = “none”;
indicadoresContainer.style.display = “none”;
}
}