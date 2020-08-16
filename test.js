const { fetchOne, fetchAll } = require('./pool')

const SQL1 = `SELECT now()`

const USERS = `SELECT user_id, username, name FROM users`

;(async () => {

	console.log(await fetchAll(USERS))

})()
