import { BaseTranspiler } from "./baseTranspiler.js";
import ts, { TypeChecker } from 'typescript';

const SyntaxKind = ts.SyntaxKind;

const parserConfig = {
    'ELSEIF_TOKEN': 'else if',
    'OBJECT_OPENING': 'new Dictionary<string, object>() {',
    'ARRAY_OPENING_TOKEN': '[]interface{}{',
    'ARRAY_CLOSING_TOKEN': '}',
    'PROPERTY_ASSIGNMENT_TOKEN': ',',
    'VAR_TOKEN': 'object', // object
    'METHOD_TOKEN': 'func',
    'PROPERTY_ASSIGNMENT_OPEN': '',
    'PROPERTY_ASSIGNMENT_CLOSE': '',
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
    'DEFAULT_RETURN_TYPE': '',
    'BLOCK_OPENING_TOKEN': '{',
    'DEFAULT_PARAMETER_TYPE': 'interface{}',
    'LINE_TERMINATOR': '',
    'CONDITION_OPENING':'',
    'CONDITION_CLOSE':''
};

export class GoTranspiler extends BaseTranspiler {

    binaryExpressionsWrappers;

    constructor(config = {}) {
        config['parser'] = Object.assign ({}, parserConfig, config['parser'] ?? {});

        super(config);

        this.requiresParameterType = true;
        this.requiresReturnType = true;
        this.asyncTranspiling = true;
        this.supportsFalsyOrTruthyValues = false;
        this.requiresCallExpressionCast = true;
        this.id = "Go";


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
            'console.log': 'fmt.Println',
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

    // getBlockOpen(identation){
    //     return this.getIden(identation)  + this.BLOCK_OPENING_TOKEN;
    // }

    printSuperCallInsideConstructor(node, identation) {
        return ""; // csharp does not need super call inside constructor
    }


    printPropertyDeclaration(node, identation) {
        // let modifiers = this.printModifiers(node);
        // modifiers = modifiers ? modifiers + " " : modifiers;
        const name = this.printNode(node.name, 0);
        let type = 'interface{}';
        if (node.type.kind === SyntaxKind.StringKeyword) {
            type = 'string';
        } else if (node.type.kind === SyntaxKind.NumberKeyword) {
            type = 'int';
        } else if (node.type.kind === SyntaxKind.BooleanKeyword) {
            type = 'bool';
        } else if (node.type.kind === SyntaxKind.ArrayType) {
            type = '[]interface{}';
        }
        if (node.initializer) {
            // we have to save the value and initialize it later
            // const initializer = this.printNode(node.initializer, 0);
            // return this.getIden(identation) + modifiers + name + " = " + initializer + this.LINE_TERMINATOR;
        }
        return this.getIden(identation) + name + ' ' + type + this.LINE_TERMINATOR;
    }

    printStruct(node, indentation) {
        const className = node.name.escapedText;

        // check if we have heritage
        let heritageName = '';
        if (node?.heritageClauses?.length > 0) {
            const heritage = node.heritageClauses[0];
            const heritageType = heritage.types[0];
            heritageName = this.getIden(indentation+1) + heritageType.expression.escapedText + '\n';
        }

        const propDeclarations = node.members.filter(member => member.kind === SyntaxKind.PropertyDeclaration);
        return `type ${className} struct {\n${heritageName}${propDeclarations.map(member => this.printNode(member, indentation+1)).join("\n")}\n}`;
    }

    printClass(node, identation) {

        const struct = this.printStruct(node, identation);

        const methods = node.members.filter(member => member.kind === SyntaxKind.MethodDeclaration);
        const classMethods = methods.map(method => this.printMethodDeclaration(method, identation)).join("\n");
        // const classDefinition = this.printClassDefinition(node, identation);

        // const classBody = this.printClassBody(node, identation);

        // const classClosing = this.getBlockClose(identation);

        // return classDefinition + classBody + classClosing;
        return struct + "\n" + classMethods;
    }

    printMethodDeclaration(node, identation) {

        const className = node.parent.name.escapedText;


        let methodDef = this.printMethodDefinition(node, identation);

        const funcBody = this.printFunctionBody(node, identation);

        methodDef += funcBody;

        return methodDef;
    }

    printMethodDefinition(node, identation) {
        const className = node.parent.name.escapedText;
        let name = node.name.escapedText;
        name = this.transformMethodNameIfNeeded(name);

        let returnType = this.printFunctionType(node);

        const parsedArgs = this.printMethodParameters(node);

        returnType = returnType ? returnType + " " : returnType;

        const methodToken = this.METHOD_TOKEN ? this.METHOD_TOKEN + " " : "";
        // const methodDef = this.getIden(identation) + returnType + methodToken + name
        //     + "(" + parsedArgs + ")";
        const structReceiver = `(${this.THIS_TOKEN} *${className})`;
        const methodDef = this.getIden(identation) + methodToken + " " + structReceiver + " " + name + "(" + parsedArgs + ") " + returnType;

        return this.printNodeCommentsIfAny(node, identation, methodDef);
    }

    printParameter(node, defaultValue = true) {
        const name = this.printNode(node.name, 0);
        const initializer = node.initializer;

        const type = this.printParameterType(node);

        if (defaultValue) {
            // not supported we have to find an alternative for go like defining multiple methods with different parameters
            // if (initializer) {
            //     const customDefaultValue = this.printCustomDefaultValueIfNeeded(initializer);
            //     const defaultValue = customDefaultValue ? customDefaultValue : this.printNode(initializer, 0);
            //     return type + name + this.SPACE_DEFAULT_PARAM + "=" + this.SPACE_DEFAULT_PARAM + defaultValue;
            // }
            return name + ' ' + type;
        }
        return name + ' ' + type;
    }

    printParameterType(node) {
        const typeText = this.getType(node);
        // // if (typeText === this.BOOLEAN_KEYWORD) {
        // //     return typeText;
        // // }

        if (typeText === this.STRING_KEYWORD) {
            return 'string';
        }
        if (typeText === this.NUMBER_KEYWORD) {
            return 'float64';
        }

        if (typeText === this.BOOLEAN_KEYWORD) {
            return 'bool';
        }

        return this.DEFAULT_PARAMETER_TYPE;

        if (typeText === undefined || typeText === this.STRING_KEYWORD) {
            // throw new FunctionReturnTypeError("Parameter type is not supported or undefined");
            this.warn(node, node.getText(), "Parameter type not found, will default to: " + this.DEFAULT_PARAMETER_TYPE);
            return this.DEFAULT_PARAMETER_TYPE;
        }
        return typeText;

    }

    printFunctionType(node){
        const typeText = this.getFunctionType(node);
        if (typeText === 'void') {
            return "";
        }
        if (typeText === undefined || (typeText !== this.VOID_KEYWORD && typeText !== this.PROMISE_TYPE_KEYWORD)) {
            // throw new FunctionReturnTypeError("Function return type is not supported");
            let res = "";
            if (this.isAsyncFunction(node)) {
                res = `${this.DEFAULT_RETURN_TYPE}`;
            } else {
                res = this.DEFAULT_RETURN_TYPE;
            }
            this.warn(node, node.name.getText(), "Function return type not found, will default to: " + res);
            return res;
        }
        return typeText;
    }

    printVariableDeclarationList(node,identation) {
        const declaration = node.declarations[0];
        // const varToken = this.VAR_TOKEN ? this.VAR_TOKEN + " ": "";
        // const name = declaration.name.escapedText;
        const parsedValue = (declaration.initializer) ? this.printNode(declaration.initializer, identation) : this.NULL_TOKEN;
        return this.getIden(identation) + this.printNode(declaration.name) + " := " + parsedValue.trim();
    }

    printObjectLiteralExpression(node, identation) {
        const objectCreation = 'make(map[string]interface{})';
        let formattedObjectBody = '';
        if (node.properties.length > 0) {
            const objectBody = this.printObjectLiteralBody(node, identation);
            formattedObjectBody = objectBody ? "\n" + objectBody + "\n" + this.getIden(identation) : objectBody;
        }
        // return  this.OBJECT_OPENING + formattedObjectBody + this.OBJECT_CLOSING;
        return objectCreation + formattedObjectBody;
    }

    printObjectLiteralBody(node, identation) {
        const objectName = node.parent.name.escapedText;
        const body =  node.properties.map((p) => `${this.getIden(identation)}${objectName}["${node.properties[0].name.text}"] = ${p.initializer.text}` ).join("\n");
        return body;
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
            return notOperator + `(${target} is string)`;
        case "number":
            return notOperator + `(${target} is Int64 || ${target} is int || ${target} is float || ${target} is double)`;
        case "boolean":
            return notOperator + `(${target} is bool)`;
        case "object":
            return notOperator + `(${target} is IDictionary<string, object>)`;
        case "function":
            return notOperator + `(${target} is Delegate)`;
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
                const statement = this.getIden(identation) + `${e} = ((IList<object>)${syntheticName})[${index}]`;
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
            rawExpression = `((IList<object>)${leftSide}).Add`;
            break;
            // case 'push':
            //     rawExpression = `(List<object>${leftSide}).Add`s
            //     break;
        }
        return rawExpression;
    }

