module.exports = (f) => {
  return async function () {
    try {
      return await f.apply(this, arguments)
    } catch (error) {
      alert('Something went wrong')
      if (error) {
        console.log(error.toString())
      }
    }
  }
}
