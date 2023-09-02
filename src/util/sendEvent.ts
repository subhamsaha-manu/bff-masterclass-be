import { Request, Response } from 'express'

export type ChallengeData = {
  senderUserUuid: string
  toUserUuid: string
  challengeId: string
}
let challengeData = {} as ChallengeData

const getChallengeData = (): ChallengeData => {
  return challengeData
}

export const setChallengeData = (data: ChallengeData) => {
  challengeData = data
}

const SEND_INTERVAL = 1000

const writeEvent = (res: Response, sseId: string, data: string) => {
  res.write(`id: ${sseId}\n`)
  res.write(`data: ${data}\n\n`)
}

export const sendEvent = (req: Request, res: Response) => {
  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream'
  })

  const sseId = new Date().toDateString()

  setInterval(() => {
    if (challengeData.toUserUuid && challengeData.senderUserUuid) {
      console.log('challengeData', getChallengeData())
    }

    writeEvent(res, sseId, JSON.stringify(getChallengeData()))

    // if (getChallengeData().challengeId) {
    //   setChallengeData({} as ChallengeData)
    // }
  }, SEND_INTERVAL)

  writeEvent(res, sseId, JSON.stringify(getChallengeData()))
}
