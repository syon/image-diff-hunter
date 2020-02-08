<template>
  <div>
    <div class="my-4 mx-auto" style="width:500px;">
      <vue-slider v-model="volume" tooltip="none" />
    </div>
    <div class="xx-holder">
      <div v-if="x" class="xx-holder flex justify-center">
        <img :src="x['dataURL-L']" class="fadeimage xx-L" />
        <img :src="x['dataURL-R']" class="fadeimage xx-R" :style="styleR" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    VueSlider
  },
  data() {
    return {
      volume: 50
    }
  },
  computed: {
    ...mapState('shelf', {
      entrySet: (state) => state.entrySet
    }),
    ...mapState('ing', {
      filename: (state) => state.filename
    }),
    x() {
      return this.entrySet[this.filename]
    },
    styleR() {
      return {
        opacity: this.volume / 100
      }
    }
  }
}
</script>

<style scoped>
.xx-holder {
  position: relative;
  height: 500px;
}
.fadeimage {
  position: absolute;
  width: 500px;
}
.xx-L {
  z-index: 0;
}
.xx-R {
  z-index: 1;
}
</style>
