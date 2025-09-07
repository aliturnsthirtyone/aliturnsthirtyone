// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add sparkle effects on photo hover
    const photos = document.querySelectorAll('.photo-container');
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });

    // Create sparkle effect
    function createSparkles(element) {
        const sparkles = ['✨', '💖', '💕', '⭐', '🌟'];
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
                sparkle.style.position = 'absolute';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.fontSize = '20px';
                sparkle.style.zIndex = '1000';
                sparkle.style.left = Math.random() * element.offsetWidth + 'px';
                sparkle.style.top = Math.random() * element.offsetHeight + 'px';
                sparkle.style.animation = 'sparkle 1s ease-out forwards';
                
                element.style.position = 'relative';
                element.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1000);
            }, i * 100);
        }
    }

    // Add click effects to photos
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Create heart explosion
            createHeartExplosion(this);
        });
    });

    // Heart explosion effect
    function createHeartExplosion(element) {
        const hearts = ['💖', '💕', '💗', '💝', '❤️'];
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = '25px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1001';
            heart.style.transition = 'all 1.5s ease-out';
            
            document.body.appendChild(heart);
            
            // Animate hearts outward
            setTimeout(() => {
                const angle = (i / 8) * 2 * Math.PI;
                const distance = 100 + Math.random() * 50;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                heart.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                heart.style.opacity = '0';
            }, 50);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1600);
        }
    }

    // Smooth scrolling for better experience
    document.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const delta = e.deltaY;
        const scrollAmount = delta * 0.8;
        
        window.scrollBy({
            top: scrollAmount,
            behavior: 'auto'
        });
    }, { passive: false });

    // Add floating message interaction
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        message.addEventListener('animationiteration', function() {
            // Add slight color variation on each iteration
            const colors = [
                'rgba(255, 182, 193, 0.2)',
                'rgba(255, 160, 122, 0.2)',
                'rgba(221, 160, 221, 0.2)',
                'rgba(173, 216, 230, 0.2)',
                'rgba(255, 218, 185, 0.2)'
            ];
            this.style.color = colors[Math.floor(Math.random() * colors.length)];
        });
    });

    // Add typing effect to the final message
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Trigger typing effect when final section is visible
    const finalSection = document.querySelector('.final-message-section');
    const finalObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const paragraphs = entry.target.querySelectorAll('.birthday-message p');
                paragraphs.forEach((p, index) => {
                    const originalText = p.textContent;
                    setTimeout(() => {
                        typeWriter(p, originalText, 30);
                    }, index * 2000);
                });
            }
        });
    }, { threshold: 0.3 });

    finalObserver.observe(finalSection);

    // Add random floating elements
    function createRandomFloatingElement() {
        const elements = ['💖', '💕', '✨', '🎈', '🌟', '💗'];
        const element = document.createElement('div');
        element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        element.style.position = 'fixed';
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = window.innerHeight + 'px';
        element.style.fontSize = (15 + Math.random() * 10) + 'px';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '5';
        element.style.transition = 'all 8s linear';
        element.style.opacity = '0.7';
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            element.style.top = '-50px';
            element.style.left = (Math.random() * window.innerWidth) + 'px';
            element.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 8000);
    }

    // Create random floating elements periodically
    setInterval(createRandomFloatingElement, 3000);

    // Add birthday song easter egg (click on title)
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.addEventListener('click', function() {
            // Create a fun celebration effect
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createRandomFloatingElement();
                }, i * 100);
            }
            
            // Change title temporarily
            const originalText = this.textContent;
            this.textContent = '🎉 SURPRISE! 🎉';
            this.style.animation = 'none';
            this.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.animation = 'pulse 2s infinite';
                this.style.transform = 'scale(1)';
            }, 2000);
        });
    }

    // Add parallax effect to background messages
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const messages = document.querySelectorAll('.message');
        
        messages.forEach((message, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            message.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Initialize first section as visible
    setTimeout(() => {
        const firstSection = document.querySelector('.section');
        if (firstSection) {
            firstSection.classList.add('visible');
        }
    }, 500);

    // Add love pulse effect to hearts
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        heart.addEventListener('animationiteration', function() {
            if (Math.random() > 0.7) {
                this.style.transform += ' scale(1.5)';
                setTimeout(() => {
                    this.style.transform = this.style.transform.replace(' scale(1.5)', '');
                }, 200);
            }
        });
    });

    console.log('💖 Happy Birthday Website Loaded! 💖');
});
