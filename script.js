
const navbar = document.getElementById('navbar');
const body = document.body;
const themeToggle = document.getElementById('themeToggle');

window.addEventListener('scroll', () => {
if(window.scrollY > 50){
navbar.classList.add('scrolled');
}else{
navbar.classList.remove('scrolled');
}
});

themeToggle.addEventListener('click', () => {
body.classList.toggle('dark');
body.classList.toggle('light');

const icon = themeToggle.querySelector('i');

if(body.classList.contains('light')){
icon.className = 'fa-solid fa-moon';
}else{
icon.className = 'fa-solid fa-sun';
}
});

const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const particles = [];

for(let i=0;i<70;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.5,
vy:(Math.random()-0.5)*0.5,
size:Math.random()*2+1
});
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let i=0;i<particles.length;i++){

const p = particles[i];

p.x += p.vx;
p.y += p.vy;

if(p.x<0 || p.x>canvas.width) p.vx *= -1;
if(p.y<0 || p.y>canvas.height) p.vy *= -1;

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle='#00d4ff';
ctx.fill();

for(let j=i+1;j<particles.length;j++){

const q = particles[j];

const dx = p.x - q.x;
const dy = p.y - q.y;

const dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 120){

ctx.beginPath();
ctx.moveTo(p.x,p.y);
ctx.lineTo(q.x,q.y);

ctx.strokeStyle = 'rgba(0,212,255,' + (1-dist/120)*0.35 + ')';

ctx.stroke();

}

}

}

requestAnimationFrame(animate);

}

animate();
