// src/common/utils/validation.js

// Format phone number as XXX-XXX-XXXX
export function formatPhoneNumber(value) {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '')
  
  // Limit to 10 digits
  const trimmed = cleaned.slice(0, 10)
  
  // Format based on length
  if (trimmed.length <= 3) {
    return trimmed
  } else if (trimmed.length <= 6) {
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`
  } else {
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3, 6)}-${trimmed.slice(6, 10)}`
  }
}

// Format ZIP code (only 5 digits)
export function formatZipCode(value) {
  const cleaned = value.replace(/\D/g, '')
  return cleaned.slice(0, 5)
}

// Validate phone number (exactly 10 digits)
export function isValidPhoneNumber(phone) {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10
}

// Validate ZIP code (exactly 5 digits)
export function isValidZipCode(zip) {
  const digits = zip.replace(/\D/g, '')
  return digits.length === 5
}