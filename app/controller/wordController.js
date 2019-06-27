import wordRepo from '../repo/word'

async function Get(req, res) {
    try {
        const reqWord = req.query.words || ''
        //get result 
        const result = await wordRepo.getWord(reqWord)
        
        //send response
        res.send({ok: true, data: result.rows})
    } catch (e) {
        console.error(e)
        res.status(500).send({
            ok: false, 
            message: "internal server error"
        })
    }
}

async function Post(req, res) {
    try {
        const reqWord = req.body.words || ''
        
        //save words
        await wordRepo.postWord(reqWord)

        const old = req.body.old || ''

        //get result 
        const result = await wordRepo.getWord(`${reqWord} ${old}`)
        
        //send response
        res.send({ok: true, data: result.rows})
    } catch (e) {
        console.error(e)
        res.status(500).send({
            ok: false, 
            message: "internal server error"
        })
    }
}

export default { Get, Post }