const galleryContainer = document.getElementById('gallery-container');
const slides = document.querySelectorAll('.slide');
console.log(slides)
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
console.log(next, prev);
const auto = false;
const intervalTime = 5000;
let slideInterval;


const nextSlide = () => {
    // get current class
    const current = document.querySelector('.current');
    // remove current class
    current.classList.remove('current');
    // check for next slide
    if (current.nextElementSibling) {
        // add current to next sibling
        current.nextElementSibling.classList.add('current');
    } else {
        // add current class back to start
        slides[0].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
}
// console.log(nextSlide);


const prevSlide = () => {
    // get current class
    const current = document.querySelector('.current');
    // remove current class
    current.classList.remove('current');
    // check for previous slide
    if (current.previousElementSibling) {
        // add current to previous sibling
        current.previousElementSibling.classList.add('current');
    } else {
        // add current class to last
        slides[slides.length - 1].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
}
// console.log(prevSlide);


// button events
next.addEventListener('click', e => {
    nextSlide();
    if(auto){
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
})

prev.addEventListener('click', e => {
    prevSlide();
      if(auto){
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
})

// auto slide
if (auto) {
    // run next slide at interval time
    slideInterval = setInterval(nextSlide, intervalTime)
}
