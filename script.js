//your code here
class OutOfRangeError extends Error {
  constructor(arg) {
    super("Expression should only consist of integers and +-/* characters and not " + arg);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(expr) {
  // Step 3.1: Remove all spaces first (to make checking easier)
  let newExpr = expr.replace(/\s+/g, "");

  // Step 3.2: Check for invalid characters (anything except 0-9, +, -, *, /)
  if (/[^0-9+\-*/]/.test(newExpr)) {
    const match = newExpr.match(/[^0-9+\-*/]/);
    throw new OutOfRangeError(match[0]);
  }

  // Step 3.3: Check for bad operator combinations (++, +/, *+, etc.)
  // FIXED: Don't flag "--" as invalid (it could be subtraction of negative number)
  // Check for patterns like: ++, **, //, +*, +/, */, /*, /+, /-
  if (/(\+\+|\*\*|\/\/|\+\*|\+\/|\*\/|\/\*|\/\+|\/\-)/.test(newExpr)) {
    throw new InvalidExprError();
  }
  
  // Also check for patterns like: *+, -+, -*, -/
  // These are also invalid combinations
  if (/\*\+|\-\+|\-\*|\-\//.test(newExpr)) {
    throw new InvalidExprError();
  }

  // Step 3.4: Check if starts with +, *, or /
  if (newExpr.startsWith("+") || newExpr.startsWith("*") || newExpr.startsWith("/")) {
    throw new SyntaxError("Expression should not start with invalid operator");
  }

  // Step 3.5: Check if ends with +, -, *, or /
  if (newExpr.endsWith("+") || newExpr.endsWith("-") || newExpr.endsWith("*") || newExpr.endsWith("/")) {
    throw new SyntaxError("Expression should not end with invalid operator");
  }
  
  // If all checks pass, function just ends (no return needed)
}