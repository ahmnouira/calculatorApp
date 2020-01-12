import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  pres: number = 3;

  operators: Array<string> = ['e^', '√', '^', '≈', '+', '-', '*', '/'];
  numbers: Array<string> = ['e', 'ln2', 'π', '√2', '7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

  currentNumber: string = '0';
  firstOperand: any = null;
  operator: any = null;
  waitForSecondNumber: boolean = false;

  constructor() { }

  public getNumber(v: string) {
    switch (v) {

      case 'e':
        v = (Math.E).toFixed(this.pres).toString();
        break;
      case 'ln2':
        v = (Math.LN2).toFixed(this.pres).toString();
        break;
      case 'π':
        v = (Math.PI).toFixed(this.pres).toString();
        break;
      case '√2':
        v = (Math.SQRT2).toFixed(this.pres).toString();
        break;
    }
    console.log(v);
    if (this.waitForSecondNumber) {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
  }

  getDecimal(): void {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  private doCalculation(op: string, secondOp: any): any {
    switch (op) {
      case '+':
        return this.firstOperand += secondOp;
      case '-':
        return this.firstOperand -= secondOp;
      case '*':
        return this.firstOperand *= secondOp;
      case '/':
        return this.firstOperand /= secondOp;
      case '≈':
        return Math.round(this.firstOperand);
      case 'sqrt':
        return Math.sqrt(this.firstOperand).toFixed(this.pres);
      case 'e^':
        return Math.exp(this.firstOperand).toFixed(this.pres);
      case '^':
        return Math.pow(this.firstOperand, secondOp);
      case '=':
        return secondOp;
    }
  }


  public getOperation(op: string) {
    console.log(op);
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;
    console.log(this.firstOperand);
  }


  public clear(): void {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  ngOnInit(): void {

  }

}
