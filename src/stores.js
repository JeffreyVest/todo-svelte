import { writable, derived } from "svelte/store";

export const todos = createLocalStorageStore("todos", []);
export const selectedTodoId = createLocalStorageStore("selectedTodoId", -1);
export const selectedTodo = derived([todos, selectedTodoId],
    ([$todos, $selectedTodoId]) => $todos.find(x => x.id === $selectedTodoId));

function createLocalStorageStore(key, defaultValue) {
    var store = writable(JSON.parse(
        localStorage.getItem(key)) || defaultValue);
    store.subscribe(value =>
        localStorage.setItem(key, JSON.stringify(value)));
    return store;
}