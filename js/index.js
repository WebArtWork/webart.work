// Smooth scroll for [data-scroll]
function scrollToSelector(sel){
  var el = document.querySelector(sel);
  if(!el) return;
  el.scrollIntoView({behavior:'smooth'});
  hideMobileNav();
}
document.querySelectorAll('[data-scroll]').forEach(function(btn){
  btn.addEventListener('click', function(){ scrollToSelector(btn.getAttribute('data-scroll')); });
});
// Mobile menu toggle
var toggle = document.getElementById('menuToggle');
var mobile = document.getElementById('mobileNav');
var iconMenu = document.getElementById('iconMenu');
var iconClose = document.getElementById('iconClose');
function showMobileNav(){ mobile.classList.remove('hidden'); toggle.setAttribute('aria-expanded','true'); iconMenu.classList.add('hidden'); iconClose.classList.remove('hidden'); }
function hideMobileNav(){ mobile.classList.add('hidden'); toggle.setAttribute('aria-expanded','false'); iconClose.classList.add('hidden'); iconMenu.classList.remove('hidden'); }
toggle.addEventListener('click', function(){ var isOpen = toggle.getAttribute('aria-expanded') === 'true'; if(isOpen) hideMobileNav(); else showMobileNav(); });

// Contact form handler
var form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    console.log('Form submitted:', data);
    alert("Thank you for your message! We'll get back to you soon.");
    form.reset();
  });
}
// Footer year
var y = document.getElementById('year'); if(y){ y.textContent = new Date().getFullYear(); }