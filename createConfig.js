const fs = require('fs');
const path = require('path');

// Conteúdo para o arquivo nodemon.json
const nodemonContent = `{
  "watch": ["index.js", "ketchup.js", "Features/", "lib/", "bin/"],
  "ext": "js, css, json, feature"
}`;

// Escreve o nodemon.json no diretório atual
fs.writeFileSync(path.join(process.cwd(), 'nodemon.json'), nodemonContent);

// Caminho para a pasta e arquivo de feature
const featureDirPath = path.join(process.cwd(), 'Features', 'feature-name');
const featureFilePath = path.join(featureDirPath, 'feature.feature');

// Conteúdo para o arquivo feature.feature
const featureFileContent = `Feature: Login

Scenario: Registered customer logs in

Given that the Customer has a registered email

And have password

When completing the login details

Then it should be possible to login

But the Customer must complete the correct email
`;

// Verifica se a pasta já existe
if (!fs.existsSync(featureDirPath)) {
    // Cria a pasta recursivamente
    fs.mkdirSync(featureDirPath, { recursive: true });

    // Verifica se o arquivo já existe
    if (!fs.existsSync(featureFilePath)) {
        // Cria o arquivo com o conteúdo especificado
        fs.writeFileSync(featureFilePath, featureFileContent);
    }
}

// Conteúdo para o arquivo nodemon.json
const configContent = `{
    "port": 3000,
    "buttonText": "Search",
    "resultsTitle": "Search Results",
    "style": {
        "font-p-color": "#484848",
        "button-color": "#FF5A5F",
        "button-hover": "#E0483E",
        "font-title-color": "#333",
        "font-key-color": "#007A87",
        "mark-color": "#FF5A5F80",
        "font-mark-color": "#333"
    }
}`;
  
  // Escreve o ketchup.json no diretório atual
  fs.writeFileSync(path.join(process.cwd(), 'ketchup.json'), configContent);