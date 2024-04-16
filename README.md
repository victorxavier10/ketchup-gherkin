# 🍅 ketchup-gherkin
Generate static HTML for .feature files in Gherkin language.

![image](https://github.com/victorxavier10/ketchup-gherkin/assets/35244036/03f3e9ba-a99a-4cfd-8f68-79fe9e283cd9)

<br/>

<div  align="center">
  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/victorxavier10/ketchup-gherkin?color=%23FF5A5F">
  <img alt="GitHub License" src="https://img.shields.io/github/license/victorxavier10/ketchup-gherkin?color=%23FF5A5F">

</div>


## 🍅 Menu
* <a href="https://github.com/victorxavier10/ketchup-gherkin/edit/main/README.md#-required"> Required </a>

* <a href="https://github.com/victorxavier10/ketchup-gherkin/edit/main/README.md#-start"> Start </a>

* <a href="https://github.com/victorxavier10/ketchup-gherkin/edit/main/README.md#-install"> Install </a>

* <a href="https://github.com/victorxavier10/ketchup-gherkin/edit/main/README.md#-config"> Config </a>

* <a href="https://github.com/victorxavier10/ketchup-gherkin/edit/main/README.md#-run"> Run </a>

* <a href="https://github.com/victorxavier10/ketchup-gherkin/edit/main/README.md#-usage"> Usage </a>

<br/>

## 🍅 Required
Node    v18+

npm     v8+

[Download Node and npm](https://nodejs.org/en/download)

<br/>

## 🍅 Start

### `npm init -y`

> This command creates the package.json file.

<br/>

## 🍅 Install

### `npm i ketchup-gherkin`
> This command install the package.

<br/>

## 🍅 Config

> In package.json add

```json
  "scripts": {
    "ketchup": "node_modules/.bin/nodemon node_modules/.bin/ketchup-gherkin"
  }

```

<br/>

## 🍅 Run

### `npm run ketchup`

> This command starts the server.
> 
>   With each change, the server is restarted and generates new HTML.
> 
>   You need to reload the page in the browser.
>
> ### Running in [localhost:3000](http://localhost:3000)

<br/>

## 🍅 Usage

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

<br/>

### Enjoy 🍅
