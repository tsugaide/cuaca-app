<template>
  <div class="border-r-2 pr-2 flex flex-col justify-center">
    <img :src="icon" alt="" class="w-10" />
    <h1 class="text-center text-white">{{ suhu }}℃</h1>
    <h1 class="text-center font-semibold text-white text-lg">{{ jam }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    suhu: {
      type: Number,
      required: true,
    },
    jam: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
