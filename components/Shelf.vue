<template>
  <div>
    <div
      :class="{ dragging: isDragging }"
      class="dropper shadow"
      @dragover.prevent="changeStyle(true)"
      @dragleave.prevent="changeStyle(false)"
      @drop.prevent="onDrop"
    >
      <p>ここに画像ファイルをドラッグ＆ドロップ</p>
    </div>
  </div>
</template>

<script>
export default {
  props: { prefix: { type: String, required: true } },
  data() {
    return { isDragging: false, items: [] }
  },
  methods: {
    changeStyle(bool) {
      this.isDragging = bool
    },
    async onDrop(event) {
      this.isDragging = false
      const files = this.fetchFiles(event)
      this.items = []
      for (const file of files) {
        const u = await this.readFileAsDataURL(file)
        this.items.push({ name: file.name, dataURL: u })
      }
      if (this.prefix === 'L') {
        this.$store.dispatch('shelf/loadLeft', this.items)
      } else {
        this.$store.dispatch('shelf/loadRight', this.items)
      }
      this.$nextTick(() => {
        for (const item of this.items) {
          const { name, dataURL } = item
          this.drawCanvas(`${this.prefix}-${name}`, dataURL)
        }
      })
    },
    fetchFiles(event) {
      const files = event.target.files
        ? event.target.files
        : event.dataTransfer.files
      return files
    },
    readFileAsDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const imgData = reader.result
          resolve(imgData)
        }
      })
    },
    drawCanvas(canvasId, imageSrc) {
      return new Promise((resolve, reject) => {
        console.log('drawCanvas', canvasId)
        const canvas = document.getElementById(canvasId)
        if (canvas && canvas.getContext) {
          const ctx = canvas.getContext('2d')
          const image = new Image()
          image.src = imageSrc
          image.onload = () => {
            const { width, height } = image
            canvas.width = width
            canvas.height = height
            ctx.drawImage(image, 0, 0)
            resolve({ width, height })
          }
        } else {
          console.warn('missing canvas element.', canvasId)
        }
      })
    }
  }
}
</script>

<style>
.dropper {
  width: 200px;
  height: 100px;
  background-color: pink;
}
.dragging {
  background-color: red;
}
.frame {
  width: 200px;
}
</style>
