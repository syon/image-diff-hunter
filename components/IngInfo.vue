<template>
  <div>
    <div>{{ filename }}</div>
    <div class="flex">
      <span>{{ x.width }} x {{ x.height }}</span>
      ／
      <span>{{ x.mismatchedPixels }}</span>
      ／
      <span
        >{{
          ((x.mismatchedPixels / (x.width * x.height)) * 100).toFixed(2)
        }}
        %</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('shelf', {
      entrySet: (state) => state.entrySet
    }),
    ...mapState('ing', {
      filename: (state) => state.filename
    }),
    x() {
      return this.entrySet[this.filename]
    }
  }
}
</script>

<style scoped></style>
