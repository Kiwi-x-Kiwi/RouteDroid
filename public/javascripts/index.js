// document.addEventListener('DOMContentLoaded', () => {
//   const canvas = document.getElementById("canvas");
//   canvas.width = 600;
//   canvas.height = 500;

//   const ctx = canvas.getContext("2d");
//   const roadImage = new Image();
//   roadImage.src = "/images/Miami.PNG"

//   var backgroundImage = {
//     img: roadImage,
//     x: 0,
//     speed: -1,

//     move: function () {
//       this.x += this.speed;
//       this.x %= canvas.width;
//     },

//     draw: function () {
//       ctx.drawImage(this.img, this.x, 0);
//       if (this.speed < 0) {
//         ctx.drawImage(this.img, this.x + canvas.width, 0);
//       } else {
//         ctx.drawImage(this.img, this.x - this.img.width, 0);
//       }
//     },
//   };

//   function updateCanvas() {
//     backgroundImage.move();

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     backgroundImage.draw();

//     requestAnimationFrame(updateCanvas);
//   }

//   // start calling updateCanvas once the image is loaded
//   roadImage.onload = updateCanvas;

// })

