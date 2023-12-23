import express from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
    id: string,
    content: string
    type: 'code' | 'text'
}

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router()
    router.use(express.json())

    const fullPath = path.join(dir, filename)
    const fileEncoding = 'utf-8'

    router.get('/cells', async (req, res) => {
        // read files
        try {
            const result = await fs.readFile(fullPath, {encoding: fileEncoding})
            res.send(JSON.parse(result))
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                // create file and add defualt cells
                await fs.writeFile(fullPath, '[]', fileEncoding)
                res.send([])
            } else {
                throw err
            } 
        }
    })

    router.post('/cells', async (req, res) => {
        // take the list of cells from the request object
        const { cells }: { cells: Cell [] } = req.body

        // serialise them 
        // write cells into the file
        await fs.writeFile(fullPath, JSON.stringify(cells), fileEncoding)

        res.send({ status: 'ok' })
    })

    return router
}