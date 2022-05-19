const inputElem = document.querySelectorAll('.form-control');



for (elem of inputElem) {

    elem.addEventListener("focusin", (event) => {
        console.log(event.target.parentNode.parentNode);
        const parentNode = event.target.parentNode.parentNode;

        parentNode.classList.toggle('toggle-color')
    });
    elem.addEventListener("focusout", (event) => {
        const parentNode = event.target.parentNode.parentNode;

        parentNode.classList.toggle('toggle-color')

    });

}
// $('input[type="checkbox"]').click(function() {
//     if ($(this).is(':checked')) {
//         console.log('checked')
//     } else if ($(this).is(":not(:checked)")) {
//         console.log("Checkbox is unchecked.");
//     }
// })

const checkbox = document.querySelectorAll('.checkbox');



for (let elem of checkbox) {

    elem.addEventListener("click", (event) => {
        console.log("Checkbox")
        location.href = `/update/?id=${elem.value}`
        if (elem.checked == true) {
            console.log(elem.value)

            console.log("checked")

        } else {
            console.log("unchecked")
        }

    });

}
// $('.delete').click(function(){

//    for(let task of checkbox ){
//     (elem.checked == true)

//    }


// })