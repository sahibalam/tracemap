// frontend/scripts/auto-translate.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Simple translation mapping
// In production, you'd use Google Translate API or similar
const translations = {
  // ============================================================
  // AUTH TRANSLATIONS
  // ============================================================
  'Log in': 'Iniciar sesión',
  'Register': 'Registrarse',
  'Email': 'Correo electrónico',
  'Password': 'Contraseña',
  'Confirm Password': 'Confirmar Contraseña',
  'Forgot Password?': '¿Olvidó su contraseña?',
  'Reset Password': 'Restablecer Contraseña',
  'Logging in...': 'Iniciando sesión...',
  'Login failed. Please try again.': 'Error al iniciar sesión. Intente nuevamente.',
  'Please enter both email and password': 'Por favor ingrese su correo y contraseña',
  'No account found with this email': 'No se encontró ninguna cuenta con este correo',
  'Incorrect password': 'Contraseña incorrecta',
  'Email is required': 'El correo electrónico es requerido',
  'Password is required': 'La contraseña es requerida',
  'Please enter a valid email address': 'Por favor ingrese un correo electrónico válido',
  'Login successful': 'Inicio de sesión exitoso',
  'Create account': 'Crear cuenta',
  'First name': 'Nombre',
  'Last name': 'Apellido',
  'Email Address': 'Correo Electrónico',
  'Mobile number': 'Número de teléfono',
  'Language': 'Idioma',
  'Date of Birth': 'Fecha de Nacimiento',
  'Password strength': 'Fortaleza de la contraseña',
  'Weak': 'Débil',
  'Medium': 'Media',
  'Strong': 'Fuerte',
  'min 8 chars, letters & numbers': 'mínimo 8 caracteres, letras y números',
  'Email is available': 'El correo está disponible',
  'Checking email availability...': 'Verificando disponibilidad del correo...',
  'This email is already registered. Please login instead.': 'Este correo ya está registrado. Por favor inicie sesión.',
  'Phone number must be 10 digits': 'El número de teléfono debe tener 10 dígitos',
  'Password must be at least 8 characters': 'La contraseña debe tener al menos 8 caracteres',
  'Password must contain both letters and numbers': 'La contraseña debe contener letras y números',
  'Passwords do not match': 'Las contraseñas no coinciden',
  'You must be at least 18 years old to register': 'Debe tener al menos 18 años para registrarse',
  'Please enter a valid date of birth': 'Por favor ingrese una fecha de nacimiento válida',
  'years': 'años',
  'Enter your email address and we\'ll send you a link to reset your password.': 'Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.',
  'Send Recovery Email': 'Enviar Correo de Recuperación',
  'Sending...': 'Enviando...',
  'Check Your Email': 'Revise su Correo',
  'A password recovery link has been sent to your email.': 'Se ha enviado un enlace de recuperación de contraseña a su correo.',
  'Didn\'t receive the email?': '¿No recibió el correo?',
  'Try again': 'Intentar de nuevo',
  'Remember your password?': '¿Recuerda su contraseña?',
  'Enter New Password': 'Ingresar Nueva Contraseña',
  'Confirm New Password': 'Confirmar Nueva Contraseña',
  'Password Updated!': '¡Contraseña Actualizada!',
  'Redirecting to login...': 'Redirigiendo al inicio de sesión...',
  'Update Password': 'Actualizar Contraseña',
  'Updating...': 'Actualizando...',
  'Age': 'Edad',
  
  // ============================================================
  // NAV TRANSLATIONS
  // ============================================================
  'Home': 'Inicio',
  'Projects': 'Proyectos',
  'Profile': 'Perfil',
  'Sign out': 'Cerrar sesión',
  'User': 'Usuario',
  'Open menu': 'Abrir menú',
  'Close menu': 'Cerrar menú',
  
  // ============================================================
  // HOME TRANSLATIONS
  // ============================================================
  'Work in progress': 'Trabajo en progreso',
  "We're building something amazing. Stay tuned!": 'Estamos construyendo algo increíble. ¡Manténgase atento!',
  
  // ============================================================
  // WIZARD STEP 1 TRANSLATIONS
  // ============================================================
  'Personal Information': 'Información Personal',
  'Address': 'Dirección',
  'Address Line 2 (Optional)': 'Línea 2 de Dirección (Opcional)',
  'Current Address': 'Dirección Actual',
  'Same as Address': 'Misma que Dirección',
  'City': 'Ciudad',
  'State': 'Estado',
  'Zip': 'Código Postal',
  'Language(s) Known': 'Idiomas Conocidos',
  'English': 'Inglés',
  'Spanish': 'Español',
  'English+Spanish': 'Inglés+Español',
  'Profile Image': 'Imagen de Perfil',
  'Upload': 'Subir',
  'Uploading...': 'Subiendo...',
  'Failed to upload image. Please try again.': 'Error al subir la imagen. Intente nuevamente.',
  'Agreements': 'Acuerdos',
  'I accept the terms of use': 'Acepto los términos de uso',
  'I accept the privacy policy': 'Acepto la política de privacidad',
  'I consent to electronic records': 'Doy mi consentimiento para registros electrónicos',
  'I confirm the information entered is accurate': 'Confirmo que la información ingresada es precisa',
  
  // ============================================================
  // WIZARD STEP 2 TRANSLATIONS
  // ============================================================
  'Trade Profile & Skill Matrix': 'Perfil de Oficio y Matriz de Habilidades',
  'Trade Profile': 'Perfil de Oficio',
  'Select Trade': 'Seleccionar Oficio',
  'Select Worker Level': 'Seleccionar Nivel',
  'Enter years': 'Ingresar años',
  'Skills': 'Habilidades',
  'Responsibilities': 'Responsabilidades',
  'Lead Responsibilities': 'Responsabilidades de Líder',
  'Lead/Foreman Responsibilities': 'Responsabilidades de Líder/Capataz',
  'Additional Skills / Tools / Systems': 'Habilidades / Herramientas / Sistemas Adicionales',
  'Enter additional skills, tools, or systems you have experience with...': 'Ingrese habilidades, herramientas o sistemas adicionales con los que tenga experiencia...',
  'Add Trade': 'Agregar Oficio',
  'Remove Trade': 'Eliminar Oficio',
  'Custom Trade': 'Oficio Personalizado',
  'Enter Custom Trade': 'Ingresar Oficio Personalizado',
  'characters': 'caracteres',
  'Trade': 'Oficio',
  
  // ============================================================
  // WIZARD STEP 3 TRANSLATIONS
  // ============================================================
  'Project': 'Proyecto',
  'Project Name': 'Nombre del Proyecto',
  'Client / GC': 'Cliente / GC',
  'Employer Phone Number': 'Teléfono del Empleador',
  'Role': 'Rol',
  'Start': 'Inicio',
  'End': 'Fin',
  'Scope Summary': 'Resumen del Alcance',
  
  // ============================================================
  // WIZARD STEP 4 TRANSLATIONS
  // ============================================================
  'Availability & Rate': 'Disponibilidad y Tarifa',
  'Hourly Rate': 'Tarifa por Hora',
  'Availability': 'Disponibilidad',
  'Open to overtime': 'Disponible para horas extras',
  'Available on weekends': 'Disponible los fines de semana',
  'Travel Radius': 'Radio de Viaje',
  'miles': 'millas',
  'Willingness to Travel': 'Disposición para Viajar',
  'Yes': 'Sí',
  'No': 'No',
  'Travel Preferences': 'Preferencias de Viaje',
  'Needs housing for travel work': 'Necesita alojamiento para trabajo de viaje',
  'Needs per diem': 'Necesita viáticos',
  'Own transportation': 'Transporte propio',
  'Available Days': 'Días Disponibles',
  'Mon': 'Lun',
  'Tue': 'Mar',
  'Wed': 'Mié',
  'Thu': 'Jue',
  'Fri': 'Vie',
  'Sat': 'Sáb',
  'Sun': 'Dom',
  
  // ============================================================
  // WIZARD STEP 5 TRANSLATIONS
  // ============================================================
  'Emergency Contact & Acknowledgments': 'Contacto de Emergencia y Reconocimientos',
  '1. Emergency Contact': '1. Contacto de Emergencia',
  'Contact name': 'Nombre del contacto',
  'Relationship': 'Relación',
  'Phone': 'Teléfono',
  '2. Acknowledgments': '2. Reconocimientos',
  'I understand project assignment is contingent on profile, compliance, and project-specific approval.': 'Entiendo que la asignación del proyecto depende del perfil, cumplimiento y aprobación específica del proyecto.',
  'I will provide accurate information and update certifications when they expire.': 'Proporcionaré información precisa y actualizaré las certificaciones cuando expiren.',
  'I understand I may be removed from assignment or hidden from matching if safety or conduct issues arise.': 'Entiendo que puedo ser removido de la asignación si surgen problemas de seguridad o conducta.',
  'I will follow site safety, housekeeping, attendance, and reporting requirements.': 'Seguiré los requisitos de seguridad, limpieza, asistencia y reportes del sitio.',
  'I consent to electronic records, signature, and communications through the app.': 'Doy mi consentimiento para registros electrónicos, firma y comunicaciones a través de la aplicación.',
  'Please fill in all emergency contact fields before proceeding.': 'Por favor complete todos los campos de contacto de emergencia antes de continuar.',
  "All fields completed! You're ready to finish.": '¡Todos los campos completados! Está listo para finalizar.',
  
  // ============================================================
  // PROFILE EDIT PAGES TRANSLATIONS
  // ============================================================
  'Edit': 'Editar',
  'Save Changes': 'Guardar Cambios',
  'Saving...': 'Guardando...',
  'Cancel': 'Cancelar',
  'Back': 'Volver',
  'Edit Basic Information': 'Editar Información Básica',
  'Edit Emergency Contact': 'Editar Contacto de Emergencia',
  'Edit Certifications & Safety': 'Editar Certificaciones y Seguridad',
  'Payment & Bank Details': 'Detalles de Pago y Banco',
  'Edit Tax Profile': 'Editar Perfil Fiscal',
  'Edit Availability & Rate': 'Editar Disponibilidad y Tarifa',
  'Edit Work History': 'Editar Historial Laboral',
  'Edit Medical Details': 'Editar Detalles Médicos',
  'Edit Trade Profile': 'Editar Perfil de Oficio',
  
  // ============================================================
  // COMMON TRANSLATIONS
  // ============================================================
  'Loading...': 'Cargando...',
  'Error': 'Error',
  'Success': 'Éxito',
  'Save': 'Guardar',
  'Close': 'Cerrar',
  'Confirm': 'Confirmar',
  'Delete': 'Eliminar',
  'View': 'Ver',
  'Search': 'Buscar',
  'Filter': 'Filtrar',
  'All': 'Todos',
  'None': 'Ninguno',
  'Optional': 'Opcional',
  'Required': 'Requerido',
  'Next': 'Siguiente',
  'Finish': 'Finalizar',
  'Skip': 'Omitir',
  'Continue': 'Continuar',
  'Submit': 'Enviar',
  'Review': 'Revisar',
  
  // ============================================================
  // SUMMARY PAGE TRANSLATIONS
  // ============================================================
  'Loading profile...': 'Cargando perfil...',
  'Go to Wizard': 'Ir al Asistente',
  'WORKSPACE': 'ESPACIO DE TRABAJO',
  'Overview': 'Resumen',
  'Revenues': 'Ingresos',
  'GENERAL': 'GENERAL',
  'Support': 'Soporte',
  'Pending': 'Pendiente',
  'Basic Information': 'Información Básica',
  'Subscription & Rewards': 'Suscripción y Recompensas',
  'Work History': 'Historial Laboral',
  'Certifications & Safety': 'Certificaciones y Seguridad',
  'Tax Profile': 'Perfil Fiscal',
  'Payment / Bank Details': 'Detalles de Pago / Banco',
  'Medical Details': 'Detalles Médicos',
  'Phone No.': 'Número de Teléfono',
  'English / Spanish': 'Inglés / Español',
  'Additional Skills / Tools': 'Habilidades / Herramientas Adicionales',
  'No trade information added': 'No se agregó información de oficio',
  'more trades': 'oficios más',
  'No certifications': 'Sin certificaciones',
  'Not specified': 'No especificado',
  'No allergies reported': 'No se reportaron alergias',
  'No projects added': 'No se agregaron proyectos',
  'PROJECT': 'PROYECTO',
  'COMPANY': 'EMPRESA',
  'ROLE': 'ROL',
  'Travel': 'Viaje',
  'Available': 'Disponible',
  'Enabled': 'Habilitado',
  'Not enabled': 'No habilitado',
  'Not set': 'No configurado',
  'Bank': 'Banco',
  'Classification': 'Clasificación',
  'Tax Verified': 'Verificación Fiscal',
  'W2 Employee': 'Empleado W2',
  '1099 Contractor': 'Contratista 1099',
  'Certifications': 'Certificaciones',
  'Safety': 'Seguridad',
  'Blood Group': 'Grupo Sanguíneo',
  'Allergies': 'Alergias',
  'Name': 'Nombre',
  'Active Plan': 'Plan Activo',
  'Plan tier': 'Nivel del Plan',
  'Renews': 'Renueva',
  'Dec 31, 2026': '31 de Dic, 2026',
  'Trade Points': 'Puntos de Oficio',
  'Monday': 'Lunes',
  'Tuesday': 'Martes',
  'Wednesday': 'Miércoles',
  'Thursday': 'Jueves',
  'Friday': 'Viernes',
  'Saturday': 'Sábado',
  'Sunday': 'Domingo',
}

function autoTranslate(text) {
  return translations[text] || text
}

// Load files
const enPath = path.join(__dirname, '../src/locales/en/translation.json')
const esPath = path.join(__dirname, '../src/locales/es/translation.json')

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'))

function translateObject(obj, targetObj = {}) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      targetObj[key] = {}
      translateObject(obj[key], targetObj[key])
    } else if (!targetObj[key]) {
      // Only translate if not already present
      const translated = autoTranslate(obj[key])
      targetObj[key] = translated
      if (translated !== obj[key]) {
        console.log(chalk.green(`✓ Translated: ${key} → ${translated}`))
      } else {
        console.log(chalk.yellow(`⚠️  No translation found for: ${key} → "${obj[key]}"`))
      }
    }
  }
  return targetObj
}

console.log(chalk.blue('\n🌍 Auto-generating Spanish translations...\n'))

const newEs = translateObject(en, es)

fs.writeFileSync(esPath, JSON.stringify(newEs, null, 2))
console.log(chalk.green(`\n✅ Spanish translations updated!`))