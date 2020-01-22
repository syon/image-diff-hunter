<template>
  <div>
    <div>Slider / {{ name }}</div>
    <div class="frame">
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
    })
  },
  asyncData({ query }) {
    return {
      name: query.name
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const entry = this.entrySet[this.name]
      if (!entry) return
      // eslint-disable-next-line
      const slider = new juxtapose.JXSlider(
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
