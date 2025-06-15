document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    const isExpanded = navLinks.classList.toggle('active');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', isExpanded);
});