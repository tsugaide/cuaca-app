<template>
  <div
    class="w-[176px] h-[207px] bg-[#55BD5B] relative mt-10 ml-8 rounded-xl pt-6"
  >
    <div class="absolute bg-[#FFC107] top-1 left-3 px-3 rounded-xl">
      <h1 class="text-sm">Today</h1>
    </div>
    <img :src="`/src/assets/${wheaterData.icon}`" alt="" class="px-2" />
    <h1 class="text-5xl text-white font-bold text-center mt-1">
      {{ wheaterData.suhu }}℃
    </h1>
    <h1 class="text-sm font-semibold text-center text-[#2E616A]">
      {{ wheaterData.suhuMin }}℃ - {{ wheaterData.suhuMax }}℃
    </h1>
    <div class="w-36 p-1 bg-[#55BD5B] rounded-r-xl absolute left-44 top-2">
      <h1 class="text-center text-white font-semibold text-lg leading-5">
        {{ wheaterData.cuaca }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wheaterData: {
      type: Object,
      required: true,
    },
  },
};
</script>
