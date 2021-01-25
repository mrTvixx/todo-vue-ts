import {
  VuexModule, Module, Mutation,
} from 'vuex-module-decorators';

interface TodoElement {
  id: string;
  label: string;
  checked: boolean;
}

@Module({ namespaced: true, name: 'todos' })
class ToDo extends VuexModule {
  public todoList: Array<TodoElement> = []

  @Mutation
  public addTodo(newTodo: TodoElement): void {
    this.todoList.push(newTodo);
  }

  @Mutation
  public removeTodo(todoId: string): void {
    this.todoList = this.todoList.filter((item) => item.id !== todoId);
  }

  @Mutation
  public changeTodoStatus(todoId: string): void {
    this.todoList = this.todoList.map((item) => {
      if (todoId !== item.id) return item;

      return {
        ...item,
        checked: !item.checked,
      };
    });
  }
}

export default ToDo;
