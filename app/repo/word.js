import db from '../config/db'

//mapping and filter words to array
function mapWord(words) {
    const list = words.split(' ').map( e => {
        return e.trim().toLowerCase()
    }).filter( e => {
        return e != ""
    })

    return list
}

//save words to database
async function postWord(words) {
    const list = mapWord(words)

    //if empty words just return
    if (!list.length) return 

    const sql = `INSERT INTO words (word, freq)
        VALUES ($1, 1)
        ON CONFLICT (word)
        DO UPDATE SET freq = words.freq + 1
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
    const list = mapWord(words)
    const param = list.map((e, idx) => {
        idx = idx + 1

        return `$${idx}`
    }).join(',')

    const sql = `SELECT word,freq FROM words WHERE word IN (${param}) ORDER BY word`

    return await db.query(sql, list)

}

export default { getWord, postWord }