<template>
  <main>
    <!-- <Article
      v-for="article in articles"
      :key="article.id"
      :article="article"
    /> -->
    <InfiniteScroll
      :items="articles"
      @intersect="fetchNextPage"
    >
      <template #default="slotProps">
        <Article :article="slotProps.item" />
      </template>
    </InfiniteScroll>
  </main>
</template>

<script>
import { getArticles } from '@/api/articles'
import Article from '@/components/Article.vue'
import InfiniteScroll from '@/components/InfiniteScroll.vue'

const PAGE_SIZE = 10

export default {
  name: 'App',
  components: {
    Article,
    InfiniteScroll
  },
  data () {
    return {
      articles: [],
      nextPageToFetch: 1
    }
  },
  methods: {
    fetchNextPage (entries) {
      getArticles(this.nextPageToFetch, PAGE_SIZE)
        .then(result => {
          this.articles = [...this.articles, ...result]
          this.nextPageToFetch++
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  padding: 2rem 1rem;
  background: lightcyan;
  display: flex;
  justify-content: center;
}
main {
  max-width: 800px;
}
</style>
