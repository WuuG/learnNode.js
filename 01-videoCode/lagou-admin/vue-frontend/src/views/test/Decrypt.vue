<template>
  <div class="url">{{ uusk }}</div>
</template>

<script>
import "../src/common/crypto-js.min.js";
export default {
  data() {
    return {
      uusk: "U2FsdGVkX1/+l5OMJK5hQ01ru2HYoU5maEOi5cosI3akfdnFnS5ahNdupeo6OOr42qHllv4kdoCOojohsWK6u6fzBzgCsh94fV7jEfpWwAVma38pYe/xousaLbFeZSQJvfjSbrJxq9rFczt5S0hvkBEP8yB2VPyi0CCYLaYOyDkBE/C20js8YbjW5dzB8xgN",
      url: null,
    };
  },
  created() {
    this.decrypt();
  },
  methods: {
    decrypt() {
      const bytes = CryptoJS.AES.decrypt(this.uusk, "roomid609");
      const temp = bytes.toString(CryptoJS.enc.Utf8);
      this.url = temp.split(/url=/)[1];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>