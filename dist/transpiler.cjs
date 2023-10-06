"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "node_modules/tsup/assets/cjs_shims.js"() {
  }
});

// src/dirname.cjs
var require_dirname = __commonJS({
  "src/dirname.cjs"(exports, module) {
    init_cjs_shims();
    module.exports = __dirname;
  }
});

// src/transpiler.ts
init_cjs_shims();
var import_dirname = __toESM(require_dirname(), 1);
var _typescript = require('typescript'); var _typescript2 = _interopRequireDefault(_typescript);

// src/pythonTranspiler.ts
init_cjs_shims();

// src/baseTranspiler.ts
init_cjs_shims();


// src/types.ts
init_cjs_shims();
var TranspilationError = class extends Error {
  constructor(id, message, nodeText, start, end) {
    const parsedMessage = `Lang: ${id} Error: ${message} at ${start}:${end} node: "${nodeText}"`;
    super(parsedMessage);
    this.name = "TranspilationError";
  }
};

// src/utils.ts
init_cjs_shims();
function regexAll(text, array) {
  for (const i in array) {
    let regex = array[i][0];
    const flags = typeof regex === "string" ? "g" : void 0;
    regex = new RegExp(regex, flags);
    text = text.replace(regex, array[i][1]);
  }
  return text;
}
function unCamelCase(s) {
  return s.match(/[A-Z]/) ? s.replace(/[a-z0-9][A-Z]/g, (x) => x[0] + "_" + x[1]).replace(/[A-Z0-9][A-Z0-9][a-z][^$]/g, (x) => x[0] + "_" + x[1] + x[2] + x[3]).replace(/[a-z][0-9]$/g, (x) => x[0] + "_" + x[1]).toLowerCase() : void 0;
}

// src/logger.ts
init_cjs_shims();
var _colorette = require('colorette');
var Logger = class {
  static setVerboseMode(verbose) {
    this.verbose = verbose;
  }
  static log(message) {
    if (this.verbose) {
      console.log(message);
    }
  }
  static success(message) {
    this.log(_colorette.green.call(void 0, `[SUCCESS]: ${message}`));
  }
  static warning(message) {
    this.log(_colorette.yellow.call(void 0, `[WARNING]: ${message}`));
  }
  static error(message) {
    this.log(_colorette.red.call(void 0, `[ERROR]: ${message}`));
  }
};
Logger.verbose = true;

