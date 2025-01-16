import { Operations, OperationsValues } from "./const";

export function getResult(numbers: number[], operations: OperationsValues[]) {
  let resultNumbers = [...numbers];
  let resultOperations = [...operations];
  let i = 0;

  function applyOperation(fn: (a: number, b: number) => number) {
    const a = resultNumbers[i];
    const b = resultNumbers[i + 1];
    resultNumbers[i] = fn(a, b);
    resultNumbers.splice(i + 1, 1);
    resultOperations.splice(i, 1);
  }

  while (i < resultOperations.length) {
    if (resultOperations[i] === Operations.Multiply) {
      applyOperation((a, b) => a * b);
    } else if (resultOperations[i] === Operations.Divide) {
      applyOperation((a, b) => a / b);
    } else {
      i++;
    }
  }

  i = 0;

  while (i < resultOperations.length) {
    if (resultOperations[i] === Operations.Plus) {
      applyOperation((a, b) => a + b);
    } else if (resultOperations[i] === Operations.Minus) {
      applyOperation((a, b) => a - b);
    } else {
      i++;
    }
  }

  return resultNumbers[0] ?? NaN
}
