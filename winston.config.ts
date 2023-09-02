import winston, { createLogger, format } from 'winston'
import * as util from 'util'

export const logger = createLogger({
  defaultMeta: { service: 'your-service-name' },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    utilFormatter(),
    format.colorize(),
    format.printf(({ level, message, label, timestamp }) => `${timestamp} ${label || '-'} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Stream({
      stream: process.stderr,
      level: 'debug'
    })
  ],
  exitOnError: false
})

function transform(info) {
  const args = info[Symbol.for('splat')]
  if (args) {
    info.message = util.format(info.message, ...args)
  }
  return info
}

function utilFormatter() {
  return { transform }
}
