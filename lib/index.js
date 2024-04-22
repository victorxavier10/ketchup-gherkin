// require('../createConfig');  // Garante a inicialização do nodemon.json
const fs = require('fs');
const path = require('path');
const express = require('express');
const glob = require('glob');

// Tenta carregar as configurações personalizadas do arquivo ketchup.json
let customConfig = {};
const customConfigPath = path.join(process.cwd(), 'ketchup.json');
if (fs.existsSync(customConfigPath)) {
    customConfig = JSON.parse(fs.readFileSync(customConfigPath, 'utf8'));
}

// Usa as configurações do ketchup.json se disponíveis, senão usa valores padrão
const port = customConfig.port || 3002;
const app = express();
const featuresPath = '././Features/**/*.feature';

// Personaliza textos por idioma
const buttonText = customConfig.buttonText;
const resultsTile = customConfig.resultsTitle;
const inputPlaceHolder = customConfig.inputPlaceHolder;

// Personaliza logo name
const projectName = customConfig.projectName;


// Função para ler arquivos da pasta Features
function readFeatures(directory) {
    const files = glob.sync(directory);  // Usa glob para buscar arquivos recursivamente
    if (!files.length) {
        console.log("Feature not found in", directory);
        return [];
    }
    return files.map(filePath => {
        const content = fs.readFileSync(filePath, 'utf8');
        return { name: path.basename(filePath), content };
    });
}
// Função para gerar o menu de navegação
function generateNavigation(features, query = '') {
    // Obter o nome da pasta raiz usando __dirname para pegar o diretório atual
    const rootFolderName = path.basename(path.dirname(__dirname));

    let navigation = `<div class="navigation">
        <h1><a href="/">${projectName || rootFolderName}</a></h1>
        <form action="/search" method="get">
            <input type="text" name="q" placeholder="${inputPlaceHolder}" value="${query}" />
            <button type="submit">${buttonText}</button>
        </form>
        <ul>`;
    features.forEach(feature => {
        const safeName = feature.name.replace('.feature', '');
        navigation += `<li><a href="/feature/${safeName}">${safeName}</a></li>`;
    });
    navigation += '</ul></div>';
    return navigation;
}

// Modificando a função generateFeatureHTML para incluir o menu de navegação
function generateFeatureHTML(feature, features) {
    const safeName = feature.name.replace('.feature', '');
    const navigation = generateNavigation(features);

    // Processar conteúdo para HTML
    const htmlContent = feature.content
        .replace(/Feature:(.*)/g, '<h1>Feature: $1</h1>')
        .replace(/Funcionalidade:(.*)/g, '<h1>Funcionalidade: $1</h1>')
        .replace(/Scenario:(.*)/g, '<h2>Scenario: $1</h2>')
        .replace(/Cenário:(.*)/g, '<h2>Cenário: $1</h2>')
        .replace(/\b(Dado|Quando|E|Mas|Então)\b/g, '<b>$1</b>')
        .replace(/\b(Given|When|And|But|Then)\b/g, '<b>$1</b>')
        .replace(/\n/g, '<br>');

    return `<html><head><style>${cssStyles()}</style></head><body>${navigation}<div class="content">${htmlContent}</div></body></html>`;
}

// Ajustando a função generateIndexHTML
function generateIndexHTML(features) {
    const navigation = generateNavigation(features);
    return `<html><head><style>${cssStyles()}</style></head><body>${navigation}</body></html>`;
}

// Rota de pesquisa
app.get('/search', (req, res) => {
    const query = req.query.q;
    const allFeatures = readFeatures(featuresPath);
    const filteredFeatures = allFeatures.filter(feature => 
        feature.name.includes(query) || feature.content.toLowerCase().includes(query.toLowerCase())
    );
    const html = generateSearchResultsHTML(filteredFeatures, allFeatures, query);
    res.send(html);
});

// Função para gerar HTML para os resultados da pesquisa
function generateSearchResultsHTML(features, allFeatures, query) {
    const navigation = generateNavigation(allFeatures);
    let resultsHtml = `<div class="content"><h2>${resultsTile}</h2>`;

    if (features.length) {
        resultsHtml += '<ul>';
        features.forEach(feature => {
            const safeName = feature.name.replace('.feature', '');
            resultsHtml += `<li><a href="/feature/${safeName}" style="display: block; text-decoration: none;">`;
            // Adiciona título
            resultsHtml += `<strong>${safeName}</strong>`;

            // Conteúdo processado para destacar palavras reservadas e a pesquisa
            let processedContent = feature.content;
            const regexQuery = new RegExp(`(${query})`, 'gi');
            const regexGherkin = /(\bFeature: |\bFuncionalidade: |\bScenario: |\bCenário: |\bGiven |\bDado |\bWhen |\bQuando |\bAnd |\bE |\bBut|\bMas |\bThen |\bEntão )(.+?)(?=\n|$)/gi;

            // Primeiro destaca as palavras da pesquisa
            processedContent = processedContent.replace(regexQuery, `<mark>$1</mark>`);
            // Depois adiciona marcação e quebra de linha para palavras reservadas
            processedContent = processedContent.replace(regexGherkin, (match) => `<b>${match}</b><br><br>`);

            // Mostra um snippet do conteúdo
            resultsHtml += `<p>${processedContent.substring(0, 200)}...</p>`;
            resultsHtml += `</a></li>`;
        });
        resultsHtml += '</ul>';
    } else {
        resultsHtml += '<p>Feature not found.</p>';
    }
    resultsHtml += '</div>';
    return `<html><head><style>${cssStyles()}</style></head><body>${navigation}${resultsHtml}</body></html>`;
}

