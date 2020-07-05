const sourceGenerate = require('./source.generate')
const envGenerate = require('./env.generate')

async function main() {
  await Promise.all([sourceGenerate(), envGenerate()])
  console.log('\n> Notification: Task Runner Done.')
}

main()
