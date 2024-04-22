#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Requer a biblioteca principal do seu pacote
var lib = require('../lib/index.js');

// Carrega as configurações de package.json
const pkgPath = path.join(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Verifica se a opção de desativar notificações de atualização não está ativa
if (pkg.version.indexOf('0.0.0') !== 0) {
    const simpleUpdateNotifier = require('simple-update-notifier');
    simpleUpdateNotifier({ pkg });
}
