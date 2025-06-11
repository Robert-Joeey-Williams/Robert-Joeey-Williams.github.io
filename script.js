// Typing animation data
const dataText = [
  "Freelancer.",
  "Web Developer.",
  "UI Designer.",
  "Software Developer.",
  "Student.",
  "Problem Solver."
];

// Typing animation
function initTypingAnimation() {
  const element = document.getElementById("typing");
  if (!element) return;

  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBetweenWords = 1000;
  let i = 0, j = 0, isDeleting = false;

  function type() {
    const current = dataText[i];
    element.innerHTML = isDeleting
      ? current.substring(0, j--) + '<span aria-hidden="true"></span>'
      : current.substring(0, j++) + '<span aria-hidden="true"></span>';

    let timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && j === current.length + 1) {
      isDeleting = true;
      timeout = delayBetweenWords;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % dataText.length;
    }

    setTimeout(type, timeout);
  }

  type();
}

// Sidebar toggle logic
function initSidebarToggle() {
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('sidebarToggle');
  const pageContent = document.getElementById('page-content');

  if (!sidebar || !toggleButton || !pageContent) return;

  toggleButton.addEventListener('click', () => {
    const isClosed = sidebar.classList.contains('-translate-x-full');

    sidebar.classList.toggle('-translate-x-full');
    if (isClosed) {
      toggleButton.classList.add('off-screen');
      pageContent.classList.add('section-shifted');
    } else {
      toggleButton.classList.remove('off-screen');
      pageContent.classList.remove('section-shifted');
    }
  });
}

// Navigation link behavior
function initNavLinkClicks() {
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('sidebarToggle');
  const pageContent = document.getElementById('page-content');
  const links = document.querySelectorAll('#sidebar .navbar a');

  if (!sidebar || !toggleButton || !pageContent || !links.length) return;

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // Highlight the active link
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      // Close sidebar
      sidebar.classList.add('-translate-x-full');
      toggleButton.classList.remove('off-screen');
      pageContent.classList.remove('section-shifted');

      // Wait for layout changes to finish before scrolling
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300); // Match your sidebar's transition duration (usually 300ms)
    });
  });
}





function initScrollObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#sidebar .navbar a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');

      // Fade toggle
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Update URL and nav
        history.replaceState(null, null, `#${id}`);
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      } else {
        entry.target.classList.remove('visible'); // 👈 this is the fix
      }
    });
  }, {
    threshold: 0.4,
  });

  sections.forEach(section => observer.observe(section));
}





// Initialize everything
function initializeSite() {
  initTypingAnimation();
  initSidebarToggle();
  initNavLinkClicks();
  initScrollObserver();
}

// Start after DOM is ready
document.addEventListener('DOMContentLoaded', initializeSite);
