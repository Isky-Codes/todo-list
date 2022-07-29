const deleteBtn = document.querySelectorAll('.fa-trash'); //Initiates a variable and assigning it all elements with the class of .fa-trash
const item = document.querySelectorAll('.item span'); //Initiates a variable and assigs it all span tags inside of a parent with a class of .item
const itemCompleted = document.querySelectorAll('.item span.completed'); //Initiates a variable and assigns it all spans with the completed class inside the parent with a class of .item

Array.from(deleteBtn).forEach((element)=>{ //creates an arrat of all deleteBtn elements and runs a foreach that for each element
    element.addEventListener('click', deleteItem); //an event listener will be added where upon click, the deleteItem function will run
});

Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete);
});

Array.from(itemCompleted).forEach((element)=>{
    element.addEventListener('click', markUnComplete);
});

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText;
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          });
        const data = await response.json();
        console.log(data);
        location.reload();

    }catch(err){
        console.log(err);
    }
}

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText;
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          });
        const data = await response.json();
        console.log(data);
        location.reload();

    }catch(err){
        console.log(err);
    }
}

async function markUnComplete(){
    const itemText = this.parentNode.childNodes[1].innerText;
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          });
        const data = await response.json();
        console.log(data);
        location.reload();

    }catch(err){
        console.log(err);
    }
}