import * as crypto from 'crypto'
import config from '../../config'

export function EncryptMd5(content: string) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

export function WXBizDataCrypt(
  sessionKey: string,
  encryptedData: string,
  iv: string,
) {
  // base64 decode
  const sessionKeyBase64 = new Buffer(sessionKey, 'base64')
  const encryptedDataBase64 = new Buffer(encryptedData, 'base64')
  const ivBase64 = new Buffer(iv, 'base64')
  let decoded
  try {
    // 解密
    const decipher = crypto.createDecipheriv(
      'aes-128-cbc',
      sessionKeyBase64,
      ivBase64,
    )
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    decoded = decipher.update(encryptedDataBase64, 'binary', 'utf8')
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded)
  } catch (err) {
    throw new Error('Illegal Buffer')
  }
  return decoded
}