    printCustomDefaultValueIfNeeded(node) {
        return undefined;
    }

    printFunctionBody(node, identation) {
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
                return `(IList<object>)(${this.printNode(node.expression, identation)})`;
            }
            if (type.elementType.kind === ts.SyntaxKind.StringKeyword) {
                return `(IList<string>)(${this.printNode(node.expression, identation)})`;
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
        return `((${parsedArg} is IList<object>) || (${parsedArg}.GetType().IsGenericType && ${parsedArg}.GetType().GetGenericTypeDefinition().IsAssignableFrom(typeof(List<>))))`;
    }

    printObjectKeysCall(node, identation, parsedArg = undefined) {
        return `new List<object>(((IDictionary<string,object>)${parsedArg}).Keys)`;
    }

    printObjectValuesCall(node, identation, parsedArg = undefined) {
        return `new List<object>(((IDictionary<string,object>)${parsedArg}).Values)`;
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
        return `Math.Ceiling(Convert.ToDouble(${parsedArg}))`;
    }

    printNumberIsIntegerCall(node: any, identation: any, parsedArg?: any) {
        return `((${parsedArg} is int) || (${parsedArg} is long) || (${parsedArg} is Int32) || (${parsedArg} is Int64))`;
    }

    printArrayPushCall(node, identation, name = undefined, parsedArg = undefined) {
        return  `${name} = appendToArray(${name},${parsedArg}).([]interface{})`;
    }

