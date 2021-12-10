interface CNode{
	_value: any
	next: CNode | null
	getValue: () => any
	setValue: (any)
}

class NodeC implements CNode{
	_value: any
	next: NodeC | null

	pikachu(){}

	getValue():any{
		return this._value
	}

	setValue(val: any){
		this._value = val
	}
}

let pk: CNode = new NodeC
pk.setValue(54)

console.log(pk.getValue())
