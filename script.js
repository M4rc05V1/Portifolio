
document.getElementById('year').textContent = new Date().getFullYear();

// ========================
// MENU MOBILE
// ========================
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Fechar menu ao clicar em links
menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ========================
// ROLAGEM SUAVE E SCROLLSPY
// ========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.menu__link')];

const activate = id => {
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
};

const onScroll = () => {
  const scroll = window.scrollY + 120; // compensar header
  let current = sections[0].id;
  for (const sec of sections) {
    if (scroll >= sec.offsetTop) current = sec.id;
  }
  activate(current);
};

window.addEventListener('scroll', onScroll);
onScroll();


(function() {
  emailjs.init("CRbVxHOXAtfs0pIJh"); 
})();

const form = document.getElementById("contact-form");
const submitBtn = form.querySelector("button[type='submit']");

// Criar feedback acessível
const statusEl = document.createElement("p");
statusEl.setAttribute("role", "status");
statusEl.setAttribute("aria-live", "polite");
form.appendChild(statusEl);

// Honeypot anti-spam
const honeypot = document.createElement("input");
honeypot.type = "text";
honeypot.name = "company"; 
honeypot.style.position = "absolute";
honeypot.style.left = "-5000px";
honeypot.tabIndex = -1;
honeypot.autocomplete = "off";
form.appendChild(honeypot);

// Envio do formulário
form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (honeypot.value.trim() !== "") return; // ignorar bots

  submitBtn.disabled = true;
  statusEl.textContent = "Enviando...";

  emailjs.sendForm("service_42ytq4c", "template_70md3js", form)
    .then(() => {
      statusEl.textContent = "✅ Mensagem enviada com sucesso!";
      form.reset();
    })
    .catch((error) => {
      statusEl.textContent = "❌ Ocorreu um erro. Tente novamente.";
      console.error(error);
    })
    .finally(() => submitBtn.disabled = false);
});
