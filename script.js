function checkScrollPosition() {

    if($(window).width() < 767) {
        $(".tm-nav").removeClass("scroll");
        return;
    }

    if($(window).scrollTop() > 50) {
        $(".tm-nav").addClass("scroll");
    } else {
        $(".tm-nav").removeClass("scroll");
    }
}

$(document).ready(function () {
    // Single page nav
    $('.tm-nav').singlePageNav({
        offset: 57,
        filter: ':not(.external)',
        updateHash: true
    });

    checkScrollPosition();

    // navbar
    $('.navbar-toggle').click(function(){
        $('.main-menu').toggleClass('show');
    });

    $('.main-menu a').click(function(){
        $('.main-menu').removeClass('show');
    });
});

$(window).on("scroll", function() {
    checkScrollPosition();
});

$('#tmNavbar a').click(function(){
    $('#tmNavbar').collapse('hide');
});

// плавный скрол секций

document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".fade-scroll, .fade-scroll-left");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // добавляем класс для анимации
            } else {
                entry.target.classList.remove("visible"); // убираем, чтобы анимация повторялась
            }
        });
    }, { threshold: 0.3 });

    animatedElements.forEach(el => observer.observe(el));

    const heroElements = document.querySelectorAll(".tm-hero-title, .tm-hero-subtitle");

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible-hero");
            } else {
                entry.target.classList.remove("visible-hero");
            }
        });
    }, { threshold: 0.3 });

    heroElements.forEach(el => heroObserver.observe(el));
});


// добавляем новый элемент

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".fade-scroll-left");

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // добавляем класс для анимации слева направо
                entry.target.classList.add("fade-left", "visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));
});


// карусель товаров

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.tm-img-slider');
    if (!slider) return;

    const items = Array.from(slider.querySelectorAll('.tm-img-slider-item'));
    if (items.length <= 1) {
        // если 0 или 1 элемент — делаем единственный активным
        if (items[0]) items[0].classList.add('active');
        return;
    }

    let current = 0;
    const total = items.length;
    const intervalMs = 3500; // время показа слайда (подкорректируй при желании)

    // Установим начальные классы: prev, active, next
    function applyClasses() {
        items.forEach((el, i) => {
            el.classList.remove('prev','active','next');
            if (i === current) el.classList.add('active');
            else if (i === (current - 1 + total) % total) el.classList.add('prev');
            else if (i === (current + 1) % total) el.classList.add('next');
            else {
                // для всех остальных сбрасываем позицию вправо (готовы как "next" после очереди)
                el.style.transform = 'translateX(100%)';
            }
        });
    }

    applyClasses();

    let timer = setInterval(() => {
        goNext();
    }, intervalMs);

    function goNext() {
        // переход на следующий: current++
        const prevIndex = (current - 1 + total) % total;
        const nextIndex = (current + 1) % total;
        // сдвиг: пометим текущ как prev (уйдёт влево), следующий станет active
        items[current].classList.remove('active');
        items[current].classList.add('prev');

        items[nextIndex].classList.remove('next');
        items[nextIndex].classList.add('active');

        // следующий для отображения справа — элемент после nextIndex
        const afterNext = (nextIndex + 1) % total;
        items.forEach((el, idx) => {
            el.classList.remove('prev','next','active');
            if (idx === nextIndex) el.classList.add('active');
            else if (idx === current) el.classList.add('prev');
            else if (idx === afterNext) el.classList.add('next');
            // остальные остаются вправо
        });

        current = nextIndex;
    }

    function goPrev() {
        const prevIndex = (current - 1 + total) % total;
        const beforePrev = (prevIndex - 1 + total) % total;

        items[current].classList.remove('active');
        items[current].classList.add('next');

        items[prevIndex].classList.remove('prev');
        items[prevIndex].classList.add('active');

        items.forEach((el, idx) => {
            el.classList.remove('prev','next','active');
            if (idx === prevIndex) el.classList.add('active');
            else if (idx === current) el.classList.add('next');
            else if (idx === beforePrev) el.classList.add('prev');
        });

        current = prevIndex;
    }

    // Пауза при наведении
    slider.addEventListener('mouseenter', () => {
        clearInterval(timer);
    });
    slider.addEventListener('mouseleave', () => {
        clearInterval(timer);
        timer = setInterval(goNext, intervalMs);
    });

    // (Опционально) поддержка свайпа для мобильных
    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        clearInterval(timer);
    }, {passive:true});
    slider.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
            if (dx < 0) goNext(); // свайп влево — следующий
            else goPrev();         // свайп вправо — предыдущий
        }
        timer = setInterval(goNext, intervalMs);
    }, {passive:true});
});


// Кнопка нав бара
document.addEventListener("DOMContentLoaded", () => {
    const navBtn = document.getElementById("nav-hide-btn");
    const navbar = document.querySelector(".tm-navbar");

    navBtn.addEventListener("click", () => {
        if (navbar.classList.contains("hidden")) {
            // Сначала убираем hidden, добавляем bounce
            navbar.classList.remove("hidden");
            navbar.classList.add("showing");
            setTimeout(() => navbar.classList.remove("showing"), 450);
        } else {
            navbar.classList.add("hidden");
        }
    });
});
