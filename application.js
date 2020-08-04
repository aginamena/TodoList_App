/* This file combines the backbone and script.js */

import {Categories, Category, TodoItem} from "./index.js";
import {categories, createCategory, displayCategoryTodoItems, displayTodoItem} from "./script.js";

const addNewItem = document.querySelector("#addNewItem");
const form = document.querySelector("form");
export const todos = document.querySelector("#listOfTodoItems");
export const todoItemsName = document.querySelector("#todoItems");
export const listOfCategories = document.querySelector("#listOfCategories");
const addNewCategory = document.querySelector("#addNewCategory");
const enterItem = document.querySelector("#enter");

/*addNewItem button */
addNewItem.addEventListener("click", () => {
  form.style.display = "block";
  todos.style.display = "none";
});

/*cancel button */
const cancelNewItem = document.querySelector("#cancel");
cancel.addEventListener("click", () => {
  form.style.display = "none";
  todos.style.display = "block";
  let nameOfCategory = todoItemsName.textContent.substring(15);
  displayCategoryTodoItems(nameOfCategory);
})

/*enter todoitem */
enterItem.addEventListener("click", () => {
  let Title = form.querySelector("[name = title]").value;
  let Description = form.querySelector("[name = Description]").value;
  let Duedate = form.querySelector("[name = dueDate]").value;
  let Priority = form.querySelector("[name = Priority]:checked")
  if(Priority != null)Priority = Priority.value;
  let CheckList= form.querySelector("[name = checkList]:checked");
  if(CheckList != null) CheckList = CheckList.value;
  let Note = form.querySelector("[name = note]").value;

  if(Title.length > 0 && Duedate.length > 0 && Priority != null
  && CheckList != null){
    let todoItem = new TodoItem(Title, Description, Duedate, Priority, CheckList, Note);
    let nameOfCategory = todoItemsName.textContent.substring(15);
    categories.getCategoryByName(nameOfCategory).addNewTodoListItem(todoItem);
    /* we close the form */
    form.style.display = "none";
    todos.style.display = "block";
    displayCategoryTodoItems(nameOfCategory);
  }

});

/* if the user clicks on edit, we change the name of the category
or if the user clicks on delete, we delete the category or if the
user clicks on text, we display todolist items for that category */
listOfCategories.addEventListener("click", (event) =>{
  let clicked = event.target;
  if(clicked.id == "editCategoryName"){
    let newCategoryName = window.prompt("Change name of category");
    if(newCategoryName != null && newCategoryName.length > 0){
      let categoryNameExists = categories.categoryInCategories(new Category(newCategoryName));
      if(categoryNameExists) {
        window.alert("Every category must have a unique name");
        return;
      }
      /* we get the text which is the previous sibling of edit */
      let previousElement = clicked.previousSibling;
      let oldCategoryName = previousElement.textContent;
      previousElement.textContent = newCategoryName;
      categories.changeCategoryName(oldCategoryName, newCategoryName);
      todoItemsName.textContent = "Todo Items for "+ newCategoryName;
    }
  }
  if(clicked.id == "delete"){
    /* we delete the clicked category and go back to the default category */
    let parentElement = clicked.parentElement;
    let firstChild = parentElement.firstChild;
    let clickedCategory = categories.getCategoryByName(firstChild.textContent);
    categories.deleteCategory(clickedCategory);
    listOfCategories.removeChild(parentElement);
    let defaultCategory = listOfCategories.children[0].textContent;
    todoItemsName.textContent = "Todo Items for "+ defaultCategory;
    displayCategoryTodoItems(defaultCategory);
  }
  if(clicked.id == "text"){
    /* when the user clicks a project, we've to show all todo items in that
    project */
    let text = clicked.textContent;
    todoItemsName.textContent = "Todo Items for "+ text;
    displayCategoryTodoItems(text);
  }

});

/*todos holds the list of todo items */
todos.addEventListener("click", (event) =>{
  let clickedEvent = event.target;
  let nodes = Array.prototype.slice.call(todos.children );
  let todoListIndex = nodes.indexOf( clickedEvent.parentElement);
  if(clickedEvent.id == "removeTodoList"){
    /* we get the index of the todoList item in the dom
    and remove it from the dom and display the todoList category
    in the dom*/
    let nameOfCategory = todoItemsName.textContent.substring(15);
    categories.getCategoryByName(nameOfCategory).removeTodoListItem(todoListIndex);
    todos.removeChild(clickedEvent.parentElement);
    displayCategoryTodoItems(nameOfCategory);
  }
  if(clickedEvent.id == "editTodoList"){
    /* when the user clicks on edit, the form opens for editing */
    form.style.display = "block";
    todos.style.display = "none";
    let nameOfCategory = todoItemsName.textContent.substring(15);
    let todoList = categories.getCategoryByName(nameOfCategory).getTodoListItem(todoListIndex);
    form.querySelector("[name = title]").value = todoList.getTitle();
    form.querySelector("[name = Description]").value = todoList.getDescription();
    form.querySelector("[name = dueDate]").value = todoList.getDueDate();
    form.querySelector("[value = "+todoList.getPriority() +"]").checked = true;
    form.querySelector("[value = "+todoList.getCheckList() +"]").checked = true;
    form.querySelector("[name = note]").value = todoList.getNote();

  }
});

/*add new category button */
addNewCategory.addEventListener("click", ()=>{
    let newCategoryName = window.prompt("Enter new category name");
    if(newCategoryName != null && newCategoryName.length > 0){
      let newCategory = new Category(newCategoryName);
      let categoryNameExists = categories.categoryInCategories(newCategory);
      if(categoryNameExists) {
        window.alert("Every category must have a unique name");
        return;
      }
      createCategory("addDeleteButton", newCategory, false);
    }
});
