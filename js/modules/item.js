export class Item {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
    }

    constructor(object) {
        const newItem = fromJSON(object);
        try {
            this.id = newItem.id;
            this.name = newItem.name;
        } catch(e) {
            console.error("Erro ao criar objeto Item", e)
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }

    fromJSON(object) {
        return JSON.parse(object);
    }
}