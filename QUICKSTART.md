# ⚡ Inicio Rápido - Panel Biométrico Forense Standalone

Comienza en **3 pasos** sin dependencias de LLM.

## 🚀 Paso 1: Descargar e Instalar

### Windows
1. Descarga `biometric-panel-standalone.zip`
2. Extrae el archivo
3. Haz doble clic en `start.bat`
4. Espera a que se instale y se inicie

### Linux/Mac
```bash
# Extrae el ZIP
unzip biometric-panel-standalone.zip
cd biometric-standalone

# Ejecuta el script
./start.sh
```

## 🌐 Paso 2: Abrir en Navegador

Una vez que veas este mensaje:
```
📍 URL: http://localhost:3001
✓ Procesamiento local sin dependencias de LLM
```

Abre tu navegador y ve a: **http://localhost:3001**

## 📸 Paso 3: Procesar Huellas

1. **Cargar imagen**
   - Arrastra una imagen de huella dactilares
   - O haz clic para seleccionar

2. **Analizar**
   - Haz clic en "ANALIZAR"
   - Verás características detectadas:
     - Densidad de crestas
     - Patrón (Loop, Whorl, Arch)
     - Bifurcaciones y terminaciones
     - Calidad general

3. **Procesar**
   - Selecciona modo: Estándar, Preservar, Textura o Relleno
   - Opcionalmente, ingresa un prompt personalizado
   - Haz clic en "PROCESAR"
   - Verás la comparación antes/después

## 📊 Modos de Procesamiento

| Modo | Descripción |
|------|-------------|
| **Estándar** | Mejora general de contraste y claridad |
| **Preservar** | Máxima preservación de características |
| **Textura** | Realce de texturas y granularidad |
| **Relleno** | Relleno completo de crestas en negro |

## 🔍 Características Analizadas

- **Densidad de Crestas**: Porcentaje de píxeles negros
- **Orientación**: Dirección de las crestas (Vertical, Horizontal, Diagonal)
- **Patrón**: Tipo de huella (Loop, Whorl, Arch)
- **Bifurcaciones**: Puntos donde se divide una cresta
- **Terminaciones**: Puntos finales de crestas
- **Core**: Centro de la huella
- **Deltas**: Puntos de referencia
- **Poros**: Tamaño y granularidad de textura

## 💾 Resultados

Las imágenes procesadas se guardan en:
- **Carpeta**: `results/`
- **Formato**: PNG
- **Nombre**: `fingerprint-TIMESTAMP.png`

Puedes descargarlas directamente desde la interfaz.

## ⚙️ Requisitos Mínimos

- **Node.js**: v14.0.0 o superior
- **RAM**: 512MB mínimo
- **Espacio**: 200MB (incluyendo dependencias)
- **Navegador**: Chrome, Firefox, Safari, Edge (moderno)

## 🆘 Problemas Comunes

### "Puerto 3001 ya está en uso"
```bash
# Cambiar puerto
PORT=3002 npm start
```

### "Node.js no encontrado"
Descarga desde: https://nodejs.org/

### "Error al cargar imagen"
- Verifica que sea PNG, JPG o BMP
- Tamaño máximo: 10MB
- Resolución mínima: 100x100px

## 📚 Documentación Completa

Para más información, consulta:
- `README.md` - Documentación técnica
- `INSTALL.md` - Instrucciones de instalación detalladas
- `API.md` - Referencia de endpoints (si existe)

## 🎯 Casos de Uso

✓ Análisis forense de huellas dactilares  
✓ Investigación biométrica  
✓ Procesamiento de imágenes de crestas  
✓ Extracción de características biométricas  
✓ Mejora de calidad de huellas  
✓ Comparación de patrones  

## 🔒 Privacidad

- **Sin conexión externa**: Todo se procesa localmente
- **Sin LLM**: No se envían datos a servicios en la nube
- **Sin almacenamiento remoto**: Los datos permanecen en tu computadora
- **Código abierto**: Puedes revisar el código fuente

## 📞 Soporte

Si necesitas ayuda:
1. Revisa `INSTALL.md` para solución de problemas
2. Verifica que Node.js esté correctamente instalado
3. Intenta: `npm cache clean --force && npm install`

---

**¡Listo para comenzar!** 🚀

Abre http://localhost:3001 en tu navegador.
