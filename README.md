<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Installation

```
$ cd flash-nest-server
$ yarn global add @nestjs/cli
$ yarn
```

## Set up mysql

* run mysql

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d -p 3310:3306 mysql:8.0.0
```

* create mysql database

```bash
# password: 123456
  mysql -h 127.0.0.1 -uroot  -P 3310 -p
  CREATE DATABASE IF NOT EXISTS arya CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

* restore data

``` bash
# 在项目根目录下
mysql --default-character-set=utf8mb4 -uroot -p123456 -h127.0.0.1 -P 3310 arya < ./db/jonsnow-uat.201903171902.sql

npm run migrate
```

### Database Migration
* apply migration script
```
npm run migrate
```

* create a new migration script
```bash
./node_modules/db-migrate/bin/db-migrate create xxx
```
add applied sql script in `migrations/xxx-up.sql` and tear-down sql script in `migrations/xxx-down.sql` 

## Running the app

* 小程序前端中，在 `v1Api.ts` 的数组中，写上请求这个后端的 API，在 API 没有迁移过来时，这是临时的 API 分流的方案

```bash
# development
$ yarn run start

# production mode
$ yarn run start:prod

# 启用HRM
$ npm run hrm
# 等 webpack 开始监视文件后，在另一个命令行窗口中运行另一个命令
$ npm run start
```

## CLI

Nest 提供了 CLI 工具帮助我们生成 Nest 体系结构组件。

```bash
$ nest [command] [...options]
```

### options

* `–dry-run`: 允许模拟命令执行，以验证它将如何影响您的工作目录
* `–no-spe`c: 允许关闭spec文件的生成（仅适用于generate命令）
* `–flat`: 允许关闭专用目录的生成（仅适用于generate命令）

### command

#### new(alias: n)

new 命令生成基于 typescript-starter上的Nest项目以及安装所需的软件包。CLI将询问您缺少的信息 - 应用程序名称（如果未指定）以及要用于安装依赖项的程序包管理器。

```bash
$ nest new my-awesome-app
```

#### generate(alias: g)

generate命令用于生成Nest体系结构组件。

可用架构组件的列表：

* class (alias: cl)

* controller (alias: co)

* decorator (alias: d)

* exception (alias: e)

* filter (alias: f)

* gateway (alias: ga)

* guard (alias: gu)

* interceptor (alias: i)

* middleware (alias: mi)

* module (alias: mo)

* pipe (alias: pi)

* provider (alias: pr)

* service (alias: s)

```bash
$ nest generate service users
OR
$ nest g s users
```

## CRUD
项目中引入了 @nestjsx/crud， 简单的 CRUD 可以不需要自己写具体代码实现，通过 `@crud` 可以方便得去实现 CRUD。

具体可以查看[@nestjsx/crud的文档](https://github.com/nestjsx/crud/wiki/Controllers#getting-started)

需要按照 RESTFUL 规范的 API 去请求。

## Commit 

增加了 commit 规范检查，使用了比较通用的 Angular Commit 规范，详见 [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

你可以使用 `git commit` 命令来提交，也可以使用下面的命令：
 
```bash
# commit 
git cz -a
```

## DTO and Entity

DTO（数据传输对象）定义如何通过网络发送数据的对象， 是 API 层数据传输的对象定义。

Entity 是和数据库对应的数据对象，通过 typeorm 可以更加方便的操作数据库

## Swagger

根据 DTO 和 Nest 相应的 API 会自动生成 Swagger 文档

文档访问： `http://${config.hostname}:${config.port}/docs`
对应 Swagger 的 JSON 文件： `http://${config.hostname}:${config.port}/docs/json`

## Directory Structure

```text

|—— config     ===>     全局配置
|—— core       ===>     全局的 filter、interceptor、middleware 等只需要全局注册一次的文件
|—— feature    ===>     API
|—— shared     ===>     共享的 service、entity、utils 等，全局多次使用的文件

```

## Response

返回结构

```
# 请求成功
{
    status: 0,
    message: '请求成功',
    data: any
}

# 请求失败
{
    status: 1,
    message: string,
}
```

对应这个结构可以在前端全局做一个 interceptor，错误在 interceptor 中统一处理，通过 interceptor 后的数据就不需要做错误处理

## Attention

* dev 环境默认打开 typeorm 的 log，项目启动失败有可能是 sql 那边报 error

* dev 环境默认关闭 typeorm 的 synchronize，如果开启了，当数据库已有字段和对应的 entity 中定义字段的 type 和 length 不一样时，会对该字段做 drop 和 add 的操作，导致原来数据丢失。2019-6-27 之前的数据已经做过处理，保证对字段只是做 change 的操作




### proto submodule

init命令第一次下载proto代码 `yarn proto:init`

update命令同步proto repo`yarn proto:update`
(update后会自动将submodule切换到commit分支 注意提交前手动切换到master提交)

在`/proto`文件夹下push submodule

使用submodule会在main repo中生成一个proto的compare文件

建议先push submodule`/proto`文件夹下的代码再push main repo代码
