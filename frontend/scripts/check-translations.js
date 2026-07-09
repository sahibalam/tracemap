// // frontend/scripts/check-translations.js
// import fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import chalk from 'chalk'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

// function getAllKeys(obj, prefix = '') {
//   let keys = []
//   for (const key in obj) {
//     const fullKey = prefix ? `${prefix}.${key}` : key
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       keys = keys.concat(getAllKeys(obj[key], fullKey))
//     } else {
//       keys.push(fullKey)
//     }
//   }
//   return keys
// }

// function findMissingKeys(enObj, esObj) {
//   const enKeys = getAllKeys(enObj)
//   const esKeys = getAllKeys(esObj)
//   return enKeys.filter(key => !esKeys.includes(key))
// }

// function findExtraKeys(enObj, esObj) {
//   const enKeys = getAllKeys(enObj)
//   const esKeys = getAllKeys(esObj)
//   return esKeys.filter(key => !enKeys.includes(key))
// }

// // Load translations
// const enPath = path.join(__dirname, '../src/locales/en/translation.json')
// const esPath = path.join(__dirname, '../src/locales/es/translation.json')

// const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
// const es = JSON.parse(fs.readFileSync(esPath, 'utf8'))

// console.log(chalk.blue('\n📊 Translation Status Report\n'))

// console.log(chalk.gray(`English keys: ${getAllKeys(en).length}`))
// console.log(chalk.gray(`Spanish keys: ${getAllKeys(es).length}`))

// const missing = findMissingKeys(en, es)
// const extra = findExtraKeys(en, es)

// if (missing.length === 0 && extra.length === 0) {
//   console.log(chalk.green('✅ All translations are complete!'))
//   process.exit(0)
// }

// if (missing.length > 0) {
//   console.log(chalk.yellow(`\n⚠️  Missing ${missing.length} translations in Spanish:`))
//   missing.forEach(key => {
//     console.log(chalk.gray(`  - ${key}`))
//   })
// }

// if (extra.length > 0) {
//   console.log(chalk.yellow(`\n⚠️  ${extra.length} extra keys in Spanish not in English:`))
//   extra.forEach(key => {
//     console.log(chalk.gray(`  - ${key}`))
//   })
// }

// process.exit(1)




import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getAllKeys(obj, prefix = '') {
  let keys = []
  if (!obj || typeof obj !== 'object') return keys
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys
}

function findMissingKeys(enObj, esObj) {
  const enKeys = getAllKeys(enObj)
  const esKeys = getAllKeys(esObj)
  return enKeys.filter(key => !esKeys.includes(key))
}

function findExtraKeys(enObj, esObj) {
  const enKeys = getAllKeys(enObj)
  const esKeys = getAllKeys(esObj)
  return esKeys.filter(key => !enKeys.includes(key))
}

// Load translations
const enPath = path.join(__dirname, '../src/locales/en/translation.json')
const esPath = path.join(__dirname, '../src/locales/es/translation.json')

let en = {}
let es = {}

try {
  en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
} catch (e) {
  console.log(chalk.yellow('⚠️  English translation file not found or empty'))
}

try {
  es = JSON.parse(fs.readFileSync(esPath, 'utf8'))
} catch (e) {
  console.log(chalk.yellow('⚠️  Spanish translation file not found or empty'))
}

console.log(chalk.blue('\n📊 Translation Status Report\n'))

console.log(chalk.gray(`English keys: ${getAllKeys(en).length}`))
console.log(chalk.gray(`Spanish keys: ${getAllKeys(es).length}`))

const missing = findMissingKeys(en, es)
const extra = findExtraKeys(en, es)

if (missing.length === 0 && extra.length === 0) {
  console.log(chalk.green('✅ All translations are complete!'))
  process.exit(0)
}

if (missing.length > 0) {
  console.log(chalk.yellow(`\n⚠️  Missing ${missing.length} translations in Spanish:`))
  missing.slice(0, 20).forEach(key => {
    console.log(chalk.gray(`  - ${key}`))
  })
  if (missing.length > 20) {
    console.log(chalk.gray(`  ... and ${missing.length - 20} more`))
  }
}

if (extra.length > 0) {
  console.log(chalk.yellow(`\n⚠️  ${extra.length} extra keys in Spanish not in English:`))
  extra.slice(0, 10).forEach(key => {
    console.log(chalk.gray(`  - ${key}`))
  })
  if (extra.length > 10) {
    console.log(chalk.gray(`  ... and ${extra.length - 10} more`))
  }
}

process.exit(1)