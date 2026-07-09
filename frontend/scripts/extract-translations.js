// frontend/scripts/extract-translations.js
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')

console.log('🔍 Extracting translation keys...')

// Run i18next-parser
execSync('npx i18next-parser', { 
  cwd: rootDir, 
  stdio: 'inherit' 
})

console.log('✅ Translations extracted successfully!')

// Check if new keys were added
const enPath = path.join(rootDir, 'src/locales/en/translation.json')
const esPath = path.join(rootDir, 'src/locales/es/translation.json')

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'))

// Find missing Spanish translations
function findMissingTranslations(enObj, esObj, path = '') {
  const missing = []
  for (const key in enObj) {
    const fullPath = path ? `${path}.${key}` : key
    if (typeof enObj[key] === 'object' && enObj[key] !== null) {
      missing.push(...findMissingTranslations(enObj[key], esObj[fullPath], fullPath))
    } else if (!esObj[fullPath]) {
      missing.push(fullPath)
    }
  }
  return missing
}

const missing = findMissingTranslations(en, es)

if (missing.length > 0) {
  console.log(`\n⚠️  Missing Spanish translations for: ${missing.length} keys`)
  console.log('Run: npm run translate-missing to auto-generate them\n')
} else {
  console.log('✅ All translations are complete!')
}