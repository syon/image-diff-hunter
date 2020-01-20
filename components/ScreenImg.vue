<template>
  <img :src="imgSrc" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    prefix: { type: String, required: true },
    name: { type: String, required: true }
  },
  data() {
    return { isDragging: false, items: [] }
  },
  computed: {
    ...mapState('shelf', {
      entrySet: (state) => state.entrySet
    }),
    canvasId() {
      return `${this.prefix}-${this.name}`
    },
    me() {
      return this.entrySet ? this.entrySet[this.name] : null
    },
    imgSrc() {
      return this.me ? this.me[`dataURL-${this.prefix}`] : null
    }
  }
}
</script>
