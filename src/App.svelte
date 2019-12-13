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

<main class="container mx-auto flex">
  <div class="w-1/2 pr-10">
    <form on:submit|preventDefault={addTodo} autocomplete="off">
      <input class="w-full mb-3" type="text" bind:value={nextTodoText} />
    </form>
    {#each $todos as todo (todo.id)}
      <div
        class:bg-gray-200={$selectedTodoId === todo.id}
        on:click={() => selectTodo(todo)}>
        <input type="checkbox" bind:checked={todo.done} />
        <span class="cursor-pointer" on:click={() => deleteTodo(todo)}>❌</span>
        <span class:line-through={todo.done}>{todo.text}</span>
        <input type="text" bind:value={todo.imgSrc} />
      </div>
    {/each}
  </div>
  <div class="w-1/2">
    {#if $selectedTodo && $selectedTodo.imgSrc}
      <div class="max-w-sm p-5 rounded-lg shadow-lg">
        <img src={$selectedTodo.imgSrc} alt={$selectedTodo.text + ' - image'} />
      </div>
    {/if}
  </div>
</main>
