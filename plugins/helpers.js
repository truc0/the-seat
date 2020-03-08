import _ from 'lodash'

const Tools = {}

/**
 * standardize an array, add uid to item etc.
 * @param {array} sourceArray arr to be standardized
 * @return {array} the standardized array
 */
Tools.standardize = sourceArray => {
  let copiedArray = _.cloneDeep(sourceArray)

  copiedArray.forEach(item => {
    // turn all property to lowercase
    for (let key in item) {
      if (key === key.toLocaleLowerCase()) {
        continue
      }
      item[key.toLocaleLowerCase()] = item[key]
      delete item[key]
    }

    if (!item.uid) {
      item.uid = uuid.v4()
    }
  })

  // console.log(arr)
  return arr
}

export default Tools
