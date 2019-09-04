import * as Youch from 'youch'
import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Logger } from '../../shared/utils/logger'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  async catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    Logger.error('exception', JSON.stringify(exception))

    let message = exception.message
    let isDeepestMessage = false
    while (!isDeepestMessage) {
      isDeepestMessage = !message.message
      message = isDeepestMessage ? message : message.message
    }

    const errorResponse = {
      message: message || '请求失败',
      status: 1,
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      Logger.error(
        `Catch http exception at ${request.method} ${request.url} ${status}`,
      )

      response.status(status)
      response.header('Content-Type', 'application/json; charset=utf-8')
      response.send(errorResponse)
    } else {
      if (
        process.env.NODE_ENV !== 'production' &&
        !request.headers.xhr &&
        false
      ) {
        const youch = new Youch(exception, request.raw)

        const html = await youch
          .addLink(({ linkMessage }) => {
            const url = `https://cn.bing.com/search?q=${encodeURIComponent(
              `[adonis.js] ${linkMessage}`,
            )}`
            return `<a href="${url}" target="_blank" title="Search on bing">Search Bing</a>`
          })
          .toHTML()

        response.type('text/html')
        response.status(HttpStatus.INTERNAL_SERVER_ERROR)
        response.send(html)
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR)
        response.header('Content-Type', 'application/json; charset=utf-8')
        response.send(errorResponse)
      }
    }
  }
}
