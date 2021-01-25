<template>
  <div :class="['todo', { 'todo--done': todoChecked }]">
    <b-field>
      <b-checkbox v-model="localChecked">{{ todoLabel }}</b-checkbox>
    </b-field>
    <span class="todo__remove" @click="onDelete">X</span>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
} from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const todos = namespace('todos');

@Component
export default class ToDoItem extends Vue {
  // props
  @Prop({ required: true }) readonly todoId!: string;

  @Prop() readonly todoLabel!: string;

  @Prop() readonly todoChecked!: boolean

  // computed
  get localChecked(): boolean {
    return this.todoChecked;
  }

  set localChecked(value: boolean) {
    this.changeTodoStatus(this.todoId);
  }

  // store actions
  @todos.Mutation
  public changeTodoStatus!: (id: string) => void

  @todos.Mutation
  public removeTodo!: (id: string) => void

  // local methods
  public onDelete(): void {
    this.removeTodo(this.todoId);
  }
}

</script>

<style lang="scss">
  .todo {
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;

    &--done {
      text-decoration: line-through;
    }

    &__remove {
      cursor: pointer;
    }
  }
</style>
