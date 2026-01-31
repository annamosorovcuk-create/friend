document.addEventListener('DOMContentLoaded', function() {
    //ПЕРВАЯ АНИМАЦИЯ
    const rotatingImage = document.querySelector('.img-2');

    rotatingImage.addEventListener('click', function() {
        
        animateImage();
    });

      
    function animateImage() {
       
            rotatingImage.style.animation = 'none';
        
            setTimeout(() => {
                rotatingImage.style.animation = 'rotateAndScale 1s ease-in-out';
            }, 10);
            rotatingImage.addEventListener('animationend', function() {
                rotatingImage.style.animation = 'none';
            }, { once: true });
    }

    //ВТОРАЯ АНИМАЦИЯ
    const photos = document.querySelectorAll('.photo');
    const containers = document.querySelectorAll('.photo-container');
    const positions = [
        {top: 100, right: -130},    
        {top: 220, right: 10},   
        {top: 80, right: 150},    
        {top: -10, right: 10}    
    ];

    let animating = false;
    let interval;

    function chaos(event) {
    
      if (event.target.closest('.img-2') || event.target.closest('.img-3')) {
            console.log('Клик внутри .img-2 или .img-3 - chaos не запускается');
            return;
    }
    
    if (animating) {
        animating = false;
        clearInterval(interval);
        photos.forEach(p => p.style.transform = '');
        containers.forEach(c => c.style.transition = 'all 0.3s ease');
        containers.forEach((c,i) => {
            c.style.top = positions[i].top + 'px';
            c.style.right = positions[i].right + 'px'; 
        });
        return;
    }

    animating = true;
    interval = setInterval(() => {
        photos.forEach(p => {
            p.style.transform = `translate(${Math.random()*20-10}px,${Math.random()*20-10}px) rotate(${Math.random()*40-20}deg) scale(${0.6+Math.random()*0.8})`;
        });
    
        if (Math.random() < 0.4) {
            const order = [0,1,2,3].sort(() => Math.random()-0.5);
            containers.forEach((c,i) => {
                const pos = positions[order[i]];
                c.style.transition = 'all 0.2s linear';
                c.style.top = pos.top + 'px';
                c.style.right = pos.right + 'px';
                setTimeout(() => c.style.transition = '', 200);
            });
        }
    }, 150);
    }
    photos.forEach(p => p.addEventListener('click', chaos));

    // ТРЕТЬЯ АНИМАЦИЯ
    const swingingImage = document.querySelector('.img-3');
    let isSwinging = false;

    if (swingingImage) {
        swingingImage.addEventListener('click', function(event) {
            event.stopPropagation();
            swingImage();
        });
    }

    function swingImage() {
        if (!swingingImage) return;
    
    
        if (isSwinging) {
            swingingImage.style.animation = 'none';
            isSwinging = false;
            return;
        }
    
    
    swingingImage.style.animation = 'none';
    void swingingImage.offsetWidth;
    
   
    swingingImage.style.animation = 'swingLong 2s ease-in-out infinite';
    isSwinging = true;
    }

})