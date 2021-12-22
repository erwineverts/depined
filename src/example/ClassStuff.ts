export class ClassStuff {
  constructor(private value: number = 3) { }

  setValue(num: number) {
    this.value = num;
  }

  getValue() {
    return this.value;
  }
}