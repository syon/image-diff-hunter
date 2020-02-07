<template>
  <div>
    <div>Slider / {{ filename }}</div>
    <div class="frame neumo">
      <div id="slider"></div>
    </div>
  </div>
</template>

<script>
import 'juxtaposejs/build/js/juxtapose'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('shelf', {
      entrySet: (state) => state.entrySet
    }),
    ...mapState('ing', {
      filename: (state) => state.filename
    })
  },
  watch: {
    filename(newValue) {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const entry = this.entrySet[this.filename]
      if (!entry) {
        console.log("Couldn't draw a slider.")
        return
      }
      document.getElementById('slider').innerHTML = null
      // eslint-disable-next-line
      new juxtapose.JXSlider(
        '#slider',
        [
          {
            src: entry['dataURL-L'],
            label: 'Before'
          },
          {
            src: entry['dataURL-R'],
            label: 'After'
          }
        ],
        {
          animate: true,
          showLabels: true,
          showCredits: true,
          startingPosition: '50%',
          makeResponsive: true
        }
      )
    }
  }
}
</script>

<style scoped>
.frame {
  width: 500px;
  height: 500px;
}
</style>
