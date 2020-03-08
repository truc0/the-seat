import Vue from 'vue'

let Gender = {}

/**
 * Gender identifier, all in lowercase
 */
Gender.identify = {
  male: ['m', 'man', 'men', 'male', 'males', 'gentlement', 'gentlements', 'boy',       'boys', '男', '男人', '男性', '雄', '雄性'],
  female: ['f', 'woman', 'women', 'female', 'females', 'lady', 'ladies', 'girl',       'girls', '女', '女人', '女性', '雌', '雌性']
}

/**
 * Gender code
 */
Gender.Male = -1
Gender.Female = 1
Gender.Unknown = 0


/**
 * Identify gender via Gender identifier
 * @param {string} gender a string represent gender
 * @returns {number} gender code
 */
Gender.gender = gender => {
  if (Gender.identify.male.indexOf(gender.toLocaleLowerCase()) !== -1) {
    // man
    return Gender.Male
  } else if (Gender.identify.female.indexOf(gender.toLocaleLowerCase()) !== -1) {
    // female
    return Gender.Female
  } else {
    // unknown
    return Gender.Unknown
  }
}


/**
 * If a gender is male
 * @param {string} gender a string represent gender
 * @returns {boolean} if the gender belongs to male
 */
Gender.isMale = gender => {
  return (Gender.gender(gender) === Gender.Male)
}


/**
 * If a gender is female
 * @param {string} gender a string represent gender
 * @returns {boolean} if the gender belongs to female
 */
Gender.isFemale = gender => {
  return (Gender.gender(gender) === Gender.Female)
}


/**
 * If a gender is unknown
 * @param {string} gender a string represent gender
 * @returns {boolean} if the gender belongs to unknown
 */
Gender.isFemale = gender => {
  return (Gender.gender(gender) === Gender.Unknown)
}

Vue.prototype.$gender = Gender

export default Gender
