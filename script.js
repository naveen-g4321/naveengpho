// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('colorCard');
    const btn = document.getElementById('colorBtn');
    
    // Array of beautiful gradient colors
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];
    
    let colorIndex = 0;
    let clickCount = 0;
    
    // Add click event listener to the button
    btn.addEventListener('click', function() {
        // Change background color
        colorIndex = (colorIndex + 1) % colors.length;
        document.body.style.background = colors[colorIndex];
        
        // Update click count and button text
        clickCount++;
        btn.textContent = `Changed ${clickCount} time${clickCount !== 1 ? 's' : ''}`;
        
        // Add a subtle animation to the card
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
        
        // Add a particle effect (simple version)
        createParticle();
    });
    
    // Function to create a simple particle effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = '#fff';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        // Position particle near the button
        const rect = btn.getBoundingClientRect();
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(particle);
        
        // Animate the particle
        let opacity = 1;
        let scale = 1;
        const animate = () => {
            opacity -= 0.02;
            scale += 0.1;
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
            particle.style.left = parseFloat(particle.style.left) + Math.random() * 4 - 2 + 'px';
            particle.style.top = parseFloat(particle.style.top) - 2 + 'px';
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        animate();
    }
    
    // Add some interactive hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            btn.click();
        }
    });
    
    // Add touch support for mobile devices
    let touchStartY = 0;
    card.addEventListener('touchstart', function(event) {
        touchStartY = event.touches[0].clientY;
    });
    
    card.addEventListener('touchend', function(event) {
        const touchEndY = event.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) {
            btn.click();
        }
    });
    
    // Initialize with a welcome message
    console.log('🎉 Interactive Card loaded successfully!');
    console.log('💡 Try clicking the button or pressing Space/Enter');
}); 