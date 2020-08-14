const ok = (res, message, data) => {
  res.json({
    message,
    data,
  })
}

const fail = (res, message) => {
  res.status(422).json({
    error: message,
  })
}

module.exports = { ok, fail }
