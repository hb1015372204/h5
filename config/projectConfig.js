const projectName = require('./project')
const glob = require("glob")
const mainFileList = glob.sync('./src/projects/*/main.js')
const config = {}
mainFileList.forEach(item=>{
  /**
   *  appName 获取 projects 文件中每个项目的名字
   * 通过截取 ./src/projects/project1/main.js 中的 project1
   */
  const start = item.indexOf('projects/')+9
  const end = item.indexOf('/main')

  const appName = item.substring(start,end)
  config[appName] = {
    pages: {
      index: {
        entry: `src/projects/${appName}/main.js`,
        template: 'public/index.html',
        filename: 'index.html',
      }
    },
    publicPaths: `/${appName}/`,
    outputDir:`dist/${appName}/`
    // outputDir:`dist/`
  }
})




const configObj = config[projectName.name]
module.exports = configObj
