<template>
  <div class="mb-4 ml-8">
    <image-slider />
    <fade-slider />
    <pixel-diff-image />
  </div>
</template>

<script>
import PixelDiffImage from '@/components/PixelDiffImage'
import ImageSlider from '@/components/ImageSlider'
import FadeSlider from '@/components/FadeSlider'

export default {
  components: { PixelDiffImage, ImageSlider, FadeSlider },
  computed: {},
  methods: {}
}
</script>
