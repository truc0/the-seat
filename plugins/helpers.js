import _ from 'lodash'
import Vue from 'vue'

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


Tools.uuid = {}
Tools.uuid.v4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


Vue.prototype.$tools = Tools
export default Tools
