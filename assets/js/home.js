const inputElem = document.querySelectorAll('.form-control');
let timout;
let clickedCheckbox = [];
let checkboxvalue = {};
// assigning each category their own background color
let getColor = new Map([
    ["Personal", "#1c2a43"],
    ["Work", "#d35400"],
    ["School", "#9400d3"],
    ["Cleaner", "#28a228"],
    ["Others", " #af851a"]

]);

window.onload = function() {
    $('.checkbox').each(function() {
        const checkboxId = this.value;

        checkboxvalue[checkboxId] = this.checked;

    })

    //adding the background color of categry div in display section 

    $('.list-category').each(function() {

        const elem = this;
        elem.style.backgroundColor = getColor.get(this.innerText);
    })

};
// changing the background color input when they are in focus
$(".form-control").focusin(function() {
    const tdElem = this.closest('td')
    tdElem.classList.toggle('toggle-color')
})
$(".form-control").focusout(function() {
    const tdElem = this.closest('td')
    tdElem.classList.toggle('toggle-color')
})

// $(".take-input-container").click(function() {
//     const elem = this;
//     const inputElem = $(elem).find('.form-control');
//     inputElem.focus();

// })

var clickCount = 0;
// for (elem of inputElem) {

//     elem.addEventListener("focusin", (event) => {
//         // console.log(event.target.parentNode.parentNode);
//         const parentNode = event.target.parentNode.parentNode;
//         ;

//         parentNode.classList.toggle('toggle-color')
//     });
//     elem.addEventListener("focusout", (event) => {
//         const parentNode = event.target.parentNode.parentNode;

//         parentNode.classList.toggle('toggle-color')

//     });

// }

function inputtoString(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

$("#addTask").click(function(ev) {
    ev.preventDefault();

    // var form = $("#newTodoList");
    // var url = form.attr('action');
    let description = $("#description-input").val()
        // removing any < or > for preventing possible code injection
    description = inputtoString(description);
    if (description.length == 0) {
        console.log("add description");
        // highlights the input text to write
        $("#description-input").focus()
        return;
    }
    let category = $("#category-select").val()
    if (category == 'blank') {
        // focus on category field
        $("#category-select").focus();
        return;
    }
    let dueDate = $("#due-date-input").val()


    if (dueDate !== "") {

        const localDate = new Date(dueDate);
        //getting date accordingn to requirement of project
        dueDate = localDate.toDateString().substring(4);


    }

    // let query=`description=${description}`;
    // creating object of all the paramaeters to make a query string
    // let query = new Object()
    // query.description = description;
    // query.category = category;
    // query.dueDate = dueDate;
    // // creating query like string with param method of jquery
    // let queryParam = $.param(query)
    let queryString = `?description=${description}&category=${category}&dueDate=${dueDate}`;

    $.ajax({
        url: `/add_todo/${queryString}`,
        type: "POST",
        success: function(data) {

            // Ajax call completed successfully

            let markup = ` <tr>
            <td colspan="2">
                <div class="list-container">

                    <div class="list-details d-flex align-items-center" style="width:80%;">
                        <span class=" checkbox-container" style="width:10px; margin-right:1rem; flex: none ">
                            <input type="checkbox" name="id" value="${data.id}" class="checkbox" style="color:green ">
                        </span>
                                <div class="list-description">
                                    <span class="desc">${data.description}</span>
                                    <div class="list-due-date"><i class="fa-solid fa-calendar-days "></i>&nbsp
                                       ${data.dueDate}
                                    </div>
                                </div>
                        </div>
                    <div class="list-category " style="margin-right: 1rem; background-color: ${getColor.get(data.category)} ">
                        ${data.category}
                    </div>
                </div>
            </td>
        </tr>`;
            tableBody = $("table tbody");
            tableBody.append(markup);
            // add this new task's checkbox to the  checkboxvalue[checkboxId]
            checkboxvalue[data.id] = false;
            // add color to this new div

        },
        error: function(data) {

            // Some error in ajax call
            alert("some Error");
        }
    });
});

$('.delete').on('click', function() {
    event.preventDefault();
    console.log("hello", event.target);
    let allId = '?id=';
    // $('.teClassh:checkbox:checked') 
    const checkedBox = $('.checkbox:checkbox:checked');
    // checking whether any checkbox is selected or not
    if (checkedBox.length == 0) {
        // console.log("no tasks selected")
        return;
    }
    checkedBox.each(function() {
        // finding the tr tag which ancestor to current checkbox
        // getting the ids for deleting and appending them for url paramaeter
        allId = allId + this.value + '&id='

        // also delete from checkboxvalue
        delete checkboxvalue[this.value];
        // deleting that task from dom
        this.closest('tr').remove();


    })

    allId = allId.slice(0, -4);


    $.ajax({
        url: `/delete_todo/${allId}`,
        method: 'POST',
        sucess: function(data) {
            console.log("successfully deleted")

        }
    }).fail(function() {
        console.log("cannot delete")
    })



})

// updating the active status of task
$(document).on('click', '.checkbox', function() {
    console.log("clicked");
    const checkboxElem = event.target;
    // check if its clicked already or not
    // push in arry when it's not present in the array
    if (!clickedCheckbox.includes(checkboxElem.value)) {
        clickedCheckbox.push(checkboxElem.value);
    }

    const trElem = this.closest('tr');
    // finding element with 'desc' class name in tr tag
    const descElem = $(trElem).find('.desc');
    //we only have one element with 'desc' class name
    // toggling the strike on text
    descElem[0].classList.toggle('text-decoration-line-through')
    const dueDateElem = $(trElem).find('.list-due-date');
    dueDateElem[0].classList.toggle('text-decoration-line-through')
        // call only when there's slight delay in checkbox click
    clearTimeout(timout);
    timout = setTimeout(function() {
        let allId = '?id=';

        let NumberOfTaskToBeUpdated = 0;

        for (let box of clickedCheckbox) {

            let currentCondition = $(`:checkbox[value=${box}]`)[0];
            if (currentCondition.checked == checkboxvalue[box]) {
                console.log("same value");
            } else {
                NumberOfTaskToBeUpdated++;
                console.log("different value");
                // updating the checked status of current checkbox in checkboxvalue 
                checkboxvalue[box] = currentCondition.checked;

                allId = allId + box + '&id='
            }
        }

        if (NumberOfTaskToBeUpdated == 0) {
            // all click on checkbox resulted with same as orginal
            // no need to update the server
            return;
        }
        // removies last of $id
        allId = allId.slice(0, -4);

        // making the ajax calls for only task whose active status changed
        $.ajax({
            url: `/update_todo/${allId}`,
            method: 'POST',
            sucess: function(data) {
                console.log("successfully updated")

            }
        }).fail(function() {
            console.log("cannot delete")
        })


    }, 1000)

})