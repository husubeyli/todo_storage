function todoADD() {
  event.preventDefault();
  let content = document.querySelector("#input").value;

  const todos = {
    content,
    state: "active"
  };
  if(todos.content === ''){
    alert("you list empty")
    // showAlert('.danger', 'Your List Empty')
    return
  }
//   showAlert('.success', 'Good')
  setStorage(todos);
  renderDOM(todos);
  content.value = ''
}

function deleteTodo(){
    if(confirm('Do you want delte todo')){
    btnIndex = $(this).attr('data-set')
    
    todos.splice(btnIndex, 1);
    
    window.localStorage.setItem('todos', JSON.stringify(todos))
    }   
    renderDOM(todos)
}

// function showAlert(type, message){
//     document.querySelector('#main').innerHTML =''

//     let alert = document.createElement('div')
//     alert.classList.add(type);
//     alert.innerHTML = message

//     document.querySelector('#main').prepend(alert)

//     setTimeout({ //buna ba sefdi
//         alert.remove()
//     }, 1000)
    
// }

function completedTodo(){
    liIndex = $(this).attr('data-set');
    this.classList.toggle('completed')
    if(todos[liIndex].state === 'active'){
        todos[liIndex].state = 'completed'
    } else {
        todos[liIndex].state = 'active'

    }
    window.localStorage.setItem('todos', JSON.stringify(todos))
}




// function showCompletedTodo(){
//     todoIndex = $('.li').attr('data-set')
//     renderDOM(todos[todoIndex].state === 'completed')
// }

// function setTimeDelete(){
//     // let liIndex = $(this).attr('data-set')
//     let liIndex = this.classList
//     console.log(liIndex);
    
//     setTimeout(function(){
//         if(confirm('do you want remove')){
//             liIndex.parentNode.removeChild(liIndex)
//         }
//     },1000)
// }



function getStorage() {
  let todo = [];
  let storage = window.localStorage.getItem("todos");
  if (storage !== null) {
    todo = JSON.parse(storage);
  }
  return todo;
}

let todos = getStorage();

function setStorage(value) {
  todos.push(value);
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function renderDOM() {
  document.querySelector("#main").innerHTML = "";
  todos.forEach((item, index) => {
    let ul = document.createElement('ul')
    let span = document.createElement('span');
    span.innerHTML = index+1+'. '
    let li = document.createElement("li");
    li.className = 'li'
    ul.className = 'list'
    li.setAttribute('data-set', index)
    li.classList.add('active')
    li.innerHTML =item.content;
    li.style.marginRight = '5px'
    let btnDlt = document.createElement('button');
    btnDlt.setAttribute('data-set', index)
    btnDlt.classList.add('delete-btn')
    btnDlt.innerHTML = 'X'
    ul.append(span)
    ul.append(li)
    ul.append(btnDlt)

    document.querySelector("#main").append(ul);
  });
}
// $(document).on('click', '.li', setTimeDelete)
$(document).on('click', '.delete-btn', deleteTodo)
$(document).on('click', '.li', completedTodo)


renderDOM(todos);


