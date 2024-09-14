document.addEventListener("DOMContentLoaded", function() {
    //header appear
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    //animation
    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                switch (entry.target.id) {
                    case 'sectionA':
                        entry.target.classList.add('in-view-2');
                        break;
                    case 'sectionC':
                        entry.target.querySelectorAll('.row').forEach(row => {
                            setTimeout(() => {
                                row.classList.add('in-view-4');
                            }, delay);
                            delay += 300;
                        });
                        break;
                    case 'sectionE':
                        entry.target.classList.add('in-view-3');
                        break;
                    default:
                        entry.target.classList.add('in-view-1');
                        break;
                }
            } else {
                entry.target.classList.remove('in-view-1', 'in-view-2', 'in-view-3');
                entry.target.querySelectorAll('.row').forEach(row => {
                    row.classList.remove('in-view-4');
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    //navigation bar highlight
    const navLinks = document.querySelectorAll('.navbar a');

    function highlightNav() {
        let index = -1;
        const fromTop = window.scrollY;

        navLinks.forEach((link, i) => {
            const section = document.querySelector(link.hash);

            if (section.offsetTop <= fromTop + 50 &&
                section.offsetTop + section.offsetHeight > fromTop + 50) {
                index = i;
            }
        });

        navLinks.forEach((link, i) => {
            if (i === index) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();
});

//Jump to top after refreshing
window.onload = function() {
    if (sessionStorage.getItem("reload")) {
        setTimeout(() => window.scrollTo(0, 0), 0);
        sessionStorage.removeItem("reload");
    }
}

window.onbeforeunload = function() {
    sessionStorage.setItem("reload", "true");
}