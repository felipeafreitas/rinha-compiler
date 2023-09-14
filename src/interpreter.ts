//@ts-nocheck

const variableMap = new Map<string, unknown>()

function interpreter(node: unknown, context: unknown) {
    console.log({initialNode: node})

    switch (node.kind) {
        case 'Print':
            console.log(interpreter(node.value))
            break;
        case 'Str':
            return node.value
        case 'Let':
            variableMap.set(node.name.text, interpreter(node.value));
            console.log('LET PARA FUNCAO', node.name.text, node.value)
            break;
        case 'Int':
            return node.value
        case 'Function':
            interpreter(node.value)
            const params = node.parameters.map((param: any) => param.text)

            return (...params) => interpreter(node.value, params)
        case 'If':
            return interpreter(node.condition) ? interpreter(node.then) : interpreter(node.otherwise)
        case 'Binary':
            const left = interpreter(node.lhs)
            const right = interpreter(node.rhs)
            const operator = node.operator

            switch (operator) {
                case 'Lt':
                    return left < right
                case 'Sub':
                    return left - right
                case 'Add':
                    return left + right
                default:
                    return
            }
        case 'Var':
            return variableMap.get(node.text)
        case 'Call':
            return variableMap.get(node.text)(node.arguments.map(interpreter))
        default:
            return
    }
}

export default interpreter