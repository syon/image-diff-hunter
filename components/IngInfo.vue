<template>
  <div class="IngInfo w-full my-4 text-gray-700">
    <div class="text-center font-bold my-4">{{ filename }}</div>
    <div class="text-center text-sm">
      <span>width: {{ x.width }} &nbsp; height: {{ x.height }}</span>
    </div>
    <div class="text-center text-sm">
      <span>MismatchedPixels: {{ x.mismatchedPixels }}</span>
      (
      <span
        >{{
          ((x.mismatchedPixels / (x.width * x.height)) * 100).toFixed(2)
        }}
        %</span
      >
      )
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
      return this.entrySet[this.filename] || {}
    }
  }
}
</script>

<style scoped>
.IngInfo {
  height: 120px;
}
</style>
