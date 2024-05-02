export class List {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.items = []
        this.functions = []
    }

    constructor(object) {
        const newList = fromJSON(object);
        try {
            this.id = newList.id;
            this.name = newList.name;
            this.items = newList.items;
            this.functions = newList.functions;
        } catch(e) {
            console.error("Erro ao criar objeto List", e)
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            items: this.items,
            functions: this.functions
        }
    }

    fromJSON(object) {
        return JSON.parse(object);
    }

    addItem(item) {
        this.items.push(item);
    }
}