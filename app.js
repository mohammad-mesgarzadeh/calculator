const display = document.getElementById('display')
const clear = document.getElementById('clear')
const equal = document.getElementById('equal')
const del = document.getElementById('delete')
const buttons = document.querySelectorAll('.btn')

const fEqual = function () {
    if (display.value.trim() === '' || display.value === 'Error') {
        return;
    }
    try {
        display.value = eval(display.value);
    } catch {
        display.value = display.value;

    }
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentValue = display.value;
        const clickedValue = btn.textContent;
        const operators = ['+', '-', '*', '/', '%','.'];
        const lastChar = currentValue.slice(-1);
        const isLastCharOperator = operators.includes(lastChar);

        if (operators.includes(clickedValue)) {
            if (currentValue === '') {

                if (clickedValue === ' ') {
                    display.value += clickedValue;
                }
                return;
            }

            if (isLastCharOperator) {
                return;
            }
            display.value += clickedValue;
        } else {

            display.value += clickedValue;
        }

    });
});

clear.addEventListener('click', () => {
    display.value = '';
})

del.addEventListener('click', () => {

    display.value = display.value.slice(0, -4)
})

equal.addEventListener('click', () => {

    fEqual()

})

document.addEventListener('keydown', (event) => {

    const key = event.key;
    let correspondingButton = null;

    if (!isNaN(parseInt(key)) || ['+', '-', '*', '/', '%','.'].includes(key)) {

        buttons.forEach(btn => {
            if (btn.textContent === key) {
                correspondingButton = btn;
            }
        });
    } else if (key === 'Enter') {
        fEqual();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        display.value = '';

    } else if (key === 'Delete') {
        display.value = display.value.slice(0, -1)


    }

    if (correspondingButton) {
        correspondingButton.click();
    }
});

