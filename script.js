/* With the backbone file, we can create catgories and display what they hold */

import {Categories, Category, TodoItem} from "./index.js";
import {todoItemsName, listOfCategories, todos} from "./application.js";

/* create category for each todoItem */
export function createCategory(deleteButton, newCategory, isDefaultCategory){
  let newElement = document.createElement("div");
  newElement.setAttribute("onMouseOver", "this.style.border = '1px solid black'");
  newElement.setAttribute("onMouseOut", "this.style.border = '0'");
  let text = document.createElement("div");
  text.id = "text";
  text.textContent = newCategory.getName();
  newElement.appendChild(text);
  newElement.style.cssText = "padding : 10px; height : 40px;"+
  "margin-top : 10px; cursor : pointer; font-size: 25px;";
  let editImage = document.createElement("img");
  editImage.src = "images/edit.png";
  editImage.id = "editCategoryName";
  editImage.style.cssText = "width : 50px; height : 40px; position : relative; left : 350px; top : -30px;";
  newElement.appendChild(editImage);
  listOfCategories.appendChild(newElement);
  /* the delete button isn't added to the default created category. But it's added to
  the user created category */
  if(deleteButton != "noDeleteButtonAdded"){
    let deleteButton = document.createElement("img");
    deleteButton.src = "images/delete.png";
    deleteButton.style.cssText = "width : 50px; height : 40px; position : relative; left : 400px; top : -30px;";
    deleteButton.id = "delete";
    newElement.appendChild(deleteButton);
  }
  /* add the new category to the list of categories */
  if(isDefaultCategory){
    todoItemsName.textContent = "Todo Items for "+ newCategory.getName();
  }
  categories.addNewCategory(newCategory);

}

/* disolayTodoItems for each category */
export function displayCategoryTodoItems(clicked){
  console.log(clicked);
  let clickedCategory = categories.getCategoryByName(clicked);
  console.log(clickedCategory);
  let todoList = clickedCategory.getAllTodoListItems();
  if(todoList.length == 0){
    todos.textContent = "Empty todo list";
    todos.style.cssText = "font-size : 20px; font-weight: bolder;";
  }else{
    todos.textContent = "";
    /* undo the center alignment */
      todos.style.cssText = " display : flex; flex-wrap : wrap;";
    for(let i = 0; i<todoList.length; i++){
      displayTodoItem(todoList[i]);
    }
  }
}

/* disolay each todoItem */
export function displayTodoItem(todoItem){
let container = document.createElement("div");
container.style.cssText = "border : 3px solid black; padding: 10px; margin : 15px; font-size : 20px; font-weight: bolder";
let remove = document.createElement("button");
remove.innerHTML = "Remove";
remove.id = "removeTodoList";
remove.style.cssText = "background-color : red; height : 40px; color : white; margin : 10px 10px 10px 0; cursor : pointer; width : 100px;";
let edit = document.createElement("button");
edit.innerHTML = "edit";
edit.id = "editTodoList";
edit.style.cssText = "background-color : blue; color : white; height : 40px; cursor : pointer; width : 100px;";
let text = document.createElement("div");
text.innerHTML = "Title:  "+todoItem.getTitle() + "<br>"+
                "Due date: "+todoItem.getDueDate()+"<br>"+
                "Priority: "+todoItem.getPriority()+"<br>"+
                "Checkist: "+todoItem.getCheckList()+"<br>";
container.appendChild(text);
container.appendChild(remove);
container.appendChild(edit);
todos.appendChild(container);


}
/* creates default category */
export let categories = new Categories();
createCategory("noDeleteButtonAdded", new Category("Default category"), true);
