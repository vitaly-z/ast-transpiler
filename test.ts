import { Piscina } from 'piscina';
import fs from 'fs';


const piscina = new Piscina({
    // The URL must be a file:// URL
    filename: new URL('./worker.js', import.meta.url).href
});


const data = fs.readFileSync('./benchTest.js');

const config = {
    verbose:false,
    python: {
        uncamelcaseIdentifiers: true,
    },
    php:  {
        uncamelcaseIdentifiers: true,
    },
    csharp: {
        parser: {
            "ELEMENT_ACCESS_WRAPPER_OPEN": "getValue(",
            "ELEMENT_ACCESS_WRAPPER_CLOSE": ")"
        }
    }
}

const transpileConfig = [
    {
        language: "php",
        async: true
    },
    {
        language: "php",
        async: false
    },
    {
        language: "python",
        async: false
    },
    {
        language: "python",
        async: true
    },
]


const filesConfig = [] as any[];
for (let i = 0; i < 50; i++) {
    filesConfig.push({
        name: `file${i}.js`,
        content: data.toString(),
        config: transpileConfig
    });
}

// piscina.run({transpilerConfig:config, filesConfig:filesConfig})

const chunkSize = 10;
const promises = [] as any[];
console.log("Will construct promises");
for (let i = 0; i < filesConfig.length; i += chunkSize) {
    const chunk = filesConfig.slice(i, i + chunkSize);
    promises.push(piscina.run({transpilerConfig:config, filesConfig:chunk}));
    // do whatever
}
console.log("Will await promises");
const result = await Promise.all(promises);
console.log(result); // Prints 10