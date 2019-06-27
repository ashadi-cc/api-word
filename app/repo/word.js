import db from '../config/db'

//mapping and filter words to array
function mapWord(words, lowerCase) {
    const list = words.split(' ').map( e => {
        if (lowerCase) {
            return e.trim().toLowerCase()
        }
        return e.trim()
    }).filter( e => {
        return e != ""
    })

    return list
}

//save words to database
async function postWord(words) {
    //if empty words just return

    const list = mapWord(words)

    if (!list.length) return 

    const sql = `INSERT INTO words (word)
        VALUES ($1)
        ON CONFLICT (word)
        DO NOTHING
    `
    
    //Begin transaction
    await db.query('BEGIN')
    
    //start insert word or update freq + 1 when exsist
    for (let i=0; i < list.length; i++) {
        await db.query(sql, [list[i]])
    }

    //End transaction
    await db.query('COMMIT')
}

//get words list from database
async function getWord(words) {
    const list = mapWord(words, true)
    const param = list.map((e, idx) => {
        idx = idx + 1

        return `$${idx}`
    }).join(',')

    const sql = `SELECT LOWER(word) AS word, COUNT(word) AS freq FROM words WHERE LOWER(word) IN (${param}) GROUP BY LOWER(word) ORDER BY word`

    return await db.query(sql, list)

}

export default { getWord, postWord }