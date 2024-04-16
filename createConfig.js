const fs = require('fs');
const path = require('path');

const content = `{
  "watch": ["index.js", "ketchup.js", "Features/", "lib/", "bin/"],
  "ext": "js, css, json, feature"
}`;

fs.writeFileSync(path.join(process.cwd(), 'nodemon.json'), content);