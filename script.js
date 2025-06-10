document.addEventListener('DOMContentLoaded', function () {
    const dataText = ["Freelancer.", "Web Developer.", "UI Designer.",
     "Software Developer.", "Student.", "Problem Solver."];  
    const element = document.getElementById("typing");
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const delayBetweenWords = 1000;

    let i = 0; // index in dataText
    let j = 0; // current letter index
    let isDeleting = false;

    function type() {
    const current = dataText[i];

    if (isDeleting) {
        element.innerHTML = current.substring(0, j--) + '<span aria-hidden="true"></span>';
    } else {
        element.innerHTML = current.substring(0, j++) + '<span aria-hidden="true"></span>';
    }

    let timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && j === current.length + 1) {
        // done typing, wait then start deleting
        isDeleting = true;
        timeout = delayBetweenWords;
    } else if (isDeleting && j === 0) {
        // done deleting, move to next word
        isDeleting = false;
        i = (i + 1) % dataText.length;
        timeout = typingSpeed;
    }

    setTimeout(type, timeout);
    }

    type();
});
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebarToggle');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');

    toggleButton.classList.toggle('-translate-x-full');
    
    document.body.classList.toggle('sidebar-open');

   // if (sidebar.classList.contains('-translate-x-full')) {
   //     toggleButton.classList.add('-translate-x-64');
   // } else {
   //     toggleButton.classList.remove('-translate-x-64');
    //}
});
document.querySelectorAll('#sidebar .navbar a').forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('#sidebar .navbar a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        sidebar.classList.toggle('-translate-x-full');
        toggleButton.classList.toggle('-translate-x-full');
        document.body.classList.remove('sidebar-open');
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a');

  // Smooth scrolling with URL update
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1); // remove '#'
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });

        // Update URL hash without jumping
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });

  // Intersection Observer for fade in/out, nav highlight, and URL update
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.navbar a[href="#${id}"]`);

      if (entry.isIntersecting) {
        // Fade in
        entry.target.classList.add('visible');

        // Highlight nav
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');

        // Update URL hash (without scroll)
        history.replaceState(null, null, `#${id}`);
      } else {
        // Fade out
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.4
  });

  sections.forEach(section => observer.observe(section));
});


