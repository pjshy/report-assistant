const path = require('path')

exports.resolvePath = (pathRelativeToRoot) => {
  return path.resolve(__dirname, '..', '..', pathRelativeToRoot)
}

exports.pickByCondition = (condition, trueValue, falseValue = false) => {
  return condition ? trueValue : falseValue
}
