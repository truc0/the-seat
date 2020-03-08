import _ from 'lodash'
import Vue from 'vue'

import Tools from '~/plugins/helpers.js'
import Gender from '~/plugins/gender'

const { uuid } = Tools

let Arrange = {}

/**
 * random a int
 * @param {int} minimum minimum of the random int
 * @param {int} maximum maximum of the random int
 * @returns {int} a random int between minimum(included) and maximum(included)
 */
Arrange.randomInt = (minimum, maximum) => {
  // type check
  if (!Number.isInteger(minimum) || !Number.isInteger(maximum)) {
    throw TypeError("Arrange.randomInt: minimum and maximum should be integer")
  }

  // value check
  if (minimum > maximum) {
    throw RangeError("Arrange.randomInt: minimum should be smaller than maximum")
  }

  let gap = maximum- minimum + 1

  let r = Math.random()

  return minimum + parseInt(r*gap)
}

/**
 * divede items into groups
 * @param {int} itemsCnt the amount of items
 * @param {int} groupsCnt the amount of groups
 * @param {int} minPerGroup minimum quanlity of items in a group
 * @param {int} maxPerGroup maximum quanlity of items in a group
 * @returns {array} an array contains number of people in each group like [1, 9] means 1 item in group 1 and 9 items in group 2
 */
Arrange.partition = (itemsCnt, groupsCnt, minPerGroup, maxPerGroup) => {
  // quanlity check
  if (minPerGroup > maxPerGroup) {
    throw RangeError("minPerGroup should be smaller than maxPerGroup")
  }
  if (groupsCnt*minPerGroup > itemsCnt
    || groupsCnt*maxPerGroup < itemsCnt) {
      throw RangeError("cannot divide to groups as itemsCnt is not in range")
    }

  let result = []

  for (let i=0; i<groupsCnt; ++i) {
    result.push(minPerGroup)
  }

  let restOfItems = itemsCnt - groupsCnt*minPerGroup
  for (let i=0; i<restOfItems; ++i) {
    let randomIndex = Arrange.randomInt(0, groupsCnt-1)

    // find a group which item is able to be added in
    let _cnt = 0 // set a count for secure reason
    while (result[randomIndex] >= maxPerGroup) {
      randomIndex = (randomIndex+1) % groupsCnt
      _cnt++

      if (_cnt > groupsCnt) {
        throw Error("Arrange.partition: unexpected error, code: 01")
      }
    }

    result[randomIndex]++
  }

  return result
}

/**
 * group items randomly
 * @param {array} sourceArray a flattened (one dimension) array
 * @param {int} minPerGroup minimum quanlity of a group
 * @param {int} maxPerGroup maximum quanlity of a group
 * @returns an array contains items which are randomly grouped
 */
Arrange.random = (sourceArray, minPerGroup, maxPerGroup) => {
  let partition = Arrange.partition(
      sourceArray.length,
      Arrange.randomInt(
        Math.ceil(sourceArray.length/maxPerGroup),
        Math.floor(sourceArray.length/minPerGroup)
      ),
      minPerGroup,
      maxPerGroup
    )

  let copiedArray = _.cloneDeep(sourceArray)
  let result = []
  let currentIndex = 0
  partition.forEach(numOfItems => {
    result.push([])
    currentIndex = result.length - 1 // the last one
    for (let i=0; i<numOfItems; ++i) {
      result[currentIndex].push(
        copiedArray.pop(Arrange.randomInt(0, copiedArray.length-1))
      )
    }
  })

  return result
}


/**
 * Partition array sequential
 * @param {array} sourceArray array to be partition
 * @param {integer} minPerGroup minium amount of people in a group, or use as number of people in a group
 * @param {integer} maxPerGroup optional, use minPerGroup as the number of a group if not specify
 * @return {array} the processed array
 */
Arrange.sequential = (sourceArray, minPerGroup, maxPerGroup=null) => {

  let itemsPerGroup = null
  let result = []

  if (!Number.isInteger(minPerGroup)) {
    throw TypeError('Array.sequential: minPerGroup must be integer')
  }

  if (!Number.isInteger(maxPerGroup) && !_.isNull(maxPerGroup)) {
    throw TypeError('Array.sequential: maxPerGroup must be integer or null')
  }

  if (maxPerGroup !== null) {
    itemsPerGroup = Arrange.randomInt(minPerGroup, maxPerGroup)
  } else {
    itemsPerGroup = minPerGroup
  }

  let copiedArray = _.cloneDeep(sourceArray)
  let currentIndex = 0

  for (let i=0; i<copiedArray.length; i+=itemsPerGroup) {
    currentIndex = result.length - 1 // the last one
    result[currentIndex].push(copiedArray.slice(i, i+itemsPerGroup+1))
  }

  return result
}

Vue.prototype.$group = Arrange

export { Arrange }
