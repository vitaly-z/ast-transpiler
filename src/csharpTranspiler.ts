import { BaseTranspiler } from "./baseTranspiler.js";
import ts, { TypeChecker } from 'typescript';

const parserConfig = {
    'ELSEIF_TOKEN': 'else if',
    'OBJECT_OPENING': 'new Dictionary<string, object>() {',
    'ARRAY_OPENING_TOKEN': 'new List<object>() {',
    'ARRAY_CLOSING_TOKEN': '}',
    'PROPERTY_ASSIGNMENT_TOKEN': ',',
    'VAR_TOKEN': 'object', // object
    'METHOD_TOKEN': '',
    'PROPERTY_ASSIGNMENT_OPEN': '{',
    'PROPERTY_ASSIGNMENT_CLOSE': '}',
    'SUPER_TOKEN': 'base',
    'SUPER_CALL_TOKEN': 'base',
    'FALSY_WRAPPER_OPEN': 'isTrue(',
    'FALSY_WRAPPER_CLOSE': ')',
    'COMPARISON_WRAPPER_OPEN' : "isEqual(",
    'COMPARISON_WRAPPER_CLOSE' : ")",
    'UKNOWN_PROP_WRAPPER_OPEN': 'this.call(',
    'UNKOWN_PROP_WRAPPER_CLOSE': ')',
    'UKNOWN_PROP_ASYNC_WRAPPER_OPEN': 'this.callAsync(',
    'UNKOWN_PROP_ASYNC_WRAPPER_CLOSE': ')',
    'DYNAMIC_CALL_OPEN': 'callDynamically(',
    'EQUALS_EQUALS_WRAPPER_OPEN': 'isEqual(',
    'EQUALS_EQUALS_WRAPPER_CLOSE': ')',
    'DIFFERENT_WRAPPER_OPEN': '!isEqual(',
    'DIFFERENT_WRAPPER_CLOSE': ')',
    'GREATER_THAN_WRAPPER_OPEN': 'isGreaterThan(',
    'GREATER_THAN_WRAPPER_CLOSE': ')',
    'GREATER_THAN_EQUALS_WRAPPER_OPEN': 'isGreaterThanOrEqual(',
    'GREATER_THAN_EQUALS_WRAPPER_CLOSE': ')',
    'LESS_THAN_WRAPPER_OPEN': 'isLessThan(',
    'LESS_THAN_WRAPPER_CLOSE': ')',
    'LESS_THAN_EQUALS_WRAPPER_OPEN': 'isLessThanOrEqual(',
    'LESS_THAN_EQUALS_WRAPPER_CLOSE': ')',
    'PLUS_WRAPPER_OPEN':'add(',
    'PLUS_WRAPPER_CLOSE':')',
    'MINUS_WRAPPER_OPEN':'subtract(',
    'MINUS_WRAPPER_CLOSE':')',
    'ARRAY_LENGTH_WRAPPER_OPEN': 'getArrayLength(',
    'ARRAY_LENGTH_WRAPPER_CLOSE': ')',
    'DIVIDE_WRAPPER_OPEN': 'divide(',
    'DIVIDE_WRAPPER_CLOSE': ')',
    'MULTIPLY_WRAPPER_OPEN': 'multiply(',
    'MULTIPLY_WRAPPER_CLOSE': ')',
    'INDEXOF_WRAPPER_OPEN': 'getIndexOf(',
    'INDEXOF_WRAPPER_CLOSE': ')',
    'MOD_WRAPPER_OPEN': 'mod(',
    'MOD_WRAPPER_CLOSE': ')',
    'FUNCTION_TOKEN': '',
};

export class CSharpTranspiler extends BaseTranspiler {

    binaryExpressionsWrappers;

    constructor(config = {}) {
        config['parser'] = Object.assign ({}, parserConfig, config['parser'] ?? {});

        super(config);

        this.requiresParameterType = true;
        this.requiresReturnType = true;
        this.asyncTranspiling = true;
        this.supportsFalsyOrTruthyValues = false;
        this.requiresCallExpressionCast = true;
        this.id = "C#";


        this.initConfig();

        // user overrides
        this.applyUserOverrides(config);
    }

