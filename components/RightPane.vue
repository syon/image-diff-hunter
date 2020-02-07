<template>
  <div class="flex flex-col mb-4 ml-8">
    <image-slider />
    <pixel-diff-image />
  </div>
</template>

<script>
import PixelDiffImage from '@/components/PixelDiffImage'
import ImageSlider from '@/components/ImageSlider'

export default {
  components: { PixelDiffImage, ImageSlider },
  computed: {},
  methods: {}
}
</script>
