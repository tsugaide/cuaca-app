<template>
  <div class="w-40 h-20 bg-[#55BD5B] rounded-lg p-1">
    <h1 class="text-center text-[#2f636d]">{{ title }}</h1>
    <div class="flex gap-3 items-center mt-1 ml-3">
      <img :src="`image/${image}`" alt="" class="w-9" />
      <h1 class="text-white text-xl font-semibold leading-5">{{ desc }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
  },
};
</script>
