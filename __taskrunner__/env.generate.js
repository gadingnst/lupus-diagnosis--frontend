const fs = require('fs')
const { writeFile } = fs.promises

module.exports = () => {
  const path = './src/configs/env.ts'
  const env = Object.entries(process.env).reduce(
    (accumulator, [env, value]) => {
      if (env.startsWith('APP_')) {
        accumulator += `export const ${env}: string = '${value}' \n`
      }
      return accumulator
    },
    ''
  )

  if (!fs.existsSync(path)) {
    return writeFile(path, env)
  } else {
    console.log('\n> Notifications: ENVIRONTMENT IS EXISTS.')
  }
}
