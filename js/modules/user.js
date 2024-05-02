export class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.lists = []
    }

    constructor(object) {
        const newUser = fromJSON(object);
        try {
            this.email = newUser.email;
            this.password = newUser.password;
            this.lists = newUser.lists;
            this.name = newUser.name;
        } catch(e) {
            console.error("Erro ao criar objeto User", e)
        }
    }

    toJSON() {
        return JSON.stringify(this);
    }

    fromJSON(object) {
        return JSON.parse(object);
    }
}
