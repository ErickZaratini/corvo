class Corvo {
    constructor() {
        this.x = 100;
        this.y = 200;
        this.velocidade = 2;
        this.amplitude = 50;
        this.frame = 0;
        this.asasParaCima = true;
        this.tamanho = 1;
    }

    atualizar() {
        this.x += this.velocidade;
        
        // Movimento de voo (ondulação)
        this.y = 200 + Math.sin(this.x * 0.05) * this.amplitude;
        
        // Animação das asas
        this.frame++;
        if (this.frame % 10 === 0) {
            this.asasParaCima = !this.asasParaCima;
        }
        
        // Reiniciar quando sair da tela
        if (this.x > 850) {
            this.x = -50;
        }
    }

    desenhar(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Corpo do corvo
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.ellipse(0, 0, 20 * this.tamanho, 10 * this.tamanho, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Cabeça
        ctx.beginPath();
        ctx.arc(15 * this.tamanho, -5 * this.tamanho, 10 * this.tamanho, 0, Math.PI * 2);
        ctx.fill();
        
        // Bico
        ctx.fillStyle = '#FF9800';
        ctx.beginPath();
        ctx.moveTo(25 * this.tamanho, -5 * this.tamanho);
        ctx.lineTo(35 * this.tamanho, -2 * this.tamanho);
        ctx.lineTo(25 * this.tamanho, 0);
        ctx.closePath();
        ctx.fill();
        
        // Olho
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(18 * this.tamanho, -8 * this.tamanho, 3 * this.tamanho, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(18 * this.tamanho, -8 * this.tamanho, 1.5 * this.tamanho, 0, Math.PI * 2);
        ctx.fill();
        
        // Asas
        ctx.fillStyle = '#000';
        if (this.asasParaCima) {
            // Asa para cima
            ctx.beginPath();
            ctx.ellipse(-5 * this.tamanho, -15 * this.tamanho, 15 * this.tamanho, 8 * this.tamanho, -Math.PI/4, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Asa para baixo
            ctx.beginPath();
            ctx.ellipse(-5 * this.tamanho, 5 * this.tamanho, 15 * this.tamanho, 8 * this.tamanho, Math.PI/4, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Cauda
        ctx.beginPath();
        ctx.moveTo(-15 * this.tamanho, 0);
        ctx.lineTo(-25 * this.tamanho, -8 * this.tamanho);
        ctx.lineTo(-25 * this.tamanho, 8 * this.tamanho);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
}

// Configuração da animação
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const corvo = new Corvo();
let paused = false;
let nuvens = [];

// Criar nuvens de fundo
for (let i = 0; i < 5; i++) {
    nuvens.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 100,
        width: 60 + Math.random() * 40,
        speed: 0.2 + Math.random() * 0.3
    });
}

// Função para desenhar nuvens
function desenharNuvens() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    nuvens.forEach(nuvem => {
        ctx.beginPath();
        ctx.arc(nuvem.x, nuvem.y, nuvem.width / 3, 0, Math.PI * 2);
        ctx.arc(nuvem.x + nuvem.width / 3, nuvem.y - nuvem.width / 6, nuvem.width / 4, 0, Math.PI * 2);
        ctx.arc(nuvem.x + nuvem.width / 2, nuvem.y, nuvem.width / 3, 0, Math.PI * 2);
        ctx.arc(nuvem.x + nuvem.width / 1.5, nuvem.y - nuvem.width / 6, nuvem.width / 4, 0, Math.PI * 2);
        ctx.arc(nuvem.x + nuvem.width, nuvem.y, nuvem.width / 3, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    });
}

// Atualizar posição das nuvens
function atualizarNuvens() {
    nuvens.forEach(nuvem => {
        nuvem.x -= nuvem.speed;
        if (nuvem.x < -nuvem.width) {
            nuvem.x = canvas.width + nuvem.width;
            nuvem.y = Math.random() * 100;
        }
    });
}

// Função de animação
function animar() {
    if (!paused) {
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Céu
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Sol
        ctx.fillStyle = '#FFEB3B';
        ctx.beginPath();
        ctx.arc(700, 80, 40, 0, Math.PI * 2);
        ctx.fill();
        
        // Montanhas ao fundo
        ctx.fillStyle = '#689F38';
        ctx.beginPath();
        ctx.moveTo(0, 400);
        ctx.lineTo(0, 300);
        ctx.lineTo(150, 250);
        ctx.lineTo(300, 320);
        ctx.lineTo(450, 270);
        ctx.lineTo(600, 350);
        ctx.lineTo(800, 280);
        ctx.lineTo(800, 400);
        ctx.closePath();
        ctx.fill();
        
        // Nuvens
        desenharNuvens();
        atualizarNuvens();
        
        // Atualizar e desenhar o corvo
        corvo.atualizar();
        corvo.desenhar(ctx);
    }
    
    requestAnimationFrame(animar);
}

// Controles
document.getElementById('pauseBtn').addEventListener('click', () => {
    paused = !paused;
});

document.getElementById('speedUpBtn').addEventListener('click', () => {
    corvo.velocidade += 0.5;
});

document.getElementById('slowDownBtn').addEventListener('click', () => {
    if (corvo.velocidade > 0.5) {
        corvo.velocidade -= 0.5;
    }
});

// Iniciar animação
animar();