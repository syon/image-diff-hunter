<template>
  <div>
    <vue-slider v-model="volume" tooltip="none" />
    <div v-if="x" class="xx-holder">
      <img :src="x['dataURL-L']" class="fadeimage xx-L" />
      <img :src="x['dataURL-R']" class="fadeimage xx-R" :style="styleR" />
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
    // styleL() {
    //   return {
    //     opacity: this.volume / 100
    //   }
    // },
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
}
.fadeimage {
  position: absolute;
  width: 500px;
  height: 500px;
}
.xx-L {
  z-index: 0;
}
.xx-R {
  z-index: 1;
}
</style>
