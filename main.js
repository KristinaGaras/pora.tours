
var swiper = new Swiper(".multiple-slide-carousel", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: "#slider-button-right", 
        prevEl: "#slider-button-left",
    },
    breakpoints: {
    1920: {
        slidesPerView: 3,
        spaceBetween: 30
    },
    1028: {
        slidesPerView: 2,
        spaceBetween: 30
    },
    990: {
        slidesPerView: 1,
        spaceBetween: 0
    }
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Отменяем стандартное поведение

        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500; // Время в миллисекундах
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    });
});

let lastScrollTop = 0;
const rotatingStar = document.getElementById('rotating-svg');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Скролл вниз
        rotatingStar.style.transform = `rotate(${(scrollTop / 5)}deg)`; // Увеличьте или уменьшите делитель для изменения скорости вращения
    } else {
        // Скролл вверх
        rotatingStar.style.transform = `rotate(${(scrollTop / 5)}deg)`; // Оставляем угол вращения прежним
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Для мобильных устройств или при прокрутке вверх
});
