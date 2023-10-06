import { Transpiler } from './src/transpiler.js'

// expected files config
// const filesConfig = [
//     {
//         name: string,  ????
//         content: string,
//         [config: {
//             language: string,
//             async: boolean
//         }]
//     }
// ];

export default async ({transpilerConfig, filesConfig}) => {
    const transpiler = new Transpiler(transpilerConfig);

    const result = [] as any[];
    for (const fileConfig of filesConfig) {
        const transpiled = transpiler.transpileDifferentLanguages(fileConfig.config, fileConfig.content);
        const transpiledFile = {
            name: fileConfig.name,
            result: transpiled
        };
        result.push(transpiledFile);
    }
    return result;
}