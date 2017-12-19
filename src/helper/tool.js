/**
 * Created by huangchao on 2017/10/20.
 */

const ArrayDelRepetition = function(data) {
  let tmp = {}, arr = []
  for(let i = 0; i<data.length; i++) {
    if(!tmp[data[i]]) {
      arr.push(data[i])
      tmp[data[i]] = data[i]
    }
  }
  return arr
}

const procesTime = function(time = '') {
  if(!time){return null}
  const T1 = time.split(' ')[0]
  const timeArr = T1.split('-')
  return time = timeArr[1]+'-'+timeArr[2]
}

const changeEmail = function(email) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(email)
}

const changePhoneNumber = function(num) {
  const reg = /^1[34578]\d{9}$/
  return reg.test(num)
}

const filterUndefind = function(obj) {
  const o = {}
  Object.keys(obj).forEach(data => {
    if (obj[data] !== undefined && obj[data] !== '') {
      o[data] = obj[data]
    }
  })
  return o
}

export default {
  ArrayDelRepetition,
  procesTime,
  changeEmail,
  changePhoneNumber,
  filterUndefind,
}
