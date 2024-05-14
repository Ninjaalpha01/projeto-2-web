export class List {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.items = [];
        this.functions = [];
        this.createdAt = new Date();
    }

    static fromJSON(json) {
        const obj = JSON.parse(json);
        const list = new List(obj.name);
        list.id = obj.id;
        list.items = obj.items;
        list.functions = obj.functions;
        return list;
    }

    addItem(item) {
        this.items.push(item);
    }
}
