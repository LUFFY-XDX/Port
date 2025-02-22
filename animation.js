// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Create smooth scrolling
    const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 2,
        effects: true
    });

    // Hero section animations
    gsap.from('header h1', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('header p', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: 'power4.out'
    });

    // Navigation animations
    gsap.from('nav', {
        duration: 1,
        y: -50,
        opacity: 0,
        delay: 1,
        ease: 'power4.out'
    });

    // Bio text animation with smooth reveal
    gsap.from('.bio-text', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.3,
        ease: 'power4.out'
    });

    // Project cards animation with hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 100,
            opacity: 0,
            ease: 'power4.out'
        });

        // Add hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                scale: 1,
                boxShadow: 'none',
                ease: 'power2.in'
            });
        });
    });

    // Skills animation with stagger
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            duration: 0.5,
            y: 30,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power4.out'
        });

        // Add hover effect
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                scale: 1.1,
                backgroundColor: 'var(--primary-color)',
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                scale: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                ease: 'power2.in'
            });
        });
    });

    // Contact section reveal
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power4.out'
    });

    // Form elements animation
    const formElements = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formElements.forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                toggleActions: 'play none none reverse'
            },
            duration: 0.5,
            y: 20,
            opacity: 0,
            ease: 'power4.out'
        });
    });
});
