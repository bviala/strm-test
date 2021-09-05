<template>
  <div
    v-for="(articlesGroup, date) in groupedByDayArticles"
    :key="date"
    class="articles-group"
  >
    <div class="articles-group__date">
      {{ date }}
    </div>
    <div class="articles-group__articles">
      <Article
        v-for="(article, index) in articlesGroup"
        :key="index"
        :article="article"
      />
    </div>
  </div>
  <Spinner v-if="!hasFetchedAll && !hasFetchingError" />
  <p
    v-if="hasFetchingError"
    class="error"
  >
    Something went wrong... please try refreshing the page
  </p>
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
      hasFetchedAll: false,
      hasFetchingError: false
    }
  },
  computed: {
    groupedByDayArticles () {
      return this.articles.reduce((accumulator, current) => {
        const displayableDate = dayjs(current.published_at).format('dddd[daniel]D MMMM').replace('daniel', '\n')
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
          this.hasFetchingError = true
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

.articles-group {
  >:nth-child(2) {
    margin-top: $h1-v-margin; /* Workaround: setting a margin-bottom on the title makes its sticky behavior buggy */
  }
  .articles-group__date {
    position: sticky;
    top: 0;
    padding: 1rem 2rem;
    margin: $h1-v-margin 0 0 0;
    background: white;
    border-bottom: 3px solid $primary;
    font-size: 1.5rem;
  }

  @include desktop {
    display: flex;
    .articles-group__date {
      align-self: flex-start;
      margin-right: 2rem;
      flex-basis: 170px;
      flex-shrink: 0;
      top: 2rem;
      white-space: pre;
      border: none;
    }
  }
}
.error {
  padding: 1rem 2rem;
  color: red;
  background: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
}
</style>
