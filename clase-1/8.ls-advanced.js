const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls(folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`X No such file or directory ${folder}`))
    process.exit(1)
  }
  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // informacion del archivo
    } catch {
      console.error(`No such file or directory ${filePath}`)
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(25))} ${pc.green(
      fileSize.toString().padStart(12)
    )} ${pc.yellow(fileModified)} `
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach((file) => console.log(file))
}

ls(folder)
