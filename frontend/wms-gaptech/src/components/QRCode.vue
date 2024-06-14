<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <QRCodeVue3
      :width="400"
      :height="400"
      :value="invoiceLink"
      :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 10 }"
      :dotsOptions="{
        type: 'dots',
        color: '#6A93C8',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#26249A' },
            { offset: 1, color: '#6A93C8' },
          ],
        },
      }"
      :image="gaptechLogo"
      :backgroundOptions="{ color: '#ffffff' }"
      :cornersSquareOptions="{ type: 'dot', color: '#26249A' }"
      :cornersDotOptions="{ type: undefined, color: '#6A93C8' }"
      fileExt="png"
      :download="false"
      myclass="my-qur"
      imgclass="img-qr"
      downloadButton="my-button"
      :downloadOptions="{ name: 'vqr', extension: 'png' }"
    />
  </div>
</template>

<script>
import gaptechLogo from "@/assets/gaptechlogo.png";
import QRCodeVue3 from "qrcode-vue3";

export default {
  name: "QRCodeVue3Example",
  components: {
    QRCodeVue3,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      gaptechLogo,
      invoiceLink: "",
    };
  },
  created() {
    console.log(this.id);
    const idTransaksi = this.id;
    this.invoiceLink = `https://wms-gaptech.vercel.app/invoice/${idTransaksi}`;
  },
};
</script>
