<template>
  <div class="px-1 md:px-4 mb-5">
    <h1 class="ml-4 text-white text-xl font-semibold">Prakiraan cuaca</h1>
    <div class="relative flex items-center justify-around mt-5">
      <img
        src="/src/assets/bgPrakiraan1.png"
        alt=""
        class="absolute -z-40 h-28 brightness-75"
      />
      <div class="flex gap-4">
        <prakiraan1-item
          v-for="(item, index) in hour.slice(date + 1, date + 6)"
          :key="index"
          :jam="`${new Date(item.time_epoch * 1000).getHours()}:00`"
          :suhu="Math.floor(item.temp_c)"
          :icon="item.condition.icon"
        ></prakiraan1-item>
      </div>
    </div>
  </div>
</template>
<script>
import Prakiraan1Item from "/src/components/Prakiraan1Item.vue";

export default {
  data() {
    return {
      date: new Date().getHours(),
    };
  },
  components: {
    Prakiraan1Item,
  },
  props: {
    hour: {
      type: Object,
      required: true,
    },
  },
};
</script>
