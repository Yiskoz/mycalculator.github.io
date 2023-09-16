// SELECTORS

    const $screen = document.querySelector('.screen');
        $screen.value = '';
    const $operationsList = document.getElementById('operationsList');
    const $buttons = document.querySelectorAll('.button');



//EVENT LISTENER FOR BUTTONS ["=" | "C" | "CA"]
    $buttons.forEach($button => {
        $button.addEventListener('click', (e) => {
            if(e.target.value === 'C') { //CLEAR
                let $stringLenght = $screen.value.length;
                let $stringLenghtMinusOnePosition = $stringLenght-1;
                let $newString = $screen.value.slice(0, $stringLenghtMinusOnePosition);
                $screen.value = $newString;
            } else if(e.target.value === '=') { //IS EQUAL TO ...
                calcOperation($screen.value);
            } else if(e.target.value === 'CA') { //CLEAR ALL
                $screen.value = "";
            } else { 
                $screen.value += e.target.value;
            }
        });
    });

//RESTRICTED CHARACTERS
    $screen.addEventListener('input', (e) => {
        const $screenValue = e.target.value;
        const $restrictedCharacters = /[^0-9+*-/]/g; //REGEX
        const $sanitize = $screenValue.replace($restrictedCharacters, ""); //
        e.target.value = $sanitize;
    });    



//OPERATION CALCULATION
    function calcOperation(operation) {
        let $result = eval(operation);
        if($result === undefined) {
            $screen.value = 'MATH ERROR';
            return;
        }
        $screen.value = $result
        //LAST OPERATIONS
        let $newLastOperation = document.createElement('P'); //LAST OPERATION ITEM CREATION
            $newLastOperation.classList.add('operation');

        const $lastOperations = document.createElement('P'); //LAST OPERATION TITLE CREATION
            $lastOperations.textContent = "Your last 5 operations";
            $lastOperations.classList.add('description', 'description--op');
        
        if($operationsList.children.length == 0) { 
            $operationsList.appendChild($lastOperations); //ADDS A TITLE IF CONDITION IS MET
        } else if($operationsList.children.length > 4) {
            $operationsList.children[1].remove(); //REMOVES THE LAST OPERATION AND KEEP MAX 5 ITEMS IF THE CONDITION IS MET
        }


        $newLastOperation.textContent = `${operation} = ${$result}`;
            $operationsList.appendChild($newLastOperation); //ADDS A NEW OPERATION TO LIST
    }
