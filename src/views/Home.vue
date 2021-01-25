<template>
  <div class="root">

    <div class="root__input">
      <b-field label="To Do: ">
          <b-input v-model="inputValue" @keyup.native.enter="onAdd" />
      </b-field>
      <b-button @click="onAdd">Add</b-button>
    </div>

    <ToDoItem
      v-for="item in todoList"
      :key="item.id"
      :todoId="item.id"
      :todoLabel="item.label"
      :todoChecked="item.checked"
    />

  </div>
</template>

<script lang="ts">
import { uuid } from 'vue-uuid';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import ToDoItem from '@/components/ToDoItem.vue';

const todos = namespace('todos');

@Component({
  components: { ToDoItem },
})
export default class HomePage extends Vue {
  // local data
  private inputValue = ''

  // store data
  @todos.State
  public todoList!: object

  // store mutations
  @todos.Mutation
  public addTodo!: (newTodo: object) => void

  // methods
  public onAdd(): void {
    if (!this.inputValue.trim()) return;

    const newTodoElement: object = {
      id: uuid.v4(),
      label: this.inputValue,
      checked: false,
    };

    this.addTodo(newTodoElement);

    this.inputValue = '';
  }
}
</script>

<style lang="scss">
  .root {
    padding: 50px 20%;

    &__input {
      display: flex;
      align-items: flex-end;
      padding-bottom: 20px;

      .field:not(:last-child) {
        width: 100%;
        margin: unset;
      }
    }
  }
</style>
