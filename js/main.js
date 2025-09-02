
// ==============================
//  스크롤 진행률 표시
// ==============================
window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
});

// ==============================
//  부드러운 스크롤 (네비게이션)
// ==============================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==============================
//  스크롤 애니메이션
// ==============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==============================
//  활성 네비게이션 표시
// ==============================
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ==============================
//  클립보드 복사 (Contact 이메일)
// ==============================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            showToast(`이메일이 복사되었습니다: ${text}`);
        })
        .catch(err => {
            console.error('복사 실패', err);
        });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('opacity-0'); // 보여주기
    toast.classList.add('opacity-100');

    setTimeout(() => {
        toast.classList.remove('opacity-100'); // 사라지기
        toast.classList.add('opacity-0');
    }, 2000); // 2초 후
}

// 사용 예시: 
// <span onclick="copyToClipboard('aaa@aaa.com')">aaa@aaa.com</span>