// Estilos CSS
function cssStyles() {
    return `
        /* Reset básico para remover margens e padding */
        body, h1, h2, ul, li, form, input, button {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Estilos globais do corpo */
        body {
            font-family: 'Roboto', sans-serif; /* Fonte mais moderna e limpa */
            background-color: #F7F7F7; /* Cor de fundo suave */
            color: ${customConfig['font-p-color'] || '#484848'}; /* Cor de texto inspirada no Airbnb */
        }

        /* Navegação lateral */
        .navigation {
            float: left;
            width: 17%;
            height: 100vh;
            background: #FFFFFF; /* Fundo branco para a barra de navegação */
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Sombra sutil para profundidade */
            overflow: auto;
        }

        /* Estilo para o título na navegação */
        .navigation h1 a {
            color: #FF5A5F; /* Cor vibrante do Airbnb */
            text-decoration: none;
            font-size: 24px; /* Tamanho maior para o título */
            display: block; /* Torna o título um bloco para facilitar o clique */
            margin-bottom: 20px; /* Espaço abaixo do título */
        }

        /* Formulário de pesquisa na navegação */
        form {
            margin-bottom: 20px;
        }

        input[type="text"] {
            width: 100%; /* Largura completa menos o padding */
            padding: 10px;
            margin-top: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            padding: 10px 20px;
            background-color: ${customConfig['button-color'] || '#FF5A5F'};
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: block; /* Garante que o botão não fique ao lado do input */
            width: 100%;
            margin-top: 10px;
        }

        button:hover {
            background-color: ${customConfig['button-hover'] || '#E0483E'};
        }

        /* Lista de features na navegação */
        .navigation ul {
            list-style-type: none; /* Remove marcadores de lista */
        }

        /* Links de navegação */
        .navigation li a {
            display: block;
            padding: 10px;
            color: #333333; /* Texto mais escuro para melhor legibilidade */
            text-decoration: none;
            transition: background-color 0.3s, color 0.3s; /* Transição suave para hover */
        }

        /* Efeito hover nos links */
        .navigation li a:hover {
            background-color: #FF5A5F; /* Fundo do link ao passar o mouse */
            color: white; /* Texto branco ao passar o mouse */
        }

        /* Área de conteúdo principal */
        .content {
            margin-left: 20%; /* Espaço para a barra lateral de navegação */
            padding: 20px; /* Padding dentro do conteúdo */
            background-color: #F7F7F7; /* Fundo claro para o conteúdo */
            min-height: 100vh; /* Altura mínima */
        }

        /* Cabeçalhos dentro do conteúdo */
        h1, h2 {
            color: ${customConfig['font-title-color'] || '#333'}; /* Cor escura para os títulos */
            margin-top: 10px; /* Espaço no topo dos cabeçalhos */
        }

        /* Palavras-chave Gherkin destacadas */
        b {
            color: ${customConfig['font-key-color'] || '#007A87'}; /* Cor para palavras-chave, exemplo com um tom teal */
            font-weight: bold; /* Negrito para destacar */
        }

        /* Realce para termos pesquisados */
        mark {
            background-color: ${customConfig['mark-color'] || '#FF5A5F80'}; /* Fundo vermelho claro para destacar texto */
            color: ${customConfig['font-mark-color'] || '#333'}; /* Texto escuro para contraste */
        }

        /* Estilos para lista de resultados */
        .content ul {
            margin-top: 20px;
            list-style-type: none; /* Remove marcadores de lista */
            padding-left: 0; /* Remove padding padrão */
        }

        .content li {
            margin-bottom: 15px; /* Espaço entre itens da lista */
        }

        .content li a {
            font-size: 18px; /* Tamanho maior para os links de feature */
            // color: #FF5A5F; /* Cor vibrante do Airbnb */
            text-decoration: none; /* Sem sublinhado */
        }

        .content li a:hover {
            text-decoration: underline; /* Sublinhado ao passar o mouse */
        }

        .content p {
            margin-top: 10px; /* Espaçamento após o título da feature */
            font-weight: bold; /* Negrito para destacar */
        }

        strong {
            color: #484848;
        }
    `;
}

// Rota para a página inicial
app.get('/', (req, res) => {
    const features = readFeatures(featuresPath);
    const html = generateIndexHTML(features);
    res.send(html);
});

// Rotas para cada arquivo .feature
app.get('/feature/:name', (req, res) => {
    const features = readFeatures(featuresPath);
    const feature = features.find(f => f.name.replace('.feature', '') === req.params.name);
    if (feature) {
        const html = generateFeatureHTML(feature, features);
        res.send(html);
    } else {
        res.status(404).send('Feature not found');
    }
});

app.listen(port, () => {
    console.log(`Running in http://localhost:${port}`);
});
