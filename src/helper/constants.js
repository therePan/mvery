/*eslint no-new-wrappers: "off"*/
export default (name, actions) => {
  let constants = {}, i, text
  for (i = 0; i < actions.length; i++) {
    text = `:> ${ostrich(name)} :${ostrich(actions[i])}`
    constants[actions[i]] = Object.assign(
      new String(`${text} ^DONE`),
      { begin: `${text} ^BEGIN`, error: `${text} ^ERROR` }
    )
  }
  return constants
}

function ostrich(name) {
  return name.replace(/([A-Z]+)/g, '_$1').toUpperCase()
}


// const constantsMap = {
//   // 配置
//   option: [
//     'load',
//   ],

//   // 前端用户会话
//   session: [
//     'login',
//     'logout',
//     'passwd', // 修改密码
//     'captcha', // 获取验证码
//   ],

//   // 用户
//   users: [
//     'load', // 获取用户信息
//     'edit', // 编辑用户信息
//     'register', // 用户注册
//   ],

//   // 简历
//   resumes: [
//     'load', // 获取简历信息
//     'edit', // 编辑简历
//   ]
// }

// ////////////////////////////////////////////////////////////////
// export default ((maps) => {
//   let constants = {}, i, name, reducer, action, text
//   for (name in maps) {
//     reducer = maps[name]
//     constants[name] = {}
//     for (i = 0; i < reducer.length; i++) {
//       action = reducer[i]
//       text = `:> ${ostrich(name)} :${ostrich(action)}`
//       constants[name][action] = Object.assign(
//         new String(`${text} ^DONE`),
//         { begin: `${text} ^BEGIN`, error: `${text} ^ERROR` }
//       )
//     }
//   }
//   window.constants = constants
//   return constants
// })(constantsMap)

// function ostrich(name) {
//   return name.replace(/([A-Z]+)/g, '_$1').toUpperCase()
// }
