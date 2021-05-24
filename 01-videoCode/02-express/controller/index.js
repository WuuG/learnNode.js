
const list = (req, res, next) => {
  const query = req.query
  console.log(query);
  res.send(query) //这里会自动添加content-type
  // res.json(query)
  next()
}

exports.list = list