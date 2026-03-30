#!/bin/bash

# Panel Biométrico Forense - Standalone Edition
# Script de inicio para Linux/Mac

echo ""
echo "============================================================"
echo "🔬 PANEL BIOMÉTRICO FORENSE - STANDALONE EDITION"
echo "============================================================"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo ""
    echo "Por favor descarga Node.js desde: https://nodejs.org/"
    echo ""
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    echo ""
    exit 1
fi

echo "✓ Node.js detectado: $(node --version)"
echo "✓ npm detectado: $(npm --version)"
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error durante la instalación de dependencias"
        exit 1
    fi
    echo "✓ Dependencias instaladas"
    echo ""
fi

# Iniciar servidor
echo "🚀 Iniciando servidor..."
echo ""
export PORT=3001
npm start
