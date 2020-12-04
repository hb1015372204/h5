const projectType = process.argv[2]
const projectName = process.argv[3]
console.log('\x1B[32m','————————————————您正在运行的项目名是————————————————', projectName);
console.log('\x1B[33m','————————————————当前环境————————————————', projectType);

let fs = require('fs');

// 记录正在运行的项目名
fs.writeFileSync('./config/project.js', `exports.name = '${projectName}'`)

// 启动一个新的进程，并执行命令
let exec = require('child_process').execSync;
exec(`vue-cli-service serve --mode ${projectType} `, {stdio: 'inherit'});