const canvas = document.getElementById('cloudCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let clouds = [];
const cloudCount = 20; // 구름의 개수

function createCloud() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2, // 상단에 구름 생성
        size: Math.random() * 50 + 20,
        speed: Math.random() * 2 + 0.5
    };
}

function drawCloud(cloud) {
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // 흰색 구름
    ctx.fill();
}

function updateCloud(cloud) {
    cloud.x += cloud.speed;
    if (cloud.x > canvas.width + cloud.size) {
        cloud.x = -cloud.size; // 화면 밖으로 나가면 다시 등장
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clouds.forEach(cloud => {
        updateCloud(cloud);
        drawCloud(cloud);
    });
    requestAnimationFrame(animate);
}

// 초기화
for (let i = 0; i < cloudCount; i++) {
    clouds.push(createCloud());
}

animate();

// 화면 크기 변경 시 캔버스 크기 조정
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});