<template>
  <div class="flex justify-center mt-4">
    <input
      class="rounded-xl pl-4 outline-none bg-[#21e07754]"
      type="text"
      v-model="kota"
      placeholder="Nama Desa/Kec/Kota"
    />
    <button @click="submit" class="ml-2">
      <img src="/src/assets/magnifying-glass.svg" alt="" class="w-7" />
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kota: "",
    };
  },
  methods: {
    submit() {
      if (this.kota) {
        this.$emit("kota-selected", this.kota);
        this.kota = "";
      }
    },
  },
};
</script>
