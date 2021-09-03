<template>
  <template
    v-for="(item, index) in items"
    :key="index"
  >
    <slot :item="item" />
  </template>
  <div id="intersectionTarget" />
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
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
        rootMargin: '0px',
        treshold: 1.0
      }
    )
    observer.observe(document.querySelector('#intersectionTarget'))
  }
}
</script>
