// frontend/scripts/check-translations.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getAllKeys(obj, prefix = '') {
  let keys = []
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

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'))

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
  missing.forEach(key => {
    console.log(chalk.gray(`  - ${key}`))
  })
}

if (extra.length > 0) {
  console.log(chalk.yellow(`\n⚠️  ${extra.length} extra keys in Spanish not in English:`))
  extra.forEach(key => {
    console.log(chalk.gray(`  - ${key}`))
  })
}

process.exit(1)