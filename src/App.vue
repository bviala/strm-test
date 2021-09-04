<template>
  <main>
    <ArticlesFeed />
  </main>
</template>

<script>
import ArticlesFeed from '@/components/ArticlesFeed'

export default {
  name: 'App',
  components: { ArticlesFeed }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
}

body {
  margin: 0;
  background: $background-color;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-default;

  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
}
main {
  max-width: 800px;
}
</style>
