import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as fs from 'fs'
import { prisma } from './prisma'

const app: Application = express()

const port: number = 3001
app.use(cors())
app.use(express.static('uploaded_images'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/api/add-model', async (req: Request, res: Response) => {

  const { instance, dataURI } = req.body

  // transform dataURI to blob
  const blob = dataURItoBlob(dataURI)

  await save(blob, instance)

  res.send('Hello World!')
})

app.get('/api/get-models', async (req: Request, res: Response) => {
  const models = await prisma.model.findMany()
  models.forEach(model => {
    model.instance = JSON.parse(model.instance)
    model.fileName = `http://localhost:3001/${model.fileName}`
  })
  res.send(models)
})

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab: any = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  const ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString })

}

async function save(blob, instance) {

  const buffer = Buffer.from(await blob.arrayBuffer())
  const fileName = `model-${Date.now()}.png`
  await prisma.model.create({
    data: {
      fileName,
      instance: JSON.stringify(instance)
    }
  })
  fs.writeFile(`uploaded_images/${fileName}`, buffer, () => console.log('model saved!'))

}

app.listen(port, function() {
  console.log(`App is listening on port ${port} !`)
})
