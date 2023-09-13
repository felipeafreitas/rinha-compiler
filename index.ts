import fs from 'fs'

function main() {
	fs.readFile('./fi.rinha.json', 'utf-8', (err, data) => {
		if (err) {
			console.error(err)
			return
		}
		const ast = JSON.parse(data)
		console.log(ast)
	})
}

main()