    initConfig() {
        this.LeftPropertyAccessReplacements = {
            // 'this': '$this',
        };

        this.RightPropertyAccessReplacements = {
            'push': 'Add', // list method
            'indexOf': 'IndexOf', // list method
            'toUpperCase': 'ToUpper',
            'toLowerCase': 'ToLower',
            'toString': 'ToString',
        };

        this.FullPropertyAccessReplacements = {
            'JSON.parse': 'parseJson', // custom helper method
            'console.log': 'Console.WriteLine',
            'Number.MAX_SAFE_INTEGER': 'Int32.MaxValue',
            'Math.min': 'Math.Min',
            'Math.max': 'Math.Max',
            'Math.log': 'Math.Log',
            'Math.abs': 'Math.Abs',
            // 'Math.ceil':  'Math.Ceiling', // need cast
            // 'Math.round': 'Math.Round', // need to cast
            'Math.floor': 'Math.Floor',
            'Math.pow': 'Math.Pow',
            // 'Promise.all': 'Task.WhenAll',
        };

        this.CallExpressionReplacements = {
            // "parseInt": "parseINt",
            // "parseFloat": "float.Parse",
        };

        this.ReservedKeywordsReplacements = {
            'string': 'str',
            'object': 'obj',
            'params': 'parameters',
            'base': 'bs',
            'internal': 'intern',
            'event': 'eventVar',
            'fixed': 'fixedVar',
        };

        this.binaryExpressionsWrappers = {
            [ts.SyntaxKind.EqualsEqualsToken]: [this.EQUALS_EQUALS_WRAPPER_OPEN, this.EQUALS_EQUALS_WRAPPER_CLOSE],
            [ts.SyntaxKind.EqualsEqualsEqualsToken]: [this.EQUALS_EQUALS_WRAPPER_OPEN, this.EQUALS_EQUALS_WRAPPER_CLOSE],
            [ts.SyntaxKind.ExclamationEqualsToken]: [this.DIFFERENT_WRAPPER_OPEN, this.DIFFERENT_WRAPPER_CLOSE],
            [ts.SyntaxKind.ExclamationEqualsEqualsToken]: [this.DIFFERENT_WRAPPER_OPEN, this.DIFFERENT_WRAPPER_CLOSE],
            [ts.SyntaxKind.GreaterThanToken]: [this.GREATER_THAN_WRAPPER_OPEN, this.GREATER_THAN_WRAPPER_CLOSE],
            [ts.SyntaxKind.GreaterThanEqualsToken]: [this.GREATER_THAN_EQUALS_WRAPPER_OPEN, this.GREATER_THAN_EQUALS_WRAPPER_CLOSE],
            [ts.SyntaxKind.LessThanToken]: [this.LESS_THAN_WRAPPER_OPEN, this.LESS_THAN_WRAPPER_CLOSE],
            [ts.SyntaxKind.LessThanEqualsToken]: [this.LESS_THAN_EQUALS_WRAPPER_OPEN, this.LESS_THAN_EQUALS_WRAPPER_CLOSE],
            [ts.SyntaxKind.PlusToken]: [this.PLUS_WRAPPER_OPEN, this.PLUS_WRAPPER_CLOSE],
            [ts.SyntaxKind.MinusToken]: [this.MINUS_WRAPPER_OPEN, this.MINUS_WRAPPER_CLOSE],
            [ts.SyntaxKind.AsteriskToken]: [this.MULTIPLY_WRAPPER_OPEN, this.MULTIPLY_WRAPPER_CLOSE],
            [ts.SyntaxKind.PercentToken]: [this.MOD_WRAPPER_OPEN, this.MOD_WRAPPER_CLOSE],
            [ts.SyntaxKind.SlashToken]: [this.DIVIDE_WRAPPER_OPEN, this.DIVIDE_WRAPPER_CLOSE],
        };
    }

    getBlockOpen(identation){
        return "\n" + this.getIden(identation)  + this.BLOCK_OPENING_TOKEN + "\n";
    }

    printSuperCallInsideConstructor(node, identation) {
        return ""; // csharp does not need super call inside constructor
    }

    printIdentifier(node) {
        let idValue = node.text ?? node.escapedText;

        if (this.ReservedKeywordsReplacements[idValue]) {
            idValue = this.ReservedKeywordsReplacements[idValue];
        }

        if (idValue === "undefined") {
            return this.UNDEFINED_TOKEN;
        }

        // check if it is a class declaration that we need to wrap arounf typeof
        // example: const x = Error -> var x = typeof(Error)
        const type = global.checker.getTypeAtLocation(node);
        const symbol = type?.symbol;
        if (symbol !== undefined) {
            const declarations = global.checker.getDeclaredTypeOfSymbol(symbol).symbol?.declarations ?? [];
            const decl = symbol?.declarations ?? [];
            let isBuiltIn = undefined;
            if (decl.length > 0) {
                isBuiltIn = decl[0].getSourceFile().fileName.indexOf('typescript') > -1; //very hacky find a better solution later
            }

            if (isBuiltIn !== undefined && !isBuiltIn) {
                const isClassDeclaration = declarations.find(l => l.kind === ts.SyntaxKind.ClassDeclaration);
                if (isClassDeclaration) {
                    const isInsideNewExpression =  node?.parent?.kind === ts.SyntaxKind.NewExpression;
                    const isInsideCatch = node?.parent?.kind === ts.SyntaxKind.ThrowStatement;
                    const isLeftSide = node?.parent?.name === node || (node?.parent?.left === node);
                    const isCallOrPropertyAccess = node?.parent?.kind === ts.SyntaxKind.PropertyAccessExpression || node?.parent?.kind === ts.SyntaxKind.ElementAccessExpression;
                    if (!isLeftSide && !isCallOrPropertyAccess && !isInsideCatch && !isInsideNewExpression) {
                        return `typeof(${idValue})`;
                    }
                }
            }
        }

        return this.transformIdentifier(idValue); // check this later
    }

