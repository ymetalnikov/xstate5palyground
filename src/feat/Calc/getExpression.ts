import { OperationsValues } from "./const";

export function getExpression(numbers: number[], operations: OperationsValues[]) {
  const length = numbers.length + operations.length;
  const resultNumbers = [...numbers];
  const resultOperations = [...operations];
  let sw = false;
  let result = "";

  for (let i = 1; i <= length; i++) {
    if (sw) {
      const el = resultOperations.shift();
      result += ` ${el}`;
    } else {
      const el = resultNumbers.shift();
      result += ` ${el}`;
    }
    sw = !sw;
  }
  return result;
}