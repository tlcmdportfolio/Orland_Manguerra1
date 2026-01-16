// =========================
// Swiper Sliders
// =========================
// First Swiper: right, stops at last
var worksSwiper1 = new Swiper(".works-swiper-1", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: false,              // stop at last
  autoplay: {
    delay: 5000,            // 5 seconds
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    1024: { slidesPerView: 3 },
    768:  { slidesPerView: 2 },
    480:  { slidesPerView: 1 }
  }
});

// Second Swiper: start from last, swipe left, stop at first
var worksSwiper2 = new Swiper(".works-swiper-2", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: false,             // stop at first
  initialSlide: 4,         // index of last slide (0-based)
  autoplay: {
    delay: 5000,
    reverseDirection: true, // swipe left
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    1024: { slidesPerView: 3 },
    768:  { slidesPerView: 2 },
    480:  { slidesPerView: 1 }
  }
});

// =========================
// Lightbox
// =========================
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);
const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);
lightbox.addEventListener('click', e=>{if(e.target!==lightboxImg) lightbox.classList.remove('active');});
document.querySelectorAll('.work-card img').forEach(img=>{
  img.addEventListener('click', ()=>{
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
  });
});


// =========================
// Scroll Reveal
// =========================
function revealOnScroll(){
  document.querySelectorAll('.reveal').forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 100) el.classList.add('active');
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===========================
// Preloader
// ===========================
window.addEventListener('load', ()=>{
  const preloader = document.getElementById('preloader');
  if(preloader){ preloader.style.opacity='0'; setTimeout(()=>preloader.style.display='none',500); }
  document.body.classList.add('loaded');
});

// ===========================
// Particle Background
// ===========================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray;
function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle{
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.size=Math.random()*3+1;
    this.speedX=Math.random()*1-0.5;
    this.speedY=Math.random()*1-0.5;
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    if(this.x>canvas.width) this.x=0;
    if(this.x<0) this.x=canvas.width;
    if(this.y>canvas.height) this.y=0;
    if(this.y<0) this.y=canvas.height;
  }
  draw(){
    ctx.fillStyle='rgba(52,152,219,0.7)';
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}
function initParticles(){
  particlesArray=[];
  const number = Math.floor(canvas.width/10);
  for(let i=0;i<number;i++) particlesArray.push(new Particle());
}
initParticles();
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update(); p.draw();});
  requestAnimationFrame(animateParticles);
}
animateParticles();
const slider = document.querySelector('.service-grid');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});
