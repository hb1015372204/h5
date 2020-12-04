/*
 * @Description: 页面快速生成脚本
 */
const fs = require('fs')
const temp = require('./temp')

const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)
console.log('\x1B[32m','————————————————已创建新的项目————————————————', capPirName);
if (!dirName) {
    console.log('文件夹名称不能为空！')
    console.log('示例：npm run tep ${capPirName}')
    process.exit(0)
}

fs.mkdirSync(`${basePath}/projects/${dirName}`) // mkdir
process.chdir(`${basePath}/projects/${dirName}`) // cd views
fs.writeFileSync(`App.vue`, temp.AppVueTep) // vue 
fs.writeFileSync(`main.js`, temp.mainTep)
fs.writeFileSync(`router.js`, temp.routerTep)
fs.mkdirSync(`${basePath}/projects/${dirName}/assets`)
fs.mkdirSync(`${basePath}/projects/${dirName}/components`)
fs.mkdirSync(`${basePath}/projects/${dirName}/page`)
process.chdir(`${basePath}/projects/${dirName}/page`)
fs.writeFileSync(`home.vue`, temp.VueTep) 

process.exit(0)