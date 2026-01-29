class OutOfRangeError extends Error {
  constructor(arg) {
    super(
      `Expression should only consist of integers and +-/* characters and not ${arg}`
    );
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(expression) {
  try {
    // remove spaces
    const expr = expression.replace(/\s+/g, "");

    // invalid characters
    const invalidChar = expr.match(/[^0-9+\-*/]/);
    if (invalidChar) {
      throw new OutOfRangeError(invalidChar[0]);
    }

    // starts with invalid operator
    if (/^[+*/]/.test(expr)) {
      throw new SyntaxError(
        "Expression should not start with invalid operator"
      );
    }

    // ends with invalid operator
    if (/[+\-*/]$/.test(expr)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    // invalid operator combinations
    if (/[+\-*/]{2,}/.test(expr)) {
      throw new InvalidExprError();
    }

    // safe evaluation (tests expect evaluation)
    return eval(expr);
  } catch (err) {
    throw err;
  }
}
