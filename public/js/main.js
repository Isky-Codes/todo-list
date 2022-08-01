const deleteBtn = document.querySelectorAll('.fa-trash'); //Initiates a variable and assigning it all elements with the class of .fa-trash
const item = document.querySelectorAll('.item span'); //Initiates a variable and assigs it all span tags inside of a parent with a class of .item
const itemCompleted = document.querySelectorAll('.item span.completed'); //Initiates a variable and assigns it all spans with the completed class inside the parent with a class of .item

Array.from(deleteBtn).forEach((element)=>{ //creates an array of all deleteBtn elements and loops through each element in the array
    element.addEventListener('click', deleteItem); //adds an event listener to the current item and listens for a click where the deleteItem function will then run.
}); //Closes loop

Array.from(item).forEach((element)=>{ //creates an array of all item selections and loops through each element in the array
    element.addEventListener('click', markComplete); //adds an event listener to the current item and listens for a click where the markComplete function will then run.
}); //Closes loop

Array.from(itemCompleted).forEach((element)=>{ //creates an array of all itemCompleted selections and loops through each element in the array
    element.addEventListener('click', markUnComplete); //adds an event listener to the current element and listens for a click where markUnComplete function will be called
}); //Closes loop

async function deleteItem(){ //Declares an asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText; //looks inside of the list item and grabs only the inner text within the list span.
    try{ //declares a try block
        const response = await fetch('deleteItem', { //creates a response variable and assigns it to await a fetch request to get data from the result of deleteItem route
            method: 'delete', // sets the CRUD method for the route
            headers: {'Content-Type': 'application/json'}, //tells the headers what content type to expect in this case json data.
            body: JSON.stringify({ // declares the message content, and converts the data to JSON
              'itemFromJS': itemText //setting the content of the body as to the inner text of the list item, and naming it 'itemFromJS'
            })//closes the declaration of the body
          }); //closes the callback
        const data = await response.json(); //waits on JSON from the response to be converted
        console.log(data); //console logs the data variable
        location.reload(); //reloads the page to update what is displayed

    }catch(err){ //declares the catch block
        console.log(err); //console.logs the error
    }//closes catch block
} //ends function declaration

async function markComplete(){ //declares asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText; // looks inside of the list item and grabs only the inner text within the list span.
    try{ //declares a try block
        const response = await fetch('markComplete', { //creates a response variable that waits on a fetch to get data from the result of the markComplete route
            method: 'put', //Setting the CRUD method to "update" for the route
            headers: {'Content-Type': 'application/json'}, //specifying type of content expected, JSON in this case
            body: JSON.stringify({ //declares the message content being passed, and stringifys that content into JSON
                'itemFromJS': itemText //setting the content of the body as to the inner text of the list item, and naming it 'itemFromJS'
            })//closes the declaration of the body
          });//closes the callback
        const data = await response.json(); //waits on JSON from the response to be converted
        console.log(data); //console logs the data variable
        location.reload(); //reloads the page to update what is displayed

    }catch(err){ //declares the catch block
        console.log(err); //console.logs the error
    }//closes catch block
} //ends function declaration

async function markUnComplete(){ //declares asynchronous function
    const itemText = this.parentNode.childNodes[1].innerText; // looks inside of the list item and grabs only the inner text within the list span.
    try{ //declares a try block
        const response = await fetch('markUnComplete', { //creates a response variable that waits on a fetch to get data from the result of the markUnComplete route
            method: 'put', //Setting the CRUD method to "update" for the route
            headers: {'Content-Type': 'application/json'}, //specifying type of content expected, JSON in this case
            body: JSON.stringify({ //declares the message content being passed, and stringifys that content into JSON
                'itemFromJS': itemText //setting the content of the body as to the inner text of the list item, and naming it 'itemFromJS'
            }) //closes the declaration of the body
          }); //closes the callback
        const data = await response.json(); //waits on JSON from the response to be converted
        console.log(data); //console logs the data variable
        location.reload(); //reloads the page to update what is displayed

    }catch(err){ //declares the catch block
        console.log(err); //console.logs the error
    } //closes catch block
} //ends function declaration