import { BaseTranspiler } from "./pureAst.js";
import { regexAll, unCamelCase } from "./utils.js";
import ts from 'typescript';

const SyntaxKind = ts.SyntaxKind;

export class PythonTranspiler extends BaseTranspiler {
    uncamelcaseIdentifiers: boolean;
    constructor(config = {}) {
        super(config);
        this.uncamelcaseIdentifiers = config['uncamelcaseIdentifiers'] ?? false;
        this.initConfig();
    }

    initConfig() {
        this.LeftPropertyAccessReplacements = {
            'this': 'self'
        };
        this.RightPropertyAccessReplacements = {
            'push': 'append',
            'toUpperCase': 'upper',
            'toLowerCase': 'lower',
            'parseFloat': 'float',
            'parseInt': 'int',
            'indexOf': 'find',
            'padEnd': 'ljust',
            'padStart': 'rjust'
        };
        this.FullPropertyAccessReplacements = {
            'console.log': 'print',
            'JSON.stringify': 'json.dumps',
            'JSON.parse': 'json.loads',
            'Math.log': 'math.log',
            'Math.abs': 'abs',
            'Math.min': 'min',
            'Math.max': 'max',
            'Math.ceil': 'math.ceil',
            'Math.round': 'math.round',
            'Math.floor': 'math.floor',
            'Math.pow': 'math.pow',
            'process.exit': 'sys.exit',
            'Number.MAX_SAFE_INTEGER': 'float(\'inf\')',
        };
        this.CallExpressionReplacements = {
            'parseInt': 'int',
            'parseFloat': 'float',
        };
    }

    printOutOfOrderCallExpressionIfAny(node, identation) {
        const expressionText = node.expression.getText();
        const args = node.arguments;
        let finalExpression = undefined;
        switch (expressionText) {
            case "Array.isArray":
                finalExpression = "isinstance(" + this.printNode(args[0], 0) + ", list)";
                break;
            case "Math.floor":
                finalExpression = "int(math.floor(" + this.printNode(args[0], 0) + "))";
                break;
            case "Object.keys":
                finalExpression = "list(" + this.printNode(args[0], 0) + ".keys())";
                break;
            case "Object.values":
                finalExpression = "list(" + this.printNode(args[0], 0) + ".values())";
                break;
            case "Math.round":
                finalExpression = "int(round(" + this.printNode(args[0], 0) + "))";
                break;
            case "Math.ceil":
                finalExpression = "int(math.ceil(" + this.printNode(args[0], 0) + "))";
                break;
        }
        if (finalExpression) {
            return this.getIden(identation) + finalExpression;
        }

        const letfSide = node.expression.expression;
        const rightSide = node.expression.name?.escapedText;

        if (rightSide === "shift") {
            return this.getIden(identation) + this.printNode(letfSide, 0) + ".pop(0)";
        }

        const arg = args && args.length > 0 ? args[0] : undefined;
        
        if (letfSide && arg) {
            const argText = this.printNode(arg, 0);
            const leftSideText = this.printNode(letfSide, 0);
            switch (rightSide) {
                case 'includes':
                    return this.getIden(identation) + argText + " in " + leftSideText;
            }
        }

        return undefined;
    }

    printElementAccessExpressionExceptionIfAny(node) {
        if (node.expression.kind === SyntaxKind.ThisKeyword) {
            return "getattr(self, " + this.printNode(node.argumentExpression, 0) + ")";
        }
    }

    printForStatement(node, identation) {
        const varName = node.initializer.declarations[0].name.escapedText; 
        const initValue = this.printNode(node.initializer.declarations[0].initializer, 0);
        const roofValue = this.printNode(node.condition.right,0);

        return this.getIden(identation) + this.FOR_TOKEN +  " " + varName + " in range(" + initValue + ", " + roofValue + "):\n" + node.statement.statements.map(st => this.printNode(st, identation+1)).join("\n") + "\n";
    }

