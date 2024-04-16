# 🍅 ketchup-gherkin
Generate static HTML for .feature files in Gherkin language.

![image](https://github.com/victorxavier10/ketchup-gherkin/assets/35244036/03f3e9ba-a99a-4cfd-8f68-79fe9e283cd9)

## Required
Node    v18+
npm     v8+

[Download Node and npm](https://nodejs.org/en/download)


## Start

`npm init -y`

> This command creates the package.json file.


## Install

`npm i ketchup-gherkin`


## Config

> In package.json add

```json
  "scripts": {
    "ketchup": "node_modules/.bin/nodemon node_modules/.bin/ketchup-gherkin"
  }

```


## Run

`npm run ketchup`

> Start server
>   With each change, the server is restarted and generates new HTML.
>   You need to reload the page in the browser.
>
> Running in [localhost:3000](http://localhost:3000)

## Usage

> Creates this folder structure Feature/feature-name/feature.feature

```
📂 Features
       .
       ├── 📂 feature-name
       |            └── 🥒 feature.feature
       |             
       ├── 📂 feature-name                     
       |            ├── 🥒 feature.feature
       |            └── 🥒 feature.feature
       .
```

--

🟨 Features --> Folder with all Features.

🟨 feature-name --> Feature folder.

🥒 feature.feature --> Feature in Gherkin language.

--


### Enjoy 🍅
