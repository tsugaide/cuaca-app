<template>
  <div
    class="w-80 h-32 bg-[#55BD5B] rounded-lg flex justify-between px-2 pt-3 flex-shrink-0"
  >
    <div>
      <h1 class="text-xl font-bold tracking-wide">{{ dayNames[day] }}</h1>
      <h1 class="text-xs -mt-1">{{ date }}, {{ monthNames[month] }}</h1>
    </div>
    <div>
      <img :src="require(`@/assets/${icon}`)" alt="" class="w-32" />
      <h1 class="text-white text-center text-xl mt-1">{{ cuaca }}</h1>
    </div>
    <div>
      <h1 class="text-4xl text-white font-semibold">{{ suhu }}℃</h1>
      <h1 class="text-xs text-center text-[#2E616A]">
        {{ suhuMin }}℃ - {{ suhuMax }}℃
      </h1>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dayNames: {
        0: "Minggu",
        1: "Senin",
        2: "Selasa",
        3: "Rabu",
        4: "Kamis",
        5: "Jumat",
        6: "Sabtu",
      },
      monthNames: {
        0: "Januari",
        1: "Februari",
        2: "Maret",
        3: "April",
        4: "Mei",
        5: "Juni",
        6: "Juli",
        7: "Agustus",
        8: "September",
        9: "Oktober",
        10: "November",
        11: "Desember",
      },
    };
  },
  props: {
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    date: {
      type: Number,
    },
    weather: {
      type: String,
    },
    suhu: {
      type: Number,
    },
    suhuMin: {
      type: Number,
    },
    suhuMax: {
      type: Number,
    },
    icon: {
      type: String,
    },
    cuaca: {
      type: String,
    },
  },
};
</script>
