import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import * as fs from 'fs'
import { prisma } from './prisma'


const app: Application = express()
const port: number = 3001
app.use(cors())
app.use(express.static('uploaded_images'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
const upload = multer()
app.post('/api/add-model', upload.single('flow'), async (req: Request, res: Response) => {
  const { instance, process } = req.body
  const file = req.file.buffer
  await save(file, instance, process)
  res.send('Model Saved!')
})

app.get('/api/get-models', async (req: Request, res: Response) => {
  const models = await prisma.model.findMany()
  models.forEach(model => {
    model.instance = JSON.parse(model.instance)
    model.fileName = `http://localhost:3001/${model.fileName}`
    model.process = JSON.parse(model.process)
  })
  res.send(models)
})

async function save(file, instance, process) {
  const fileName = `model-${Date.now()}.png`

  if (!fs.existsSync('uploaded_images')) {
    fs.mkdirSync('uploaded_images')
  }
  try {
    fs.writeFile(`uploaded_images/${fileName}`, file, (err) => {
      if (err) {
        console.log(err)
      }
    })
    await prisma.model.create({
      data: {
        fileName,
        instance,
        process
      }
    })
  } catch (e) {
    console.log(e)
  }
}

app.listen(port, function() {
  console.log(`App is listening on port ${port} !`)
})
