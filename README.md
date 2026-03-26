# 🔬 Panel Biométrico Forense - Standalone Edition

Aplicación Node.js standalone para análisis y procesamiento de huellas dactilares **sin dependencias de LLM**. Funciona completamente en local sin límites de API.

## ✨ Características

- **Análisis Local**: Procesa huellas directamente sin servicios externos
- **Sin Límites de API**: Funciona indefinidamente sin restricciones
- **Visión Computacional**: Usa Sharp para análisis de características biométricas
- **Interfaz Web**: UI moderna con tema forense (verde/negro)
- **Procesamiento en Tiempo Real**: Análisis y mejora instantánea de imágenes
- **Exportación de Resultados**: Descarga imágenes procesadas

## 📋 Requisitos

- **Node.js**: v14.0.0 o superior
- **npm**: v6.0.0 o superior
- **Espacio en disco**: ~500MB para dependencias

## 🚀 Instalación

### Opción 1: Instalación Manual

```bash
# Clonar o descargar el proyecto
cd biometric-standalone

# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

El servidor se iniciará en `http://localhost:3001`

### Opción 2: Instalación Global (Opcional)

```bash
# Instalar globalmente
npm install -g .

# Ejecutar desde cualquier lugar
biometric-panel
```

## 💻 Uso

### 1. Acceder a la Interfaz Web

Abre tu navegador y ve a: `http://localhost:3001`

### 2. Cargar una Huella Dactilares

- Arrastra una imagen de huella al área de carga
- O haz clic para seleccionar un archivo
- Formatos soportados: PNG, JPG, BMP
- Tamaño máximo: 10MB

### 3. Analizar

Haz clic en el botón **ANALIZAR** para:
- Detectar densidad de crestas
- Identificar patrón (Loop, Whorl, Arch)
- Contar bifurcaciones y terminaciones
- Calcular puntuación de calidad
- Medir dimensiones

### 4. Procesar

Haz clic en el botón **PROCESAR** para:
- Ejecutar análisis completo
- Mejorar la imagen (normalización, sharpening)
- Generar versión procesada
- Mostrar comparación antes/después

## 📊 Análisis Disponible

El sistema analiza y reporta:

| Métrica | Descripción |
|---------|-------------|
| **Densidad de Crestas** | Porcentaje de píxeles negros (crestas) |
| **Patrón** | Tipo de patrón detectado (Loop/Whorl/Arch) |
| **Bifurcaciones** | Puntos donde una cresta se divide |
| **Terminaciones** | Puntos donde una cresta termina |
| **Píxeles Negros** | Cantidad total de píxeles de cresta |
| **Calidad General** | Puntuación de 0-100% |
| **Dimensiones** | Ancho x Alto de la imagen |

## 🔧 API Endpoints

### POST /api/analyze

Analiza una huella sin procesamiento.

```bash
curl -X POST -F "fingerprint=@huella.png" http://localhost:3001/api/analyze
```

**Respuesta:**
```json
{
  "success": true,
  "analysis": {
    "width": 1024,
    "height": 768,
    "ridgeDensity": "45.23",
    "pattern": "Loop",
    "bifurcations": 45,
    "terminations": 36,
    "totalPixels": 786432,
    "blackPixels": 354192,
    "quality": 87
  },
  "timestamp": "2026-03-25T10:30:00.000Z"
}
```

### POST /api/process

Analiza y procesa una huella.

```bash
curl -X POST -F "fingerprint=@huella.png" http://localhost:3001/api/process
```

**Respuesta:**
```json
{
  "success": true,
  "analysis": { ... },
  "processedImage": "/results/fingerprint-1711353000000.png",
  "timestamp": "2026-03-25T10:30:00.000Z"
}
```

### GET /api/health

Verifica el estado del servidor.

```bash
curl http://localhost:3001/api/health
```

## 📁 Estructura de Archivos

```
biometric-standalone/
├── app.js                 # Servidor Express principal
├── package.json           # Dependencias
├── README.md             # Este archivo
├── public/
│   └── index.html        # Interfaz web
└── results/              # Imágenes procesadas (se crea automáticamente)
```

## 🎨 Personalización

### Cambiar Puerto

```bash
PORT=3000 npm start
```

### Ajustar Parámetros de Procesamiento

Edita `app.js` y modifica la función `enhanceFingerprint`:

```javascript
const enhanced = await sharp(imageBuffer)
  .normalize()
  .sharpen({ sigma: 1.5 })  // Aumentar para más realce
  .modulate({ brightness: 1.1 })
  .toBuffer();
```

### Personalizar Interfaz

Edita `public/index.html` para cambiar:
- Colores (busca `#00ff00` para verde)
- Textos y etiquetas
- Estilos y diseño

## 🐛 Solución de Problemas

### Puerto ya en uso

```bash
# Usar puerto diferente
PORT=3002 npm start
```

### Error: "Cannot find module 'sharp'"

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "EACCES: permission denied"

```bash
# En Linux/Mac, usar sudo
sudo npm start
```

## 📝 Notas Técnicas

- **Sharp**: Librería de procesamiento de imágenes de alto rendimiento
- **Express**: Framework web minimalista
- **Multer**: Middleware para manejo de uploads
- **Procesamiento Local**: Todo ocurre en el servidor local, sin envíos a servicios externos

## 🔒 Seguridad

- Las imágenes se procesan en memoria (no se guardan temporalmente)
- Los resultados se guardan en el directorio `results/`
- No hay transmisión de datos a servidores externos
- Validación de tipos MIME

## 📄 Licencia

MIT

## 🤝 Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Marzo 2026  
**Estado**: Producción
