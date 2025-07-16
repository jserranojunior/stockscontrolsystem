<template>
  <div
    class="relative w-full h-screen overflow-hidden bg-gradient-to-br from-base-100 to-base-200"
  >
    <!-- Círculos animados -->
    <ul class="circles absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
      <li class="bg-primary/80"></li>
      <li class="bg-secondary/70"></li>
      <li class="bg-accent/70"></li>
      <li class="bg-yellow-400/70"></li>
      <li class="bg-green-400/80"></li>
      <li class="bg-purple-500/70"></li>
      <li class="bg-pink-500/70"></li>
      <li class="bg-indigo-600/70"></li>
      <li class="bg-red-500/80"></li>
      <li class="bg-cyan-400/70"></li>
    </ul>

    <!-- Conteúdo central -->
    <div class="relative z-10">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.circles li {
  position: absolute;
  display: block;
  list-style: none;
  border-radius: 9999px;
  bottom: -150px;
  animation: animate 5s linear infinite; /* levemente mais rápido */
}

/* Todos os círculos agora iniciam sem delay */
.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
}
.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-duration: 12s;
}
.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
}
.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-duration: 18s;
}
.circles li:nth-child(5) {
  left: 65%;
  width: 40px;
  height: 40px;
}
.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
}
.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
}
.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-duration: 45s;
}
.circles li:nth-child(9) {
  left: 20%;
  width: 35px;
  height: 35px;
  animation-duration: 35s;
}
.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
