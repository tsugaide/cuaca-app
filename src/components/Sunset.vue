<template>
  <div class="relative">
    <img src="/src/assets/sunset.png" alt="" class="w-36" />
    <div class="absolute top-11 left-4 text-white">
      <h1 class="text-xs">Matahari terbenam</h1>
      <h1 class="text-2xl font-semibold tracking-widest">{{ formatTime }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sunset: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formatTime() {
      const date = new Date(this.sunset * 1000);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
  },
};
</script>
