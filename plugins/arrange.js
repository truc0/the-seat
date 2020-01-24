import Vue from 'vue'

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
    throw TypeError("minimum and maximum should be integer")
  }

  // value check
  if (minimum > maximum) {
    throw RangeError("minimum should be smaller than maximum")
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

  let items = itemsCnt - groupsCnt*minPerGroup
  for (let i=0; i<items; ++i) {
    if (result[ Arrange.randomInt(0, groupsCnt-1) ] < maxPerGroup) {
      result[ Arrange.randomInt(0, groupsCnt-1) ]++
    }
  }

  return result
}

/**
 * group items randomly
 * @param {array} arr a flattened (one dimension) array
 * @param {int} minPerGroup minimum quanlity of a group
 * @param {int} maxPerGroup maximum quanlity of a group
 * @returns an array contains items which are randomly grouped
 */
Arrange.random = (arr, minPerGroup, maxPerGroup) => {
  let partition = Arrange.partition(
      arr.length,
      Arrange.randomInt(
        Math.ceil(arr.length/maxPerGroup),
        Math.floor(arr.length/minPerGroup)
      ),
      minPerGroup,
      maxPerGroup
    )

  let _arr = [...arr] // create alias
  let result = []
  let tmp = []
  partition.forEach(element => {
    tmp = []
    for (let i=0; i<element; ++i) {
      tmp.push( _arr.pop( Arrange.randomInt(0, _arr.length-1) ) )
    }
    result.push(tmp)
  })

  return result
}


Vue.prototype.$group = Arrange

export { Arrange }