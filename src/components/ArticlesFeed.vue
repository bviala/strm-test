<template>
  <div
    v-for="(dayArticles, dayDisplayableDate) in groupedByDayArticles"
    :key="dayDisplayableDate"
    class="articles"
  >
    <h1>{{ dayDisplayableDate }}</h1>
    <Article
      v-for="(article, index) in dayArticles"
      :key="index"
      :article="article"
    />
  </div>
  <Spinner v-if="!hasFetchedAll" />
  <IntersectionObserver
    @intersect="fetchNextPage"
  />
</template>

<script>
import dayjs from 'dayjs'

import { getArticles, fakeArticle } from '@/api/articles'

import Article from '@/components/Article.vue'
import IntersectionObserver from '@/components/IntersectionObserver.vue'
import Spinner from '@/components/Spinner.vue'

const PAGE_SIZE = 10

export default {
  components: {
    Article,
    IntersectionObserver,
    Spinner
  },
  data () {
    return {
      articles: [...fakeArticle], // testing sticky headings
      nextPageToFetch: 1,
      isFetching: false,
      hasFetchedAll: false
    }
  },
  computed: {
    groupedByDayArticles () {
      return this.articles.reduce((accumulator, current) => {
        const displayableDate = dayjs(current.published_at).format('dddd D MMMM')
        accumulator[displayableDate] = accumulator[displayableDate] ? [...accumulator[displayableDate], current] : [current]
        return accumulator
      }, {})
    }
  },
  methods: {
    fetchNextPage () {
      if (this.hasFetchedAll) return

      this.isFetching = true

      getArticles(this.nextPageToFetch, PAGE_SIZE)
        .then(result => {
          if (result.length) {
            this.articles = [...this.articles, ...result]
            this.nextPageToFetch++
          } else {
            this.hasFetchedAll = true
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          this.isFetching = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$h1-v-margin: 1.5rem;

.articles {
  >:nth-child(2) {
    margin-top: $h1-v-margin; /* Workaround: setting a margin-bottom on the h1 makes its sticky behavior buggy */
  }
  h1 {
    position: sticky;
    top: 0;
    padding: 1rem 2rem;
    margin: $h1-v-margin 0 0 0;
    background: white;
    border-bottom: 3px solid $primary;
  }
}
</style>
