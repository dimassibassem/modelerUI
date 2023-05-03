import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import * as fs from 'fs'
import { prisma } from './prisma'
import * as process from 'process'

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
  const model = await save(file, instance, process)
  res.send({ id: model.id })
})

async function update(file: any, instance: any, process: any, number: number) {
  const model = await prisma.model.update({
    where: {
      id: number
    },
    data: {
      instance,
      process
    }
  })
  if (model) {
    await fs.promises.writeFile(`uploaded_images/${model.fileName}`, file)
  }
  return model

}

app.put('/api/update-model/:id', upload.single('flow'), async (req: Request, res: Response) => {
  const { id } = req.params
  const { instance, process } = req.body
  const file = req.file.buffer
  const model = await update(file, instance, process, Number(id))
  res.send({ id: model.id })
})

app.get('/api/get-models', async (req: Request, res: Response) => {
  const models = await prisma.model.findMany()
  models.forEach(model => {
    model.instance = JSON.parse(model.instance)
    model.fileName = `${process.env.SERVER_ENDPOINT}/${model.fileName}`
    model.process = JSON.parse(model.process)
  })
  res.send(models)
})

app.get('/api/get-model/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const model = await prisma.model.findUnique({
    where: {
      id: Number(id)
    }
  })
  if (model) {
    const response = {
      instance: JSON.parse(model.instance),
      process: JSON.parse(model.process)
    }
    res.send(response)
  } else {
    res.status(404).send('Model not found')
  }
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
    return await prisma.model.create({
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
