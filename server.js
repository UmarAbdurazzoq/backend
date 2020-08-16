const express = require('express')
const { fetchAll, fetchOne } = require('./pool')

const PORT = 4000

const server = express()

server.use(express.json())

server.all('/*', function(request, response, next) {
	response.header('Access-Control-Allow-Origin', '*')
	response.header('Access-Control-Allow-Headers', '*')
	response.header('Access-Control-Allow-Methods', '*')
	next()
})

const messages = [
	{ message_id: 1, user_id: 1, body: 'Salom!', },
	{ message_id: 2, user_id: 2, body: 'Salom!', },
	{ message_id: 3, user_id: 2, body: 'Nima gap?', },
]

server.get('/users', async (req, res) => {

	const users = await fetchAll(`SELECT user_id, username, name FROM users`)

	res.send(users)
})

server.post('/users', async (req, res) => {

	const username = req.body.username
	const password = req.body.password
	const name = req.body.name

	const newUser = await fetchOne(
		`
			INSERT INTO users (password, username, name)
			VALUES ($1, $2, $3)
			RETURNING user_id, username, name
		`,

		password, username, name
	)

	if (newUser) {
		res.send(newUser)
	}
	else {
		res.status(503).end('Error')
	}
})

server.listen(PORT, () => console.log(PORT))
