const sharp = require('sharp');

/**
 * MODO ESTÁNDAR - Mejora profesional simplificada
 */
async function enhanceFingerprint(imageBuffer) {
  try {
    return await sharp(imageBuffer)
      .grayscale()
      .normalize()
      .linear(1.8, -0.1)
      .negate()
      .toBuffer();
  } catch (error) {
    throw new Error(`Error mejorando textura: ${error.message}`)
  }
}

/**
 * MODO PRESERVAR - Máxima fidelidad
 */
async function preserveAndEnhance(imageBuffer) {
  try {
    return await sharp(imageBuffer)
      .grayscale()
      .normalize()
      .negate()
      .toBuffer();
  } catch (error) {
    throw new Error(`Error en modo preservar: ${error.message}`)
  }
}

/**
 * MODO TEXTURA - Granularidad visible
 */
async function enhanceWithTexture(imageBuffer) {
  try {
    return await sharp(imageBuffer)
      .grayscale()
      .normalize()
      .sharpen()
      .negate()
      .toBuffer();
  } catch (error) {
    throw new Error(`Error en modo textura: ${error.message}`);
  }
}

/**
 * MODO RELLENO - Crestas sólidas
 */
async function fillRidgesBlack(imageBuffer) {
  try {
    return await sharp(imageBuffer)
      .grayscale()
      .normalize()
      .threshold(128)
      .negate()
      .toBuffer();
  } catch (error) {
    throw new Error(`Error en modo relleno: ${error.message}`)
  }
}

/**
 * MODO FORENSE - Procesamiento profesional
 */
async function forensicEnhance(imageBuffer) {
  return await enhanceFingerprint(imageBuffer);
}

/**
 * MODO ULTRA PROFESIONAL
 */
async function ultraProfessionalEnhance(imageBuffer) {
  return await enhanceFingerprint(imageBuffer);
}

/**
 * Generar prompt dinámico
 */
function generateDynamicPrompt(analysis) {
  return `Professional Forensic Fingerprint: ${analysis.pattern}`;
}

module.exports = {
  enhanceFingerprint,
  preserveAndEnhance,
  enhanceWithTexture,
  fillRidgesBlack,
  forensicEnhance,
  ultraProfessionalEnhance,
  generateDynamicPrompt
};
