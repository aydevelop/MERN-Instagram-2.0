function wrapper(f) {
  return async function () {
    try {
      return await f.apply(this, arguments)
    } catch (err) {
      arguments[1].status(500).json({
        success: false,
        message: err.message,
      })
    }
  }
}

module.exports = wrapper
