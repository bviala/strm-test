const getArticles = async (page, pageSize) => {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/articles?page=${page}&pageSize=${pageSize}`)
    return response.json()
  } catch (error) {
    throw new Error(error)
  }
}
export { getArticles }
