const header=document.querySelector('.site-header');addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20));
const mt=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-header nav');mt.addEventListener('click',()=>{const o=nav.classList.toggle('open');mt.setAttribute('aria-expanded',o)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
const hero=document.querySelector('.hero-visual');if(hero&&matchMedia('(pointer:fine)').matches)hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;hero.querySelector('.mock').style.transform=`rotateY(${x*8-7}deg) rotateX(${-y*6+3}deg) translate(${x*5}px,${y*5}px)`});
document.querySelectorAll('.faq-q').forEach(b=>b.onclick=()=>{const i=b.parentElement,o=i.classList.toggle('open');b.setAttribute('aria-expanded',o);b.querySelector('span').textContent=o?'−':'+'});
const tl=document.querySelector('.timeline'),prog=document.querySelector('.timeline-progress');addEventListener('scroll',()=>{if(!tl)return;const r=tl.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.65-r.top)/(r.height*.8)));prog.style.height=p*100+'%'});
const qc=document.querySelector('.quick-contact'),qb=qc.querySelector('button');qb.onclick=()=>{const o=qc.classList.toggle('open');qb.setAttribute('aria-expanded',o)};document.addEventListener('click',e=>{if(!qc.contains(e.target)){qc.classList.remove('open');qb.setAttribute('aria-expanded','false')}});document.getElementById('year').textContent=new Date().getFullYear();

// Cookie consent — only stores the user's choice locally. Add optional analytics/marketing scripts only after consent.
const cookiePopup=document.getElementById('cookiePopup');
const cookieChoice=localStorage.getItem('iwnCookieConsent');
if(cookiePopup&&cookieChoice)cookiePopup.classList.add('hidden');
document.querySelector('.cookie-accept')?.addEventListener('click',()=>{localStorage.setItem('iwnCookieConsent','accepted');cookiePopup?.classList.add('hidden')});
document.querySelector('.cookie-essential')?.addEventListener('click',()=>{localStorage.setItem('iwnCookieConsent','essential');cookiePopup?.classList.add('hidden')});

