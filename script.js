
const navbar = document.getElementById('navbar');

window.addEventListener('scroll',()=>{
if(window.scrollY>40){
navbar.classList.add('scrolled');
}else{
navbar.classList.remove('scrolled');
}
});

const observer = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('visible');
}
});
},{threshold:0.15});

document.querySelectorAll('.fade').forEach(el=>{
observer.observe(el);
});
