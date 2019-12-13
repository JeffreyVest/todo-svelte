<script>
  import { todos, selectedTodoId, selectedTodo } from "./stores.js";

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
</script>

<style>
  main {
    padding: 50px;
    display: flex;
  }

  .column {
    flex: 50%;
  }

  .nextTodo {
    width: 500px;
  }

  .button {
    cursor: pointer;
  }

  .complete-todos {
    text-decoration-line: line-through;
  }

  img {
    max-height: 800px;
  }

  .selected {
    background-color: lightyellow;
  }
</style>

<main>
  <div class="column">
    <form on:submit|preventDefault={addTodo} autocomplete="off">
      <input class="nextTodo" type="text" bind:value={nextTodoText} />
    </form>
    {#each $todos as todo (todo.id)}
      <div
        class:selected={$selectedTodoId === todo.id}
        on:click={() => selectTodo(todo)}>
        <input type="checkbox" bind:checked={todo.done} />
        <span class="button" on:click={() => deleteTodo(todo)}>❌</span>
        <span class:complete-todos={todo.done}>{todo.text}</span>
        <input type="text" bind:value={todo.imgSrc} />
      </div>
    {/each}
  </div>
  <div class="column">
    {#if $selectedTodo && $selectedTodo.imgSrc}
      <img src={$selectedTodo.imgSrc} alt={$selectedTodo.text + ' - image'} />
    {/if}
  </div>
</main>