    printConstructorDeclaration (node, identation) {
        const classNode = node.parent;
        const className = this.printNode(classNode.name, 0);
        const args = this.printMethodParameters(node);
        const constructorBody = this.printFunctionBody(node, identation);

        // find super call inside constructor and extract params
        let superCallParams = '';
        let hasSuperCall = false;
        node.body?.statements.forEach(statement => {
            if (ts.isExpressionStatement(statement)) {
                const expression = statement.expression;
                if (ts.isCallExpression(expression)) {
                    const expressionText = expression.expression.getText().trim();
                    if (expressionText === 'super') {
                        hasSuperCall = true;
                        superCallParams = expression.arguments.map((a) => {
                            return this.printNode(a, identation).trim();
                        }).join(", ");
                    }
                }
            }
        });

        if (hasSuperCall) {
            return this.getIden(identation) + className +
                `(${args}) : ${this.SUPER_CALL_TOKEN}(${superCallParams})` +
                constructorBody;
        }

        return this.getIden(identation) +
                className +
                "(" + args + ")" +
                constructorBody;
    }

    printThisElementAccesssIfNeeded(node, identation) {
        // convert this[method] into this.call(method) or this.callAsync(method)
        // const isAsync = node?.parent?.kind === ts.SyntaxKind.AwaitExpression;
        const isAsync = true; // setting to true for now, because there are some scenarios where we don't know
        // if the call is async or not, so we need to assume it is async
        // example Promise.all([this.unknownPropAsync()])
        const elementAccess = node.expression;
        if (elementAccess?.kind === ts.SyntaxKind.ElementAccessExpression) {
            if (elementAccess?.expression?.kind === ts.SyntaxKind.ThisKeyword) {
                let parsedArg = node.arguments?.length > 0 ? this.printNode(node.arguments[0], identation).trimStart() : "";
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
        const isAsync = true; // setting to true for now, because there are some scenarios where we don't know
        const elementAccess = node.expression;
        if (elementAccess?.kind === ts.SyntaxKind.ElementAccessExpression) {
            const parsedArg = node.arguments?.length > 0 ? node.arguments.map(n => this.printNode(n, identation).trimStart()).join(", ") : "";
            const target = this.printNode(elementAccess.expression, 0);
            const propName = this.printNode(elementAccess.argumentExpression, 0);
            const argsArray = `new object[] { ${parsedArg} }`;
            const open = this.DYNAMIC_CALL_OPEN;
            let statement = `${open}${target}, ${propName}, ${argsArray})`;
            statement = isAsync ? `((Task<object>)${statement})` : statement;
            return statement;
        }
        return undefined;
    }


    printElementAccessExpressionExceptionIfAny(node) {
        // convert this[method] into this.call(method) or this.callAsync(method)
    //    if (node?.expression?.kind === ts.SyntaxKind.ThisKeyword) {
    //         const isAsyncDecl = node?.parent?.kind === ts.SyntaxKind.AwaitExpression;
    //         const open = isAsyncDecl ? this.UKNOWN_PROP_ASYNC_WRAPPER_OPEN : this.UKNOWN_PROP_WRAPPER_OPEN;
    //         return open.replace('(', '');
    //    }
    }

    printWrappedUnknownThisProperty(node) {
        const type = global.checker.getResolvedSignature(node);
        if (type?.declaration === undefined) {
            let parsedArguments = node.arguments?.map((a) => this.printNode(a, 0)).join(", ");
            parsedArguments = parsedArguments ? parsedArguments : "";
            const propName = node.expression?.name.escapedText;
            // const isAsyncDecl = true;
            const isAsyncDecl = node?.parent?.kind === ts.SyntaxKind.AwaitExpression;
            // const open = isAsyncDecl ? this.UKNOWN_PROP_ASYNC_WRAPPER_OPEN : this.UKNOWN_PROP_WRAPPER_OPEN;
            // const close = this.UNKOWN_PROP_WRAPPER_CLOSE;
            // return `${open}"${propName}"${parsedArguments}${close}`;
            const argsArray = `new object[] { ${parsedArguments} }`;
            const open = this.DYNAMIC_CALL_OPEN;
            let statement = `${open}this, "${propName}", ${argsArray})`;
            statement = isAsyncDecl ? `((Task<object>)${statement})` : statement;
            return statement;
        }
        return undefined;
    }

    printOutOfOrderCallExpressionIfAny(node, identation) {
        if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            const expressionText = node.expression.getText().trim();
            const args = node.arguments;
            if (args.length === 1) {
                const parsedArg = this.printNode(args[0], 0);
                switch (expressionText) {
                // case "JSON.parse":
                //     return `json_decode(${parsedArg}, $as_associative_array = true)`;
                case "Math.abs":
                    return `Math.Abs(Convert.ToDouble(${parsedArg}))`;
                }
            } else if (args.length === 2)
            {
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
            const leftSide = node.expression?.expression;
            const leftSideText = leftSide ? this.printNode(leftSide, 0) : undefined;

            // wrap unknown property this.X calls
            if (leftSideText === this.THIS_TOKEN || leftSide.getFullText().indexOf("(this as any)") > -1) { // double check this
                const res = this.printWrappedUnknownThisProperty(node);
                if (res) {
                    return res;
                }
            }
        }

        // // replace this[method]() calls
        // const thisElementAccess = this.printThisElementAccesssIfNeeded(node, identation);
        // if (thisElementAccess) {
        //     return thisElementAccess;
        // }

        // handle dynamic calls, this[method](A) or exchange[b] (c) using reflection
        if (node.expression.kind === ts.SyntaxKind.ElementAccessExpression) {
            return this.printDynamicCall(node, identation);
        }


        return undefined;
    }

    handleTypeOfInsideBinaryExpression(node, identation) {
        const left = node.left;
        const right = node.right.text;
        const op = node.operatorToken.kind;
        const expression = left.expression;

        const isDifferentOperator = op === ts.SyntaxKind.ExclamationEqualsEqualsToken || op === ts.SyntaxKind.ExclamationEqualsToken;
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

        return undefined;

    }

    printCustomBinaryExpressionIfAny(node, identation) {
        const left = node.left;
        const right = node.right;

        const op = node.operatorToken.kind;

        if (left.kind === ts.SyntaxKind.TypeOfExpression) {
            const typeOfExpression = this.handleTypeOfInsideBinaryExpression(node, identation);
            if (typeOfExpression) {
                return typeOfExpression;
            }
        }

        // handle: [x,d] = this.method()
        if (op === ts.SyntaxKind.EqualsToken && left.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            const arrayBindingPatternElements = left.elements;
            const parsedArrayBindingElements = arrayBindingPatternElements.map((e) => this.printNode(e, 0));
            const syntheticName = parsedArrayBindingElements.join("") + "Variable";

            let arrayBindingStatement = `var ${syntheticName} = ${this.printNode(right, 0)};\n`;

            parsedArrayBindingElements.forEach((e, index) => {
                // const type = this.getType(node);
                // const parsedType = this.getTypeFromRawType(type);
                const leftElement = arrayBindingPatternElements[index];
                const leftType = global.checker.getTypeAtLocation(leftElement);
                const parsedType = this.getTypeFromRawType(leftType);

                const castExp = parsedType ? `(${parsedType})` : "";

                // const statement = this.getIden(identation) + `${e} = (${castExp}((List<object>)${syntheticName}))[${index}]`;
                const statement = this.getIden(identation) + `${e} = ((List<object>)${syntheticName})[${index}]`;
                if (index < parsedArrayBindingElements.length - 1) {
                    arrayBindingStatement += statement + ";\n";
                } else {
                    // printStatement adds the last ;
                    arrayBindingStatement += statement;
                }
            });

            return arrayBindingStatement;
        }

        if (op === ts.SyntaxKind.InKeyword) {
            return `inOp(${this.printNode(right, 0)}, ${this.printNode(left, 0)})`;
        }

        const leftText = this.printNode(left, 0);
        const rightText = this.printNode(right, 0);

        if (op === ts.SyntaxKind.PlusEqualsToken) {
            return `${leftText} = add(${leftText}, ${rightText})`;
        }

        if (op === ts.SyntaxKind.MinusEqualsToken) {
            return `${leftText} = subtract(${leftText}, ${rightText})`;
        }


        if (op in this.binaryExpressionsWrappers) {
            const wrapper = this.binaryExpressionsWrappers[op];
            const open = wrapper[0];
            const close = wrapper[1];
            return `${open}${leftText}, ${rightText}${close}`;
        }

        // x = y
        // cast y to x type when y is unknown
        // if (op === ts.SyntaxKind.EqualsToken) {
        //     const leftType = global.checker.getTypeAtLocation(left);
        //     const rightType = global.checker.getTypeAtLocation(right);

        //     if (this.isAnyType(rightType.flags) && !this.isAnyType(leftType.flags)) {
        //         // const parsedType = this.getTypeFromRawType(leftType);
        //         return `${leftText} = ${rightText}`;
        //     }
        // }

        return undefined;
    }

    // castVariableAssignmentIfNeeded(left, right, identation) {
    //     const leftType = global.checker.getTypeAtLocation(left);
    //     const rightType = global.checker.getTypeAtLocation(right);

    //     const leftText = this.printNode(left, 0);
    //     const rightText = this.printNode(right, 0);

    //     if (this.isAnyType(rightType.flags) && !this.isAnyType(leftType.flags)) {
    //         const parsedType = this.getTypeFromRawType(leftType);
    //         return `${this.getIden(identation)}${leftText} = (${parsedType})${rightText}`;
    //     }
    //     return undefined;
    // }

    printVariableDeclarationList(node,identation) {
        const declaration = node.declarations[0];
        // const name = declaration.name.escapedText;

        // handle array binding : input: const [a,b] = this.method()
        // output: var abVar = this.method; var a = abVar[0]; var b = abVar[1];
        if (declaration?.name.kind === ts.SyntaxKind.ArrayBindingPattern) {
            const arrayBindingPattern = declaration.name;
            const arrayBindingPatternElements = arrayBindingPattern.elements;
            const parsedArrayBindingElements = arrayBindingPatternElements.map((e) => this.printNode(e.name, 0));
            const syntheticName = parsedArrayBindingElements.join("") + "Variable";

            let arrayBindingStatement =  `${this.getIden(identation)}var ${syntheticName} = ${this.printNode(declaration.initializer, 0)};\n`;

            parsedArrayBindingElements.forEach((e, index) => {
                // const type = this.getType(node);
                // const parsedType = this.getTypeFromRawType(type);
                const statement = this.getIden(identation) + `var ${e} = ((List<object>) ${syntheticName})[${index}]`;
                if (index < parsedArrayBindingElements.length - 1) {
                    arrayBindingStatement += statement + ";\n";
                } else {
                    // printStatement adds the last ;
                    arrayBindingStatement += statement;
                }
            });

            return arrayBindingStatement;
        }

        const isNew = (declaration.initializer.kind === ts.SyntaxKind.NewExpression);
        const varToken = isNew ? 'var ' : 'object ' ;

        // handle default undefined initialization
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

        let rawExpression = undefined;

        switch(rightSide) {
        case 'length':
                const type = (global.checker as TypeChecker).getTypeAtLocation(expression); // eslint-disable-line
            this.warnIfAnyType(node, type.flags, leftSide, "length");
            // rawExpression = this.isStringType(type.flags) ? `(string${leftSide}).Length` : `(${leftSide}.Cast<object>().ToList()).Count`;
            rawExpression = this.isStringType(type.flags) ? `((string)${leftSide}).Length` : `${this.ARRAY_LENGTH_WRAPPER_OPEN}${leftSide}${this.ARRAY_LENGTH_WRAPPER_CLOSE}`; // `(${leftSide}.Cast<object>()).ToList().Count`
            break;
        case 'push':
            rawExpression = `((List<object>)${leftSide}).Add`;
            break;
            // case 'push':
            //     rawExpression = `(List<object>${leftSide}).Add`s
            //     break;
        }
        return rawExpression;
    }

    printCustomDefaultValueIfNeeded(node) {
        if (ts.isArrayLiteralExpression(node) || ts.isObjectLiteralExpression(node) || ts.isStringLiteral(node) || (ts as any).isBooleanLiteral(node)) {
            return this.UNDEFINED_TOKEN;
        }

        if (ts.isNumericLiteral(node)) {
            return this.UNDEFINED_TOKEN;
        }

        // convert x: number = undefined (invalid) into x = -1 (valid)
        if (node?.escapedText === "undefined" && global.checker.getTypeAtLocation(node?.parent)?.flags === ts.TypeFlags.Number) {
            // return "-1";
            return this.UNDEFINED_TOKEN;
        }

        return undefined;
    }

    printFunctionBody(node, identation) {

        // check if there is any default parameter to initialize
        const funcParams = node.parameters;
        const initParams = [];
        if (funcParams.length > 0) {
            const body = node.body.statements;
            const first = body.length > 0 ? body[0] : [];
            const remaining = body.length > 0 ? body.slice(1): [];
            let firstStatement = this.printNode(first, identation + 1);

            const remainingString = remaining.map((statement) => this.printNode(statement, identation + 1)).join("\n");
            funcParams.forEach((param) => {
                const initializer = param.initializer;
                if (initializer) {
                    if (ts.isArrayLiteralExpression(initializer)) {
                        initParams.push(`${this.printNode(param.name, 0)} ??= new List<object>();`);
                    }
                    if (ts.isObjectLiteralExpression(initializer)) {
                        initParams.push(`${this.printNode(param.name, 0)} ??= new Dictionary<string, object>();`);
                    }
                    if (ts.isNumericLiteral(initializer)) {
                        initParams.push(`${this.printNode(param.name, 0)} ??= ${this.printNode(initializer, 0)};`);
                    }
                    if (ts.isStringLiteral(initializer)) {
                        initParams.push(`${this.printNode(param.name, 0)} ??= ${this.printNode(initializer, 0)};`);
                    }
                    if ((ts as any).isBooleanLiteral(initializer)) {
                        initParams.push(`${this.printNode(param.name, 0)} ??= ${this.printNode(initializer, 0)};`);
                    }
                }
            });

            if (initParams.length > 0) {
                const defaultInitializers = initParams.map( l => this.getIden(identation+1) + l ).join("\n") + "\n";
                const bodyParts = firstStatement.split("\n");
                const commentPart = bodyParts.filter(line => this.isComment(line));
                const isComment = commentPart.length > 0;
                if (isComment) {
                    const commentPartString = commentPart.map((c) => this.getIden(identation+1) + c.trim()).join("\n");
                    const firstStmNoComment = bodyParts.filter(line => !this.isComment(line)).join("\n");
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

        if (type.kind === ts.SyntaxKind.AnyKeyword) {
            return `((object)${this.printNode(node.expression, identation)})`;
        }

        if (type.kind === ts.SyntaxKind.StringKeyword) {
            return `((string)${this.printNode(node.expression, identation)})`;
        }

        if (type.kind === ts.SyntaxKind.ArrayType) {
            if (type.elementType.kind === ts.SyntaxKind.AnyKeyword) {
                return `(List<object>)(${this.printNode(node.expression, identation)})`;
            }
            if (type.elementType.kind === ts.SyntaxKind.StringKeyword) {
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

        // take into consideration list of promises
        if (elems.length > 0) {
            const first = elems[0];
            if (first.kind === ts.SyntaxKind.CallExpression) {
                // const type = global.checker.getTypeAtLocation(first);
                let type = this.getFunctionType(first);
                // const parsedType = this.getTypeFromRawType(type);
                // parsedType === "Task" ||
                // to do check this later
                if (type === undefined || elements.indexOf(this.UKNOWN_PROP_ASYNC_WRAPPER_OPEN) > -1) {
                    // if (type === undefined) {
                    arrayOpen = "new List<object> {";
                    // }
                    //  else {
                    //     arrayOpen = "new List<Task<object>> {";
                    // }
                } else {
                    type = 'object';
                    // check this out later
                    // if (type === 'Task<List<object>>') {
                    //     type = 'Task<object>';
                    // }
                    // if (type === 'string'){
                    //     type = 'object';
                    // }
                    // type =
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
        const defaultAccess = this.METHOD_DEFAULT_ACCESS ? this.METHOD_DEFAULT_ACCESS + " ": "";
        modifiers = modifiers ? modifiers + " " : defaultAccess; // tmp check this

        modifiers = modifiers.indexOf("public") === -1 && modifiers.indexOf("private") === -1 && modifiers.indexOf("protected") === -1 ? defaultAccess + modifiers : modifiers;

        let parsedArgs = undefined;
        // c# only move this elsewhere (csharp transpiler)
        const methodOverride = this.getMethodOverride(node) as any;
        const isOverride = methodOverride !== undefined;
        modifiers = isOverride ? modifiers + "override " : modifiers + "virtual ";

        // infer parent return type
        if (isOverride && (returnType === "object" || returnType === "Task<object>")) {
            returnType = this.printFunctionType(methodOverride);
        }

        // ts does not infer parameters types of overriden methods :x , so we need some
        // heuristic here to infer the types
        if (isOverride && node.parameters.length > 0) {
            const first = node.parameters[0];
            const firstType = this.getType(first);

            if (firstType === undefined) {
                // use the override version, check this out later
                // parsedArgs = this.printMethodParameters(methodOverride);
                const currentArgs = node.parameters;
                const parentArgs = methodOverride.parameters;
                parsedArgs = "";
                parentArgs.forEach((param, index) => {
                    const originalName = this.printNode(currentArgs[index].name, 0);
                    const parsedArg = this.printParameteCustomName(param, originalName);
                    parsedArgs+= parsedArg;
                    if (index < parentArgs.length - 1) {
                        parsedArgs+= ", ";
                    }
                });
            }
        }

        parsedArgs = parsedArgs ? parsedArgs : this.printMethodParameters(node);

        returnType = returnType ? returnType + " " : returnType;

        const methodToken = this.METHOD_TOKEN ? this.METHOD_TOKEN + " " : "";
        const methodDef = this.getIden(identation) + modifiers + returnType + methodToken + name
            + "(" + parsedArgs + ")";

        return this.printNodeCommentsIfAny(node, identation, methodDef);
    }

    printArgsForCallExpression(node, identation) {
        const args = node.arguments;
        let parsedArgs  = "";
        if (false && this.requiresCallExpressionCast && !this.isBuiltInFunctionCall(node?.expression)) { //eslint-disable-line
            const parsedTypes = this.getTypesFromCallExpressionParameters(node);
            const tmpArgs = [];
            args.forEach((arg, index) => {
                const parsedType = parsedTypes[index];
                let cast = "";
                if (parsedType !== "object" && parsedType !== "float" && parsedType !== "int") {
                    cast = parsedType ? `(${parsedType})` : '';
                }
                tmpArgs.push(cast + this.printNode(arg, identation).trim());
            });
            parsedArgs = tmpArgs.join(",");
            return parsedArgs;
        }
        return super.printArgsForCallExpression(node, identation);
    }

    // check this out later

    printArrayIsArrayCall(node, identation, parsedArg = undefined) {
        return `(${parsedArg}.GetType().IsGenericType && ${parsedArg}.GetType().GetGenericTypeDefinition().IsAssignableFrom(typeof(List<>)))`;
    }

    printObjectKeysCall(node, identation, parsedArg = undefined) {
        return `new List<object>(((Dictionary<string,object>)${parsedArg}).Keys)`;
    }

    printObjectValuesCall(node, identation, parsedArg = undefined) {
        return `new List<object>(((Dictionary<string,object>)${parsedArg}).Values)`;
    }

    printJsonParseCall(node, identation, parsedArg = undefined) {
        return `parseJson(${parsedArg})`;
    }

    printJsonStringifyCall(node, identation, parsedArg = undefined) {
        return `json(${parsedArg})`; // make this customizable
    }

    printPromiseAllCall(node, identation, parsedArg = undefined) {
        return `promiseAll(${parsedArg})`;
    }

    printMathFloorCall(node, identation, parsedArg = undefined) {
        return `(Math.Floor(Double.Parse((${parsedArg}).ToString())))`;
    }

    printMathRoundCall(node, identation, parsedArg = undefined) {
        return `Math.Round(Convert.ToDouble(${parsedArg}))`;
    }

    printMathCeilCall(node, identation, parsedArg = undefined) {
        `Math.Ceiling(Convert.ToDouble(${parsedArg}))`;
    }

    printArrayPushCall(node, identation, name = undefined, parsedArg = undefined) {
        return  `((List<object>)${name}).Add(${parsedArg})`;
    }

    printIncludesCall(node, identation, name = undefined, parsedArg = undefined) {
        return `${name}.Contains(${parsedArg})`;
    }

    printIndexOfCall(node, identation, name = undefined, parsedArg = undefined) {
        return `${this.INDEXOF_WRAPPER_OPEN}${name}, ${parsedArg}${this.INDEXOF_WRAPPER_CLOSE}`;
    }

    printStartsWithCall(node, identation, name = undefined, parsedArg = undefined) {
        return `((string)${name}).StartsWith(${parsedArg})`;
    }

    printEndsWithCall(node, identation, name = undefined, parsedArg = undefined) {
        return `((string)${name}).EndsWith(${parsedArg})`;
    }

    printTrimCall(node, identation, name = undefined) {
        return `((string)${name}).Trim()`;
    }

    printJoinCall(node, identation, name = undefined, parsedArg = undefined) {
        return `String.Join(${parsedArg}, ((List<object>)${name}).ToArray())`;
    }

    printSplitCall(node, identation, name = undefined, parsedArg = undefined) {
        return `((string)${name}).Split(new [] {((string)${parsedArg})}, StringSplitOptions.None).ToList<object>()`;
    }

    printToFixedCall(node, identation, name = undefined, parsedArg = undefined) {
        return `toFixed(${name}, ${parsedArg})`;
    }

    printToStringCall(node, identation, name = undefined) {
        return `((object)${name}).ToString()`;
    }

    printToUpperCaseCall(node, identation, name = undefined) {
        return `((string)${name}).ToUpper()`;
    }

    printToLowerCaseCall(node, identation, name = undefined) {
        return `((string)${name}).ToLower()`;
    }

    printShiftCall(node, identation, name = undefined) {
        return `((List<object>)${name}).First()`;
    }

    printReverseCall(node, identation, name = undefined) {
        return `((List<object>)${name}).Reverse()`;
    }

    printPopCall(node, identation, name = undefined) {
        return `((List<object>)${name}).Last()`;
    }

    printAssertCall(node, identation, parsedArgs) {
        return `assert(${parsedArgs})`;
    }

    printSliceCall(node, identation, name = undefined, parsedArg = undefined, parsedArg2 = undefined) {
        if (parsedArg2 === undefined){
            // return `((string)${name}).Substring((int)${parsedArg})`;
            parsedArg2 = 'null';
        }
        // return `((string)${name})[((int)${parsedArg})..((int)${parsedArg2})]`;
        return `slice(${name}, ${parsedArg}, ${parsedArg2})`;
    }

    printReplaceCall(node, identation, name = undefined, parsedArg = undefined, parsedArg2 = undefined) {
        return `((string)${name}).Replace((string)${parsedArg}, (string)${parsedArg2})`;
    }

    printLengthProperty(node, identation, name = undefined) {
        const leftSide = this.printNode(node.expression, 0);
        const type = (global.checker as TypeChecker).getTypeAtLocation(node.expression); // eslint-disable-line
        this.warnIfAnyType(node, type.flags, leftSide, "length");
        return this.isStringType(type.flags) ? `((string)${leftSide}).Length` : `${this.ARRAY_LENGTH_WRAPPER_OPEN}${leftSide}${this.ARRAY_LENGTH_WRAPPER_CLOSE}`;
    }

    printPostFixUnaryExpression(node, identation) {
        const {operand, operator} = node;
        if (operand.kind === ts.SyntaxKind.NumericLiteral) {
            return super.printPostFixUnaryExpression(node, identation);
        }
        const leftSide = this.printNode(operand, 0);
        const op = this.PostFixOperators[operator]; // todo: handle --
        return `postFixIncrement(ref ${leftSide})`;
    }

    printPrefixUnaryExpression(node, identation) {
        const {operand, operator} = node;
        if (operand.kind === ts.SyntaxKind.NumericLiteral) {
            return super.printPrefixUnaryExpression(node, identation);
        }
        if (operator === ts.SyntaxKind.ExclamationToken) {
            // not branch check falsy/turthy values if needed;
            return  this.PrefixFixOperators[operator] + this.printCondition(node.operand, 0);
        }
        const leftSide = this.printNode(operand, 0);
        if (operator === ts.SyntaxKind.PlusToken) {
            return `prefixUnaryPlus(ref ${leftSide})`;
        } else {
            return `prefixUnaryNeg(ref ${leftSide})`;
        }
    }

    printConditionalExpression(node, identation) {
        const condition = this.printCondition(node.condition, 0);
        const whenTrue = this.printNode(node.whenTrue, 0);
        const whenFalse = this.printNode(node.whenFalse, 0);

        return `((bool) ${condition})` + " ? " + whenTrue + " : " + whenFalse;
    }

    printThrowStatement(node, identation) {
        // const expression = this.printNode(node.expression, 0);
        // return this.getIden(node) + this.THROW_TOKEN + " " + expression + this.LINE_TERMINATOR;
        if (node.expression.kind === ts.SyntaxKind.Identifier) {
            return this.getIden(identation) + this.THROW_TOKEN + ' ' + this.printNode(node.expression, 0) + this.LINE_TERMINATOR;
        }
        if (node.expression.kind === ts.SyntaxKind.NewExpression) {
            const expression = node.expression;
            // handle throw new Error (Message)
            // and throw new x[a] (message)
            const argumentsExp = expression?.arguments ?? [];
            const parsedArg = argumentsExp.map(n => this.printNode(n, 0)).join(",") ?? '';
            const newExpression =  this.printNode(expression.expression, 0);
            if (expression.expression.kind === ts.SyntaxKind.Identifier) {
                // handle throw new X
                const id = expression.expression;
                const symbol = global.checker.getSymbolAtLocation(expression.expression);
                if (symbol) {
                    const declarations = global.checker.getDeclaredTypeOfSymbol(symbol).symbol?.declarations ?? [];
                    const isClassDeclaration = declarations.find(l => l.kind === ts.SyntaxKind.InterfaceDeclaration ||  l.kind === ts.SyntaxKind.ClassDeclaration);
                    if (isClassDeclaration){
                        return this.getIden(identation) + `${this.THROW_TOKEN} ${this.NEW_TOKEN} ${id.escapedText} ((string)${parsedArg}) ${this.LINE_TERMINATOR}`;
                    } else {
                        return this.getIden(identation) + `throwDynamicException(${id.escapedText}, ${parsedArg});return null;`;
                    }
                }
                return this.getIden(identation) + `${this.THROW_TOKEN} ${this.NEW_TOKEN} ${newExpression} (${parsedArg}) ${this.LINE_TERMINATOR}`;
            } else if (expression.expression.kind === ts.SyntaxKind.ElementAccessExpression) {
                return this.getIden(identation) + `throwDynamicException(${newExpression}, ${parsedArg});`;
            }
            return super.printThrowStatement(node, identation);
        }
        // const newToken = this.NEW_TOKEN ? this.NEW_TOKEN + " " : "";
        // const newExpression = node.expression?.expression?.escapedText;
        // // newExpression = newExpression ? newExpression : this.printNode(node.expression.expression, 0); // new Exception or new exact[string] check this out
        // // const args = node.expression?.arguments.map(n => this.printNode(n, 0)).join(",");
        // // const throwExpression = ` ${newToken}${newExpression}${this.LEFT_PARENTHESIS}((string)${args})${this.RIGHT_PARENTHESIS}`;
        // return this.getIden(identation) + this.THROW_TOKEN + throwExpression + this.LINE_TERMINATOR;
    }
}

// if (this.requiresCallExpressionCast) {
//     const parsedTypes = this.getTypesFromCallExpressionParameters(node);
//     const tmpArgs = [];
//     args.forEach((arg, index) => {
//         const parsedType = parsedTypes[index];
//         const cast = parsedType ? `(${parsedType})` : '';
//         tmpArgs.push(cast + this.printNode(arg, identation).trim());
//     });
//     parsedArgs = tmpArgs.join(",");
// } else {
//     parsedArgs = args.map((a) => {
//         return  this.printNode(a, identation).trim();
//     }).join(", ");
// }

// getTypesFromCallExpressionParameters(node) {
//     const resolvedParams = global.checker.getResolvedSignature(node).parameters;
//     const parsedTypes = [];
//     resolvedParams.forEach((p) => {
//         const decl = p.declarations[0];
//         const type = global.checker.getTypeAtLocation(decl);
//         const parsedType = this.getTypeFromRawType(type);
//         parsedTypes.push(parsedType);
//     });

//     return parsedTypes;
// }


// get class decl node
// Use the ts.getAllSuperTypeNodes function to get the base classes for the MyClass
// const baseClasses = ts.getAllSuperTypeNodes(classDeclaration);

// // Create a type checker
// const typeChecker = ts.createTypeChecker(sourceFile.context.program, sourceFile.context.checker);

// // Get the type of the base class
// const baseClassType = typeChecker.getTypeAtLocation(baseClasses[0]);

// // Get the class declaration for the base class
// const baseClassDeclaration = baseClassType.symbol.valueDeclaration;

// console.log(baseClassDeclaration);