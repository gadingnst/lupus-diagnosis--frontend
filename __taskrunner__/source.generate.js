const { readdir, writeFile, lstat } = require('fs').promises

export default async () => {
  const srcPath = './src'
  const files = await readdir(srcPath)
  const filesStats = await Promise.all(
    files.map(async (file) => {
      const stats = await lstat(`${srcPath}/${file}`)
      return {
        name: file,
        isDir: stats.isDirectory()
      }
    })
  )

  const dirs = filesStats.reduce((acc, cur) => {
    cur.isDir && acc.push(cur.name)
    return acc
  }, [])

  await Promise.all(
    dirs.map((dir) =>
      writeFile(`${srcPath}/${dir}/package.json`, JSON.stringify({ name: dir }))
    )
  )
}
