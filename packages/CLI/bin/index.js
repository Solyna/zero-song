#! /usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const package = require('../package');
const { Creator } = require("../src/commands")

const program = new Command();

/**
 * .usage 和 .name 方法，通过这两个选项可以修改帮助提示的首行文字;
 * name 是配置脚手架名称; usage 是配置命令格式;
 */
program
  .name("zero")
  .usage(`<command> [options]`)
  .version(package.version, '-v, --version', 'display version for zero');


/**
 *  command 方法的第一参数为命令名称，命令参数跟随在名称后面(必选参数使用 <> 表示，可选参数使用 [] 表示
 */
program.command('create <name>')
  .description('create a mn binaque project template')
  .option('-f, --force', '忽略文件夹检查，如果已存在则直接覆盖')
  .action((source, destination) => {
    new Creator(source, destination)
  });

/**
 * 使用chalk给 --help 提示上色
 * 监听 --help 指令
 */
program.on("--help", function () {
  /* 前后两个空行调整格式，更舒适 */
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "zero <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});



/**
 * 解析用户执行时输入的参数
 * process.argv 是 nodejs 提供的属性
 * @example npm run server --port 3000 后面的 --port 3000 就是用户输入的参数
 * 此行命令必须放在最后？？
 */
try {
  program.parse(process.argv);
} catch (error) {
  console.log('err: ', error)
}