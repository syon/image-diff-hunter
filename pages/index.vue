<template>
  <div class="container">
    <div class="flex">
      <div class="sidebar">
        <shelf prefix="L" />
        <shelf prefix="R" />
        <button
          class="bg-pink-500 text-white active:bg-pink-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style="transition: all .15s ease"
          @click="exeAllDiff"
        >
          exeAllDiff
        </button>
        <div>
          <div v-for="x of allEntries" :key="x.name">
            <rack-row :item="x" />
          </div>
        </div>
      </div>
      <div>
        <right-pane />
      </div>
    </div>
  </div>
</template>

<script>
import pixelmatch from 'pixelmatch'
import { mapGetters } from 'vuex'
import Shelf from '@/components/Shelf'
import RackRow from '@/components/RackRow'
import RightPane from '@/components/RightPane'

export default {
  components: {
    Shelf,
    RackRow,
    RightPane
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      allEntries: 'shelf/allEntries'
    })
  },
  methods: {
    exeAllDiff() {
      this.allEntries.forEach(({ name }) => {
        const { width, height, dataURL, mismatchedPixels } = this.doDiff(name)
        this.$store.dispatch('shelf/loadDiff', {
          name,
          width,
          height,
          dataURL,
          mismatchedPixels
        })
      })
    },
    doDiff(filename) {
      console.log('doDiff:', filename)
      const base = document.getElementById(`L-${filename}`)
      if (!base) return null
      const width = base.width
      const height = base.height
      console.log({ width, height })
      const img1 = this.getImageContext(`L-${filename}`).getImageData(
        0,
        0,
        width,
        height
      )
      const img2 = this.getImageContext(`R-${filename}`).getImageData(
        0,
        0,
        width,
        height
      )
      const diff = this.getImageContext(`D-${filename}`).createImageData(
        width,
        height
      )
      const difCanvas = document.getElementById(`D-${filename}`)
      difCanvas.width = width
      difCanvas.height = height

      const mismatchedPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        {
          threshold: 0.1
        }
      )

      this.getImageContext(`D-${filename}`).putImageData(
        diff,
        0,
        0,
        0,
        0,
        width,
        height
      )

      const u = difCanvas.toDataURL('image/png')
      return { width, height, dataURL: u, mismatchedPixels }
    },
    getImageContext(id) {
      const canvas = document.getElementById(id)
      if (!canvas) {
        console.warn('[UNEXPECTED] getImageContext is null.', id)
      }
      return canvas.getContext('2d')
    }
  }
}
</script>

<style scoped>
.container {
  margin: auto;
}
</style>
