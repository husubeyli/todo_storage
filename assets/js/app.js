function todoADD() {
  event.preventDefault();
  let content = document.querySelector("#input").value;

  const todos = {
    content,
    state: "active"
  };

  setStorage(todos);

  renderDOM(todos);
}

function deleteTodo(){
    if(confirm('Do you want delte todo')){
    btnIndex = $(this).attr('data-set')
    
    todos.splice(btnIndex, 1);
    
    window.localStorage.setItem('todos', JSON.stringify(todos))
    }   
    renderDOM(todos)
}




function getStorage() {
  let todo = [];
  let storage = window.localStorage.getItem("todos");
  if (storage !== null) {
    todo = JSON.parse(storage);
  }
  return todo;
}

let todos = getStorage();
console.log(todos);



function setStorage(value) {
  todos.push(value);
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function renderDOM() {
  document.querySelector("#main").innerHTML = "";
  todos.forEach((item, index) => {
    let list = document.createElement('div')
    let div = document.createElement("div");
    list.className = 'list'
    div.innerHTML =index+1 + '. ' + item.content;
    div.style.marginRight = '5px'
    let btnDlt = document.createElement('button');
    btnDlt.setAttribute('data-set', index)
    btnDlt.classList.add('delete-btn')
    btnDlt.innerHTML = 'X'
    
    list.append(div)
    list.append(btnDlt)

    document.querySelector("#main").append(list);
  });
}
$(document).on('click', '.delete-btn', deleteTodo)
renderDOM(todos);


