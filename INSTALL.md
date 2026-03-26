# 🔬 Instalación - Panel Biométrico Forense Standalone

Guía completa de instalación para todos los sistemas operativos.

## 📋 Requisitos Previos

### Windows
- **Node.js**: v14.0.0 o superior
  - Descargar desde: https://nodejs.org/ (recomendado: LTS)
  - Durante la instalación, asegúrate de marcar "Add to PATH"
- **npm**: Se instala automáticamente con Node.js

### Linux (Ubuntu/Debian)
```bash
# Actualizar lista de paquetes
sudo apt update

# Instalar Node.js y npm
sudo apt install nodejs npm

# Verificar versiones
node --version
npm --version
```

### Linux (Fedora/RHEL)
```bash
# Instalar Node.js y npm
sudo dnf install nodejs npm

# Verificar versiones
node --version
npm --version
```

### macOS
```bash
# Usando Homebrew (recomendado)
brew install node

# Verificar versiones
node --version
npm --version
```

## 🚀 Instalación Rápida

### Opción 1: Script Automático (Recomendado)

#### Windows
1. Abre el Explorador de Archivos
2. Navega a la carpeta `biometric-standalone`
3. Haz doble clic en `start.bat`
4. El servidor se iniciará automáticamente

#### Linux/Mac
```bash
cd biometric-standalone
./start.sh
```

### Opción 2: Instalación Manual

#### Paso 1: Descargar el proyecto
```bash
# Navega a la carpeta del proyecto
cd biometric-standalone
```

#### Paso 2: Instalar dependencias
```bash
npm install
```

#### Paso 3: Iniciar servidor
```bash
npm start
```

El servidor se iniciará en `http://localhost:3001`

## ✅ Verificación de Instalación

### Verificar Node.js
```bash
node --version
# Debe mostrar v14.0.0 o superior
```

### Verificar npm
```bash
npm --version
# Debe mostrar v6.0.0 o superior
```

### Verificar servidor
Abre tu navegador y ve a: `http://localhost:3001`

Deberías ver:
- Interfaz verde/negra forense
- Área de carga de imágenes
- Panel de análisis

## 🔧 Solución de Problemas

### Problema: "Node.js no encontrado"
**Solución:**
1. Descarga Node.js desde https://nodejs.org/
2. Instala siguiendo las instrucciones
3. Reinicia tu terminal/PowerShell
4. Verifica: `node --version`

### Problema: "npm install falla"
**Solución:**
```bash
# Limpiar caché de npm
npm cache clean --force

# Intentar instalación nuevamente
npm install
```

### Problema: "Puerto 3001 ya está en uso"
**Solución:**
```bash
# Cambiar puerto
PORT=3002 npm start

# O matar proceso en puerto 3001
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :3001
kill -9 <PID>
```

### Problema: "Error: Cannot find module 'sharp'"
**Solución:**
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Problema: "EACCES: permission denied" (Linux/Mac)
**Solución:**
```bash
# Dar permisos de ejecución
chmod +x start.sh
./start.sh
```

## 📦 Instalación Global (Opcional)

### Windows
```bash
# En PowerShell como Administrador
npm install -g .
biometric-panel
```

### Linux/Mac
```bash
# Instalar globalmente
sudo npm install -g .

# Ejecutar desde cualquier lugar
biometric-panel
```

## 🌐 Acceso a la Aplicación

Una vez iniciado el servidor:

1. **Navegador Web**: `http://localhost:3001`
2. **API REST**: `http://localhost:3001/api/`
3. **Información**: `http://localhost:3001/api/info`
4. **Health Check**: `http://localhost:3001/api/health`

## 📝 Primeros Pasos

1. **Cargar una huella dactilares**
   - Arrastra una imagen PNG/JPG al área de carga
   - O haz clic para seleccionar un archivo

2. **Analizar**
   - Haz clic en el botón "ANALIZAR"
   - Espera a que se complete el análisis
   - Verás las características detectadas

3. **Procesar**
   - Selecciona un modo de procesamiento
   - Opcionalmente, ingresa un prompt personalizado
   - Haz clic en "PROCESAR"
   - Verás la comparación antes/después

## 🆘 Soporte

Si encuentras problemas:

1. Verifica que Node.js esté correctamente instalado
2. Intenta limpiar caché: `npm cache clean --force`
3. Reinstala dependencias: `npm install`
4. Reinicia el servidor

## 📚 Recursos Adicionales

- **Node.js**: https://nodejs.org/
- **npm**: https://www.npmjs.com/
- **Express**: https://expressjs.com/
- **Sharp**: https://sharp.pixelplumbing.com/

---

**Versión**: 1.0.0  
**Última actualización**: Marzo 2026
