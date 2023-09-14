import { readFile } from 'fs'
import interpreter from './interpreter';

function main() {
	readFile('./files/fi.rinha.json', 'utf-8', (err, data) => {
		if (err) {
			console.error(err)
			return
		}
		const ast = JSON.parse(data)
		interpreter(ast.expression, {})
	})
}

main()
