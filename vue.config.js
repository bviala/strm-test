module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // Automatically import scss variables in all components
        additionalData: `
          @import '@/scss/variables.scss';
        `
      }
    }
  },
  lintOnSave: 'warning'
}