    printIncludesCall(node, identation, name = undefined, parsedArg = undefined) {
        return `${name}.Contains(${parsedArg})`;
    }

    printIndexOfCall(node, identation, name = undefined, parsedArg = undefined) {
        return `${this.INDEXOF_WRAPPER_OPEN}${name}, ${parsedArg}${this.INDEXOF_WRAPPER_CLOSE}`;
    }

    printStartsWithCall(node, identation, name = undefined, parsedArg = undefined) {
        return `((string)${name}).StartsWith(((string)${parsedArg}))`;
    }

    printEndsWithCall(node, identation, name = undefined, parsedArg = undefined) {
        return `((string)${name}).EndsWith(((string)${parsedArg}))`;
    }

    printTrimCall(node, identation, name = undefined) {
        return `((string)${name}).Trim()`;
    }

    printJoinCall(node, identation, name = undefined, parsedArg = undefined) {
        return `String.Join(${parsedArg}, ((IList<object>)${name}).ToArray())`;
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
        return `((IList<object>)${name}).First()`;
    }

    printReverseCall(node, identation, name = undefined) {
        return `${name} = (${name} as IList<object>).Reverse().ToList()`;
    }

    printPopCall(node, identation, name = undefined) {
        return `((IList<object>)${name}).Last()`;
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

    printPadEndCall(node, identation, name, parsedArg, parsedArg2) {
        return `(${name} as String).PadRight(Convert.ToInt32(${parsedArg}), Convert.ToChar(${parsedArg2}))`;
    }

    printPadStartCall(node, identation, name, parsedArg, parsedArg2) {
        return `(${name} as String).PadLeft(Convert.ToInt32(${parsedArg}), Convert.ToChar(${parsedArg2}))`;
    }

    printDateNowCall(node, identation) {
        return "(new DateTimeOffset(DateTime.UtcNow)).ToUnixTimeMilliseconds()";
    }

    printLengthProperty(node, identation, name = undefined) {
        const leftSide = this.printNode(node.expression, 0);
        const type = (global.checker as TypeChecker).getTypeAtLocation(node.expression); // eslint-disable-line
        this.warnIfAnyType(node, type.flags, leftSide, "length");
        return this.isStringType(type.flags) ? `((string)${leftSide}).Length` : `${this.ARRAY_LENGTH_WRAPPER_OPEN}${leftSide}${this.ARRAY_LENGTH_WRAPPER_CLOSE}`;
    }

    // printPostFixUnaryExpression(node, identation) {
    //     const {operand, operator} = node;
    //     if (operand.kind === ts.SyntaxKind.NumericLiteral) {
    //         return super.printPostFixUnaryExpression(node, identation);
    //     }
    //     const leftSide = this.printNode(operand, 0);
    //     const op = this.PostFixOperators[operator]; // todo: handle --
    //     if (op === '--') {
    //         return `postFixDecrement(ref ${leftSide})`;
    //     }
    //     return `postFixIncrement(ref ${leftSide})`;
    // }

    // printPrefixUnaryExpression(node, identation) {
    //     const {operand, operator} = node;
    //     if (operand.kind === ts.SyntaxKind.NumericLiteral) {
    //         return super.printPrefixUnaryExpression(node, identation);
    //     }
    //     if (operator === ts.SyntaxKind.ExclamationToken) {
    //         // not branch check falsy/turthy values if needed;
    //         return  this.PrefixFixOperators[operator] + this.printCondition(node.operand, 0);
    //     }
    //     const leftSide = this.printNode(operand, 0);
    //     if (operator === ts.SyntaxKind.PlusToken) {
    //         return `prefixUnaryPlus(ref ${leftSide})`;
    //     } else {
    //         return `prefixUnaryNeg(ref ${leftSide})`;
    //     }
    // }

    printConditionalExpression(node, identation) {
        const condition = this.printCondition(node.condition, 0);
        const whenTrue = this.printNode(node.whenTrue, 0);
        const whenFalse = this.printNode(node.whenFalse, 0);

        return `((bool) ${condition})` + " ? " + whenTrue + " : " + whenFalse;
    }

    printDeleteExpression(node, identation) {
        const object = this.printNode (node.expression.expression, 0);
        const key = this.printNode (node.expression.argumentExpression, 0);
        return `((IDictionary<string,object>)${object}).Remove((string)${key})`;
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

    printBinaryExpression(node, identation) {

        const {left, right, operatorToken} = node;

        const customBinaryExp = this.printCustomBinaryExpressionIfAny(node, identation);
        if (customBinaryExp) {
            return customBinaryExp;
        }

        if (operatorToken.kind == ts.SyntaxKind.InstanceOfKeyword) {
            return this.printInstanceOfExpression(node, identation);
        }

        if (operatorToken.kind === ts.SyntaxKind.EqualsToken) {
            // handle test['a'] = 1;
            if (left.kind === ts.SyntaxKind.ElementAccessExpression) {
                const elementAccess = left;
                const leftSide = this.printNode(elementAccess.expression, 0);
                const rightSide = this.printNode(right, 0);
                const propName = this.printNode(elementAccess.argumentExpression, 0);
                return `addElementToObject(${leftSide}, ${propName}, ${rightSide})`;
            }
        }

        let operator = this.SupportedKindNames[operatorToken.kind];


        let leftVar = undefined;
        let rightVar = undefined;

        // c# wrapper
        if (operatorToken.kind === ts.SyntaxKind.EqualsEqualsToken || operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken) {
            if (this.COMPARISON_WRAPPER_OPEN) {
                leftVar = this.printNode(left, 0);
                rightVar = this.printNode(right, identation);
                return `${this.COMPARISON_WRAPPER_OPEN}${leftVar}, ${rightVar}${this.COMPARISON_WRAPPER_CLOSE}`;
            }
        }

        // check if boolean operators || and && because of the falsy values
        if (operatorToken.kind === ts.SyntaxKind.BarBarToken || operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
            leftVar = this.printCondition(left, 0);
            rightVar = this.printCondition(right, identation);
        }  else {
            leftVar = this.printNode(left, 0);
            rightVar = this.printNode(right, identation);
        }

        const customOperator = this.getCustomOperatorIfAny(left, right, operatorToken);

        operator = customOperator ? customOperator : operator;

        return leftVar +" "+ operator + " " + rightVar.trim();
    }
}


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

