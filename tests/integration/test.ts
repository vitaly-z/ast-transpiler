import { Transpiler } from '../../src/transpiler.js';
import * as fs from 'fs';
const { readFileSync, writeFileSync } = fs;

const TS_FILE = "./tests/integration/source/transpilable.ts";
const PY_FILE = "./tests/integration/py/transpilable.py";
const PHP_FILE = "./tests/integration/php/transpilable.php";
const CS_FILE = "./tests/integration/cs/transpilable.cs";

const config = [
    {
        language: "csharp",
        async: true
    },

        {
        language: "python",
        async: true
    },
    {
        language: "php",
        async: true
    },
]

function transpileTests() {
    const config = {
        "verbose": false,
        "csharp": {
            "parser": {
                "ELEMENT_ACCESS_WRAPPER_OPEN": "getValue(",
                "ELEMENT_ACCESS_WRAPPER_CLOSE": ")",
            }
        },
    }
    const transpiler = new Transpiler(config);
    const result = transpiler.transpileDifferentLanguagesByPath(config as any, TS_FILE);

    const phpRes = `<?php\n${result[2].content}\n?>`;
    const pythonAsync = result[1].content;
    let csharp = 'namespace tests;\n' + result[0].content;
    csharp = csharp.replace('class Test', 'partial class Test');

    writeFileSync(PHP_FILE, phpRes);
    writeFileSync(PY_FILE, pythonAsync);
    writeFileSync(CS_FILE, csharp);
}

function main() {
    transpileTests();
}

main()