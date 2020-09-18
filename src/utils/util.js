import enquireJs from 'enquire.js'
export function isDef (v) {
  return v !== undefined && v !== null
}
/**
 * Remove an item from an array.
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

export function enquireScreen (call) {
  const handler = {
    match: function () {
      call && call(true)
    },
    unmatch: function () {
      call && call(false)
    }
  }
  enquireJs.register('only screen and (max-width: 767.99px)', handler)
}

const _toString = Object.prototype.toString

export function judgeDataType (item) {
  return Object.prototype.toString.call(item).slice(8, -1);
}

export function judgeData (item) {
  let data = true;
  switch (judgeDataType(item)) {
    case 'Object':
      data = JSON.stringify(item) !== "{}";
      break;
    case 'Array':
      data = item.length !== 0;
      break;
    case 'Number':
      data = item !== 0;
      break;
    case 'String':
      data = item.trim() !== '';
      break;
    case 'Null':
      data = false;
      break;
    case 'Undefined':
      data = false;
      break;
    case 'Boolean':
      data = item;
      break;
    default:
      data = true
  }
  return data
}

/* 手机号校验 */
export function checkPhone (item) {
  const reg = /^1[3-9]{1}[\d]{9}$/
  return reg.test(item)
}

/* vin码校验 */
export function checkVin (item) {
  const reg = /^[A-HJ-NPR-Z\d]{17}$/
  return reg.test(item)
}

function checkPro (val) {
  const reg = /^[1-9][0-9]/;
  const provs = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门"
  };
  return reg.test(val) && provs[val];
}

function checkDate (val) {
  const reg = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
  if (reg.test(val)) {
    const year = val.substring(0, 4);
    const month = val.substring(4, 6);
    const date = val.substring(6, 8);
    const dateTwo = new Date(year + "-" + month + "-" + date);
    if (dateTwo && dateTwo.getMonth() == (parseInt(month) - 1)) {
      return true;
    }
  }
  return false;
}

function checkCode (val) {
  const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  const factor = [
    7,
    9,
    10,
    5,
    8,
    4,
    2,
    1,
    6,
    3,
    7,
    9,
    10,
    5,
    8,
    4,
    2
  ];
  const parity = [
    1,
    0,
    'X',
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2
  ];
  const code = val.substring(17);
  if (reg.test(val)) {
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += val[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}

/* 身份证号精确校验 */
export function checkIdFull (val) {
  if (checkCode(val)) {
    if (checkDate(val.substring(6, 14))) {
      if (checkPro(val.substring(0, 2))) {
        return true;
      }
    }
  }
  return false;
}

/* 身份证号粗略校验 */
export function checkIdSimple (item) {
  const reg = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(item)
}

/* 车牌号校验 */
export function checkPlateNumber (item) {
  const reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
  return reg.test(item)
}

/* 数字逢三断一 */
export function AmtFilter (value) {
  return value.toString().replace(/\B(?=(\d{3})+\b)/g, ',')
}

/* url解析 */
export function parseUrl (val) {
  const reg = /([^?&=#]+)=([^?&=#]+)/g
  const data = {
  }
  val.replace(reg, function () {
    data[arguments[1]] = arguments[2]
  })
  return data
}

/* 把错误的数据转正strip(0.09999999999999998)=0.1   */
export function strip (num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}

/** Return digits length of a number* @ param {*number} num Input number*/
export function digitLength (num) {
  const eSplit = Number(num).toString().split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
  return len > 0 ? len : 0;
}

/* 精确加法*/
export function plus (num1, num2) {
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

// 精确减法
export function minus (num1, num2) {
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

// 精确乘法
export function times (num1, num2) {
  const num1Changed = Number(Number(num1).toString().replace('.', ''));
  const num2Changed = Number(Number(num2).toString().replace('.', ''));
  const baseNum = digitLength(num1) + digitLength(num2);
  return num1Changed * num2Changed / Math.pow(10, baseNum);
}

//  精确除法
export function divide (num1, num2) {
  const num1Changed = Number(Number(num1).toString().replace('.', ''));
  const num2Changed = Number(Number(num2).toString().replace('.', ''));
  return (num1Changed / num2Changed) * Math.pow(10, digitLength(num2) - digitLength(num1));
}

// 四舍五入
export function round (num, ratio) {
  const base = Math.pow(10, ratio);
  return divide(Math.round(times(num, base)), base);
}

// 将一个值平均分，分不尽时做处理
export function countCostOrRevenue (a, b) {
  let obj = {
  }
  let item_num = ''
  let average = divide(a, b)
  if (average.toString().length >= 10) {
    item_num = average.toFixed(2)
  } else {
    item_num = average.toFixed(2)
  }
  for (let i = 1; i <= b; i++) {
    if (i == b && (average).toString().length >= 10) {
      item_num = minus(a, times(item_num, minus(b, 1)))
    }
    obj[i] = item_num
  }
  return obj
}

// 记录input旧值
export function selectAll (event) {
  this.oldValue = event.target.value;
  this.selectTimeout = setTimeout(() => {
    clearTimeout(this.selectTimeout)
    event.target.select()
  }, 0)
}

export function fixed () {

}