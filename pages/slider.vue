<template>
  <div>
    <div>Slider / {{ name }}</div>
    <div id="foo"></div>
  </div>
</template>

<script>
import 'juxtaposejs/build/js/juxtapose'
import 'juxtaposejs/build/css/juxtapose.css'
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
      // eslint-disable-next-line no-undef
      const slider = new juxtapose.JXSlider(
        '#foo',
        [
          {
            src: entry['dataURL-L'],
            label: '2009',
            credit: 'Image Credit'
          },
          {
            src: entry['dataURL-R'],
            label: '2014',
            credit: 'Image Credit'
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
      console.log(slider)
    }
  }
}
</script>
