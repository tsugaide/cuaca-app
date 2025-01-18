<template>
  <div class="flex justify-center">
    <img
      src="./assets/bg.png"
      alt=""
      width="100%"
      class="-z-40 fixed h-screen"
    />
  </div>
  <city-search @kota-selected="input"></city-search>
  <h1 v-if="notFound" class="text-center text-red-600 mt-3 mr-7">
    Wilayah Tidak di temukan
  </h1>
  <city-card
    :data="{
      dt: new Date(),
      name: loading
        ? 'Mencari wilayah'
        : dataLokasi.length > 1
        ? `${dataLokasi[0]}, ${dataLokasi[1]}`
        : `${dataLokasi[0]}`,
    }"
  ></city-card>
  <div class="md:flex md:gap-40">
    <div>
      <main-card
        v-if="data.current"
        :wheater-data="{
          suhu: Math.floor(data.current.temp_c || 0),
          cuaca: currentIcon.main,
          icon: currentIcon.icon,
          suhuMin: Math.floor(data.forecast?.forecastday[0]?.day?.mintemp_c),
          suhuMax: Math.floor(data.forecast?.forecastday[0]?.day?.maxtemp_c),
        }"
      ></main-card>
    </div>
    <div class="mt-5 mx-6">
      <h1 class="ml-10 text-white font-semibold text-lg">Rincian Cuaca</h1>
      <div class="flex flex-wrap justify-around gap-2 mt-3">
        <des-card
          title="Terasa sepeti"
          :desc="`${Math.floor(data.current?.feelslike_c)}℃`"
          image="thermometer.svg"
        ></des-card>
        <des-card
          title="Kecepatan angin"
          :desc="`${Math.floor(data.current?.wind_kph)}km/j`"
          image="waves.svg"
        ></des-card>
        <des-card
          title="Arah angin"
          :desc="windDirectionTranslation[data.current?.wind_dir]"
          image="waves.svg"
        ></des-card>
        <des-card
          title="UV"
          :desc="`${data.current?.uv}`"
          image="sun.svg"
        ></des-card>
        <des-card
          title="Curah hujan"
          :desc="`${Math.floor(data.current?.precip_mm)}mm`"
          image="cloud-rain.svg"
        ></des-card>
        <des-card
          title="Kelembapan"
          :desc="`${data.current?.humidity}%`"
          image="drop.svg"
        ></des-card>
        <des-card
          title="Jarak pandang"
          :desc="`${data.current?.vis_km}km`"
          image="binoculars.svg"
        ></des-card>
        <des-card
          title="Tekanan udara"
          :desc="`${data.current?.pressure_mb}hPa`"
          image="bx-vertical-bottom.svg"
        ></des-card>
        <air-polution
          v-if="dataAir.list && dataAir.list.length > 0"
          :aqi="dataAir.list[0].main.aqi"
        ></air-polution>
      </div>
    </div>
  </div>
  <div class="md:flex md:items-center md:gap-8 md:px-4 md:-mt-8">
    <div class="md:w-[27rem]">
      <prakiraan1
        v-if="data.forecast"
        :hour="data.forecast.forecastday[0]?.hour"
      ></prakiraan1>
    </div>
    <div class="flex justify-center gap-12 mt-12 md:mt-6">
      <sunrise v-if="dataOpen.sys" :sunrise="dataOpen.sys.sunrise"></sunrise>
      <sunset v-if="dataOpen.sys" :sunset="dataOpen.sys.sunset"></sunset>
    </div>
  </div>
  <div class="mt-8 mb-5 md:mt-2">
    <h1 class="text-white text-lg font-semibold ml-5">Prairaan cuaca harian</h1>
    <div class="mt-3 flex gap-3 px-5 overflow-x-scroll w-full">
      <prakiraan2
        v-for="(item, index) in Array.isArray(dataPrakiraan)
          ? dataPrakiraan.slice(1)
          : []"
        :key="index"
        :day="new Date(item.date_epoch * 1000).getDay()"
        :date="new Date(item.date_epoch * 1000).getDate()"
        :month="new Date(item.date_epoch * 1000).getMonth()"
        :suhu="Math.floor(item.day.avgtemp_c)"
        :suhuMin="Math.floor(item.day.mintemp_c)"
        :suhuMax="Math.floor(item.day.maxtemp_c)"
        :cuaca="
          this.dataIcon.find((i) => i.code == item.day.condition.code)?.main
        "
        :icon="
          this.dataIcon.find((i) => i.code == item.day.condition.code)?.icon
        "
      ></prakiraan2>
    </div>
  </div>