// src/baseTranspiler.ts
var BaseTranspiler = class {
  constructor(config) {
    this.NUM_LINES_BETWEEN_CLASS_MEMBERS = 1;
    this.LINES_BETWEEN_FILE_MEMBERS = 0;
    this.NUM_LINES_END_FILE = 1;
    this.SPACE_DEFAULT_PARAM = " ";
    this.BLOCK_OPENING_TOKEN = "{";
    this.BLOCK_CLOSING_TOKEN = "}";
    this.SPACE_BEFORE_BLOCK_OPENING = " ";
    this.CONDITION_OPENING = "(";
    this.CONDITION_CLOSE = ")";
    this.DEFAULT_IDENTATION = "    ";
    this.STRING_QUOTE_TOKEN = '"';
    this.UNDEFINED_TOKEN = "null";
    this.NULL_TOKEN = "null";
    this.IF_TOKEN = "if";
    this.ELSE_TOKEN = "else";
    this.ELSEIF_TOKEN = "else if";
    this.THIS_TOKEN = "this";
    this.SLASH_TOKEN = "/";
    this.ASTERISK_TOKEN = "*";
    this.PLUS_TOKEN = "+";
    this.MINUS_TOKEN = "-";
    this.EQUALS_TOKEN = "=";
    this.EQUALS_EQUALS_TOKEN = "==";
    this.EXCLAMATION_EQUALS_TOKEN = "!=";
    this.EXCLAMATION_EQUALS_EQUALS_TOKEN = "!=";
    this.EQUALS_EQUALS_EQUALS_TOKEN = "==";
    this.AMPERSTAND_APERSAND_TOKEN = "&&";
    this.PLUS_EQUALS = "+=";
    this.BAR_BAR_TOKEN = "||";
    this.PERCENT_TOKEN = "%";
    this.RETURN_TOKEN = "return";
    this.OBJECT_OPENING = "{";
    this.OBJECT_CLOSING = "}";
    this.LEFT_PARENTHESIS = "(";
    this.RIGHT_PARENTHESIS = ")";
    this.ARRAY_OPENING_TOKEN = "[";
    this.ARRAY_CLOSING_TOKEN = "]";
    this.TRUE_KEYWORD = "true";
    this.FALSE_KEYWORD = "false";
    this.NEW_CORRESPODENT = "new";
    this.THROW_TOKEN = "throw";
    this.AWAIT_TOKEN = "await";
    this.STATIC_TOKEN = "static";
    this.CONTINUE_TOKEN = "continue";
    this.EXTENDS_TOKEN = ":";
    this.NOT_TOKEN = "!";
    this.SUPER_TOKEN = "super";
    this.PROPERTY_ACCESS_TOKEN = ".";
    this.TRY_TOKEN = "try";
    this.CATCH_TOKEN = "catch";
    this.CATCH_DECLARATION = "Exception";
    this.BREAK_TOKEN = "break";
    this.IN_TOKEN = "in";
    this.LESS_THAN_TOKEN = "<";
    this.GREATER_THAN_TOKEN = ">";
    this.GREATER_THAN_EQUALS_TOKEN = ">=";
    this.LESS_THAN_EQUALS_TOKEN = "<=";
    this.PLUS_PLUS_TOKEN = "++";
    this.MINUS_MINUS_TOKEN = "--";
    this.CONSTRUCTOR_TOKEN = "def __init__";
    this.SUPER_CALL_TOKEN = "super().__init__";
    this.WHILE_TOKEN = "while";
    this.FOR_TOKEN = "for";
    this.VAR_TOKEN = "";
    this.METHOD_DEFAULT_ACCESS = "public";
    this.PROPERTY_ASSIGNMENT_TOKEN = ":";
    this.PROPERTY_ASSIGNMENT_OPEN = "";
    this.PROPERTY_ASSIGNMENT_CLOSE = "";
    this.LINE_TERMINATOR = ";";
    this.FUNCTION_TOKEN = "function";
    this.METHOD_TOKEN = "function";
    this.ASYNC_TOKEN = "async";
    this.PROMISE_TYPE_KEYWORD = "Task";
    this.NEW_TOKEN = "new";
    this.STRING_LITERAL_KEYWORD = "StringLiteral";
    this.STRING_KEYWORD = "string";
    this.NUMBER_KEYWORD = "float";
    this.PUBLIC_KEYWORD = "public";
    this.PRIVATE_KEYWORD = "private";
    this.VOID_KEYWORD = "void";
    this.BOOLEAN_KEYWORD = "bool";
    this.ARRAY_KEYWORD = "List<object>";
    this.OBJECT_KEYWORD = "Dictionary<string, object>";
    this.INTEGER_KEYWORD = "int";
    this.DEFAULT_RETURN_TYPE = "object";
    this.DEFAULT_PARAMETER_TYPE = "object";
    this.DEFAULT_TYPE = "object";
    this.FALSY_WRAPPER_OPEN = "";
    this.FALSY_WRAPPER_CLOSE = "";
    this.ELEMENT_ACCESS_WRAPPER_OPEN = "";
    this.ELEMENT_ACCESS_WRAPPER_CLOSE = "";
    this.COMPARISON_WRAPPER_OPEN = "";
    this.COMPARISON_WRAPPER_CLOSE = "";
    this.UKNOWN_PROP_WRAPPER_OPEN = "";
    this.UNKOWN_PROP_WRAPPER_CLOSE = "";
    this.UKNOWN_PROP_ASYNC_WRAPPER_OPEN = "";
    this.UNKOWN_PROP_ASYNC_WRAPPER_CLOSE = "";
    this.EQUALS_EQUALS_WRAPPER_OPEN = "";
    this.EQUALS_EQUALS_WRAPPER_CLOSE = "";
    this.DIFFERENT_WRAPPER_OPEN = "";
    this.DIFFERENT_WRAPPER_CLOSE = "";
    this.GREATER_THAN_WRAPPER_OPEN = "";
    this.GREATER_THAN_WRAPPER_CLOSE = "";
    this.LESS_THAN_WRAPPER_OPEN = "";
    this.LESS_THAN_WRAPPER_CLOSE = "";
    this.GREATER_THAN_EQUALS_WRAPPER_OPEN = "";
    this.GREATER_THAN_EQUALS_WRAPPER_CLOSE = "";
    this.LESS_THAN_EQUALS_WRAPPER_OPEN = "";
    this.LESS_THAN_EQUALS_WRAPPER_CLOSE = "";
    this.DIVIDE_WRAPPER_OPEN = "";
    this.DIVIDE_WRAPPER_CLOSE = "";
    this.PLUS_WRAPPER_OPEN = "";
    this.PLUS_WRAPPER_CLOSE = "";
    this.MINUS_WRAPPER_OPEN = "";
    this.MINUS_WRAPPER_CLOSE = "";
    this.MOD_WRAPPER_OPEN = "";
    this.MOD_WRAPPER_CLOSE = "";
    this.ARRAY_LENGTH_WRAPPER_OPEN = "";
    this.ARRAY_LENGTH_WRAPPER_CLOSE = "";
    this.MULTIPLY_WRAPPER_OPEN = "";
    this.MULTIPLY_WRAPPER_CLOSE = "";
    this.INDEXOF_WRAPPER_OPEN = "";
    this.INDEXOF_WRAPPER_CLOSE = "";
    this.PARSEINT_WRAPPER_OPEN = "";
    this.PARSEINT_WRAPPER_CLOSE = "";
    this.DYNAMIC_CALL_OPEN = "";
    this.SPREAD_TOKEN = "...";
    this.SupportedKindNames = {};
    this.PostFixOperators = {};
    this.PrefixFixOperators = {};
    this.FunctionDefSupportedKindNames = {};
    this.LeftPropertyAccessReplacements = {};
    this.RightPropertyAccessReplacements = {};
    this.FullPropertyAccessReplacements = {};
    this.StringLiteralReplacements = {};
    this.CallExpressionReplacements = {};
    this.ReservedKeywordsReplacements = {};
    this.PropertyAccessRequiresParenthesisRemoval = [];
    this.FuncModifiers = {};
    Object.assign(this, config["parser"] || {});
    this.id = "base";
    this.uncamelcaseIdentifiers = false;
    this.requiresReturnType = false;
    this.requiresParameterType = false;
    this.supportsFalsyOrTruthyValues = true;
    this.requiresCallExpressionCast = false;
    this.initOperators();
  }
  initOperators() {
    this.SupportedKindNames = {
      [_typescript2.default.SyntaxKind.StringLiteral]: this.STRING_LITERAL_KEYWORD,
      [_typescript2.default.SyntaxKind.StringKeyword]: this.STRING_KEYWORD,
      [_typescript2.default.SyntaxKind.NumberKeyword]: this.DEFAULT_TYPE,
      [_typescript2.default.SyntaxKind.MinusMinusToken]: this.MINUS_MINUS_TOKEN,
      [_typescript2.default.SyntaxKind.MinusToken]: this.MINUS_TOKEN,
      [_typescript2.default.SyntaxKind.SlashToken]: this.SLASH_TOKEN,
      [_typescript2.default.SyntaxKind.AsteriskToken]: this.ASTERISK_TOKEN,
      [_typescript2.default.SyntaxKind.InKeyword]: this.IN_TOKEN,
      [_typescript2.default.SyntaxKind.PlusToken]: this.PLUS_TOKEN,
      [_typescript2.default.SyntaxKind.PercentToken]: this.PERCENT_TOKEN,
      [_typescript2.default.SyntaxKind.LessThanToken]: this.LESS_THAN_TOKEN,
      [_typescript2.default.SyntaxKind.LessThanEqualsToken]: this.LESS_THAN_EQUALS_TOKEN,
      [_typescript2.default.SyntaxKind.GreaterThanToken]: this.GREATER_THAN_TOKEN,
      [_typescript2.default.SyntaxKind.GreaterThanEqualsToken]: this.GREATER_THAN_EQUALS_TOKEN,
      [_typescript2.default.SyntaxKind.EqualsEqualsToken]: this.EQUALS_EQUALS_TOKEN,
      [_typescript2.default.SyntaxKind.EqualsEqualsEqualsToken]: this.EQUALS_EQUALS_EQUALS_TOKEN,
      [_typescript2.default.SyntaxKind.EqualsToken]: this.EQUALS_TOKEN,
      [_typescript2.default.SyntaxKind.PlusEqualsToken]: this.PLUS_EQUALS,
      [_typescript2.default.SyntaxKind.BarBarToken]: this.BAR_BAR_TOKEN,
      [_typescript2.default.SyntaxKind.AmpersandAmpersandToken]: this.AMPERSTAND_APERSAND_TOKEN,
      [_typescript2.default.SyntaxKind.ExclamationEqualsEqualsToken]: this.EXCLAMATION_EQUALS_EQUALS_TOKEN,
      [_typescript2.default.SyntaxKind.ExclamationEqualsToken]: this.EXCLAMATION_EQUALS_TOKEN,
      [_typescript2.default.SyntaxKind.AsyncKeyword]: this.ASYNC_TOKEN,
      [_typescript2.default.SyntaxKind.AwaitKeyword]: this.AWAIT_TOKEN,
      [_typescript2.default.SyntaxKind.StaticKeyword]: this.STATIC_TOKEN,
      [_typescript2.default.SyntaxKind.PublicKeyword]: this.PUBLIC_KEYWORD,
      [_typescript2.default.SyntaxKind.PrivateKeyword]: this.PRIVATE_KEYWORD,
      [_typescript2.default.SyntaxKind.VoidKeyword]: this.VOID_KEYWORD,
      [_typescript2.default.SyntaxKind.BooleanKeyword]: this.BOOLEAN_KEYWORD
    };
    this.PostFixOperators = {
      [_typescript2.default.SyntaxKind.PlusPlusToken]: this.PLUS_PLUS_TOKEN,
      [_typescript2.default.SyntaxKind.MinusMinusToken]: this.MINUS_MINUS_TOKEN
    };
    this.PrefixFixOperators = {
      [_typescript2.default.SyntaxKind.ExclamationToken]: this.NOT_TOKEN,
      [_typescript2.default.SyntaxKind.MinusToken]: this.MINUS_TOKEN
    };
    this.FunctionDefSupportedKindNames = {
      [_typescript2.default.SyntaxKind.StringKeyword]: this.STRING_KEYWORD
    };
    this.FuncModifiers = {
      [_typescript2.default.SyntaxKind.AsyncKeyword]: this.ASYNC_TOKEN,
      [_typescript2.default.SyntaxKind.PublicKeyword]: this.PUBLIC_KEYWORD,
      [_typescript2.default.SyntaxKind.PrivateKeyword]: this.PRIVATE_KEYWORD,
      [_typescript2.default.SyntaxKind.StaticKeyword]: this.STATIC_TOKEN
    };
  }
  applyUserOverrides(config) {
    this.LeftPropertyAccessReplacements = Object.assign({}, this.LeftPropertyAccessReplacements, _nullishCoalesce(config["LeftPropertyAccessReplacements"], () => ( {})));
    this.RightPropertyAccessReplacements = Object.assign({}, this.RightPropertyAccessReplacements, _nullishCoalesce(config["RightPropertyAccessReplacements"], () => ( {})));
    this.FullPropertyAccessReplacements = Object.assign({}, this.FullPropertyAccessReplacements, _nullishCoalesce(config["FullPropertyAccessReplacements"], () => ( {})));
    this.CallExpressionReplacements = Object.assign({}, this.CallExpressionReplacements, _nullishCoalesce(config["CallExpressionReplacements"], () => ( {})));
    this.StringLiteralReplacements = Object.assign({}, this.StringLiteralReplacements, _nullishCoalesce(config["StringLiteralReplacements"], () => ( {})));
  }
  getLineAndCharacterOfNode(node) {
    const { line, character } = global.src.getLineAndCharacterOfPosition(node.getStart());
    return [line + 1, character];
  }
  isComment(line) {
    line = line.trim();
    return line.startsWith("//") || line.startsWith("/*") || line.startsWith("*");
  }
  isStringType(flags) {
    return flags === _typescript2.default.TypeFlags.String || flags === _typescript2.default.TypeFlags.StringLiteral;
  }
  isAnyType(flags) {
    return flags === _typescript2.default.TypeFlags.Any;
  }
  warnIfAnyType(node, flags, variable, target) {
    if (this.isAnyType(flags)) {
      const [line, character] = this.getLineAndCharacterOfNode(node);
      Logger.warning(`[${this.id}] Line: ${line} char: ${character}: ${variable} has any type, ${target} might be incorrectly transpiled`);
    }
  }
  warn(node, target, message) {
    const [line, character] = this.getLineAndCharacterOfNode(node);
    Logger.warning(`[${this.id}] Line: ${line} char: ${character}: ${target} : ${message}`);
  }
  isAsyncFunction(node) {
    let modifiers = node.modifiers;
    if (modifiers === void 0) {
      return false;
    }
    modifiers = modifiers.filter((mod) => mod.kind === _typescript2.default.SyntaxKind.AsyncKeyword);
    return modifiers.length > 0;
  }
  getMethodOverride(node) {
    if (node === void 0) {
      return void 0;
    }
    if (!_typescript2.default.isClassDeclaration(node.parent)) {
      return void 0;
    }
    const classDeclaration = node.parent;
    if (!classDeclaration.heritageClauses) {
      return void 0;
    }
    let method = void 0;
    let parentClass = _typescript2.default.getAllSuperTypeNodes(node.parent)[0];
    while (parentClass !== void 0) {
      const parentClassType = global.checker.getTypeAtLocation(parentClass);
      const parentClassDecl = _optionalChain([parentClassType, 'optionalAccess', _ => _.symbol, 'optionalAccess', _2 => _2.valueDeclaration]);
      if (parentClassDecl === void 0) {
        this.warn(node, "Parent class", "Parent class not found");
        return void 0;
      }
      const parentClassMembers = _nullishCoalesce(parentClassDecl.members, () => ( []));
      parentClassMembers.forEach((elem) => {
        if (_typescript2.default.isMethodDeclaration(elem)) {
          const name = elem.name.getText().trim();
          if (node.name.escapedText === name) {
            method = elem;
          }
        }
      });
      parentClass = _nullishCoalesce(_typescript2.default.getAllSuperTypeNodes(parentClassDecl)[0], () => ( void 0));
    }
    return method;
  }
  getIden(num) {
    return this.DEFAULT_IDENTATION.repeat(num);
  }
  getBlockOpen(identation) {
    return this.SPACE_BEFORE_BLOCK_OPENING + this.BLOCK_OPENING_TOKEN + "\n";
  }
  getBlockClose(identation, chainBlock = false) {
    if (chainBlock) {
      return this.BLOCK_CLOSING_TOKEN ? "\n" + this.getIden(identation) + this.BLOCK_CLOSING_TOKEN + this.SPACE_BEFORE_BLOCK_OPENING : "\n" + this.getIden(identation) + this.BLOCK_CLOSING_TOKEN;
    }
    return this.BLOCK_CLOSING_TOKEN ? "\n" + this.getIden(identation) + this.BLOCK_CLOSING_TOKEN : "";
  }
  startsWithUpperCase(str) {
    return str.charAt(0) === str.charAt(0).toUpperCase();
  }
  unCamelCaseIfNeeded(name) {
    if (this.uncamelcaseIdentifiers && !this.startsWithUpperCase(name)) {
      return _nullishCoalesce(unCamelCase(name), () => ( name));
    }
    return name;
  }
  transformIdentifier(identifier) {
    return this.unCamelCaseIfNeeded(identifier);
  }
  printIdentifier(node) {
    let idValue = _nullishCoalesce(node.text, () => ( node.escapedText));
    if (this.ReservedKeywordsReplacements[idValue]) {
      idValue = this.ReservedKeywordsReplacements[idValue];
    }
    if (idValue === "undefined") {
      return this.UNDEFINED_TOKEN;
    }
    return this.transformIdentifier(idValue);
  }
  shouldRemoveParenthesisFromCallExpression(node) {
    if (node.expression.kind === _typescript2.default.SyntaxKind.PropertyAccessExpression) {
      return this.PropertyAccessRequiresParenthesisRemoval.includes(node.expression.name.text);
    }
    return false;
  }
  printInstanceOfExpression(node, identation) {
    const left = node.left.escapedText;
    const right = node.right.escapedText;
    return this.getIden(identation) + `${left} instanceof ${right}`;
  }
  getCustomOperatorIfAny(left, right, operator) {
    return void 0;
  }
  printCustomBinaryExpressionIfAny(node, identation) {
    return void 0;
  }
  printBinaryExpression(node, identation) {
    const { left, right, operatorToken } = node;
    const customBinaryExp = this.printCustomBinaryExpressionIfAny(node, identation);
    if (customBinaryExp) {
      return customBinaryExp;
    }
    if (operatorToken.kind == _typescript2.default.SyntaxKind.InstanceOfKeyword) {
      return this.printInstanceOfExpression(node, identation);
    }
    let operator = this.SupportedKindNames[operatorToken.kind];
    let leftVar = void 0;
    let rightVar = void 0;
    if (operatorToken.kind === _typescript2.default.SyntaxKind.EqualsEqualsToken || operatorToken.kind === _typescript2.default.SyntaxKind.EqualsEqualsEqualsToken) {
      if (this.COMPARISON_WRAPPER_OPEN) {
        leftVar = this.printNode(left, 0);
        rightVar = this.printNode(right, identation);
        return `${this.COMPARISON_WRAPPER_OPEN}${leftVar}, ${rightVar}${this.COMPARISON_WRAPPER_CLOSE}`;
      }
    }
    if (operatorToken.kind === _typescript2.default.SyntaxKind.BarBarToken || operatorToken.kind === _typescript2.default.SyntaxKind.AmpersandAmpersandToken) {
      leftVar = this.printCondition(left, 0);
      rightVar = this.printCondition(right, identation);
    } else {
      leftVar = this.printNode(left, 0);
      rightVar = this.printNode(right, identation);
    }
    const customOperator = this.getCustomOperatorIfAny(left, right, operatorToken);
    operator = customOperator ? customOperator : operator;
    return leftVar + " " + operator + " " + rightVar.trim();
  }
  transformPropertyAcessExpressionIfNeeded(node) {
    return void 0;
  }
  transformPropertyAcessRightIdentifierIfNeeded(name) {
    return this.unCamelCaseIfNeeded(name);
  }
  getExceptionalAccessTokenIfAny(node) {
    return void 0;
  }
  printLengthProperty(node, identation, name = void 0) {
    return void 0;
  }
  printPropertyAccessExpression(node, identation) {
    const expression = node.expression;
    const transformedProperty = this.transformPropertyAcessExpressionIfNeeded(node);
    if (transformedProperty) {
      return this.getIden(identation) + transformedProperty;
    }
    let leftSide = node.expression.escapedText;
    let rightSide = node.name.escapedText;
    switch (rightSide) {
      case "length":
        return this.printLengthProperty(node, identation, leftSide);
    }
    let rawExpression = node.getText().trim();
    if (this.FullPropertyAccessReplacements.hasOwnProperty(rawExpression)) {
      return this.FullPropertyAccessReplacements[rawExpression];
    }
    leftSide = this.LeftPropertyAccessReplacements.hasOwnProperty(leftSide) ? this.LeftPropertyAccessReplacements[leftSide] : this.printNode(expression, 0);
    rightSide = this.RightPropertyAccessReplacements.hasOwnProperty(rightSide) ? this.RightPropertyAccessReplacements[rightSide] : _nullishCoalesce(this.transformPropertyAcessRightIdentifierIfNeeded(rightSide), () => ( rightSide));
    const accessToken = _nullishCoalesce(this.getExceptionalAccessTokenIfAny(node), () => ( this.PROPERTY_ACCESS_TOKEN));
    rawExpression = leftSide + accessToken + rightSide;
    return rawExpression;
  }
  printCustomDefaultValueIfNeeded(node) {
    return void 0;
  }
  printParameteCustomName(node, name, defaultValue = true) {
    const initializer = node.initializer;
    let type = this.printParameterType(node);
    type = type ? type + " " : "";
    if (defaultValue) {
      if (initializer) {
        const customDefaultValue = this.printCustomDefaultValueIfNeeded(initializer);
        const defaultValue2 = customDefaultValue ? customDefaultValue : this.printNode(initializer, 0);
        return type + name + this.SPACE_DEFAULT_PARAM + "=" + this.SPACE_DEFAULT_PARAM + defaultValue2;
      }
      return type + name;
    }
    return name;
  }
  printParameter(node, defaultValue = true) {
    const name = this.printNode(node.name, 0);
    const initializer = node.initializer;
    let type = this.printParameterType(node);
    type = type ? type + " " : "";
    if (defaultValue) {
      if (initializer) {
        const customDefaultValue = this.printCustomDefaultValueIfNeeded(initializer);
        const defaultValue2 = customDefaultValue ? customDefaultValue : this.printNode(initializer, 0);
        return type + name + this.SPACE_DEFAULT_PARAM + "=" + this.SPACE_DEFAULT_PARAM + defaultValue2;
      }
      return type + name;
    }
    return name;
  }
  printModifiers(node) {
    let modifiers = node.modifiers;
    if (modifiers === void 0) {
      return "";
    }
    modifiers = modifiers.filter((mod) => this.FuncModifiers[mod.kind]);
    if (!this.asyncTranspiling) {
      modifiers = modifiers.filter((mod) => mod.kind !== _typescript2.default.SyntaxKind.AsyncKeyword);
    }
    const res = modifiers.map((modifier) => this.FuncModifiers[modifier.kind]).join(" ");
    return res;
  }
  transformLeadingComment(comment) {
    return comment;
  }
  transformTrailingComment(comment) {
    return comment;
  }
  printLeadingComments(node, identation) {
    const fullText = global.src.getFullText();
    const commentsRangeList = _typescript2.default.getLeadingCommentRanges(fullText, node.pos);
    const commentsRange = commentsRangeList ? commentsRangeList : void 0;
    let res = "";
    if (commentsRange) {
      for (const commentRange of commentsRange) {
        const commentText = fullText.slice(commentRange.pos, commentRange.end);
        if (commentText !== void 0) {
          const formatted = commentText.split("\n").map((line) => line.trim()).map((line) => !line.trim().startsWith("*") ? this.getIden(identation) + line : this.getIden(identation) + " " + line).join("\n");
          res += this.transformLeadingComment(formatted) + "\n";
        }
      }
    }
    return res;
  }
  printTraillingComment(node, identation) {
    const fullText = global.src.getFullText();
    const commentsRangeList = _typescript2.default.getTrailingCommentRanges(fullText, node.end);
    const commentsRange = commentsRangeList ? commentsRangeList : void 0;
    let res = "";
    if (commentsRange) {
      for (const commentRange of commentsRange) {
        const commentText = fullText.slice(commentRange.pos, commentRange.end);
        if (commentText !== void 0) {
          res += " " + this.transformTrailingComment(commentText);
        }
      }
    }
    return res;
  }
  printNodeCommentsIfAny(node, identation, parsedNode) {
    const leadingComment = this.printLeadingComments(node, identation);
    const trailingComment = this.printTraillingComment(node, identation);
    return leadingComment + parsedNode + trailingComment;
  }
  getType(node) {
    const type = node.type;
    if (type) {
      if (type.kind === _typescript2.default.SyntaxKind.TypeReference) {
        const typeRef = type.typeName.escapedText;
        if (typeRef === "Promise") {
          const typeArgs = type.typeArguments.filter((t) => t.kind !== _typescript2.default.SyntaxKind.VoidKeyword);
          const insideTypes = typeArgs.map((type2) => {
            if (this.SupportedKindNames.hasOwnProperty(type2.kind)) {
              return this.SupportedKindNames[type2.kind];
            } else {
              return type2.escapedText;
            }
          }).join(",");
          if (insideTypes.length > 0) {
            return `${this.PROMISE_TYPE_KEYWORD}<${insideTypes}>`;
          }
          return this.PROMISE_TYPE_KEYWORD;
        }
        return type.typeName.escapedText;
      } else if (this.SupportedKindNames.hasOwnProperty(type.kind)) {
        return this.SupportedKindNames[type.kind];
      }
    }
    const initializer = node.initializer;
    if (initializer) {
      if (_typescript2.default.isArrayLiteralExpression(initializer)) {
        return this.ARRAY_KEYWORD;
      }
      if (_typescript2.default.isBooleanLiteral(initializer)) {
        return this.BOOLEAN_KEYWORD;
      }
      if (_typescript2.default.isObjectLiteralExpression(initializer)) {
        return this.OBJECT_KEYWORD;
      }
      if (_typescript2.default.isNumericLiteral(initializer)) {
        return this.DEFAULT_TYPE;
      }
      if (_typescript2.default.isStringLiteralLike(initializer)) {
        return this.STRING_KEYWORD;
      }
    }
    return void 0;
  }
  getTypeFromRawType(type) {
    if (type.flags === _typescript2.default.TypeFlags.Any) {
      return void 0;
    }
    if (type.flags === _typescript2.default.TypeFlags.Void) {
      return this.VOID_KEYWORD;
    }
    if (type.flags === _typescript2.default.TypeFlags.Number) {
      return this.DEFAULT_TYPE;
    }
    if (type.flags === _typescript2.default.TypeFlags.String) {
      return this.STRING_KEYWORD;
    }
    if (_optionalChain([type, 'optionalAccess', _3 => _3.symbol, 'optionalAccess', _4 => _4.escapedName]) === "Array") {
      return this.ARRAY_KEYWORD;
    }
    if (_optionalChain([type, 'optionalAccess', _5 => _5.symbol, 'optionalAccess', _6 => _6.escapedName]) === "__object") {
      return this.OBJECT_KEYWORD;
    }
    if (_optionalChain([type, 'optionalAccess', _7 => _7.symbol, 'optionalAccess', _8 => _8.escapedName]) === "__type") {
      return this.OBJECT_KEYWORD;
    }
    if (_optionalChain([type, 'optionalAccess', _9 => _9.symbol, 'optionalAccess', _10 => _10.escapedName]) === "Promise") {
      return this.PROMISE_TYPE_KEYWORD;
    }
    if (_optionalChain([type, 'optionalAccess', _11 => _11.intrinsicName]) === "object") {
      return this.OBJECT_KEYWORD;
    }
    if (_optionalChain([type, 'optionalAccess', _12 => _12.intrinsicName]) === "boolean") {
      return this.BOOLEAN_KEYWORD;
    }
    return void 0;
  }
  getFunctionType(node, async = true) {
    const type = global.checker.getReturnTypeOfSignature(global.checker.getSignatureFromDeclaration(node));
    const parsedTtype = this.getTypeFromRawType(type);
    if (parsedTtype === this.PROMISE_TYPE_KEYWORD) {
      if (type.resolvedTypeArguments.length === 0) {
        return this.PROMISE_TYPE_KEYWORD;
      }
      if (type.resolvedTypeArguments.length === 1 && type.resolvedTypeArguments[0].flags === _typescript2.default.TypeFlags.Void) {
        return this.PROMISE_TYPE_KEYWORD;
      }
      const insideTypes = type.resolvedTypeArguments.map((type2) => this.getTypeFromRawType(type2)).join(",");
      if (insideTypes.length > 0) {
        if (async) {
          return `${this.PROMISE_TYPE_KEYWORD}<${insideTypes}>`;
        } else {
          return insideTypes;
        }
      }
      return void 0;
    }
    return parsedTtype;
  }
  printFunctionBody(node, identation) {
    return this.printBlock(node.body, identation);
  }
  printParameterType(node) {
    if (!this.requiresParameterType) {
      return "";
    }
    const typeText = this.getType(node);
    return this.DEFAULT_PARAMETER_TYPE;
    if (typeText === void 0 || typeText === this.STRING_KEYWORD) {
      this.warn(node, node.getText(), "Parameter type not found, will default to: " + this.DEFAULT_PARAMETER_TYPE);
      return this.DEFAULT_PARAMETER_TYPE;
    }
    return typeText;
  }
  printFunctionType(node) {
    if (!this.requiresReturnType) {
      return "";
    }
    const typeText = this.getFunctionType(node);
    if (typeText === void 0 || typeText !== this.VOID_KEYWORD && typeText !== this.PROMISE_TYPE_KEYWORD) {
      let res = "";
      if (this.isAsyncFunction(node)) {
        res = `${this.PROMISE_TYPE_KEYWORD}<${this.DEFAULT_RETURN_TYPE}>`;
      } else {
        res = this.DEFAULT_RETURN_TYPE;
      }
      this.warn(node, node.name.getText(), "Function return type not found, will default to: " + res);
      return res;
    }
    return typeText;
  }
  printFunctionDefinition(node, identation) {
    let name = node.name.escapedText;
    name = this.transformFunctionNameIfNeeded(name);
    const parsedArgs = node.parameters.map((param) => this.printParameter(param)).join(", ");
    let modifiers = this.printModifiers(node);
    modifiers = modifiers ? modifiers + " " : modifiers;
    let returnType = this.printFunctionType(node);
    returnType = returnType ? returnType + " " : returnType;
    const fnKeyword = this.FUNCTION_TOKEN ? this.FUNCTION_TOKEN + " " : "";
    if (!fnKeyword) {
      modifiers = modifiers + "public ";
    }
    const functionDef = this.getIden(identation) + modifiers + returnType + fnKeyword + name + "(" + parsedArgs + ")";
    return functionDef;
  }
  transformFunctionNameIfNeeded(name) {
    return this.unCamelCaseIfNeeded(name);
  }
  printFunctionDeclaration(node, identation) {
    let functionDef = this.printFunctionDefinition(node, identation);
    const funcBody = this.printFunctionBody(node, identation);
    functionDef += funcBody;
    return this.printNodeCommentsIfAny(node, identation, functionDef);
  }
  printMethodParameters(node) {
    return node.parameters.map((param) => this.printParameter(param)).join(", ");
  }
  transformMethodNameIfNeeded(name) {
    return this.unCamelCaseIfNeeded(name);
  }
  printMethodDefinition(node, identation) {
    let name = node.name.escapedText;
    name = this.transformMethodNameIfNeeded(name);
    let returnType = this.printFunctionType(node);
    let modifiers = this.printModifiers(node);
    const defaultAccess = this.METHOD_DEFAULT_ACCESS ? this.METHOD_DEFAULT_ACCESS + " " : "";
    modifiers = modifiers ? modifiers + " " : defaultAccess;
    const parsedArgs = this.printMethodParameters(node);
    returnType = returnType ? returnType + " " : returnType;
    const methodToken = this.METHOD_TOKEN ? this.METHOD_TOKEN + " " : "";
    const methodDef = this.getIden(identation) + modifiers + returnType + methodToken + name + "(" + parsedArgs + ")";
    return this.printNodeCommentsIfAny(node, identation, methodDef);
  }
  printMethodDeclaration(node, identation) {
    let methodDef = this.printMethodDefinition(node, identation);
    const funcBody = this.printFunctionBody(node, identation);
    methodDef += funcBody;
    return methodDef;
  }
  printStringLiteral(node) {
    const token = this.STRING_QUOTE_TOKEN;
    let text = node.text;
    if (text in this.StringLiteralReplacements) {
      return this.StringLiteralReplacements[text];
    }
    text = text.replaceAll("'", "\\'");
    text = text.replaceAll('"', '\\"');
    text = text.replaceAll("\n", "\\n");
    return token + text + token;
  }
  printNumericLiteral(node) {
    return node.text;
  }
  printArrayLiteralExpression(node, identation) {
    const elements = node.elements.map((e) => {
      return this.printNode(e);
    }).join(", ");
    return this.ARRAY_OPENING_TOKEN + elements + this.ARRAY_CLOSING_TOKEN;
  }
  printVariableDeclarationList(node, identation) {
    const declaration = node.declarations[0];
    const parsedValue = this.printNode(declaration.initializer, identation);
    const varToken = this.VAR_TOKEN ? this.VAR_TOKEN + " " : "";
    return this.getIden(identation) + varToken + this.printNode(declaration.name) + " = " + parsedValue.trim();
  }
  printVariableStatement(node, identation) {
    if (this.isCJSRequireStatement(node)) {
      return "";
    }
    const decList = node.declarationList;
    const varStatement = this.printVariableDeclarationList(decList, identation) + this.LINE_TERMINATOR;
    return this.printNodeCommentsIfAny(node, identation, varStatement);
  }
  printOutOfOrderCallExpressionIfAny(node, identation) {
    return void 0;
  }
  printSuperCallInsideConstructor(node, identation) {
    const args = node.arguments;
    const parsedArgs = args.map((a) => {
      return this.printNode(a, identation).trim();
    }).join(",");
    return this.SUPER_CALL_TOKEN + "(" + parsedArgs + ")";
  }
  isBuiltInFunctionCall(node) {
    const symbol = global.checker.getSymbolAtLocation(node);
    const isInLibFiles = _nullishCoalesce(_optionalChain([symbol, 'optionalAccess', _13 => _13.getDeclarations, 'call', _14 => _14(), 'optionalAccess', _15 => _15.some, 'call', _16 => _16((s) => s.getSourceFile().fileName.includes("/node_modules/typescript/lib/"))]), () => ( false));
    return isInLibFiles;
  }
  getTypesFromCallExpressionParameters(node) {
    const resolvedParams = global.checker.getResolvedSignature(node).parameters;
    const parsedTypes = [];
    resolvedParams.forEach((p) => {
      const decl = p.declarations[0];
      const type = global.checker.getTypeAtLocation(decl);
      const parsedType = this.getTypeFromRawType(type);
      parsedTypes.push(parsedType);
    });
    return parsedTypes;
  }
  printArgsForCallExpression(node, identation) {
    const args = node.arguments;
    const parsedArgs = args.map((a) => {
      return this.printNode(a, identation).trim();
    }).join(", ");
    return parsedArgs;
  }
  printArrayIsArrayCall(node, identation, parsedArg = void 0) {
    return void 0;
  }
  printObjectKeysCall(node, identation, parsedArg = void 0) {
    return void 0;
  }
  printObjectValuesCall(node, identation, parsedArg = void 0) {
    return void 0;
  }
  printJsonParseCall(node, identation, parsedArg = void 0) {
    return void 0;
  }
  printJsonStringifyCall(node, identation, parsedArg = void 0) {
    return void 0;
  }
  printPromiseAllCall(node, identation, parsedArg = void 0) {
    return void 0;
  }
  printMathFloorCall(node, identation, parsedArg = void 0) {
    return void 0;
  }
  printMathRoundCall(node, identation, parsedArg = void 0) {
    return void 0;
  }
  printMathCeilCall(node, identation, parsedArg = void 0) {
    return void 0;
  }
  printArrayPushCall(node, identation, name = void 0, parsedArg = void 0) {
    return void 0;
  }
  printIncludesCall(node, identation, name = void 0, parsedArg = void 0) {
    return void 0;
  }
  printIndexOfCall(node, identation, name = void 0, parsedArg = void 0) {
    return void 0;
  }
  printStartsWithCall(node, identation, name = void 0, parsedArg = void 0) {
    return void 0;
  }
  printEndsWithCall(node, identation, name = void 0, parsedArg = void 0) {
    return void 0;
  }
  printTrimCall(node, identation, name = void 0) {
    return void 0;
  }
  printJoinCall(node, identation, name = void 0, parsedArg = void 0) {
    return void 0;
  }
  printSplitCall(node, identation, name = void 0, parsedArg = void 0) {
    return void 0;
  }
  printToFixedCall(node, identation, name = void 0, parsedArg = void 0) {
    return void 0;
  }
  printSliceCall(node, identation, name = void 0, parsedArg = void 0, parsedArg2 = void 0) {
    return void 0;
  }
  printReplaceCall(node, identation, name = void 0, parsedArg = void 0, parsedArg2 = void 0) {
    return void 0;
  }
  printToStringCall(node, identation, name = void 0) {
    return void 0;
  }
  printToUpperCaseCall(node, identation, name = void 0) {
    return void 0;
  }
  printToLowerCaseCall(node, identation, name = void 0) {
    return void 0;
  }
  printShiftCall(node, identation, name = void 0) {
    return void 0;
  }
  printReverseCall(node, identation, name = void 0) {
    return void 0;
  }
  printPopCall(node, identation, name = void 0) {
    return void 0;
  }
  printAssertCall(node, identation, parsedArgs) {
    return `assert(${parsedArgs})`;
  }
  printCallExpression(node, identation) {
    const expression = node.expression;
    const parsedArgs = this.printArgsForCallExpression(node, identation);
    const removeParenthesis = this.shouldRemoveParenthesisFromCallExpression(node);
    const finalExpression = this.printOutOfOrderCallExpressionIfAny(node, identation);
    if (finalExpression) {
      return finalExpression;
    }
    if (node.expression.kind === _typescript2.default.SyntaxKind.PropertyAccessExpression) {
      const expressionText = node.expression.getText().trim();
      const args = _nullishCoalesce(node.arguments, () => ( []));
      if (args.length === 1) {
        const parsedArg = this.printNode(args[0], 0);
        switch (expressionText) {
          case "JSON.parse":
            return this.printJsonParseCall(node, identation, parsedArg);
          case "JSON.stringify":
            return this.printJsonStringifyCall(node, identation, parsedArg);
          case "Array.isArray":
            return this.printArrayIsArrayCall(node, identation, parsedArg);
          case "Object.keys":
            return this.printObjectKeysCall(node, identation, parsedArg);
          case "Object.values":
            return this.printObjectValuesCall(node, identation, parsedArg);
          case "Promise.all":
            return this.printPromiseAllCall(node, identation, parsedArg);
          case "Math.round":
            return this.printMathRoundCall(node, identation, parsedArg);
          case "Math.floor":
            return this.printMathFloorCall(node, identation, parsedArg);
        }
      }
      const rightSide = _optionalChain([node, 'access', _17 => _17.expression, 'access', _18 => _18.name, 'optionalAccess', _19 => _19.escapedText]);
      const leftSide = _optionalChain([node, 'access', _20 => _20.expression, 'optionalAccess', _21 => _21.expression]);
      if (args.length === 0 && rightSide !== void 0 && leftSide !== void 0) {
        const parsedLeftSide = this.printNode(leftSide, 0);
        switch (rightSide) {
          case "toString":
            return this.printToStringCall(node, identation, parsedLeftSide);
          case "toUpperCase":
            return this.printToUpperCaseCall(node, identation, parsedLeftSide);
          case "toLowerCase":
            return this.printToLowerCaseCall(node, identation, parsedLeftSide);
          case "shift":
            return this.printShiftCall(node, identation, parsedLeftSide);
          case "pop":
            return this.printPopCall(node, identation, parsedLeftSide);
          case "reverse":
            return this.printReverseCall(node, identation, parsedLeftSide);
          case "trim":
            return this.printTrimCall(node, identation, parsedLeftSide);
        }
      }
      const arg = args && args.length > 0 ? args[0] : void 0;
      if (leftSide && rightSide && arg) {
        const parsedArg = this.printNode(arg, identation).trimStart();
        const name = this.printNode(leftSide, 0);
        switch (rightSide) {
          case "push":
            return this.printArrayPushCall(node, identation, name, parsedArg);
          case "includes":
            return this.printIncludesCall(node, identation, name, parsedArg);
          case "indexOf":
            return this.printIndexOfCall(node, identation, name, parsedArg);
          case "join":
            return this.printJoinCall(node, identation, name, parsedArg);
          case "split":
            return this.printSplitCall(node, identation, name, parsedArg);
          case "toFixed":
            return this.printToFixedCall(node, identation, name, parsedArg);
          case "endsWith":
            return this.printEndsWithCall(node, identation, name, parsedArg);
          case "startsWith":
            return this.printStartsWithCall(node, identation, name, parsedArg);
        }
        if (args.length === 1 || args.length === 2) {
          const parsedArg2 = args[1] ? this.printNode(args[1], identation).trimStart() : void 0;
          switch (rightSide) {
            case "slice":
              return this.printSliceCall(node, identation, name, parsedArg, parsedArg2);
            case "replace":
              return this.printReplaceCall(node, identation, name, parsedArg, parsedArg2);
          }
        }
      }
    } else {
      const args = _nullishCoalesce(node.arguments, () => ( []));
      if (args.length === 2 && expression.escapedText === "assert") {
        return this.printAssertCall(node, identation, parsedArgs);
      }
    }
    if (expression.kind === _typescript2.default.SyntaxKind.SuperKeyword) {
      return this.printSuperCallInsideConstructor(node, identation);
    }
    let parsedExpression = void 0;
    if (this.CallExpressionReplacements.hasOwnProperty(expression.getText())) {
      parsedExpression = this.CallExpressionReplacements[expression.getText()];
    } else {
      if (expression.kind === _typescript2.default.SyntaxKind.Identifier) {
        const idValue = _nullishCoalesce(expression.text, () => ( expression.escapedText));
        parsedExpression = this.unCamelCaseIfNeeded(idValue);
      } else {
        parsedExpression = this.printNode(expression, 0);
      }
    }
    let parsedCall = parsedExpression;
    if (!removeParenthesis) {
      parsedCall += "(" + parsedArgs + ")";
    }
    return parsedCall;
  }
  printClassBody(node, identation) {
    const parsedMembers = [];
    node.members.forEach((m, index) => {
      const parsedNode = this.printNode(m, identation + 1);
      if (m.kind === _typescript2.default.SyntaxKind.PropertyDeclaration || index === 0) {
        parsedMembers.push(parsedNode);
      } else {
        parsedMembers.push("\n".repeat(this.NUM_LINES_BETWEEN_CLASS_MEMBERS) + parsedNode);
      }
    });
    return parsedMembers.join("\n");
  }
  printClassDefinition(node, identation) {
    const className = node.name.escapedText;
    const heritageClauses = node.heritageClauses;
    let classInit = "";
    const classOpening = this.getBlockOpen(identation);
    if (heritageClauses !== void 0) {
      const classExtends = heritageClauses[0].types[0].expression.escapedText;
      classInit = this.getIden(identation) + "class " + className + " " + this.EXTENDS_TOKEN + " " + classExtends + classOpening;
    } else {
      classInit = this.getIden(identation) + "class " + className + classOpening;
    }
    return classInit;
  }
  printClass(node, identation) {
    const classDefinition = this.printClassDefinition(node, identation);
    const classBody = this.printClassBody(node, identation);
    const classClosing = this.getBlockClose(identation);
    return classDefinition + classBody + classClosing;
  }
  printConstructorDeclaration(node, identation) {
    const args = this.printMethodParameters(node);
    const constructorBody = this.printFunctionBody(node, identation);
    return this.getIden(identation) + this.CONSTRUCTOR_TOKEN + "(" + args + ")" + constructorBody;
  }
  printWhileStatement(node, identation) {
    const loopExpression = node.expression;
    const expression = this.printNode(loopExpression, 0);
    const whileStm = this.getIden(identation) + this.WHILE_TOKEN + " " + this.CONDITION_OPENING + expression + this.CONDITION_CLOSE + this.printBlock(node.statement, identation);
    return this.printNodeCommentsIfAny(node, identation, whileStm);
  }
  printForStatement(node, identation) {
    const initializer = this.printNode(node.initializer, 0);
    const condition = this.printNode(node.condition, 0);
    const incrementor = this.printNode(node.incrementor, 0);
    const forStm = this.getIden(identation) + this.FOR_TOKEN + " " + this.CONDITION_OPENING + initializer + "; " + condition + "; " + incrementor + this.CONDITION_CLOSE + this.printBlock(node.statement, identation);
    return this.printNodeCommentsIfAny(node, identation, forStm);
  }
  printBreakStatement(node, identation) {
    const breakStm = this.getIden(identation) + this.BREAK_TOKEN + this.LINE_TERMINATOR;
    return this.printNodeCommentsIfAny(node, identation, breakStm);
  }
  printPostFixUnaryExpression(node, identation) {
    const { operand, operator } = node;
    return this.getIden(identation) + this.printNode(operand, 0) + this.PostFixOperators[operator];
  }
  printPrefixUnaryExpression(node, identation) {
    const { operand, operator } = node;
    if (operator === _typescript2.default.SyntaxKind.ExclamationToken) {
      return this.getIden(identation) + this.PrefixFixOperators[operator] + this.printCondition(node.operand, 0);
    }
    return this.getIden(identation) + this.PrefixFixOperators[operator] + this.printNode(operand, 0);
  }
  printObjectLiteralBody(node, identation) {
    let body = node.properties.map((p) => this.printNode(p, identation + 1)).join(",\n");
    body = body ? body + "," : body;
    return body;
  }
  printObjectLiteralExpression(node, identation) {
    const objectBody = this.printObjectLiteralBody(node, identation);
    const formattedObjectBody = objectBody ? "\n" + objectBody + "\n" + this.getIden(identation) : objectBody;
    return this.OBJECT_OPENING + formattedObjectBody + this.OBJECT_CLOSING;
  }
  printCustomRightSidePropertyAssignment(node, identation) {
    return void 0;
  }
  printPropertyAssignment(node, identation) {
    const { name, initializer } = node;
    const nameAsString = this.printNode(name, 0);
    const customRightSide = this.printCustomRightSidePropertyAssignment(initializer, identation);
    const valueAsString = customRightSide ? customRightSide : this.printNode(initializer, identation);
    let trailingComment = this.printTraillingComment(node, identation);
    trailingComment = trailingComment ? " " + trailingComment : trailingComment;
    const propOpen = this.PROPERTY_ASSIGNMENT_OPEN ? this.PROPERTY_ASSIGNMENT_OPEN + " " : "";
    const propClose = this.PROPERTY_ASSIGNMENT_CLOSE ? " " + this.PROPERTY_ASSIGNMENT_CLOSE : "";
    return this.getIden(identation) + propOpen + nameAsString + this.PROPERTY_ASSIGNMENT_TOKEN + " " + valueAsString.trim() + propClose + trailingComment;
  }
  printElementAccessExpressionExceptionIfAny(node) {
    return void 0;
  }
  printElementAccessExpression(node, identation) {
    const { expression, argumentExpression } = node;
    const exception = this.printElementAccessExpressionExceptionIfAny(node);
    if (exception) {
      return exception;
    }
    const isLeftSideOfAssignment = _optionalChain([node, 'access', _22 => _22.parent, 'optionalAccess', _23 => _23.kind]) === _typescript2.default.SyntaxKind.BinaryExpression && (node.parent.operatorToken.kind === _typescript2.default.SyntaxKind.EqualsToken || node.parent.operatorToken.kind === _typescript2.default.SyntaxKind.PlusEqualsToken) && _optionalChain([node, 'access', _24 => _24.parent, 'optionalAccess', _25 => _25.left]) === node;
    const expressionAsString = this.printNode(expression, 0);
    const argumentAsString = this.printNode(argumentExpression, 0);
    if (!isLeftSideOfAssignment && this.ELEMENT_ACCESS_WRAPPER_OPEN && this.ELEMENT_ACCESS_WRAPPER_CLOSE) {
      return `${this.ELEMENT_ACCESS_WRAPPER_OPEN}${expressionAsString}, ${argumentAsString}${this.ELEMENT_ACCESS_WRAPPER_CLOSE}`;
    }
    if (isLeftSideOfAssignment && this.ELEMENT_ACCESS_WRAPPER_OPEN && this.ELEMENT_ACCESS_WRAPPER_CLOSE) {
      const type = global.checker.getTypeAtLocation(argumentExpression);
      const isString = this.isStringType(type.flags);
      let isUnionString = false;
      if (type.flags === _typescript2.default.TypeFlags.Union) {
        isUnionString = this.isStringType(_optionalChain([type, 'optionalAccess', _26 => _26.types, 'access', _27 => _27[0], 'access', _28 => _28.flags]));
      }
      if (isString || isUnionString || type.flags === _typescript2.default.TypeFlags.Any) {
        const cast = _typescript2.default.isStringLiteralLike(argumentExpression) ? "" : "(string)";
        return `((${this.OBJECT_KEYWORD})${expressionAsString})[${cast}${argumentAsString}]`;
      }
      return `((${this.ARRAY_KEYWORD})${expressionAsString})[(int)${argumentAsString}]`;
    }
    return expressionAsString + "[" + argumentAsString + "]";
  }
  printCondition(node, identation) {
    if (this.supportsFalsyOrTruthyValues) {
      return this.printNode(node, identation);
    }
    if (node.kind === _typescript2.default.SyntaxKind.PrefixUnaryExpression && node.operator === _typescript2.default.SyntaxKind.ExclamationToken) {
      return this.printPrefixUnaryExpression(node, identation);
    }
    let expression = this.printNode(node, 0);
    if (1 + 1 || node.kind !== _typescript2.default.SyntaxKind.BinaryExpression && node.kind !== _typescript2.default.SyntaxKind.ParenthesizedExpression) {
      const typeFlags = global.checker.getTypeAtLocation(node).flags;
      if (1 + 1 || typeFlags !== _typescript2.default.TypeFlags.BooleanLiteral && typeFlags !== _typescript2.default.TypeFlags.Boolean) {
        expression = this.printNode(node, 0);
        expression = `${this.FALSY_WRAPPER_OPEN}${expression}${this.FALSY_WRAPPER_CLOSE}`;
      }
    }
    return `${this.getIden(identation)}${expression}`;
  }
  printIfStatement(node, identation) {
    const expression = this.printCondition(node.expression, 0);
    const elseExists = node.elseStatement !== void 0;
    const isElseIf = node.parent.kind === _typescript2.default.SyntaxKind.IfStatement;
    const needChainBlock = elseExists;
    const ifBody = this.printBlock(node.thenStatement, identation, needChainBlock);
    let ifComplete = this.CONDITION_OPENING + expression + this.CONDITION_CLOSE + ifBody;
    if (isElseIf) {
      ifComplete = this.ELSEIF_TOKEN + " " + ifComplete;
    } else {
      ifComplete = this.getIden(identation) + this.IF_TOKEN + " " + ifComplete;
    }
    const elseStatement = node.elseStatement;
    if (_optionalChain([elseStatement, 'optionalAccess', _29 => _29.kind]) === _typescript2.default.SyntaxKind.Block) {
      const elseBody = this.printBlock(elseStatement, identation);
      const elseBlock = this.ELSE_TOKEN + elseBody;
      ifComplete += elseBlock;
    } else if (_optionalChain([elseStatement, 'optionalAccess', _30 => _30.kind]) === _typescript2.default.SyntaxKind.IfStatement) {
      const elseBody = this.printIfStatement(elseStatement, identation);
      ifComplete += elseBody;
    }
    return this.printNodeCommentsIfAny(node, identation, ifComplete);
  }
  printParenthesizedExpression(node, identation) {
    if (node.expression.kind === _typescript2.default.SyntaxKind.AsExpression) {
      return this.getIden(identation) + this.printNode(node.expression, 0);
    }
    return this.getIden(identation) + this.LEFT_PARENTHESIS + this.printNode(node.expression, 0) + this.RIGHT_PARENTHESIS;
  }
  printBooleanLiteral(node) {
    if (_typescript2.default.SyntaxKind.TrueKeyword === node.kind) {
      return this.TRUE_KEYWORD;
    }
    return this.FALSE_KEYWORD;
  }
  printTryStatement(node, identation) {
    const tryBody = this.printBlock(node.tryBlock, identation, true);
    const catchBody = this.printBlock(node.catchClause.block, identation);
    const catchDeclaration = this.CATCH_DECLARATION + " " + this.printNode(node.catchClause.variableDeclaration.name, 0);
    const catchCondOpen = this.CONDITION_OPENING ? this.CONDITION_OPENING : " ";
    return this.getIden(identation) + this.TRY_TOKEN + tryBody + this.CATCH_TOKEN + catchCondOpen + catchDeclaration + this.CONDITION_CLOSE + catchBody;
  }
  printNewExpression(node, identation) {
    let expression = _optionalChain([node, 'access', _31 => _31.expression, 'optionalAccess', _32 => _32.escapedText]);
    expression = expression ? expression : this.printNode(node.expression);
    const args = node.arguments.map((n) => this.printNode(n, identation)).join(",");
    const newToken = this.NEW_TOKEN ? this.NEW_TOKEN + " " : "";
    return newToken + expression + this.LEFT_PARENTHESIS + args + this.RIGHT_PARENTHESIS;
  }
  printThrowStatement(node, identation) {
    const expression = this.printNode(node.expression, 0);
    return this.getIden(identation) + this.THROW_TOKEN + " " + expression + this.LINE_TERMINATOR;
  }
  printAwaitExpression(node, identation) {
    const expression = this.printNode(node.expression, identation);
    const awaitToken = this.asyncTranspiling ? this.AWAIT_TOKEN + " " : "";
    return awaitToken + expression;
  }
  printConditionalExpression(node, identation) {
    const condition = this.printCondition(node.condition, identation);
    const whenTrue = this.printNode(node.whenTrue, 0);
    const whenFalse = this.printNode(node.whenFalse, 0);
    return condition + " ? " + whenTrue + " : " + whenFalse;
  }
  printAsExpression(node, identation) {
    return this.printNode(node.expression, identation);
  }
  getFunctionNodeFromReturn(node) {
    let parent = node.parent;
    while (parent) {
      if (parent.kind === _typescript2.default.SyntaxKind.FunctionDeclaration || parent.kind === _typescript2.default.SyntaxKind.MethodDeclaration) {
        return parent;
      }
      parent = parent.parent;
    }
    return void 0;
  }
  printReturnStatement(node, identation) {
    const leadingComment = this.printLeadingComments(node, identation);
    let trailingComment = this.printTraillingComment(node, identation);
    trailingComment = trailingComment ? " " + trailingComment : trailingComment;
    const exp = node.expression;
    let rightPart = exp ? " " + this.printNode(exp, identation) : "";
    rightPart = rightPart.trim();
    rightPart = rightPart ? " " + rightPart + this.LINE_TERMINATOR : this.LINE_TERMINATOR;
    return leadingComment + this.getIden(identation) + this.RETURN_TOKEN + rightPart + trailingComment;
  }
  printArrayBindingPattern(node, identation) {
    const elements = node.elements.map((e) => this.printNode(e.name, identation)).join(", ");
    return this.getIden(identation) + this.ARRAY_OPENING_TOKEN + elements + this.ARRAY_CLOSING_TOKEN;
  }
  printBlock(node, identation, chainBlock = false) {
    const blockOpen = this.getBlockOpen(identation);
    const blockClose = this.getBlockClose(identation, chainBlock);
    const statements = node.statements.map((s) => this.printNode(s, identation + 1)).join("\n");
    return blockOpen + statements + blockClose;
  }
  printExpressionStatement(node, identation) {
    if (this.isCJSModuleExportsExpressionStatement(node)) {
      return "";
    }
    const exprStm = this.printNode(node.expression, identation);
    if (exprStm.length === 0) {
      return "";
    }
    const expStatement = this.getIden(identation) + exprStm + this.LINE_TERMINATOR;
    return this.printNodeCommentsIfAny(node, identation, expStatement);
  }
  printPropertyDeclaration(node, identation) {
    let modifiers = this.printModifiers(node);
    modifiers = modifiers ? modifiers + " " : modifiers;
    const name = this.printNode(node.name, 0);
    if (node.initializer) {
      const initializer = this.printNode(node.initializer, 0);
      return this.getIden(identation) + modifiers + name + " = " + initializer + this.LINE_TERMINATOR;
    }
    return this.getIden(identation) + modifiers + name + this.LINE_TERMINATOR;
  }
  printSpreadElement(node, identation) {
    const expression = this.printNode(node.expression, 0);
    return this.getIden(identation) + this.SPREAD_TOKEN + expression;
  }
  printNullKeyword(node, identation) {
    return this.getIden(identation) + this.NULL_TOKEN;
  }
  printContinueStatement(node, identation) {
    return this.getIden(identation) + this.CONTINUE_TOKEN + this.LINE_TERMINATOR;
  }
  printNode(node, identation = 0) {
    try {
      if (_typescript2.default.isExpressionStatement(node)) {
        return this.printExpressionStatement(node, identation);
      } else if (_typescript2.default.isBlock(node)) {
        return this.printBlock(node, identation);
      } else if (_typescript2.default.isFunctionDeclaration(node)) {
        return this.printFunctionDeclaration(node, identation);
      } else if (_typescript2.default.isClassDeclaration(node)) {
        return this.printClass(node, identation);
      } else if (_typescript2.default.isVariableStatement(node)) {
        return this.printVariableStatement(node, identation);
      } else if (_typescript2.default.isMethodDeclaration(node)) {
        return this.printMethodDeclaration(node, identation);
      } else if (_typescript2.default.isStringLiteral(node)) {
        return this.printStringLiteral(node);
      } else if (_typescript2.default.isNumericLiteral(node)) {
        return this.printNumericLiteral(node);
      } else if (_typescript2.default.isPropertyAccessExpression(node)) {
        return this.printPropertyAccessExpression(node, identation);
      } else if (_typescript2.default.isArrayLiteralExpression(node)) {
        return this.printArrayLiteralExpression(node, identation);
      } else if (_typescript2.default.isCallExpression(node)) {
        return this.printCallExpression(node, identation);
      } else if (_typescript2.default.isWhileStatement(node)) {
        return this.printWhileStatement(node, identation);
      } else if (_typescript2.default.isBinaryExpression(node)) {
        return this.printBinaryExpression(node, identation);
      } else if (_typescript2.default.isBreakStatement(node)) {
        return this.printBreakStatement(node, identation);
      } else if (_typescript2.default.isForStatement(node)) {
        return this.printForStatement(node, identation);
      } else if (_typescript2.default.isPostfixUnaryExpression(node)) {
        return this.printPostFixUnaryExpression(node, identation);
      } else if (_typescript2.default.isVariableDeclarationList(node)) {
        return this.printVariableDeclarationList(node, identation);
      } else if (_typescript2.default.isObjectLiteralExpression(node)) {
        return this.printObjectLiteralExpression(node, identation);
      } else if (_typescript2.default.isPropertyAssignment(node)) {
        return this.printPropertyAssignment(node, identation);
      } else if (_typescript2.default.isIdentifier(node)) {
        return this.printIdentifier(node);
      } else if (_typescript2.default.isElementAccessExpression(node)) {
        return this.printElementAccessExpression(node, identation);
      } else if (_typescript2.default.isIfStatement(node)) {
        return this.printIfStatement(node, identation);
      } else if (_typescript2.default.isParenthesizedExpression(node)) {
        return this.printParenthesizedExpression(node, identation);
      } else if (_typescript2.default.isBooleanLiteral(node)) {
        return this.printBooleanLiteral(node);
      } else if (_typescript2.default.SyntaxKind.ThisKeyword === node.kind) {
        return this.THIS_TOKEN;
      } else if (_typescript2.default.SyntaxKind.SuperKeyword === node.kind) {
        return this.SUPER_TOKEN;
      } else if (_typescript2.default.isTryStatement(node)) {
        return this.printTryStatement(node, identation);
      } else if (_typescript2.default.isPrefixUnaryExpression(node)) {
        return this.printPrefixUnaryExpression(node, identation);
      } else if (_typescript2.default.isNewExpression(node)) {
        return this.printNewExpression(node, identation);
      } else if (_typescript2.default.isThrowStatement(node)) {
        return this.printThrowStatement(node, identation);
      } else if (_typescript2.default.isAwaitExpression(node)) {
        return this.printAwaitExpression(node, identation);
      } else if (_typescript2.default.isConditionalExpression(node)) {
        return this.printConditionalExpression(node, identation);
      } else if (_typescript2.default.isAsExpression(node)) {
        return this.printAsExpression(node, identation);
      } else if (_typescript2.default.isReturnStatement(node)) {
        return this.printReturnStatement(node, identation);
      } else if (_typescript2.default.isArrayBindingPattern(node)) {
        return this.printArrayBindingPattern(node, identation);
      } else if (_typescript2.default.isParameter(node)) {
        return this.printParameter(node);
      } else if (_typescript2.default.isConstructorDeclaration(node)) {
        return this.printConstructorDeclaration(node, identation);
      } else if (_typescript2.default.isPropertyDeclaration(node)) {
        return this.printPropertyDeclaration(node, identation);
      } else if (_typescript2.default.isSpreadElement(node)) {
        return this.printSpreadElement(node, identation);
      } else if (_typescript2.default.SyntaxKind.NullKeyword === node.kind) {
        return this.printNullKeyword(node, identation);
      } else if (_typescript2.default.isContinueStatement(node)) {
        return this.printContinueStatement(node, identation);
      }
      if (node.statements) {
        const transformedStatements = node.statements.map((m) => {
          return this.printNode(m, identation + 1);
        });
        return transformedStatements.filter((st) => st.length > 0).join("\n" + "\n".repeat(this.LINES_BETWEEN_FILE_MEMBERS)) + "\n".repeat(this.NUM_LINES_END_FILE);
      }
      return "";
    } catch (e) {
      throw new TranspilationError(this.id, e.messageText, node.getFullText(), node.pos, node.end);
    }
  }
  getFileESMImports(node) {
    const result = [];
    const importStatements = node.statements.filter((s) => _typescript2.default.isImportDeclaration(s));
    importStatements.forEach((node2) => {
      const importPath = node2.moduleSpecifier.text;
      const importClause = node2.importClause;
      const namedImports = importClause.namedBindings;
      if (namedImports) {
        if (namedImports.elements) {
          namedImports.elements.forEach((elem) => {
            const name = elem.name.text;
            const fileImport = {
              name,
              path: importPath,
              isDefault: false
            };
            result.push(fileImport);
          });
        } else {
          const name = namedImports.name.escapedText;
          const fileImport = {
            name,
            path: importPath,
            isDefault: false
          };
          result.push(fileImport);
        }
      } else {
        const name = importClause.name.text;
        const fileImport = {
          name,
          path: importPath,
          isDefault: true
        };
        result.push(fileImport);
      }
    });
    return result;
  }
  isCJSRequireStatement(node) {
    const dec = node.declarationList.declarations[0];
    return _typescript2.default.isCallExpression(dec.initializer) && dec.initializer.expression.getText() === "require";
  }
  isCJSModuleExportsExpressionStatement(node) {
    if (node.expression && node.expression.kind === _typescript2.default.SyntaxKind.BinaryExpression) {
      if (node.expression.left.kind === _typescript2.default.SyntaxKind.PropertyAccessExpression) {
        const left = node.expression.left;
        return left.expression.getText() === "module" && left.name.getText() === "exports";
      }
    }
    return false;
  }
  getCJSImports(node) {
    const result = [];
    const varStatements = node.statements.filter((s) => _typescript2.default.isVariableStatement(s));
    const decList = varStatements.map((s) => s.declarationList);
    const dec = decList.map((d) => d.declarations[0]);
    dec.forEach((decNode) => {
      if (decNode.initializer.kind === _typescript2.default.SyntaxKind.CallExpression) {
        const callExpression = decNode.initializer.expression.getText();
        if (callExpression === "require") {
          const isDefault = decNode.name.kind === _typescript2.default.SyntaxKind.Identifier;
          const importPath = decNode.initializer.arguments[0].text;
          if (isDefault) {
            const name = decNode.name.text;
            const fileImport = {
              name,
              path: importPath,
              isDefault
            };
            result.push(fileImport);
          } else {
            const elems = decNode.name.elements;
            elems.forEach((elem) => {
              const name = elem.name.text;
              const fileImport = {
                name,
                path: importPath,
                isDefault: false
              };
              result.push(fileImport);
            });
          }
        }
      }
    });
    return result;
  }
  getFileImports(node) {
    const esmImports = this.getFileESMImports(node);
    if (esmImports.length > 0) {
      return esmImports;
    }
    const cjsImports = this.getCJSImports(node);
    return cjsImports;
  }
  getESMExports(node) {
    const result = [];
    const namedExports = node.statements.filter((s) => _typescript2.default.isExportDeclaration(s));
    const defaultExport = node.statements.filter((s) => _typescript2.default.isExportAssignment(s));
    namedExports.forEach((node2) => {
      const namedExports2 = node2.exportClause;
      if (namedExports2) {
        namedExports2.elements.forEach((elem) => {
          const name = elem.name.text;
          const fileExport = {
            name,
            isDefault: false
          };
          result.push(fileExport);
        });
      }
    });
    defaultExport.forEach((node2) => {
      const name = node2.expression.getText();
      const fileExport = {
        name,
        isDefault: true
      };
      result.push(fileExport);
    });
    return result;
  }
  getCJSExports(node) {
    const result = [];
    const moduleExports = node.statements.filter((s) => this.isCJSModuleExportsExpressionStatement(s)).map((s) => s.expression);
    moduleExports.forEach((node2) => {
      const right = node2.right;
      if (right.kind === _typescript2.default.SyntaxKind.ObjectLiteralExpression) {
        const props = right.properties;
        props.forEach((prop) => {
          const name = prop.name.getText();
          const fileExport = {
            name,
            isDefault: false
          };
          result.push(fileExport);
        });
      }
      if (right.kind === _typescript2.default.SyntaxKind.Identifier) {
        const name = right.getText();
        const fileExport = {
          name,
          isDefault: true
        };
        result.push(fileExport);
      }
    });
    return result;
  }
  getExportDeclarations(node) {
    const result = [];
    const classDeclarations = node.statements.filter((s) => _typescript2.default.isClassDeclaration(s));
    const functionDeclarations = node.statements.filter((s) => _typescript2.default.isFunctionDeclaration(s));
    const both = classDeclarations.concat(functionDeclarations);
    both.forEach((classNode) => {
      const modifiers = classNode.modifiers;
      if (modifiers) {
        const isDefault = modifiers.some((m) => m.kind === _typescript2.default.SyntaxKind.DefaultKeyword);
        if (isDefault) {
          const name = classNode.name.text;
          const fileExport = {
            name,
            isDefault: true
          };
          result.push(fileExport);
        }
      }
    });
    return result;
  }
  getFileExports(node) {
    const defaultClassAndFunctionsExports = this.getExportDeclarations(node);
    const esmExports = this.getESMExports(node).concat(defaultClassAndFunctionsExports);
    if (esmExports.length > 0) {
      return esmExports;
    }
    return this.getCJSExports(node);
  }
  getReturnTypeFromMethod(node) {
    const bType = global.checker.getTypeAtLocation(node);
    const func2Type = global.checker.getTypeOfSymbolAtLocation(bType.symbol, bType.symbol.valueDeclaration);
    const func2Signature = global.checker.getSignaturesOfType(func2Type, _typescript2.default.SignatureKind.Call)[0];
    const rawType = func2Signature.getReturnType();
    const res = global.checker.typeToString(rawType);
    if (res === void 0) {
      const name = _optionalChain([node, 'access', _33 => _33.type, 'optionalAccess', _34 => _34.typeName, 'optionalAccess', _35 => _35.escapedText]);
      if (name) {
        return name;
      }
    }
    return res;
  }
  getParameterType(node) {
    const isOptional = node.questionToken !== void 0;
    const result = {
      name: node.name.getText(),
      isOptional,
      type: void 0
    };
    if (node.initializer !== void 0) {
      result.initializer = node.initializer.getText();
    }
    if (node.type === void 0) {
      if (node.initializer !== void 0) {
        const type = global.checker.getTypeAtLocation(node.initializer);
        const res = global.checker.typeToString(type);
        result.type = _typescript2.default.TypeFlags[type.flags];
        return result;
      }
    }
    const name = _optionalChain([node, 'access', _36 => _36.type, 'optionalAccess', _37 => _37.typeName, 'optionalAccess', _38 => _38.escapedText]);
    if (name) {
      result.type = name;
      if (node.initializer !== void 0) {
        result.initializer = node.initializer.text;
      }
      return result;
    }
    if (node.type != void 0) {
      const type = global.checker.getTypeAtLocation(node.type);
      const res = global.checker.typeToString(type);
      result.type = res;
      return result;
    }
    return result;
  }
  getMethodTypes(file) {
    const result = [];
    if (!file.statements) {
      return result;
    }
    const classDeclarations = file.statements.filter((s) => _typescript2.default.isClassDeclaration(s));
    classDeclarations.forEach((node) => {
      const methods = node.members.filter((m) => _typescript2.default.isMethodDeclaration(m));
      methods.forEach((m) => {
        const isAsync = this.isAsyncFunction(m);
        const name = m.name.getText();
        const returnType = this.getReturnTypeFromMethod(m);
        const parameters = m.parameters;
        const paramTypes = [];
        parameters.forEach((p) => {
          const res = this.getParameterType(p);
          paramTypes.push(res);
        });
        result.push({
          name,
          async: isAsync,
          returnType,
          parameters: paramTypes
        });
      });
    });
    return result;
  }
};

