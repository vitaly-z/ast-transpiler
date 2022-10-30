import { Transpiler } from '../src/transpiler';
 

let transpiler: Transpiler;

beforeAll(() => {
    transpiler = new Transpiler();
})


describe('python tests', () => {
  test('basic variable declaration', () => {
    const ts = "const x = 1;"
    const python = "x = 1"
    const output = transpiler.transpilePython(ts);
    expect(output).toBe(python);
  });
  test('basic while loop', () => {
      const ts =
      "while (true) {\n" +
      "    const x = 1;\n" +
      "    break;\n" +
      "}"
      
      const python =
      "while True:\n" +
      "    x = 1\n" +
      "    break\n" 
      const output = transpiler.transpilePython(ts);
      expect(output).toBe(python);
  });
  test('basic for loop', () => {
      const ts =
      "for (let i = 0; i < 10; i++) {\n" +
      "    break;\n" +
      "}"
      const python =
      "for i in range(0, 10):\n" +
      "    break\n";
      const output = transpiler.transpilePython(ts);
      expect(output).toBe(python);
  });
});