</template>

<script>
import MainCard from "./components/MainCard.vue";
import DesCard from "./components/DescCard.vue";
import CityCard from "./components/CityCard.vue";
import CitySearch from "./components/CitySearch.vue";
import Prakiraan1 from "./components/Prakiraan1.vue";
import AirPolution from "./components/AirPolution.vue";
import Sunrise from "./components/Sunrise.vue";
import Sunset from "./components/Sunset.vue";
import Prakiraan2 from "./components/Prakiraan2.vue";

export default {
  data() {
    return {
      data: {},
      dataAir: {},
      dataOpen: {},
      dataPrakiraan: [],
      dataIcon: [],
      dataLokasi: [],
      notFound: false,
      lat: "",
      lon: "",
      cityName: "salam",
      loading: false,
      load: true,
      windDirectionTranslation: {
        N: "Utara",
        NNE: "Utara",
        NE: "Timur Laut",
        ENE: "Timur Laut",
        E: "Timur",
        ESE: "Timur",
        SE: "Tenggara",
        SSE: "Tenggara",
        S: "Selatan",
        SSW: "Barat Daya",
        SW: "Barat Daya",
        WSW: "Barat",
        W: "Barat",
        WNW: "Barat Laut",
        NW: "Barat Laut",
        NNW: "Barat Laut",
      },
    };
  },
  components: {
    MainCard,
    DesCard,
    CityCard,
    CitySearch,
    Prakiraan1,
    AirPolution,
    Sunrise,
    Sunset,
    Prakiraan2,
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;

      try {
        const lokasi = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${this.cityName}&format=json&addressdetails=1&accept-language=id&limit=1`
        );

        const lokData = await lokasi.json();
        if (lokData.length === 0) {
          this.notFound = true;
          this.loading = false;
          return;
        } else {
          this.dataLokasi = lokData[0].display_name.split(",");
          this.lat = lokData[0].lat;
          this.lon = lokData[0].lon;
          this.notFound = false;
        }

        const loc = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=95d811178e330556c3f8e6ace2fdd634`
        );

        const locData = await loc.json();
        this.dataOpen = locData;

        const wResponse = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=cacf3b4fe068425bb83104814240112&q=${this.lat},${this.lon}`
        );

        const weatherData = await wResponse.json();
        this.data = weatherData;

        const airPollutionResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${this.lat}&lon=${this.lon}&appid=95d811178e330556c3f8e6ace2fdd634`
        );
        const airPollutionData = await airPollutionResponse.json();
        this.dataAir = airPollutionData;

        const forecast = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=cacf3b4fe068425bb83104814240112&q=${this.lat},${this.lon}&days=8`
        );
        const forecastData = await forecast.json();
        this.dataPrakiraan = forecastData.forecast.forecastday;

        const iconResponse = await fetch("./data/weather_conditions.json");
        const iconData = await iconResponse.json();

        this.dataIcon = iconData;
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.loading = false;
      }
    },
    input(data) {
      this.cityName = data;
      this.fetchData();
    },
  },
  computed: {
    currentIcon() {
      const dataIc = this.dataIcon.find(
        (icon) => icon.code === this.data.current?.condition?.code
      );
      return dataIc;
    },
  },
};
</script>