// src/pythonTranspiler.ts

var SyntaxKind = _typescript2.default.SyntaxKind;
var parserConfig = {
  "STATIC_TOKEN": "",
  "PUBLIC_KEYWORD": "",
  "UNDEFINED_TOKEN": "None",
  "IF_TOKEN": "if",
  "ELSE_TOKEN": "else",
  "ELSEIF_TOKEN": "elif",
  "THIS_TOKEN": "self",
  "AMPERSTAND_APERSAND_TOKEN": "and",
  "BAR_BAR_TOKEN": "or",
  "SPACE_DEFAULT_PARAM": "",
  "BLOCK_OPENING_TOKEN": ":",
  "BLOCK_CLOSING_TOKEN": "",
  "SPACE_BEFORE_BLOCK_OPENING": "",
  "CONDITION_OPENING": "",
  "CONDITION_CLOSE": "",
  "TRUE_KEYWORD": "True",
  "FALSE_KEYWORD": "False",
  "THROW_TOKEN": "raise",
  "NOT_TOKEN": "not ",
  "PLUS_PLUS_TOKEN": " += 1",
  "MINUS_MINUS_TOKEN": " -= 1",
  "CONSTRUCTOR_TOKEN": "def __init__",
  "SUPER_CALL_TOKEN": "super().__init__",
  "PROPERTY_ASSIGNMENT_TOKEN": ":",
  "FUNCTION_TOKEN": "def",
  "SUPER_TOKEN": "super()",
  "NEW_TOKEN": "",
  "STRING_QUOTE_TOKEN": "'",
  "LINE_TERMINATOR": "",
  "METHOD_TOKEN": "def",
  "CATCH_TOKEN": "except",
  "CATCH_DECLARATION": "Exception as",
  "METHOD_DEFAULT_ACCESS": "",
  "SPREAD_TOKEN": "*"
};
var PythonTranspiler = class extends BaseTranspiler {
  constructor(config = {}) {
    config["parser"] = Object.assign({}, parserConfig, _nullishCoalesce(config["parser"], () => ( {})));
    super(config);
    this.id = "python";
    this.initConfig();
    this.asyncTranspiling = _nullishCoalesce(config["async"], () => ( true));
    this.uncamelcaseIdentifiers = _nullishCoalesce(config["uncamelcaseIdentifiers"], () => ( true));
    this.applyUserOverrides(config);
  }
  initConfig() {
    this.LeftPropertyAccessReplacements = {
      "this": "self"
    };
    this.RightPropertyAccessReplacements = {
      "push": "append",
      "toUpperCase": "upper",
      "toLowerCase": "lower",
      "indexOf": "find",
      "padEnd": "ljust",
      "padStart": "rjust"
    };
    this.FullPropertyAccessReplacements = {
      "console.log": "print",
      "JSON.stringify": "json.dumps",
      "JSON.parse": "json.loads",
      "Math.log": "math.log",
      "Math.abs": "abs",
      "Math.min": "min",
      "Math.max": "max",
      "Math.ceil": "math.ceil",
      "Math.round": "math.round",
      "Math.floor": "math.floor",
      "Math.pow": "math.pow",
      "process.exit": "sys.exit",
      "Number.MAX_SAFE_INTEGER": "float('inf')"
    };
    this.CallExpressionReplacements = {
      "parseInt": "int",
      "parseFloat": "float"
    };
    this.PropertyAccessRequiresParenthesisRemoval = [];
  }
  printArrayIsArrayCall(node, identation, parsedArg = void 0) {
    return `isinstance(${parsedArg}, list)`;
  }
  printObjectKeysCall(node, identation, parsedArg = void 0) {
    return `list(${parsedArg}.keys())`;
  }
  printObjectValuesCall(node, identation, parsedArg = void 0) {
    return `list(${parsedArg}.values())`;
  }
  printPromiseAllCall(node, identation, parsedArg) {
    return `asyncio.gather(*${parsedArg})`;
  }
  printMathFloorCall(node, identation, parsedArg = void 0) {
    return `int(math.floor(${parsedArg}))`;
  }
  printMathCeilCall(node, identation, parsedArg = void 0) {
    return `int(math.ceil(${parsedArg}))`;
  }
  printMathRoundCall(node, identation, parsedArg = void 0) {
    return `int(round(${parsedArg}))`;
  }
  printIncludesCall(node, identation, name, parsedArg) {
    return `${parsedArg} in ${name}`;
  }
  printJoinCall(node, identation, name, parsedArg) {
    return `${parsedArg}.join(${name})`;
  }
  printSplitCall(node, identation, name, parsedArg) {
    return `${name}.split(${parsedArg})`;
  }
  printPopCall(node, identation, name) {
    return `${name}.pop()`;
  }
  printShiftCall(node, identation, name) {
    return `${name}.pop(0)`;
  }
  printArrayPushCall(node, identation, name, parsedArg) {
    return `${name}.append(${parsedArg})`;
  }
  printToStringCall(node, identation, name = void 0) {
    return `str(${name})`;
  }
  printIndexOfCall(node, identation, name = void 0, parsedArg = void 0) {
    return `${name}.find(${parsedArg})`;
  }
  printStartsWithCall(node, identation, name = void 0, parsedArg = void 0) {
    return `${name}.startswith(${parsedArg})`;
  }
  printEndsWithCall(node, identation, name = void 0, parsedArg = void 0) {
    return `${name}.endswith(${parsedArg})`;
  }
  printTrimCall(node, identation, name = void 0) {
    return `${name}.strip()`;
  }
  printToUpperCaseCall(node, identation, name = void 0) {
    return `${name}.upper()`;
  }
  printToLowerCaseCall(node, identation, name = void 0) {
    return `${name}.lower()`;
  }
  printJsonParseCall(node, identation, parsedArg) {
    return `json.loads(${parsedArg})`;
  }
  printJsonStringifyCall(node, identation, parsedArg) {
    return `json.dumps(${parsedArg})`;
  }
  printElementAccessExpressionExceptionIfAny(node) {
    if (node.expression.kind === SyntaxKind.ThisKeyword) {
      return "getattr(self, " + this.printNode(node.argumentExpression, 0) + ")";
    }
  }
  printAssertCall(node, identation, parsedArgs) {
    return `assert ${parsedArgs}`;
  }
  printForStatement(node, identation) {
    const varName = node.initializer.declarations[0].name.escapedText;
    const initValue = this.printNode(node.initializer.declarations[0].initializer, 0);
    const roofValue = this.printNode(node.condition.right, 0);
    const forStm = this.getIden(identation) + this.FOR_TOKEN + " " + varName + " in range(" + initValue + ", " + roofValue + "):\n" + node.statement.statements.map((st) => this.printNode(st, identation + 1)).join("\n");
    return this.printNodeCommentsIfAny(node, identation, forStm);
  }
  transformLeadingComment(comment) {
    const commentRegex = [
      [/(^|\s)\/\//g, "$1#"],
      [/\/\*\*/, '"""'],
      [/ \*\//, '"""'],
      [/\[([^\[\]]*)\]\{@link (.*)\}/g, "`$1 <$2>`"],
      [/\s+\* @method/g, ""],
      [/(\s+) \* @description (.*)/g, "$1$2"],
      [/\s+\* @name .*/g, ""],
      [/(\s+) \* @see( .*)/g, "$1see$2"],
      [/(\s+ \* @(param|returns) {[^}]*)string([^}]*}.*)/g, "$1str$3"],
      [/(\s+ \* @(param|returns) {[^}]*)object([^}]*}.*)/g, "$1dict$3"],
      [/(\s+) \* @returns ([^\{])/g, "$1:returns: $2"],
      [/(\s+) \* @returns \{(.+)\}/g, "$1:returns $2:"],
      [/(\s+ \* @param \{[\]\[\|a-zA-Z]+\} )([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]+) (.*)/g, "$1$2['$3'] $4"],
      [/(\s+) \* @([a-z]+) \{([\]\[a-zA-Z\|]+)\} ([a-zA-Z0-9_\-\.\[\]\']+)/g, "$1:$2 $3 $4:"]
    ];
    const transformed = regexAll(comment, commentRegex);
    return transformed;
  }
  transformTrailingComment(comment) {
    const commentRegex = [
      [/(^|\s)\/\//g, "$1#"]
    ];
    const transformed = regexAll(comment, commentRegex);
    return " " + transformed;
  }
  transformPropertyAcessExpressionIfNeeded(node) {
    const expression = node.expression;
    const leftSide = this.printNode(expression, 0);
    const rightSide = node.name.escapedText;
    let rawExpression = void 0;
    if (rightSide === "length") {
      rawExpression = "len(" + leftSide + ")";
    } else if (rightSide === "toString") {
      rawExpression = "str(" + leftSide + ")";
    }
    return rawExpression;
  }
  printClassDefinition(node, identation) {
    const className = node.name.escapedText;
    const heritageClauses = node.heritageClauses;
    let classInit = "";
    if (heritageClauses !== void 0) {
      const classExtends = heritageClauses[0].types[0].expression.escapedText;
      classInit = this.getIden(identation) + "class " + className + "(" + classExtends + "):\n";
    } else {
      classInit = this.getIden(identation) + "class " + className + ":\n";
    }
    return classInit;
  }
  printMethodParameters(node) {
    let parsedArgs = super.printMethodParameters(node);
    parsedArgs = parsedArgs ? "self, " + parsedArgs : "self";
    return parsedArgs;
  }
  printInstanceOfExpression(node, identation) {
    const left = this.printNode(node.left, 0);
    const right = this.printNode(node.right, 0);
    return this.getIden(identation) + `isinstance(${left}, ${right})`;
  }
  handleTypeOfInsideBinaryExpression(node, identation) {
    const expression = node.left.expression;
    const right = node.right.text;
    const op = node.operatorToken.kind;
    const isDifferentOperator = op === SyntaxKind.ExclamationEqualsEqualsToken || op === SyntaxKind.ExclamationEqualsToken;
    const notOperator = isDifferentOperator ? this.NOT_TOKEN : "";
    switch (right) {
      case "string":
        return this.getIden(identation) + notOperator + "isinstance(" + this.printNode(expression, 0) + ", str)";
      case "number":
        return this.getIden(identation) + notOperator + "isinstance(" + this.printNode(expression, 0) + ", numbers.Real)";
      case "boolean":
        return this.getIden(identation) + notOperator + "isinstance(" + this.printNode(expression, 0) + ", bool)";
      case "object":
        return this.getIden(identation) + notOperator + "isinstance(" + this.printNode(expression, 0) + ", dict)";
      case "undefined":
        return this.getIden(identation) + this.printNode(expression, 0) + " is " + notOperator + "None";
    }
    return void 0;
  }
  printCustomBinaryExpressionIfAny(node, identation) {
    const left = node.left;
    const right = node.right.text;
    const op = node.operatorToken.kind;
    if ((op === _typescript2.default.SyntaxKind.EqualsEqualsToken || op === _typescript2.default.SyntaxKind.EqualsEqualsEqualsToken) && node.right.kind === _typescript2.default.SyntaxKind.TrueKeyword) {
      return this.getIden(identation) + this.printNode(node.left, 0);
    }
    if (left.kind === SyntaxKind.TypeOfExpression) {
      const typeOfExpression = this.handleTypeOfInsideBinaryExpression(node, identation);
      if (typeOfExpression) {
        return typeOfExpression;
      }
    }
    const prop = _optionalChain([node, 'optionalAccess', _39 => _39.left, 'optionalAccess', _40 => _40.expression, 'optionalAccess', _41 => _41.name, 'optionalAccess', _42 => _42.text]);
    if (prop) {
      const args = left.arguments;
      const parsedArg = args && args.length > 0 ? this.printNode(args[0], 0) : void 0;
      const leftSideOfIndexOf = left.expression.expression;
      const leftSide = this.printNode(leftSideOfIndexOf, 0);
      switch (prop) {
        case "indexOf":
          if (op === SyntaxKind.GreaterThanEqualsToken && right === "0") {
            return this.getIden(identation) + `${parsedArg} in ${leftSide}`;
          }
      }
    }
    return void 0;
  }
  printConditionalExpression(node, identation) {
    const condition = this.printNode(node.condition, 0);
    const whenTrue = this.printNode(node.whenTrue, 0);
    const whenFalse = this.printNode(node.whenFalse, 0);
    return this.getIden(identation) + whenTrue + " if " + condition + " else " + whenFalse;
  }
  getCustomOperatorIfAny(left, right, operator) {
    const rightText = right.getText();
    const isUndefined = rightText === "undefined";
    if (isUndefined) {
      switch (operator.kind) {
        case _typescript2.default.SyntaxKind.EqualsEqualsToken:
          return "is";
        case _typescript2.default.SyntaxKind.ExclamationEqualsToken:
          return "is not";
        case _typescript2.default.SyntaxKind.ExclamationEqualsEqualsToken:
          return "is not";
        case _typescript2.default.SyntaxKind.EqualsEqualsEqualsToken:
          return "is";
      }
    }
  }
};

// src/phpTranspiler.ts
init_cjs_shims();

var SyntaxKind2 = _typescript2.default.SyntaxKind;
var parserConfig2 = {
  "ELSEIF_TOKEN": "elseif",
  "THIS_TOKEN": "$this",
  "PROPERTY_ACCESS_TOKEN": "->",
  "UNDEFINED_TOKEN": "null",
  "NOT_TOKEN": "!",
  "LINE_TERMINATOR": ";",
  "ARRAY_OPENING_TOKEN": "[",
  "ARRAY_CLOSING_TOKEN": "]",
  "OBJECT_OPENING": "array(",
  "OBJECT_CLOSING": ")",
  "FUNCTION_TOKEN": "function",
  "ASYNC_TOKEN": "",
  "PROPERTY_ASSIGNMENT_TOKEN": " =>",
  "NEW_TOKEN": "new",
  "THROW_TOKEN": "throw",
  "SUPER_TOKEN": "parent",
  "CONSTRUCTOR_TOKEN": "function __construct",
  "SUPER_CALL_TOKEN": "parent::__construct",
  "CATCH_DECLARATION": "Exception",
  "CATCH_TOKEN": "catch",
  "BLOCK_OPENING_TOKEN": "{",
  "BLOCK_CLOSING_TOKEN": "}",
  "CONDITION_OPENING": "(",
  "CONDITION_CLOSE": ")",
  "PLUS_PLUS_TOKEN": "++",
  "MINUS_MINUS_TOKEN": "--",
  "SPACE_DEFAULT_PARAM": " ",
  "EXCLAMATION_EQUALS_EQUALS_TOKEN": "!==",
  "EQUALS_EQUALS_EQUALS_TOKEN": "===",
  "STRING_QUOTE_TOKEN": "'",
  "EXTENDS_TOKEN": "extends"
};
var PhpTranspiler = class extends BaseTranspiler {
  constructor(config = {}) {
    config["parser"] = Object.assign({}, parserConfig2, _nullishCoalesce(config["parser"], () => ( {})));
    super(config);
    this.ASYNC_FUNCTION_WRAPPER_OPEN = "";
    this.id = "php";
    this.asyncTranspiling = _nullishCoalesce(config["async"], () => ( true));
    this.uncamelcaseIdentifiers = _nullishCoalesce(config["uncamelcaseIdentifiers"], () => ( false));
    this.propRequiresScopeResolutionOperator = ["super"] + (_nullishCoalesce(config["ScopeResolutionProps"], () => ( [])));
    this.initConfig();
    this.applyUserOverrides(config);
    this.AWAIT_WRAPPER_OPEN = _nullishCoalesce(config["AWAIT_WRAPPER_OPEN"], () => ( "Async\\await("));
    this.AWAIT_WRAPPER_CLOSE = _nullishCoalesce(config["AWAIT_WRAPPER_CLOSE"], () => ( ")"));
  }
  printAwaitExpression(node, identation) {
    const expression = this.printNode(node.expression, identation);
    if (!this.asyncTranspiling) {
      return expression;
    }
    return this.AWAIT_WRAPPER_OPEN + expression + this.AWAIT_WRAPPER_CLOSE;
  }
  transformIdentifier(identifier) {
    if (this.uncamelcaseIdentifiers) {
      identifier = this.unCamelCaseIfNeeded(identifier);
    }
    if (!this.startsWithUpperCase(identifier)) {
      return "$" + identifier;
    }
    return identifier;
  }
  getCustomOperatorIfAny(left, right, operator) {
    const STRING_CONCAT = ".";
    const PLUS_EQUALS_TOKEN = ".=";
    if (operator.kind == SyntaxKind2.PlusToken || operator.kind == SyntaxKind2.PlusEqualsToken) {
      const TOKEN = operator.kind == SyntaxKind2.PlusToken ? STRING_CONCAT : PLUS_EQUALS_TOKEN;
      if (left.kind == SyntaxKind2.StringLiteral || right.kind == SyntaxKind2.StringLiteral) {
        return TOKEN;
      }
      const leftType = global.checker.getTypeAtLocation(left);
      const rightType = global.checker.getTypeAtLocation(right);
      if (leftType.flags === _typescript2.default.TypeFlags.String || rightType.flags === _typescript2.default.TypeFlags.String) {
        return TOKEN;
      }
      if (leftType.flags === _typescript2.default.TypeFlags.StringLiteral || rightType.flags === _typescript2.default.TypeFlags.StringLiteral) {
        return TOKEN;
      }
    }
    return void 0;
  }
  printLengthProperty(node, identation, name = void 0) {
    const leftSide = this.printNode(node.expression, 0);
    const type = global.checker.getTypeAtLocation(node.expression);
    this.warnIfAnyType(node, type.flags, leftSide, "length");
    return this.isStringType(type.flags) ? `strlen(${leftSide})` : `count(${leftSide})`;
  }
  printPopCall(node, identation, name = void 0) {
    return `array_pop(${name})`;
  }
  printShiftCall(node, identation, name = void 0) {
    return `array_shift(${name})`;
  }
  printToLowerCaseCall(node, identation, name = void 0) {
    return `strtolower(${name})`;
  }
  printToUpperCaseCall(node, identation, name = void 0) {
    return `strtoupper(${name})`;
  }
  printToStringCall(node, identation, name = void 0) {
    return `((string) ${name})`;
  }
  printArrayIsArrayCall(node, identation, parsedArg = void 0) {
    return `gettype(${parsedArg}) === 'array' && array_keys(${parsedArg}) === array_keys(array_keys(${parsedArg}))`;
  }
  printObjectKeysCall(node, identation, parsedArg = void 0) {
    return `is_array(${parsedArg}) ? array_keys(${parsedArg}) : array()`;
  }
  printObjectValuesCall(node, identation, parsedArg = void 0) {
    return `is_array(${parsedArg}) ? array_values(${parsedArg}) : array()`;
  }
  printJsonParseCall(node, identation, parsedArg) {
    return `json_decode(${parsedArg}, $as_associative_array = true)`;
  }
  printJsonStringifyCall(node, identation, parsedArg) {
    return `json_encode(${parsedArg})`;
  }
  printArrayPushCall(node, identation, name = void 0, parsedArg = void 0) {
    return `${name}[] = ${parsedArg}`;
  }
  printPromiseAllCall(node, identation, parsedArg = void 0) {
    return `Promise\\all(${parsedArg})`;
  }
  printMathCeilCall(node, identation, parsedArg = void 0) {
    return `((int) ceil(${parsedArg}))`;
  }
  printMathRoundCall(node, identation, parsedArg = void 0) {
    return `((int) round(${parsedArg}))`;
  }
  printMathFloorCall(node, identation, parsedArg) {
    return `((int) floor(${parsedArg}))`;
  }
  printIncludesCall(node, identation, name = void 0, parsedArg = void 0) {
    const leftSide = _optionalChain([node, 'access', _43 => _43.expression, 'optionalAccess', _44 => _44.expression]);
    const leftSideText = this.printNode(leftSide, 0);
    const type = global.checker.getTypeAtLocation(leftSide);
    this.warnIfAnyType(node, type.flags, leftSideText, "includes");
    this.warnIfAnyType(node, type.flags, leftSideText, "includes");
    if (this.isStringType(type.flags)) {
      return `str_contains(${name}, ${parsedArg})`;
    } else {
      return `in_array(${parsedArg}, ${name})`;
    }
  }
  printIndexOfCall(node, identation, name = void 0, parsedArg = void 0) {
    const leftSide = _optionalChain([node, 'access', _45 => _45.expression, 'optionalAccess', _46 => _46.expression]);
    const leftSideText = this.printNode(leftSide, 0);
    const type = global.checker.getTypeAtLocation(leftSide);
    this.warnIfAnyType(node, type.flags, leftSideText, "indexOf");
    if (this.isStringType(type.flags)) {
      return `mb_strpos(${name}, ${parsedArg})`;
    } else {
      return `array_search(${parsedArg}, ${name})`;
    }
  }
  printStartsWithCall(node, identation, name = void 0, parsedArg = void 0) {
    return `str_starts_with(${name}, ${parsedArg})`;
  }
  printEndsWithCall(node, identation, name = void 0, parsedArg = void 0) {
    return `str_ends_with(${name}, ${parsedArg})`;
  }
  printTrimCall(node, identation, name = void 0) {
    return `trim(${name})`;
  }
  printJoinCall(node, identation, name = void 0, parsedArg = void 0) {
    return `implode(${parsedArg}, ${name})`;
  }
  printSplitCall(node, identation, name = void 0, parsedArg = void 0) {
    return `explode(${parsedArg}, ${name})`;
  }
  getExceptionalAccessTokenIfAny(node) {
    const leftSide = _nullishCoalesce(node.expression.escapedText, () => ( node.expression.getFullText().trim()));
    if (!leftSide) {
      return void 0;
    }
    if (this.propRequiresScopeResolutionOperator.includes(leftSide)) {
      return "::";
    }
    return void 0;
  }
  handleTypeOfInsideBinaryExpression(node, identation) {
    const left = node.left;
    const right = node.right.text;
    const op = node.operatorToken.kind;
    const expression = left.expression;
    const isDifferentOperator = op === SyntaxKind2.ExclamationEqualsEqualsToken || op === SyntaxKind2.ExclamationEqualsToken;
    const notOperator = isDifferentOperator ? this.NOT_TOKEN : "";
    const opComp = isDifferentOperator ? this.EXCLAMATION_EQUALS_EQUALS_TOKEN : this.EQUALS_EQUALS_EQUALS_TOKEN;
    switch (right) {
      case "string":
        return this.getIden(identation) + notOperator + "is_string(" + this.printNode(expression, 0) + ")";
      case "number":
        return this.getIden(identation) + notOperator + "(is_int(" + this.printNode(expression, 0) + ") || is_float(" + this.printNode(expression, 0) + "))";
      case "boolean":
        return this.getIden(identation) + notOperator + "is_bool(" + this.printNode(expression, 0) + ")";
      case "object":
        return this.getIden(identation) + notOperator + "is_array(" + this.printNode(expression, 0) + ")";
      case "undefined":
        return this.getIden(identation) + this.printNode(expression, 0) + " " + opComp + " null";
    }
    return void 0;
  }
  printCustomBinaryExpressionIfAny(node, identation) {
    const left = node.left;
    const right = node.right.text;
    const op = node.operatorToken.kind;
    if (left.kind === SyntaxKind2.TypeOfExpression) {
      const typeOfExpression = this.handleTypeOfInsideBinaryExpression(node, identation);
      if (typeOfExpression) {
        return typeOfExpression;
      }
    }
    if (op === _typescript2.default.SyntaxKind.InKeyword) {
      const rightSide = this.printNode(node.right, 0);
      const leftSide = this.printNode(node.left, 0);
      return `${this.getIden(identation)}is_array(${rightSide}) && array_key_exists(${leftSide}, ${rightSide})`;
    }
    const prop = _optionalChain([node, 'optionalAccess', _47 => _47.left, 'optionalAccess', _48 => _48.expression, 'optionalAccess', _49 => _49.name, 'optionalAccess', _50 => _50.text]);
    if (prop) {
      const args = left.arguments;
      const parsedArg = args && args.length > 0 ? this.printNode(args[0], 0) : void 0;
      const leftSideOfIndexOf = left.expression.expression;
      const leftSide = this.printNode(leftSideOfIndexOf, 0);
      const rightType = global.checker.getTypeAtLocation(leftSideOfIndexOf);
      switch (prop) {
        case "indexOf":
          if (op === SyntaxKind2.GreaterThanEqualsToken && right === "0") {
            this.warnIfAnyType(node, rightType.flags, leftSide, "indexOf");
            if (this.isStringType(rightType.flags)) {
              return this.getIden(identation) + "mb_strpos(" + leftSide + ", " + parsedArg + ") !== false";
            } else {
              return this.getIden(identation) + "in_array(" + parsedArg + ", " + leftSide + ")";
            }
          }
      }
    }
    return void 0;
  }
  printFunctionBody(node, identation) {
    if (this.asyncTranspiling && this.isAsyncFunction(node)) {
      const blockOpen = this.getBlockOpen(identation);
      const blockClose = this.getBlockClose(identation);
      const parsedArgs = node.parameters.map((param) => this.printParameter(param, false)).join(", ");
      const params = parsedArgs ? " use (" + parsedArgs + ")" : "";
      const bodyStms = [...node.body.statements];
      const firstBodyStm = this.printNode(bodyStms[0], identation + 2);
      bodyStms.shift();
      const funcBody = bodyStms.map((s) => this.printNode(s, identation + 2)).join("\n");
      const bodyParts = firstBodyStm.split("\n");
      const commentPart = bodyParts.filter((line) => this.isComment(line));
      const isComment = commentPart.length > 0;
      let header = this.getIden(identation + 1) + "return Async\\async(function ()" + params + " {\n";
      if (isComment) {
        const commentPartString = commentPart.map((c) => this.getIden(identation + 1) + c.trim()).join("\n");
        const firstStmNoComment = bodyParts.filter((line) => !this.isComment(line)).join("\n");
        header = commentPartString + "\n" + header + firstStmNoComment + "\n";
      } else {
        header += firstBodyStm + "\n";
      }
      const result = header + funcBody + "\n" + this.getIden(identation + 1) + "}) ();";
      return blockOpen + result + blockClose;
    }
    return super.printFunctionBody(node, identation);
  }
  transformLeadingComment(comment) {
    const commentRegex = [
      [/\{([\]\[\|a-zA-Z0-9_-]+?)\}/g, "~$1~"],
      [/\[([^\]\[]*)\]\{(@link .*)\}/g, "~$2 $1~"],
      [/\s+\* @method/g, ""],
      [/(\s+)\* @description (.*)/g, "$1* $2"],
      [/\s+\* @name .*/g, ""],
      [/(\s+)\* @returns/g, "$1* @return"],
      [/\~([\]\[\|@\.\s+\:\/#\-a-zA-Z0-9_-]+?)\~/g, "{$1}"],
      [/(\s+ \* @(param|return) {[^}]*)object([^}]*}.*)/g, "$1array$3"]
    ];
    const transformed = regexAll(comment, commentRegex);
    return transformed;
  }
  initConfig() {
    this.LeftPropertyAccessReplacements = {
      "this": "$this"
    };
    this.RightPropertyAccessReplacements = {};
    this.FullPropertyAccessReplacements = {
      "Number.MAX_SAFE_INTEGER": "PHP_INT_MAX",
      "JSON.stringify": "json_encode",
      "console.log": "var_dump",
      "process.exit": "exit",
      "Math.log": "log",
      "Math.abs": "abs",
      "Math.floor": "(int) floor",
      "Math.ceil": "(int) ceil",
      "Math.round": "(int) round",
      "Math.pow": "pow",
      "Math.min": "min",
      "Math.max": "max"
    };
    this.CallExpressionReplacements = {
      "parseFloat": "floatval",
      "parseInt": "intval"
    };
    this.PropertyAccessRequiresParenthesisRemoval = [];
  }
};

// src/csharpTranspiler.ts
init_cjs_shims();

var parserConfig3 = {
  "ELSEIF_TOKEN": "else if",
  "OBJECT_OPENING": "new Dictionary<string, object>() {",
  "ARRAY_OPENING_TOKEN": "new List<object>() {",
  "ARRAY_CLOSING_TOKEN": "}",
  "PROPERTY_ASSIGNMENT_TOKEN": ",",
  "VAR_TOKEN": "object",
  "METHOD_TOKEN": "",
  "PROPERTY_ASSIGNMENT_OPEN": "{",
  "PROPERTY_ASSIGNMENT_CLOSE": "}",
  "SUPER_TOKEN": "base",
  "SUPER_CALL_TOKEN": "base",
  "FALSY_WRAPPER_OPEN": "isTrue(",
  "FALSY_WRAPPER_CLOSE": ")",
  "COMPARISON_WRAPPER_OPEN": "isEqual(",
  "COMPARISON_WRAPPER_CLOSE": ")",
  "UKNOWN_PROP_WRAPPER_OPEN": "this.call(",
  "UNKOWN_PROP_WRAPPER_CLOSE": ")",
  "UKNOWN_PROP_ASYNC_WRAPPER_OPEN": "this.callAsync(",
  "UNKOWN_PROP_ASYNC_WRAPPER_CLOSE": ")",
  "DYNAMIC_CALL_OPEN": "callDynamically(",
  "EQUALS_EQUALS_WRAPPER_OPEN": "isEqual(",
  "EQUALS_EQUALS_WRAPPER_CLOSE": ")",
  "DIFFERENT_WRAPPER_OPEN": "!isEqual(",
  "DIFFERENT_WRAPPER_CLOSE": ")",
  "GREATER_THAN_WRAPPER_OPEN": "isGreaterThan(",
  "GREATER_THAN_WRAPPER_CLOSE": ")",
  "GREATER_THAN_EQUALS_WRAPPER_OPEN": "isGreaterThanOrEqual(",
  "GREATER_THAN_EQUALS_WRAPPER_CLOSE": ")",
  "LESS_THAN_WRAPPER_OPEN": "isLessThan(",
  "LESS_THAN_WRAPPER_CLOSE": ")",
  "LESS_THAN_EQUALS_WRAPPER_OPEN": "isLessThanOrEqual(",
  "LESS_THAN_EQUALS_WRAPPER_CLOSE": ")",
  "PLUS_WRAPPER_OPEN": "add(",
  "PLUS_WRAPPER_CLOSE": ")",
  "MINUS_WRAPPER_OPEN": "subtract(",
  "MINUS_WRAPPER_CLOSE": ")",
  "ARRAY_LENGTH_WRAPPER_OPEN": "getArrayLength(",
  "ARRAY_LENGTH_WRAPPER_CLOSE": ")",
  "DIVIDE_WRAPPER_OPEN": "divide(",
  "DIVIDE_WRAPPER_CLOSE": ")",
  "MULTIPLY_WRAPPER_OPEN": "multiply(",
  "MULTIPLY_WRAPPER_CLOSE": ")",
  "INDEXOF_WRAPPER_OPEN": "getIndexOf(",
  "INDEXOF_WRAPPER_CLOSE": ")",
  "MOD_WRAPPER_OPEN": "mod(",
  "MOD_WRAPPER_CLOSE": ")",
  "FUNCTION_TOKEN": ""
};
var CSharpTranspiler = class extends BaseTranspiler {
  constructor(config = {}) {
    config["parser"] = Object.assign({}, parserConfig3, _nullishCoalesce(config["parser"], () => ( {})));
    super(config);
    this.requiresParameterType = true;
    this.requiresReturnType = true;
    this.asyncTranspiling = true;
    this.supportsFalsyOrTruthyValues = false;
    this.requiresCallExpressionCast = true;
    this.id = "C#";
    this.initConfig();
    this.applyUserOverrides(config);
  }
  initConfig() {
    this.LeftPropertyAccessReplacements = {};
    this.RightPropertyAccessReplacements = {
      "push": "Add",
      "indexOf": "IndexOf",
      "toUpperCase": "ToUpper",
      "toLowerCase": "ToLower",
      "toString": "ToString"
    };
    this.FullPropertyAccessReplacements = {
      "JSON.parse": "parseJson",
      "console.log": "Console.WriteLine",
      "Number.MAX_SAFE_INTEGER": "Int32.MaxValue",
      "Math.min": "Math.Min",
      "Math.max": "Math.Max",
      "Math.log": "Math.Log",
      "Math.abs": "Math.Abs",
      "Math.floor": "Math.Floor",
      "Math.pow": "Math.Pow"
    };
    this.CallExpressionReplacements = {};
    this.ReservedKeywordsReplacements = {
      "string": "str",
      "object": "obj",
      "params": "parameters",
      "base": "bs",
      "internal": "intern",
      "event": "eventVar",
      "fixed": "fixedVar"
    };
    this.binaryExpressionsWrappers = {
      [_typescript2.default.SyntaxKind.EqualsEqualsToken]: [this.EQUALS_EQUALS_WRAPPER_OPEN, this.EQUALS_EQUALS_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.EqualsEqualsEqualsToken]: [this.EQUALS_EQUALS_WRAPPER_OPEN, this.EQUALS_EQUALS_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.ExclamationEqualsToken]: [this.DIFFERENT_WRAPPER_OPEN, this.DIFFERENT_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.ExclamationEqualsEqualsToken]: [this.DIFFERENT_WRAPPER_OPEN, this.DIFFERENT_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.GreaterThanToken]: [this.GREATER_THAN_WRAPPER_OPEN, this.GREATER_THAN_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.GreaterThanEqualsToken]: [this.GREATER_THAN_EQUALS_WRAPPER_OPEN, this.GREATER_THAN_EQUALS_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.LessThanToken]: [this.LESS_THAN_WRAPPER_OPEN, this.LESS_THAN_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.LessThanEqualsToken]: [this.LESS_THAN_EQUALS_WRAPPER_OPEN, this.LESS_THAN_EQUALS_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.PlusToken]: [this.PLUS_WRAPPER_OPEN, this.PLUS_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.MinusToken]: [this.MINUS_WRAPPER_OPEN, this.MINUS_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.AsteriskToken]: [this.MULTIPLY_WRAPPER_OPEN, this.MULTIPLY_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.PercentToken]: [this.MOD_WRAPPER_OPEN, this.MOD_WRAPPER_CLOSE],
      [_typescript2.default.SyntaxKind.SlashToken]: [this.DIVIDE_WRAPPER_OPEN, this.DIVIDE_WRAPPER_CLOSE]
    };
  }
  getBlockOpen(identation) {
    return "\n" + this.getIden(identation) + this.BLOCK_OPENING_TOKEN + "\n";
  }
  printSuperCallInsideConstructor(node, identation) {
    return "";
  }
  printIdentifier(node) {
    let idValue = _nullishCoalesce(node.text, () => ( node.escapedText));
    if (this.ReservedKeywordsReplacements[idValue]) {
      idValue = this.ReservedKeywordsReplacements[idValue];
    }
    if (idValue === "undefined") {
      return this.UNDEFINED_TOKEN;
    }
    const type = global.checker.getTypeAtLocation(node);
    const symbol = _optionalChain([type, 'optionalAccess', _51 => _51.symbol]);
    if (symbol !== void 0) {
      const declarations = _nullishCoalesce(_optionalChain([global, 'access', _52 => _52.checker, 'access', _53 => _53.getDeclaredTypeOfSymbol, 'call', _54 => _54(symbol), 'access', _55 => _55.symbol, 'optionalAccess', _56 => _56.declarations]), () => ( []));
      const decl = _nullishCoalesce(_optionalChain([symbol, 'optionalAccess', _57 => _57.declarations]), () => ( []));
      let isBuiltIn = void 0;
      if (decl.length > 0) {
        isBuiltIn = decl[0].getSourceFile().fileName.indexOf("typescript") > -1;
      }
      if (isBuiltIn !== void 0 && !isBuiltIn) {
        const isClassDeclaration = declarations.find((l) => l.kind === _typescript2.default.SyntaxKind.ClassDeclaration);
        if (isClassDeclaration) {
          const isInsideNewExpression = _optionalChain([node, 'optionalAccess', _58 => _58.parent, 'optionalAccess', _59 => _59.kind]) === _typescript2.default.SyntaxKind.NewExpression;
          const isInsideCatch = _optionalChain([node, 'optionalAccess', _60 => _60.parent, 'optionalAccess', _61 => _61.kind]) === _typescript2.default.SyntaxKind.ThrowStatement;
          const isLeftSide = _optionalChain([node, 'optionalAccess', _62 => _62.parent, 'optionalAccess', _63 => _63.name]) === node || _optionalChain([node, 'optionalAccess', _64 => _64.parent, 'optionalAccess', _65 => _65.left]) === node;
          const isCallOrPropertyAccess = _optionalChain([node, 'optionalAccess', _66 => _66.parent, 'optionalAccess', _67 => _67.kind]) === _typescript2.default.SyntaxKind.PropertyAccessExpression || _optionalChain([node, 'optionalAccess', _68 => _68.parent, 'optionalAccess', _69 => _69.kind]) === _typescript2.default.SyntaxKind.ElementAccessExpression;
          if (!isLeftSide && !isCallOrPropertyAccess && !isInsideCatch && !isInsideNewExpression) {
            return `typeof(${idValue})`;
          }
        }
      }
    }
    return this.transformIdentifier(idValue);
  }
  printConstructorDeclaration(node, identation) {
    const classNode = node.parent;
    const className = this.printNode(classNode.name, 0);
    const args = this.printMethodParameters(node);
    const constructorBody = this.printFunctionBody(node, identation);
    let superCallParams = "";
    let hasSuperCall = false;
    _optionalChain([node, 'access', _70 => _70.body, 'optionalAccess', _71 => _71.statements, 'access', _72 => _72.forEach, 'call', _73 => _73((statement) => {
      if (_typescript2.default.isExpressionStatement(statement)) {
        const expression = statement.expression;
        if (_typescript2.default.isCallExpression(expression)) {
          const expressionText = expression.expression.getText().trim();
          if (expressionText === "super") {
            hasSuperCall = true;
            superCallParams = expression.arguments.map((a) => {
              return this.printNode(a, identation).trim();
            }).join(", ");
          }
        }
      }
    })]);
    if (hasSuperCall) {
      return this.getIden(identation) + className + `(${args}) : ${this.SUPER_CALL_TOKEN}(${superCallParams})` + constructorBody;
    }
    return this.getIden(identation) + className + "(" + args + ")" + constructorBody;
  }
  printThisElementAccesssIfNeeded(node, identation) {
    const isAsync = true;
    const elementAccess = node.expression;
    if (_optionalChain([elementAccess, 'optionalAccess', _74 => _74.kind]) === _typescript2.default.SyntaxKind.ElementAccessExpression) {
      if (_optionalChain([elementAccess, 'optionalAccess', _75 => _75.expression, 'optionalAccess', _76 => _76.kind]) === _typescript2.default.SyntaxKind.ThisKeyword) {
        let parsedArg = _optionalChain([node, 'access', _77 => _77.arguments, 'optionalAccess', _78 => _78.length]) > 0 ? this.printNode(node.arguments[0], identation).trimStart() : "";
        const propName = this.printNode(elementAccess.argumentExpression, 0);
        const wrapperOpen = isAsync ? this.UKNOWN_PROP_ASYNC_WRAPPER_OPEN : this.UKNOWN_PROP_WRAPPER_OPEN;
        const wrapperClose = isAsync ? this.UNKOWN_PROP_ASYNC_WRAPPER_CLOSE : this.UNKOWN_PROP_WRAPPER_CLOSE;
        parsedArg = parsedArg ? ", " + parsedArg : "";
        return wrapperOpen + propName + parsedArg + wrapperClose;
      }
    }
    return;
  }
  printDynamicCall(node, identation) {
    const isAsync = true;
    const elementAccess = node.expression;
    if (_optionalChain([elementAccess, 'optionalAccess', _79 => _79.kind]) === _typescript2.default.SyntaxKind.ElementAccessExpression) {
      const parsedArg = _optionalChain([node, 'access', _80 => _80.arguments, 'optionalAccess', _81 => _81.length]) > 0 ? node.arguments.map((n) => this.printNode(n, identation).trimStart()).join(", ") : "";
      const target = this.printNode(elementAccess.expression, 0);
      const propName = this.printNode(elementAccess.argumentExpression, 0);
      const argsArray = `new object[] { ${parsedArg} }`;
      const open = this.DYNAMIC_CALL_OPEN;
      let statement = `${open}${target}, ${propName}, ${argsArray})`;
      statement = isAsync ? `((Task<object>)${statement})` : statement;
      return statement;
    }
    return void 0;
  }
  printElementAccessExpressionExceptionIfAny(node) {
  }
  printWrappedUnknownThisProperty(node) {
    const type = global.checker.getResolvedSignature(node);
    if (_optionalChain([type, 'optionalAccess', _82 => _82.declaration]) === void 0) {
      let parsedArguments = _optionalChain([node, 'access', _83 => _83.arguments, 'optionalAccess', _84 => _84.map, 'call', _85 => _85((a) => this.printNode(a, 0)), 'access', _86 => _86.join, 'call', _87 => _87(", ")]);
      parsedArguments = parsedArguments ? parsedArguments : "";
      const propName = _optionalChain([node, 'access', _88 => _88.expression, 'optionalAccess', _89 => _89.name, 'access', _90 => _90.escapedText]);
      const isAsyncDecl = _optionalChain([node, 'optionalAccess', _91 => _91.parent, 'optionalAccess', _92 => _92.kind]) === _typescript2.default.SyntaxKind.AwaitExpression;
      const argsArray = `new object[] { ${parsedArguments} }`;
      const open = this.DYNAMIC_CALL_OPEN;
      let statement = `${open}this, "${propName}", ${argsArray})`;
      statement = isAsyncDecl ? `((Task<object>)${statement})` : statement;
      return statement;
    }
    return void 0;
  }
  printOutOfOrderCallExpressionIfAny(node, identation) {
    if (node.expression.kind === _typescript2.default.SyntaxKind.PropertyAccessExpression) {
      const expressionText = node.expression.getText().trim();
      const args = node.arguments;
      if (args.length === 1) {
        const parsedArg = this.printNode(args[0], 0);
        switch (expressionText) {
          case "Math.abs":
            return `Math.Abs(Convert.ToDouble(${parsedArg}))`;
        }
      } else if (args.length === 2) {
        const parsedArg1 = this.printNode(args[0], 0);
        const parsedArg2 = this.printNode(args[1], 0);
        switch (expressionText) {
          case "Math.min":
            return `mathMin(${parsedArg1}, ${parsedArg2})`;
          case "Math.max":
            return `mathMax(${parsedArg1}, ${parsedArg2})`;
          case "Math.pow":
            return `Math.Pow(Convert.ToDouble(${parsedArg1}), Convert.ToDouble(${parsedArg2}))`;
        }
      }
      const leftSide = _optionalChain([node, 'access', _93 => _93.expression, 'optionalAccess', _94 => _94.expression]);
      const leftSideText = leftSide ? this.printNode(leftSide, 0) : void 0;
      if (leftSideText === this.THIS_TOKEN || leftSide.getFullText().indexOf("(this as any)") > -1) {
        const res = this.printWrappedUnknownThisProperty(node);
        if (res) {
          return res;
        }
      }
    }
    if (node.expression.kind === _typescript2.default.SyntaxKind.ElementAccessExpression) {
      return this.printDynamicCall(node, identation);
    }
    return void 0;
  }
  handleTypeOfInsideBinaryExpression(node, identation) {
    const left = node.left;
    const right = node.right.text;
    const op = node.operatorToken.kind;
    const expression = left.expression;
    const isDifferentOperator = op === _typescript2.default.SyntaxKind.ExclamationEqualsEqualsToken || op === _typescript2.default.SyntaxKind.ExclamationEqualsToken;
    const notOperator = isDifferentOperator ? this.NOT_TOKEN : "";
    const target = this.printNode(expression, 0);
    switch (right) {
      case "string":
        return notOperator + `((${target}).GetType() == typeof(string))`;
      case "number":
        return notOperator + `((${target}).GetType() == typeof(Int64)) || ((${target}).GetType() == typeof(int) || (${target}).GetType() == typeof(float) || (${target}).GetType() == typeof(double))`;
      case "boolean":
        return notOperator + `((${target}).GetType() == typeof(bool))`;
      case "object":
        return notOperator + `((${target}).GetType() == typeof(Dictionary<string, object>))`;
      case "function":
        return notOperator + `((${target}).GetType() == typeof(Delegate))`;
    }
    return void 0;
  }
  printCustomBinaryExpressionIfAny(node, identation) {
    const left = node.left;
    const right = node.right;
    const op = node.operatorToken.kind;
    if (left.kind === _typescript2.default.SyntaxKind.TypeOfExpression) {
      const typeOfExpression = this.handleTypeOfInsideBinaryExpression(node, identation);
      if (typeOfExpression) {
        return typeOfExpression;
      }
    }
    if (op === _typescript2.default.SyntaxKind.EqualsToken && left.kind === _typescript2.default.SyntaxKind.ArrayLiteralExpression) {
      const arrayBindingPatternElements = left.elements;
      const parsedArrayBindingElements = arrayBindingPatternElements.map((e) => this.printNode(e, 0));
      const syntheticName = parsedArrayBindingElements.join("") + "Variable";
      let arrayBindingStatement = `var ${syntheticName} = ${this.printNode(right, 0)};
`;
      parsedArrayBindingElements.forEach((e, index) => {
        const leftElement = arrayBindingPatternElements[index];
        const leftType = global.checker.getTypeAtLocation(leftElement);
        const parsedType = this.getTypeFromRawType(leftType);
        const castExp = parsedType ? `(${parsedType})` : "";
        const statement = this.getIden(identation) + `${e} = ((List<object>)${syntheticName})[${index}]`;
        if (index < parsedArrayBindingElements.length - 1) {
          arrayBindingStatement += statement + ";\n";
        } else {
          arrayBindingStatement += statement;
        }
      });
      return arrayBindingStatement;
    }
    if (op === _typescript2.default.SyntaxKind.InKeyword) {
      return `inOp(${this.printNode(right, 0)}, ${this.printNode(left, 0)})`;
    }
    const leftText = this.printNode(left, 0);
    const rightText = this.printNode(right, 0);
    if (op === _typescript2.default.SyntaxKind.PlusEqualsToken) {
      return `${leftText} = add(${leftText}, ${rightText})`;
    }
    if (op === _typescript2.default.SyntaxKind.MinusEqualsToken) {
      return `${leftText} = subtract(${leftText}, ${rightText})`;
    }
    if (op in this.binaryExpressionsWrappers) {
      const wrapper = this.binaryExpressionsWrappers[op];
      const open = wrapper[0];
      const close = wrapper[1];
      return `${open}${leftText}, ${rightText}${close}`;
    }
    return void 0;
  }
  printVariableDeclarationList(node, identation) {
    const declaration = node.declarations[0];
    if (_optionalChain([declaration, 'optionalAccess', _95 => _95.name, 'access', _96 => _96.kind]) === _typescript2.default.SyntaxKind.ArrayBindingPattern) {
      const arrayBindingPattern = declaration.name;
      const arrayBindingPatternElements = arrayBindingPattern.elements;
      const parsedArrayBindingElements = arrayBindingPatternElements.map((e) => this.printNode(e.name, 0));
      const syntheticName = parsedArrayBindingElements.join("") + "Variable";
      let arrayBindingStatement = `${this.getIden(identation)}var ${syntheticName} = ${this.printNode(declaration.initializer, 0)};
`;
      parsedArrayBindingElements.forEach((e, index) => {
        const statement = this.getIden(identation) + `var ${e} = ((List<object>) ${syntheticName})[${index}]`;
        if (index < parsedArrayBindingElements.length - 1) {
          arrayBindingStatement += statement + ";\n";
        } else {
          arrayBindingStatement += statement;
        }
      });
      return arrayBindingStatement;
    }
    const isNew = declaration.initializer.kind === _typescript2.default.SyntaxKind.NewExpression;
    const varToken = isNew ? "var " : "object ";
    const parsedValue = this.printNode(declaration.initializer, identation).trimStart();
    if (parsedValue === this.UNDEFINED_TOKEN) {
      return this.getIden(identation) + "object " + this.printNode(declaration.name) + " = " + parsedValue;
    }
    return this.getIden(identation) + varToken + this.printNode(declaration.name) + " = " + parsedValue;
  }
  transformPropertyAcessExpressionIfNeeded(node) {
    const expression = node.expression;
    const leftSide = this.printNode(expression, 0);
    const rightSide = node.name.escapedText;
    let rawExpression = void 0;
    switch (rightSide) {
      case "length":
        const type = global.checker.getTypeAtLocation(expression);
        this.warnIfAnyType(node, type.flags, leftSide, "length");
        rawExpression = this.isStringType(type.flags) ? `((string)${leftSide}).Length` : `${this.ARRAY_LENGTH_WRAPPER_OPEN}${leftSide}${this.ARRAY_LENGTH_WRAPPER_CLOSE}`;
        break;
      case "push":
        rawExpression = `((List<object>)${leftSide}).Add`;
        break;
    }
    return rawExpression;
  }
  printCustomDefaultValueIfNeeded(node) {
    if (_typescript2.default.isArrayLiteralExpression(node) || _typescript2.default.isObjectLiteralExpression(node) || _typescript2.default.isStringLiteral(node) || _typescript2.default.isBooleanLiteral(node)) {
      return this.UNDEFINED_TOKEN;
    }
    if (_typescript2.default.isNumericLiteral(node)) {
      return this.UNDEFINED_TOKEN;
    }
    if (_optionalChain([node, 'optionalAccess', _97 => _97.escapedText]) === "undefined" && _optionalChain([global, 'access', _98 => _98.checker, 'access', _99 => _99.getTypeAtLocation, 'call', _100 => _100(_optionalChain([node, 'optionalAccess', _101 => _101.parent])), 'optionalAccess', _102 => _102.flags]) === _typescript2.default.TypeFlags.Number) {
      return this.UNDEFINED_TOKEN;
    }
    return void 0;
  }
  printFunctionBody(node, identation) {
    const funcParams = node.parameters;
    const initParams = [];
    if (funcParams.length > 0) {
      const body = node.body.statements;
      const first = body.length > 0 ? body[0] : [];
      const remaining = body.length > 0 ? body.slice(1) : [];
      let firstStatement = this.printNode(first, identation + 1);
      const remainingString = remaining.map((statement) => this.printNode(statement, identation + 1)).join("\n");
      funcParams.forEach((param) => {
        const initializer = param.initializer;
        if (initializer) {
          if (_typescript2.default.isArrayLiteralExpression(initializer)) {
            initParams.push(`${this.printNode(param.name, 0)} ??= new List<object>();`);
          }
          if (_typescript2.default.isObjectLiteralExpression(initializer)) {
            initParams.push(`${this.printNode(param.name, 0)} ??= new Dictionary<string, object>();`);
          }
          if (_typescript2.default.isNumericLiteral(initializer)) {
            initParams.push(`${this.printNode(param.name, 0)} ??= ${this.printNode(initializer, 0)};`);
          }
          if (_typescript2.default.isStringLiteral(initializer)) {
            initParams.push(`${this.printNode(param.name, 0)} ??= ${this.printNode(initializer, 0)};`);
          }
          if (_typescript2.default.isBooleanLiteral(initializer)) {
            initParams.push(`${this.printNode(param.name, 0)} ??= ${this.printNode(initializer, 0)};`);
          }
        }
      });
      if (initParams.length > 0) {
        const defaultInitializers = initParams.map((l) => this.getIden(identation + 1) + l).join("\n") + "\n";
        const bodyParts = firstStatement.split("\n");
        const commentPart = bodyParts.filter((line) => this.isComment(line));
        const isComment = commentPart.length > 0;
        if (isComment) {
          const commentPartString = commentPart.map((c) => this.getIden(identation + 1) + c.trim()).join("\n");
          const firstStmNoComment = bodyParts.filter((line) => !this.isComment(line)).join("\n");
          firstStatement = commentPartString + "\n" + defaultInitializers + firstStmNoComment;
        } else {
          firstStatement = defaultInitializers + firstStatement;
        }
      }
      const blockOpen = this.getBlockOpen(identation);
      const blockClose = this.getBlockClose(identation);
      firstStatement = remainingString.length > 0 ? firstStatement + "\n" : firstStatement;
      return blockOpen + firstStatement + remainingString + blockClose;
    }
    return super.printFunctionBody(node, identation);
  }
  printInstanceOfExpression(node, identation) {
    const left = node.left.escapedText;
    const right = node.right.escapedText;
    return this.getIden(identation) + `${left} is ${right}`;
  }
  printAsExpression(node, identation) {
    const type = node.type;
    if (type.kind === _typescript2.default.SyntaxKind.AnyKeyword) {
      return `((object)${this.printNode(node.expression, identation)})`;
    }
    if (type.kind === _typescript2.default.SyntaxKind.StringKeyword) {
      return `((string)${this.printNode(node.expression, identation)})`;
    }
    if (type.kind === _typescript2.default.SyntaxKind.ArrayType) {
      if (type.elementType.kind === _typescript2.default.SyntaxKind.AnyKeyword) {
        return `(List<object>)(${this.printNode(node.expression, identation)})`;
      }
      if (type.elementType.kind === _typescript2.default.SyntaxKind.StringKeyword) {
        return `(List<string>)(${this.printNode(node.expression, identation)})`;
      }
    }
    return this.printNode(node.expression, identation);
  }
  printArrayLiteralExpression(node) {
    let arrayOpen = this.ARRAY_OPENING_TOKEN;
    const elems = node.elements;
    const elements = node.elements.map((e) => {
      return this.printNode(e);
    }).join(", ");
    if (elems.length > 0) {
      const first = elems[0];
      if (first.kind === _typescript2.default.SyntaxKind.CallExpression) {
        let type = this.getFunctionType(first);
        if (type === void 0 || elements.indexOf(this.UKNOWN_PROP_ASYNC_WRAPPER_OPEN) > -1) {
          arrayOpen = "new List<object> {";
        } else {
          type = "object";
          arrayOpen = `new List<${type}> {`;
        }
      }
    }
    return arrayOpen + elements + this.ARRAY_CLOSING_TOKEN;
  }
  printMethodDefinition(node, identation) {
    let name = node.name.escapedText;
    name = this.transformMethodNameIfNeeded(name);
    let returnType = this.printFunctionType(node);
    let modifiers = this.printModifiers(node);
    const defaultAccess = this.METHOD_DEFAULT_ACCESS ? this.METHOD_DEFAULT_ACCESS + " " : "";
    modifiers = modifiers ? modifiers + " " : defaultAccess;
    modifiers = modifiers.indexOf("public") === -1 && modifiers.indexOf("private") === -1 && modifiers.indexOf("protected") === -1 ? defaultAccess + modifiers : modifiers;
    let parsedArgs = void 0;
    const methodOverride = this.getMethodOverride(node);
    const isOverride = methodOverride !== void 0;
    modifiers = isOverride ? modifiers + "override " : modifiers + "virtual ";
    if (isOverride && (returnType === "object" || returnType === "Task<object>")) {
      returnType = this.printFunctionType(methodOverride);
    }
    if (isOverride && node.parameters.length > 0) {
      const first = node.parameters[0];
      const firstType = this.getType(first);
      if (firstType === void 0) {
        const currentArgs = node.parameters;
        const parentArgs = methodOverride.parameters;
        parsedArgs = "";
        parentArgs.forEach((param, index) => {
          const originalName = this.printNode(currentArgs[index].name, 0);
          const parsedArg = this.printParameteCustomName(param, originalName);
          parsedArgs += parsedArg;
          if (index < parentArgs.length - 1) {
            parsedArgs += ", ";
          }
        });
      }
    }
    parsedArgs = parsedArgs ? parsedArgs : this.printMethodParameters(node);
    returnType = returnType ? returnType + " " : returnType;
    const methodToken = this.METHOD_TOKEN ? this.METHOD_TOKEN + " " : "";
    const methodDef = this.getIden(identation) + modifiers + returnType + methodToken + name + "(" + parsedArgs + ")";
    return this.printNodeCommentsIfAny(node, identation, methodDef);
  }
  printArgsForCallExpression(node, identation) {
    const args = node.arguments;
    let parsedArgs = "";
    if (false) {
      const parsedTypes = this.getTypesFromCallExpressionParameters(node);
      const tmpArgs = [];
      args.forEach((arg, index) => {
        const parsedType = parsedTypes[index];
        let cast = "";
        if (parsedType !== "object" && parsedType !== "float" && parsedType !== "int") {
          cast = parsedType ? `(${parsedType})` : "";
        }
        tmpArgs.push(cast + this.printNode(arg, identation).trim());
      });
      parsedArgs = tmpArgs.join(",");
      return parsedArgs;
    }
    return super.printArgsForCallExpression(node, identation);
  }
  printArrayIsArrayCall(node, identation, parsedArg = void 0) {
    return `(${parsedArg}.GetType().IsGenericType && ${parsedArg}.GetType().GetGenericTypeDefinition().IsAssignableFrom(typeof(List<>)))`;
  }
  printObjectKeysCall(node, identation, parsedArg = void 0) {
    return `new List<object>(((Dictionary<string,object>)${parsedArg}).Keys)`;
  }
  printObjectValuesCall(node, identation, parsedArg = void 0) {
    return `new List<object>(((Dictionary<string,object>)${parsedArg}).Values)`;
  }
  printJsonParseCall(node, identation, parsedArg = void 0) {
    return `parseJson(${parsedArg})`;
  }
  printJsonStringifyCall(node, identation, parsedArg = void 0) {
    return `json(${parsedArg})`;
  }
  printPromiseAllCall(node, identation, parsedArg = void 0) {
    return `promiseAll(${parsedArg})`;
  }
  printMathFloorCall(node, identation, parsedArg = void 0) {
    return `(Math.Floor(Double.Parse((${parsedArg}).ToString())))`;
  }
  printMathRoundCall(node, identation, parsedArg = void 0) {
    return `Math.Round(Convert.ToDouble(${parsedArg}))`;
  }
  printMathCeilCall(node, identation, parsedArg = void 0) {
    `Math.Ceiling(Convert.ToDouble(${parsedArg}))`;
  }
  printArrayPushCall(node, identation, name = void 0, parsedArg = void 0) {
    return `((List<object>)${name}).Add(${parsedArg})`;
  }
  printIncludesCall(node, identation, name = void 0, parsedArg = void 0) {
    return `${name}.Contains(${parsedArg})`;
  }
  printIndexOfCall(node, identation, name = void 0, parsedArg = void 0) {
    return `${this.INDEXOF_WRAPPER_OPEN}${name}, ${parsedArg}${this.INDEXOF_WRAPPER_CLOSE}`;
  }
  printStartsWithCall(node, identation, name = void 0, parsedArg = void 0) {
    return `((string)${name}).StartsWith(${parsedArg})`;
  }
  printEndsWithCall(node, identation, name = void 0, parsedArg = void 0) {
    return `((string)${name}).EndsWith(${parsedArg})`;
  }
  printTrimCall(node, identation, name = void 0) {
    return `((string)${name}).Trim()`;
  }
  printJoinCall(node, identation, name = void 0, parsedArg = void 0) {
    return `String.Join(${parsedArg}, ((List<object>)${name}).ToArray())`;
  }
  printSplitCall(node, identation, name = void 0, parsedArg = void 0) {
    return `((string)${name}).Split(new [] {((string)${parsedArg})}, StringSplitOptions.None).ToList<object>()`;
  }
  printToFixedCall(node, identation, name = void 0, parsedArg = void 0) {
    return `toFixed(${name}, ${parsedArg})`;
  }
  printToStringCall(node, identation, name = void 0) {
    return `((object)${name}).ToString()`;
  }
  printToUpperCaseCall(node, identation, name = void 0) {
    return `((string)${name}).ToUpper()`;
  }
  printToLowerCaseCall(node, identation, name = void 0) {
    return `((string)${name}).ToLower()`;
  }
  printShiftCall(node, identation, name = void 0) {
    return `((List<object>)${name}).First()`;
  }
  printReverseCall(node, identation, name = void 0) {
    return `((List<object>)${name}).Reverse()`;
  }
  printPopCall(node, identation, name = void 0) {
    return `((List<object>)${name}).Last()`;
  }
  printAssertCall(node, identation, parsedArgs) {
    return `assert(${parsedArgs})`;
  }
  printSliceCall(node, identation, name = void 0, parsedArg = void 0, parsedArg2 = void 0) {
    if (parsedArg2 === void 0) {
      parsedArg2 = "null";
    }
    return `slice(${name}, ${parsedArg}, ${parsedArg2})`;
  }
  printReplaceCall(node, identation, name = void 0, parsedArg = void 0, parsedArg2 = void 0) {
    return `((string)${name}).Replace((string)${parsedArg}, (string)${parsedArg2})`;
  }
  printLengthProperty(node, identation, name = void 0) {
    const leftSide = this.printNode(node.expression, 0);
    const type = global.checker.getTypeAtLocation(node.expression);
    this.warnIfAnyType(node, type.flags, leftSide, "length");
    return this.isStringType(type.flags) ? `((string)${leftSide}).Length` : `${this.ARRAY_LENGTH_WRAPPER_OPEN}${leftSide}${this.ARRAY_LENGTH_WRAPPER_CLOSE}`;
  }
  printPostFixUnaryExpression(node, identation) {
    const { operand, operator } = node;
    if (operand.kind === _typescript2.default.SyntaxKind.NumericLiteral) {
      return super.printPostFixUnaryExpression(node, identation);
    }
    const leftSide = this.printNode(operand, 0);
    const op = this.PostFixOperators[operator];
    return `postFixIncrement(ref ${leftSide})`;
  }
  printPrefixUnaryExpression(node, identation) {
    const { operand, operator } = node;
    if (operand.kind === _typescript2.default.SyntaxKind.NumericLiteral) {
      return super.printPrefixUnaryExpression(node, identation);
    }
    if (operator === _typescript2.default.SyntaxKind.ExclamationToken) {
      return this.PrefixFixOperators[operator] + this.printCondition(node.operand, 0);
    }
    const leftSide = this.printNode(operand, 0);
    if (operator === _typescript2.default.SyntaxKind.PlusToken) {
      return `prefixUnaryPlus(ref ${leftSide})`;
    } else {
      return `prefixUnaryNeg(ref ${leftSide})`;
    }
  }
  printConditionalExpression(node, identation) {
    const condition = this.printCondition(node.condition, 0);
    const whenTrue = this.printNode(node.whenTrue, 0);
    const whenFalse = this.printNode(node.whenFalse, 0);
    return `((bool) ${condition}) ? ` + whenTrue + " : " + whenFalse;
  }
  printThrowStatement(node, identation) {
    if (node.expression.kind === _typescript2.default.SyntaxKind.Identifier) {
      return this.getIden(identation) + this.THROW_TOKEN + " " + this.printNode(node.expression, 0) + this.LINE_TERMINATOR;
    }
    if (node.expression.kind === _typescript2.default.SyntaxKind.NewExpression) {
      const expression = node.expression;
      const argumentsExp = _nullishCoalesce(_optionalChain([expression, 'optionalAccess', _103 => _103.arguments]), () => ( []));
      const parsedArg = _nullishCoalesce(argumentsExp.map((n) => this.printNode(n, 0)).join(","), () => ( ""));
      const newExpression = this.printNode(expression.expression, 0);
      if (expression.expression.kind === _typescript2.default.SyntaxKind.Identifier) {
        const id = expression.expression;
        const symbol = global.checker.getSymbolAtLocation(expression.expression);
        if (symbol) {
          const declarations = _nullishCoalesce(_optionalChain([global, 'access', _104 => _104.checker, 'access', _105 => _105.getDeclaredTypeOfSymbol, 'call', _106 => _106(symbol), 'access', _107 => _107.symbol, 'optionalAccess', _108 => _108.declarations]), () => ( []));
          const isClassDeclaration = declarations.find((l) => l.kind === _typescript2.default.SyntaxKind.InterfaceDeclaration || l.kind === _typescript2.default.SyntaxKind.ClassDeclaration);
          if (isClassDeclaration) {
            return this.getIden(identation) + `${this.THROW_TOKEN} ${this.NEW_TOKEN} ${id.escapedText} ((string)${parsedArg}) ${this.LINE_TERMINATOR}`;
          } else {
            return this.getIden(identation) + `throwDynamicException(${id.escapedText}, ${parsedArg});return null;`;
          }
        }
        return this.getIden(identation) + `${this.THROW_TOKEN} ${this.NEW_TOKEN} ${newExpression} (${parsedArg}) ${this.LINE_TERMINATOR}`;
      } else if (expression.expression.kind === _typescript2.default.SyntaxKind.ElementAccessExpression) {
        return this.getIden(identation) + `throwDynamicException(${newExpression}, ${parsedArg});`;
      }
      return super.printThrowStatement(node, identation);
    }
  }
};

// src/transpiler.ts
var _path = require('path'); var path = _interopRequireWildcard(_path);
var __dirname_mock = import_dirname.default;
function getProgramAndTypeCheckerFromMemory(rootDir, text, options = {}) {
  options = options || _typescript2.default.getDefaultCompilerOptions();
  const inMemoryFilePath = path.resolve(path.join(rootDir, "__dummy-file.ts"));
  const textAst = _typescript2.default.createSourceFile(inMemoryFilePath, text, options.target || _typescript2.default.ScriptTarget.Latest);
  const host = _typescript2.default.createCompilerHost(options, true);
  function overrideIfInMemoryFile(methodName, inMemoryValue) {
    const originalMethod = host[methodName];
    host[methodName] = (...args) => {
      const filePath = path.resolve(args[0]);
      if (filePath === inMemoryFilePath)
        return inMemoryValue;
      return originalMethod.apply(host, args);
    };
  }
  overrideIfInMemoryFile("getSourceFile", textAst);
  overrideIfInMemoryFile("readFile", text);
  overrideIfInMemoryFile("fileExists", true);
  const program = _typescript2.default.createProgram({
    options,
    rootNames: [inMemoryFilePath],
    host
  });
  const typeChecker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(inMemoryFilePath);
  return [program, typeChecker, sourceFile];
}
var Transpiler = class {
  constructor(config = {}) {
    this.config = config;
    const phpConfig = config["php"] || {};
    const pythonConfig = config["python"] || {};
    const csharpConfig = config["csharp"] || {};
    if ("verbose" in config) {
      Logger.setVerboseMode(config["verbose"]);
    }
    this.pythonTranspiler = new PythonTranspiler(pythonConfig);
    this.phpTranspiler = new PhpTranspiler(phpConfig);
    this.csharpTranspiler = new CSharpTranspiler(csharpConfig);
  }
  setVerboseMode(verbose) {
    Logger.setVerboseMode(verbose);
  }
  createProgramInMemoryAndSetGlobals(content) {
    const [memProgram, memType, memSource] = getProgramAndTypeCheckerFromMemory(__dirname_mock, content);
    global.src = memSource;
    global.checker = memType;
    global.program = memProgram;
  }
  createProgramByPathAndSetGlobals(path2) {
    const program = _typescript2.default.createProgram([path2], {});
    const sourceFile = program.getSourceFile(path2);
    const typeChecker = program.getTypeChecker();
    global.src = sourceFile;
    global.checker = typeChecker;
    global.program = program;
  }
  checkFileDiagnostics() {
    const diagnostics = _typescript2.default.getPreEmitDiagnostics(global.program, global.src);
    if (diagnostics.length > 0) {
      let errorMessage = "Errors found in the typescript code. Transpilation might produce invalid results:\n";
      diagnostics.forEach((msg) => {
        errorMessage += "  - " + msg.messageText + "\n";
      });
      Logger.warning(errorMessage);
    }
  }
  transpile(lang, mode, file, sync = false, setGlobals = true, handleImports = true) {
    if (setGlobals) {
      if (mode === 0 /* ByPath */) {
        this.createProgramByPathAndSetGlobals(file);
      } else {
        this.createProgramInMemoryAndSetGlobals(file);
      }
      this.checkFileDiagnostics();
    }
    let transpiledContent = void 0;
    switch (lang) {
      case 0 /* Python */:
        this.pythonTranspiler.asyncTranspiling = !sync;
        transpiledContent = this.pythonTranspiler.printNode(global.src, -1);
        this.pythonTranspiler.asyncTranspiling = true;
        break;
      case 1 /* Php */:
        this.phpTranspiler.asyncTranspiling = !sync;
        transpiledContent = this.phpTranspiler.printNode(global.src, -1);
        this.phpTranspiler.asyncTranspiling = true;
        break;
      case 2 /* CSharp */:
        transpiledContent = this.csharpTranspiler.printNode(global.src, -1);
    }
    let imports = [];
    let exports = [];
    if (handleImports) {
      imports = this.pythonTranspiler.getFileImports(global.src);
      exports = this.pythonTranspiler.getFileExports(global.src);
    }
    const methodsTypes = this.pythonTranspiler.getMethodTypes(global.src);
    Logger.success("transpilation finished successfully");
    return {
      content: transpiledContent,
      imports,
      exports,
      methodsTypes
    };
  }
  transpileDifferentLanguagesGeneric(mode, input, content) {
    if (mode === 0 /* ByPath */) {
      this.createProgramByPathAndSetGlobals(content);
    } else {
      this.createProgramInMemoryAndSetGlobals(content);
    }
    this.checkFileDiagnostics();
    const files = [];
    input.forEach((inp) => {
      const async = inp.async;
      files.push({
        content: this.transpile(inp.language, mode, content, !async, false, false).content
      });
    });
    const methodsTypes = this.pythonTranspiler.getMethodTypes(global.src);
    const imports = this.pythonTranspiler.getFileImports(global.src);
    const exports = this.pythonTranspiler.getFileExports(global.src);
    const output = files.map((file) => {
      return {
        content: file.content,
        imports,
        exports,
        methodsTypes
      };
    });
    return output;
  }
  transpileDifferentLanguages(input, content) {
    const config = input.map((inp) => {
      return {
        language: this.convertStringToLanguageEnum(inp.language),
        async: inp.async
      };
    });
    return this.transpileDifferentLanguagesGeneric(1 /* ByContent */, config, content);
  }
  transpileDifferentLanguagesByPath(input, content) {
    const config = input.map((inp) => {
      return {
        language: this.convertStringToLanguageEnum(inp.language),
        async: inp.async
      };
    });
    return this.transpileDifferentLanguagesGeneric(0 /* ByPath */, config, content);
  }
  transpilePython(content) {
    return this.transpile(0 /* Python */, 1 /* ByContent */, content, !this.pythonTranspiler.asyncTranspiling);
  }
  transpilePythonByPath(path2) {
    return this.transpile(0 /* Python */, 0 /* ByPath */, path2, !this.pythonTranspiler.asyncTranspiling);
  }
  transpilePhp(content) {
    return this.transpile(1 /* Php */, 1 /* ByContent */, content, !this.phpTranspiler.asyncTranspiling);
  }
  transpilePhpByPath(path2) {
    return this.transpile(1 /* Php */, 0 /* ByPath */, path2, !this.phpTranspiler.asyncTranspiling);
  }
  transpileCSharp(content) {
    return this.transpile(2 /* CSharp */, 1 /* ByContent */, content);
  }
  transpileCSharpByPath(path2) {
    return this.transpile(2 /* CSharp */, 0 /* ByPath */, path2);
  }
  getFileImports(content) {
    this.createProgramInMemoryAndSetGlobals(content);
    return this.phpTranspiler.getFileImports(global.src);
  }
  getFileExports(content) {
    this.createProgramInMemoryAndSetGlobals(content);
    return this.phpTranspiler.getFileExports(global.src);
  }
  setPHPPropResolution(props) {
    this.phpTranspiler.propRequiresScopeResolutionOperator = props;
  }
  setPhpUncamelCaseIdentifiers(uncamelCase) {
    this.phpTranspiler.uncamelcaseIdentifiers = uncamelCase;
  }
  setPythonUncamelCaseIdentifiers(uncamelCase) {
    this.pythonTranspiler.uncamelcaseIdentifiers = uncamelCase;
  }
  setPhpAsyncTranspiling(async) {
    this.phpTranspiler.asyncTranspiling = async;
  }
  setPythonAsyncTranspiling(async) {
    this.pythonTranspiler.asyncTranspiling = async;
  }
  setPythonStringLiteralReplacements(replacements) {
    this.pythonTranspiler.StringLiteralReplacements = replacements;
  }
  convertStringToLanguageEnum(lang) {
    switch (lang) {
      case "python":
        return 0 /* Python */;
      case "php":
        return 1 /* Php */;
      case "csharp":
        return 2 /* CSharp */;
    }
  }
};



exports.Transpiler = Transpiler; exports.default = Transpiler;
