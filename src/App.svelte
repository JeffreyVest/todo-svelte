<script>
  import { todos, selectedTodoId, selectedTodo } from "./stores.js";
  import { auth, googleProvider, db } from "./firebase";
  import { authState } from "rxfire/auth";

  let user;

  const unsubscribe = authState(auth).subscribe(u => (user = u));

  function login() {
    auth.signInWithPopup(googleProvider);
  }

  let nextTodoText = "";

  function addTodo() {
    $todos = [
      {
        id: Date.now(),
        text: nextTodoText,
        done: false
      },
      ...$todos
    ];
    nextTodoText = "";
  }

  function deleteTodo(todo) {
    $todos = $todos.filter(x => x.id !== todo.id);
  }

  function selectTodo(todo) {
    $selectedTodoId = todo.id;
  }

  function completeTodo(todo) {
    $todos.find(x => x.id === todo.id).done = true;
  }

  function save() {
    db.collection("todos")
      .doc(user.uid)
      .set({ todos: $todos });
  }

  async function get() {
    const doc = await db
      .collection("todos")
      .doc(user.uid)
      .get();
    $todos = doc.data().todos;
  }
</script>

<main class="container mx-auto flex">
  {#if user}
    <div class="w-1/2 pr-10">
      <button on:click={save}>Save</button>
      <button on:click={get}>Get</button>
      <form on:submit|preventDefault={addTodo} autocomplete="off">
        <input class="w-full mb-3" type="text" bind:value={nextTodoText} />
      </form>
      {#each $todos as todo (todo.id)}
        <div
          class:bg-gray-200={$selectedTodoId === todo.id}
          on:click={() => selectTodo(todo)}>
          <input type="checkbox" bind:checked={todo.done} />
          <span class="cursor-pointer" on:click={() => deleteTodo(todo)}>
            ❌
          </span>
          <span class:line-through={todo.done}>{todo.text}</span>
          <input type="text" bind:value={todo.imgSrc} />
        </div>
      {/each}
    </div>
    <div class="w-1/2">
      {#if $selectedTodo && $selectedTodo.imgSrc}
        <div class="max-w-sm p-5 rounded-lg shadow-lg">
          <img
            src={$selectedTodo.imgSrc}
            alt={$selectedTodo.text + ' - image'} />
        </div>
      {/if}
    </div>
  {:else}
    <button on:click={login}>Signin with Google</button>
  {/if}
</main>
