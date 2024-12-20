<template>
  <div class="w-full h-36 bg-[#55BD5B] rounded-xl md:w-[22rem]">
    <h1 class="text-center text-[#2f636d] text-lg">Kualitas udara</h1>
    <div class="flex justify-around items-start mx-2 mt-1 gap-1">
      <div class="w-1/2 flex flex-col justify-center">
        <div class="flex items-center">
          <img src="/src/assets/leaf.svg" alt="" />
          <h1
            class="font-semibold text-xl leading-5"
            :style="{ color: aqiData[aqi].color }"
          >
            {{ aqiData[aqi].kategori }}
          </h1>
        </div>
        <h1 class="text-center leading-4 text-[#2f636d] text-sm mt-1">
          {{ aqiData[aqi].description }}
        </h1>
      </div>
      <div class="w-1/2 h-24 bg-[#81C784] rounded-lg">
        <div class="ml-2">
          <h1 class="text-white">Saran:</h1>
          <ul class="">
            <li
              class="leading-3 text-white text-xs mb-2 md:mb-4"
              v-for="item in aqiData[aqi].advice"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    aqi: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      aqiData: {
        1: {
          color: "#ffffff",
          kategori: "Baik",
          description: "Udara bersih, tidak ada risiko",
          advice: [
            "Nikmati aktivitas luar ruangan tanpa batasan",
            "Tidak perlu tindakan pencegahan khusus",
          ],
        },
        2: {
          color: "#FFDD57",
          kategori: "Sedang",
          description: "Udara cukup baik, risiko ringan bagi yang sensitif",
          advice: [
            "Aman untuk sebagian besar orang, namun mereka yang sensitif disarankan mengurangi aktivitas berat di luar ruangan.",
          ],
        },
        3: {
          color: "#FF7E00",
          kategori: "Kurang sehat",
          description: "Risiko meningkat bagi kelompok sensitif",
          advice: [
            "Kelompok sensitif sebaiknya membatasi aktivitas luar ruangan",
            "Hindari area dengan polusi tinggi seperti jalan raya",
          ],
        },
        4: {
          color: "#FF0000",
          kategori: "Tidak sehat",
          description: "Udara berbahaya untuk semua orang",
          advice: [
            "Hindari aktivitas luar ruangan sejauh mungkin",
            "Gunakan masker dengan filter jika harus keluar",
          ],
        },
        5: {
          color: "#8F3F97",
          kategori: "Sangat tidak sehat",
          description: "Udara sangat berbahaya",
          advice: [
            "Semua orang disarankan untuk tinggal di dalam ruangan",
            "Gunakan air purifier jika tersedia",
          ],
        },
      },
    };
  },
};
</script>
