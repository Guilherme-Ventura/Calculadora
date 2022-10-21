const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll(".buttons-container button");

class Calcular{
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
    }

    //adc digito na tela da calculadora
    addDigit(digit) {
        if(digit == "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

       this.currentOperation = digit;
       this.updateScreen();
    }
   
    processOperation(operation){
        //checar se o valor corrernte esta vazio
        if(this.currentOperationText.innerText == "" && operation != "C"){
            if(this.previousOperationText.innerText != ""){
                //mudanca de operacao
                this.changeOperetion(operation);
            }
            return;
        }

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break; 
           case "DEL":
                this.processDelOperator();
                break;
           case "CE":
                this.processClearOperation();
                break;               
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperation();
                break;         
            default:
                return;
        }
           
    }

    //mudar os valores da tela calculadora
    updateScreen(operationValue =null, operation = null, current = null, previous = null) {
        if(operationValue == null){
           this.currentOperationText.innerText +=this.currentOperation;
        } else{
            if(previous == 0){
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //mudanca de operacao matematica
    changeOperetion(operation){
        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)){
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //Deletar ultimo digito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    //Limpar operacao
    processClearOperation(){
        this.currentOperationText.innerText = "";
    }
    //Limpar Tudo
    processClearAllOperation(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    //Somar
    processEqualOperation(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calcular(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {

        const value = e.target.innerText;
        
        if(+value >= 0 || value == "."){
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
