/**
 * order
 * yarn run addfile [FILENAME]
 */
const { existsSync, mkdirSync, writeFileSync, readFileSync } = require('fs')
const path = require('path')
const inquirer = require('inquirer')

// @ts-ignore
const argv = process.argv
argv.splice(0, 2)
if (argv.length === 0) {
  throw new Error('必须输入文件名称')
}
const nameMap = createFileName()
isFileExist()
// 判断文件是否已经生成了
function isFileExist() {
  let fileExistStatus = existsSync(path.resolve(nameMap.dirName))
  if (fileExistStatus) {
    throw new Error(`ERROR! ${createFileName} already exists`)
  }
  createFile()
}
//生成所有需要的name
function createFileName() {
  let fileName = argv[0]
  let dirName = `src/feature/${fileName}`,
    controllerName = `${dirName}/${fileName}.controller.ts`,
    serviceName = `${dirName}/${fileName}.service.ts`,
    dtoName = `${dirName}/dto/${fileName}.dto.ts`,
    entityName = `${dirName}/entity/${fileName}.entity.ts`,
    interfaceName = `${dirName}/interface/${fileName}.interface.ts`,
    serviceClassName = '',
    controllerClassName = '',
    entityClassName = '',
    nameWithUnderline = '',
    dtoClassName = ''
  if (fileName.indexOf('-') > -1) {
    let nameArr = fileName.split('-')
    let nameFormatter = formatterName(nameArr)
    serviceClassName = `${nameFormatter.name}Service`
    controllerClassName = `${nameFormatter.name}Controller`
    entityClassName = `${nameFormatter.name}Entity`
    dtoClassName = `${nameFormatter.name}Dto`
    nameWithUnderline = nameFormatter.nameWithUnderline
  } else {
    serviceClassName = `${firstUpperCase(fileName)}Service`
    controllerClassName = `${firstUpperCase(fileName)}Controller`
    entityClassName = `${firstUpperCase(fileName)}Entity`
    dtoClassName = `${firstUpperCase(fileName)}Entity`
    nameWithUnderline = fileName
  }
  return {
    dirName,
    fileName,
    controllerName,
    serviceName,
    dtoName,
    entityName,
    interfaceName,
    serviceClassName,
    controllerClassName,
    dtoClassName,
    entityClassName,
    nameWithUnderline,
  }
}
//创建文件
function createFile() {
  try {
    mkdirSync(path.resolve(nameMap.dirName))
    mkdirSync(path.resolve(`${nameMap.dirName}/dto`))
    mkdirSync(path.resolve(`${nameMap.dirName}/entity`))
    mkdirSync(path.resolve(`${nameMap.dirName}/interface`))
    createControllerFile(nameMap.controllerName)
    createServiceFile(nameMap.serviceName)
    createDtoFile(nameMap.dtoName)
    createEntityFile(nameMap.entityName)
    createInterfaceFile(nameMap.interfaceName)
    pourIntoFeatureModule()
  } catch (error) {
    throw new Error(error)
  }
}

function createControllerFile(filePath) {
  let info = `import { Controller } from '@nestjs/common';
\n@Controller('TEMP')
export class ${nameMap.controllerClassName} {}
  `
  writeFileSync(filePath, info)
}
function createServiceFile(filePath) {
  let info = `import { Injectable } from '@nestjs/common';
\n@Injectable()
export class ${nameMap.serviceClassName} {}
  `
  writeFileSync(filePath, info)
}
function createDtoFile(filePath) {
  let info = `import { ApiModelProperty } from '@nestjs/swagger'
\nexport class ${nameMap.dtoClassName} {
  @ApiModelProperty()
    readonly id: number
}`
  writeFileSync(filePath, info)
}
function createEntityFile(filePath) {
  let info = `import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from '../../../shared/entities/common.entity'\n
@Entity('${nameMap.nameWithUnderline}')
export class ${nameMap.entityClassName} extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number
}`
  writeFileSync(filePath, info)
}
function createInterfaceFile(filePath) {
  let info = `export interface DemoDto {
  DEMO_PATH: string
}`
  writeFileSync(filePath, info)
}

//注入文件
function pourIntoFeatureModule() {
  let featureModule = readFileSync(
    path.resolve('./src/feature/feature.module.ts'),
    {
      encoding: 'UTF8',
    },
  )

  let importStep = featureModule.split("import config from '../config'")
  importStep[0] += `import { ${nameMap.controllerClassName} } from './${nameMap.fileName}/${nameMap.fileName}.controller'
import { ${nameMap.serviceClassName} } from './${nameMap.fileName}/${nameMap.fileName}.service'
import { ${nameMap.entityClassName} } from './${nameMap.fileName}/entity/${nameMap.fileName}.entity'
import config from '../config'`
  featureModule = importStep.join('')
  let ENTITIESStep1 = featureModule.split('@Module({')
  let ENTITIESStep2 = ENTITIESStep1[0].split(']')
  ENTITIESStep2[0] += `  ${nameMap.entityClassName},
  ]`
  ENTITIESStep1[0] = ENTITIESStep2.join('')
  featureModule = ENTITIESStep1.join(`@Module({`)
  let controllersStep1 = featureModule.split('controllers: [')
  let controllersStep2 = controllersStep1[1].split('providers: [')
  let controllersStep3 = controllersStep2[0].split(']')
  controllersStep3[1] += ']'
  controllersStep2[0] = controllersStep3.join(
    `  ${nameMap.controllerClassName}`,
  )
  controllersStep1[1] = controllersStep2.join(`providers: [`)
  let providersStep1 = controllersStep1
    .join(`controllers: [`)
    .split('providers: [')
  providersSte2 = providersStep1[1].split(']')
  providersSte2[0] += `  ${nameMap.serviceClassName},
  ]`
  providersStep1[1] = providersSte2.join('')
  featureModule = providersStep1.join(`,\n  providers: [`)
  writeFileSync(path.resolve('./src/feature/feature.module.ts'), featureModule)
}

function formatterName(arr) {
  let temp = []
  arr.map(str => {
    temp.push(firstUpperCase(str))
  })
  return { name: temp.join(''), nameWithUnderline: arr.join('_') }
}
//首字母大写
function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
}
