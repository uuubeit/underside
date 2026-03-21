const video = document.getElementById('v');
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

video.play();

function draw() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(draw);
}
draw();