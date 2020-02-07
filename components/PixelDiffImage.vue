<template>
  <div class="neumo">
    <img v-if="x" :src="x['dataURL-D']" class="pixeldiffimage" />
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

<style scoped>
.pixeldiffimage {
  max-width: 500px;
}
.neumo {
  padding: 15px;
}
</style>
