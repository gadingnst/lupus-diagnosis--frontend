const { readdir, writeFile, lstat } = require('fs').promises

module.exports = async () => {
  const srcPath = './src'
  const files = await readdir(srcPath)
  const filesStats = await Promise.all(
    files.map(async (name) => ({
      name,
      isDir: (await lstat(`${srcPath}/${name}`)).isDirectory()
    }))
  )

  const dirs = filesStats.reduce((acc, cur) => {
    cur.isDir && acc.push(cur.name)
    return acc
  }, [])

  await Promise.all(
    dirs.map((name) =>
      writeFile(`${srcPath}/${name}/package.json`, JSON.stringify({ name }))
    )
  )
}
