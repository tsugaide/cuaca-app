<template>
  <div class="ml-8 mt-12">
    <h1 class="font-bold text-4xl text-white">{{ data.name }}</h1>
    <h1 class="text-white font-light">{{ formattedDate }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return this.data.dt.toLocaleDateString("id-ID", options);
    },
  },
};
</script>
