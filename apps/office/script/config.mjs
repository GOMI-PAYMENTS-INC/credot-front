import path from 'path';

const frontPort = 8005;
const frontOutPath = path.resolve(path.join(process.env.PWD, '/src/generated-rest/api/front'));

console.log(frontOutPath)

export default {
    enable: true,
    exportCore: false,
    exportService: true,
    frontApi: {
        url: `http://localhost:${frontPort}/api-json`,
        outPath: frontOutPath,
    },
};