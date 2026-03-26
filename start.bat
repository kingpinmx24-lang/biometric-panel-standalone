@echo off
REM Panel Biométrico Forense - Standalone Edition
REM Script de inicio para Windows

echo.
echo ============================================================
echo 🔬 PANEL BIOMÉTRICO FORENSE - STANDALONE EDITION
echo ============================================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js no está instalado o no está en el PATH
    echo.
    echo Por favor descarga Node.js desde: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Verificar si npm está instalado
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Error: npm no está instalado
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js detectado
echo ✓ npm detectado
echo.

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Error durante la instalación de dependencias
        pause
        exit /b 1
    )
    echo ✓ Dependencias instaladas
    echo.
)

REM Iniciar servidor
echo 🚀 Iniciando servidor...
echo.
set PORT=3001
call npm start

pause
