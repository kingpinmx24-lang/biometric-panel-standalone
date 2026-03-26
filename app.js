#!/usr/bin/env node

const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { analyzeRidges } = require('./lib/ridge-analyzer');
const { enhanceFingerprint, preserveAndEnhance, enhanceWithTexture, fillRidgesBlack, forensicEnhance, ultraProfessionalEnhance } = require('./lib/texture-enhancer');
const { parsePromptForPoreIntensity } = require('./lib/pore-generator');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Crear directorio de resultados
const resultsDir = path.join(__dirname, 'results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

/**
 * Analizar características de huella dactilares (usando visión computacional avanzada)
 */
async function analyzeFingerprint(imageBuffer) {
  try {
    // Usar análisis avanzado de visión computacional
    const analysis = await analyzeRidges(imageBuffer);
    return analysis;
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error(`Error analizando huella: ${error.message}`);
  }
}

/**
 * Mejorar textura de huella con modo específico
 */
async function enhanceFingerprintTexture(imageBuffer, mode = 'standard', customPrompt = null) {
  try {
    let enhanced;
    
    switch (mode) {
      case 'preserve':
        enhanced = await preserveAndEnhance(imageBuffer);
        break;
      case 'texture':
        enhanced = await enhanceWithTexture(imageBuffer);
        break;
      case 'fill':
        enhanced = await fillRidgesBlack(imageBuffer);
        break;
      case 'forensic':
        enhanced = await forensicEnhance(imageBuffer);
        break;
      case 'ultra':
        enhanced = await ultraProfessionalEnhance(imageBuffer);
        break;
      default:
        enhanced = await enhanceFingerprint(imageBuffer);
    }
    
    // Si hay prompt personalizado, aplicar ajustes de poros
    if (customPrompt) {
      const poreIntensity = parsePromptForPoreIntensity(customPrompt);
      if (poreIntensity !== 1.0) {
        console.log(`[ENHANCE] Applying pore intensity: ${poreIntensity}x from prompt`);
        const { addNaturalPores } = require('./lib/pore-generator');
        enhanced = await addNaturalPores(enhanced, poreIntensity);
      }
    }
    
    return enhanced;
  } catch (error) {
    console.error('Enhancement error:', error);
    throw new Error(`Error mejorando huella: ${error.message}`);
  }
}

/**
 * Endpoint: Analizar huella
 */
app.post('/api/analyze', upload.single('fingerprint'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log(`[ANALYZE] Processing image: ${req.file.originalname} (${req.file.size} bytes)`);
    const analysis = await analyzeFingerprint(req.file.buffer);
    
    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[ANALYZE] Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint: Procesar huella (análisis + mejora)
 */
app.post('/api/process', upload.single('fingerprint'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const mode = req.query.mode || 'standard';
    console.log(`[PROCESS] Processing image: ${req.file.originalname} (${req.file.size} bytes) with mode: ${mode}`);
    
    // Analizar
    const analysis = await analyzeFingerprint(req.file.buffer);
    
    // Mejorar
    const enhanced = await enhanceFingerprintTexture(req.file.buffer, mode, null);
    
    // Guardar resultado
    const filename = `fingerprint-${Date.now()}.png`;
    const filepath = path.join(resultsDir, filename);
    await sharp(enhanced).toFile(filepath);
    
    console.log(`[PROCESS] Saved processed image: ${filename}`);
    
    res.json({
      success: true,
      analysis,
      processedImage: `/results/${filename}`,
      processingMode: mode,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[PROCESS] Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint: Procesar con modo avanzado y prompt personalizado
 */
app.post('/api/process-advanced', upload.single('fingerprint'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Obtener modo y prompt desde FormData
    const mode = req.body.mode || req.query.mode || 'standard';
    const customPrompt = req.body.customPrompt || req.fields?.customPrompt || null;
    
    console.log(`[PROCESS-ADVANCED] Processing image: ${req.file.originalname} with mode: ${mode}`);
    if (customPrompt) {
      console.log(`[PROCESS-ADVANCED] Custom prompt: ${customPrompt.substring(0, 100)}...`);
    }
    
    // Analizar
    const analysis = await analyzeFingerprint(req.file.buffer);
    
    // Mejorar con prompt personalizado
    const enhanced = await enhanceFingerprintTexture(req.file.buffer, mode, customPrompt);
    
    // Guardar resultado
    const filename = `fingerprint-${Date.now()}.png`;
    const filepath = path.join(resultsDir, filename);
    await sharp(enhanced).toFile(filepath);
    
    console.log(`[PROCESS-ADVANCED] Saved processed image: ${filename}`);
    
    res.json({
      success: true,
      analysis,
      processedImage: `/results/${filename}`,
      processingMode: mode,
      customPrompt: customPrompt || null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[PROCESS-ADVANCED] Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint: Descargar resultados
 */
app.get('/results/:filename', (req, res) => {
  const filepath = path.join(resultsDir, req.params.filename);
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

/**
 * Endpoint: Listar resultados
 */
app.get('/api/results', (req, res) => {
  try {
    const files = fs.readdirSync(resultsDir);
    const results = files.map(filename => ({
      filename,
      url: `/results/${filename}`,
      timestamp: fs.statSync(path.join(resultsDir, filename)).mtime
    }));
    
    res.json({
      success: true,
      results: results.sort((a, b) => b.timestamp - a.timestamp)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    version: '1.0.0',
    features: ['ridge-analysis', 'texture-enhancement', 'local-processing'],
    timestamp: new Date().toISOString()
  });
});

/**
 * Información del servidor
 */
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Panel Biométrico Forense - Standalone',
    version: '1.0.0',
    description: 'Análisis y procesamiento de huellas dactilares sin dependencias de LLM',
    features: {
      analysis: 'Análisis avanzado de características biométricas',
      processing: 'Múltiples modos de procesamiento de texturas',
      storage: 'Almacenamiento local de resultados',
      noLLM: 'Sin dependencias de servicios de LLM'
    },
    endpoints: {
      analyze: 'POST /api/analyze - Analizar huella',
      process: 'POST /api/process - Procesar huella',
      processAdvanced: 'POST /api/process-advanced - Procesamiento avanzado',
      results: 'GET /api/results - Listar resultados',
      health: 'GET /api/health - Estado del servidor'
    }
  });
});

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔬 PANEL BIOMÉTRICO FORENSE - STANDALONE EDITION`);
  console.log(`${'='.repeat(60)}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`✓ Procesamiento local sin dependencias de LLM`);
  console.log(`✓ Visión computacional avanzada activada`);
  console.log(`✓ Análisis de características biométricas en tiempo real`);
  console.log(`${'='.repeat(60)}\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Puerto ${PORT} ya en uso`);
  }
  process.exit(1);
});