    transformFunctionComment(comment) {
        const commentRegex = [
                [ /(^|\s)\/\//g, '$1#' ], // regular comments
                [ /\/\*\*/, '"""' ], // Doc strings
                [ / \*\//, '"""' ], // Doc strings
                [ /\s+\* @method/g, '' ], // docstring @method
                [ /(\s+) \* @description (.*)/g, '$1$2' ], // docstring description
                [ /\s+\* @name .*/g, '' ], // docstring @name
                [ /(\s+) \* @see( .*)/g, '$1see$2' ], // docstring @see
                [ /(\s+ \* @(param|returns) {[^}]*)string([^}]*}.*)/g, '$1str$3' ], // docstring type conversion
                [ /(\s+ \* @(param|returns) {[^}]*)object([^}]*}.*)/g, '$1dict$3' ], // doctstrubg type conversion
                [ /(\s+) \* @returns ([^{])/g, '$1:returns: $2' ], // docstring return
                [ /(\s+) \* @returns \{(.+)\}/g, '$1:returns $2:' ], // docstring return
                [ /(\s+ \* @param \{[\][|a-zA-Z]+\} )([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]+) (.*)/g, '$1$2[\'$3\'] $4' ], // docstring params.anything
                [ /(\s+) \* @([a-z]+) \{([\][a-zA-Z|]+)\} ([a-zA-Z0-9_\-.[\]']+)/g, '$1:$2 $3 $4:' ], // docstring para 
            ];

        const transformed = regexAll(comment, commentRegex);

        return transformed;
    }

    transformPropertyAcessExpressionIfNeeded(node: any) {
        const expression = node.expression;
        const leftSide = this.printNode(expression, 0);
        const rightSide = node.name.escapedText;
        
        let rawExpression = undefined;

        if (rightSide === "length") {
            rawExpression =  "len(" + leftSide + ")";
        } else if (rightSide === "toString") {
            rawExpression = "str(" + leftSide + ")";
        }
        return rawExpression;
    }

    shouldRemoveParenthesisFromCallExpression(node) {

        if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            const propertyAccessExpression = node.expression;
            const propertyAccessExpressionName = propertyAccessExpression.name.text;
            if (propertyAccessExpressionName === "length"
                || propertyAccessExpressionName === "toString")
            { // add more exceptions here
                return true; 
            }
        }
        return false;
    }

    printClass(node, identation) {
        const className = node.name.escapedText;
        const heritageClauses = node.heritageClauses;

        let classInit = "";
        if (heritageClauses !== undefined) {
            const classExtends = heritageClauses[0].types[0].expression.escapedText;
            classInit = this.getIden(identation) + "class " + className + "(" + classExtends + "):\n";
        } else {
            classInit = this.getIden(identation) + "class " + className + ":\n";
        }

        const classBody = this.printClassBody(node, identation);
        
        return classInit + classBody;
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
        }

        return undefined;

    }
    
    printCustomBinaryExpressionIfAny(node, identation) {
        const left = node.left;
        const right = node.right.text;

        const op = node.operatorToken.kind;

        if (left.kind === SyntaxKind.TypeOfExpression) {
            const typeOfExpression = this.handleTypeOfInsideBinaryExpression(node, identation);
            if (typeOfExpression) {
                return typeOfExpression;
            }
        }

        const prop = node?.left?.expression?.name?.text;

        if (prop) {
            const args = left.arguments;
            const parsedArg =  (args && args.length > 0) ? this.printNode(args[0], 0): undefined;
            const leftSideOfIndexOf = left.expression.expression;  // myString in myString.indexOf
            const leftSide = this.printNode(leftSideOfIndexOf, 0);
            // const rightType = global.checker.getTypeAtLocation(leftSideOfIndexOf); // type of myString in myString.indexOf ("b") >= 0;

            switch(prop) {
                case 'indexOf':
                    if (op === SyntaxKind.GreaterThanEqualsToken && right === '0') {
                        return this.getIden(identation) + `${parsedArg} in ${leftSide}`;
                    }
            }
        }
        return undefined;
    }
}
