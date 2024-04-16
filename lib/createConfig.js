const fs = require('fs');
const configContent = {
    "watch": ["index.js", "ketchup.js", "Features/", "lib/", "bin/"],
    "ext": "js, css, json, feature"
};

fs.writeFile('nodemon.json', JSON.stringify(configContent, null, 4), (err) => {
    if (err) {
        console.error('Erro ao criar o arquivo nodemon.json:', err);
    } else {
        console.log('Arquivo nodemon.json criado com sucesso.');
    }
});
