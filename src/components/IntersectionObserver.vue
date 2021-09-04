<template>
  <div id="intersectionTarget" />
</template>

<script>
export default {
  props: {
    observerMargin: {
      type: String,
      default: '0px 0px 200px 0px'
    }
  },
  emits: ['intersect'],
  mounted () {
    const observer = new IntersectionObserver(
      (entries, _) => {
        if (entries[0].isIntersecting) {
          this.$emit('intersect', entries)
        }
      },
      {
        rootMargin: this.observerMargin,
        treshold: 1.0
      }
    )
    observer.observe(document.querySelector('#intersectionTarget'))
  }
}
</script>
