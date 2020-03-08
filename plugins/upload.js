import Vue from 'vue'
import XLSX from 'xlsx'
import Arrange from '~/plugins/arrange'
import Tools from '~/plugins/helpers'

let Upload = {}

/**
 * read xlsx format data and resolve it
 * @param {*} resolve promise resolve function
 * @param {*} reject promise reject function
 * @returns a wrapped function handles `reader.onload`
 */
Upload.xlsx = (resolve, reject) => {

  let func = e => {
    // pre-process data
    let binary = "";
    let bytes = new Uint8Array(e.target.result);
    let length = bytes.byteLength;
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    /* read workbook */
    let wb = XLSX.read(binary, {type: 'binary'});

    /* grab first sheet */
    let wsname = wb.SheetNames[0];
    let ws = wb.Sheets[wsname];

    try {
      let data = XLSX.utils.sheet_to_json(ws)
      data = Arrange.standardize(data)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  }

  return func
}

Vue.prototype.$upload = Upload

export { Upload }
