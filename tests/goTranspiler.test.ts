import { Transpiler } from '../src/transpiler';
import { readFileSync } from 'fs';

jest.mock('module',()=>({
    __esModule: true,                 // this makes it work
    default: jest.fn()
  }));

let transpiler: Transpiler;

beforeAll(() => {
    const config = {
        'verbose': false,
        'go': {
            'parser': {
                'NUM_LINES_END_FILE': 0,
            }
        }
    }
    transpiler = new Transpiler(config);
})

describe('go transpiling tests', () => {
    test('basic variable declaration', () => {
        const ts = "const x = 1;"
        const go = "var x interface{} = 1"
        const output = transpiler.transpileGo(ts).content;
        expect(output).toBe(go);
    });
    test('basic while loop', () => {
        const ts =
        "while (true) {\n" +
        "    const x = 1;\n" +
        "    break;\n" +
        "}"
        const go =
        "for true {\n" +
        "    var x interface{} = 1\n" +
        "    break\n" +
        "}";
        const output = transpiler.transpileGo(ts).content;
        expect(output).toBe(go);
    });
    test('basic class declaration', () => {
        const ts =
        "class Test {\n" +
        "    main() {\n" +
        "        return 1\n" +
        "    }\n" +
        "}";
        const go =
        "type Test struct {\n" +
        "\n" +
        "}\n" +
        "func  (this *Test) Main() interface{}  {\n" +
        "    return 1\n" +
        "}";
        const output = transpiler.transpileGo(ts).content;
        expect(output).toBe(go);
    });
    test('falsy values', () => {
        const ts =
        "const a = \"hi\";\n" +
        "const b = false;\n" +
        "const c =  a && b;\n" +
        "const d = !a && !b;\n" +
        "const e = (a || !b);\n" +
        "if (a) {\n" +
        "    const f = 1;\n" +
        "}";
        const go =
        "var a interface{} = \"hi\"\n" +
        "var b interface{} = false\n" +
        "var c interface{} = IsTrue(a) && IsTrue(b)\n" +
        "var d interface{} = !IsTrue(a) && !IsTrue(b)\n" +
        "var e interface{} = (IsTrue(a) || !IsTrue(b))\n" +
        "if IsTrue(a) {\n" +
        "    var f interface{} = 1\n" +
        "}"
        const output = transpiler.transpileGo(ts).content;
        expect(output).toBe(go);
    });
});
