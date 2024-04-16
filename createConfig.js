const fs = require('fs');
const path = require('path');

const nodemonConfigPath = path.join(__dirname, 'nodemon.json');
const configContent = JSON.stringify({
    "watch": ["index.js", "ketchup.js", "Features/", "lib/", "bin/"],
    "ext": "js, css, json, feature"
}, null, 4);

fs.access(nodemonConfigPath, fs.constants.F_OK, (err) => {
    if (err) {
        // Arquivo não existe, vamos criar
        fs.writeFile(nodemonConfigPath, configContent, (writeErr) => {
            if (writeErr) {
                console.error('Falha ao criar o arquivo nodemon.json:', writeErr);
            } else {
                console.log('Arquivo nodemon.json criado com sucesso.');
            }
        });
    } else {
        console.log('Arquivo nodemon.json já existe.');
    }
});
