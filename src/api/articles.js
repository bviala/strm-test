const getArticles = async (page, pageSize) => {
  try {
    const response = await fetch(`https://frontend-engineering-test-api.netlify.app/.netlify/functions/articles?page=${page}&pageSize=${pageSize}`)
    return response.json()
  } catch (error) {
    throw new Error(error)
  }
}
export { getArticles }
