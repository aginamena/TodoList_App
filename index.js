/*This file is the backbone of this application. It shows the classes required
for this application */

/* TodoItem class */
export class TodoItem{
  constructor(title, descripton, dueDate, priority,
  checkList, note){
    this.title = title;
    this.descripton = descripton;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checkList = checkList;
    this.note = note;
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.descripton;
  }
  getDueDate(){
    return this.dueDate;
  }
  getPriority(){
    return this.priority;
  }
  getCheckList(){
    return this.checkList;
  }
  getNote(){
    return this.note;
  }
}

/*Category class */
export class Category{
  constructor(name){
    this.name = name;
    this.todoList = [];
  }
  addNewTodoListItem(todoList){
    this.todoList.push(todoList);
  }
  removeTodoListItem(todoListIndex){
    let list = this.todoList[todoListIndex];
    this.todoList.splice(todoListIndex,  1);
  }
  setName(newName){
    this.name = newName;
  }
  getName(){
    return this.name;
  }
  getAllTodoListItems(){
    return this.todoList;
  }
  getTodoListItem(index){
    for(let i = 0; i<this.todoList.length; i++){
      if(i == index) return this.todoList[i];
    }
  }
}

/* Categories class */
export class Categories{
  constructor(){
    this.categories = [];
  }
  addNewCategory(category){
    this.categories.push(category);
  }
  changeCategoryName(oldCategoryName, newCategoryName){
    for(let i = 0; i<this.categories.length; i++){
      if(oldCategoryName === this.categories[i].getName()){
        this.categories[i].setName(newCategoryName);
      }
    }
  }
  deleteCategory(category){
    for(let i = 0; i<this.categories.length; i++){
      let t = false, it = 0;
      if(this.categories[i].getName() == category.getName()){
        /* we remove category from categories at index i */
        this.categories.splice(i, 1);
        break;
      }
    }
  }
  getCategoryByName(nameOfCategory){
    for(let i = 0; i<this.categories.length; i++){
      if(this.categories[i].getName() == nameOfCategory) return this.categories[i];
    }
  }
  categoryInCategories(category){
    for(let i = 0; i<this.categories.length; i++){
      if(this.categories[i].name === category.name) return true;
    }
    return false;
  }
}
