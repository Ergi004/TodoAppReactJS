"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Todo = void 0;
class Todo {
    constructor(id, taskName, description) {
        this.id = id;
        this.taskName = taskName;
        this.description = description;
    }
}
exports.Todo = Todo;
class User {
    constructor(id, userNAme, email, password) {
        this.id = id;
        this.userNAme = userNAme;
        this.email = email;
        this.password = password;
    }
}
exports.User = User;
