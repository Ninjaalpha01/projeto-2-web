export class User {
    constructor(name, email, password, lists = []) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.lists = lists;
    }

    static fromJSON(json) {
        const obj = JSON.parse(json);
        return new User(obj.name, obj.email, obj.password, obj.lists);
    }
}
