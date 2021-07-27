window.addEventListener('load', e => {

    /** @type {HTMLCanvasElement} */

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numOfParticles = 50;
    let particlesArray = [];

    const EMOJIS = new Image();
    EMOJIS.src = 'images/emojis_sprite.png';


    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 50 + 50;
            this.speed = Math.random() * 3 + 1;
            this.angle = Math.random() * 360;
            this.direction = Math.random() < 0.5 ? -1 : 1;
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = Math.floor(Math.random() * 3);
            this.spriteSize = 512 / 4;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 360 * this.direction);
            ctx.drawImage(EMOJIS, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, 0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
            ctx.restore();
        }

        update() {
            this.angle += 5;

            if (this.y - this.size / 2 > canvas.height) {
                this.x = Math.random() * canvas.width;
                this.size = Math.random() * 50 + 50;
                this.speed = Math.random() * 3 + 1;
                this.frameX = Math.floor(Math.random() * 3);
                this.frameY = Math.floor(Math.random() * 3);
                this.y = -this.size;
            }

            this.y += this.speed;
        }
    }


    function init() {
        particlesArray = [];
        for (let i = 0; i < numOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    init();



    function connectByLines() {

        for (let i = 0; i < particlesArray.length; i++) {

            for (let j = i; j < particlesArray.length; j++) {

                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                let opacityValue = 1 - (distance / 200);

                if (distance < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(255,155,0,' + opacityValue + ')';
                    ctx.lineWidth = 2;
                    ctx.globalCompositeOperation = "destination-over"; // draw lines behind emojis
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].draw();
            particlesArray[i].update();
        }
        connectByLines();
        requestAnimationFrame(animate);
    }
    animate();


    window.addEventListener('resize', e => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });




});

