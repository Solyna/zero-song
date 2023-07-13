#!/usr/bin/env node
const path = require('path');
const ora = require('ora');
const fs = require('fs-extra');
const download = require('download-git-repo');
const { copyFiles, parseCmdParams, getGitUser, runCmd, log } = require('../utils');
const { exit } = require('process');
const inquirer = require('inquirer');
const { InquirerConfig, RepoPath } = require('../utils/config');

/**
 * class 项目创建命令
 *
 * @description
 * @param {} source 用户提供的文件夹名称
 * @param {} destination 用户输入的create命令的参数
 */
class Creator {
    constructor(source, destination, ops = {}) {
        this.source = source;
        this.cmdParams = parseCmdParams(destination);
        this.RepoMaps = Object.assign({
            repo: RepoPath,
            temp: path.join(__dirname, '../../__temp__'),
            target: this.genTargetPath(this.source)
        }, ops);
        this.gitUser = {};
        this.spinner = ora();
        this.init();
    }

    // 生成目标文件夹的绝对路径
    genTargetPath(relPath = 'vue-ts-template') {
        return path.resolve(process.cwd(), relPath);
    }

    // 初始化函数
    async init() {
        try {
            await this.checkFolderExist();
            await this.downloadRepo();
            await this.copyRepoFiles();
            await this.removeTempFiles();
            await this.updatePkgFile();
            await this.initGit();
            await this.runApp();
        } catch (error) {
            log.error(error);
            exit(1);
        } finally {
            this.spinner.stop();
        }
    }

    // 监测文件夹是否存在
    checkFolderExist() {
        return new Promise(async (resolve) => {
            const { target } = this.RepoMaps
            // 如果create附加了--force或-f参数，则直接执行覆盖操作
            if (this.cmdParams.force) {
                await fs.removeSync(target);
                return resolve();
            }
            try {
                // 否则进行文件夹检查
                const isTarget = await fs.pathExistsSync(target);
                if (!isTarget) {
                    return resolve();
                }

                const { recover } = await inquirer.prompt(InquirerConfig.folderExist);
                if (recover === 'cover') {
                    await fs.removeSync(target);
                    return resolve();
                } else if (recover === 'newFolder') {
                    const { inputNewName } = await inquirer.prompt(InquirerConfig.rename);
                    this.source = inputNewName;
                    this.RepoMaps.target = this.genTargetPath(`./${inputNewName}`);
                    return resolve();
                } else {
                    exit(1);
                }
            } catch (error) {
                log.error(`[mn]Error:${error}`);
                exit(1);
            }
        })
    }

    // 下载repo资源
    downloadRepo() {
        this.spinner.start('正在拉取项目模板...');
        const { repo, temp } = this.RepoMaps
        return new Promise(async (resolve, reject) => {
            await fs.removeSync(temp);
            download(repo, temp, { clone: true }, async err => {
                if (err) {
                    log.error("下载出错\n", err);
                    return reject(err);
                }
                this.spinner.succeed('模版下载成功');
                return resolve();
            })
        })
    }

    // 拷贝repo资源
    async copyRepoFiles() {
        const { temp, target } = this.RepoMaps;
        this.spinner.start("复制文件到对应的文件目录");
        await copyFiles(temp, target, ['./git', './changelogs']);
        this.spinner.succeed("复制文件成功");
    }

    // 清除临时文件
    async removeTempFiles() {
        const { temp } = this.RepoMaps;
        this.spinner.start("删除临时文件");
        await fs.removeSync(temp);
        this.spinner.succeed("删除临时文件成功");
    }

    // 更新package.json文件
    async updatePkgFile() {
        this.spinner.start('正在更新package.json...');
        const pkgPath = path.resolve(this.RepoMaps.target, 'package.json');
        const unnecessaryKey = ['keywords', 'license', 'files'];
        const { name = '', email = '' } = await getGitUser();

        const jsonData = fs.readJsonSync(pkgPath);
        unnecessaryKey.forEach(key => delete jsonData[key]);
        Object.assign(jsonData, {
            name: this.source,
            author: name && email ? `${name}<${email}>` : ''
        });
        await fs.writeJsonSync(pkgPath, jsonData, { spaces: '\t' })
        this.spinner.succeed('package.json更新完成！');
    }

    // 初始化git文件
    async initGit() {
        this.spinner.start('正在初始化Git管理项目...');
        await runCmd(`cd ${this.RepoMaps.target}`);
        process.chdir(this.RepoMaps.target);
        await runCmd(`git init`);
        this.spinner.succeed('Git初始化完成！');
    }

    // 安装依赖
    async runApp() {
        try {
            this.spinner.start('正在安装项目依赖文件，请稍后...');
            await runCmd(`npm install`);
            this.spinner.succeed('依赖安装完成！');
            console.log('使用npm run start 启动');
        } catch (error) {
            console.log('项目安装失败\n');
        }
    }
}
exports.Creator = Creator;