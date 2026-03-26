/**
 * Authentication Module - Majestic Finger
 * Sistema de autenticación con sesiones
 */

const crypto = require('crypto');

// Base de datos en memoria de usuarios
const users = {
  'Majestic': {
    password: hashPassword('Elmaslok0'),
    role: 'admin',
    createdAt: new Date()
  }
};

// Sesiones activas
const sessions = new Map();

/**
 * Hash de contraseña (simple, para producción usar bcrypt)
 */
function hashPassword(password) {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
}

/**
 * Verificar credenciales
 */
function authenticate(username, password) {
  const user = users[username];
  
  if (!user) {
    return { success: false, message: 'Usuario no encontrado' };
  }
  
  if (user.password !== hashPassword(password)) {
    return { success: false, message: 'Contraseña incorrecta' };
  }
  
  return { success: true, user: { username, role: user.role } };
}

/**
 * Crear sesión
 */
function createSession(username) {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const session = {
    username,
    sessionId,
    createdAt: new Date(),
    lastActivity: new Date()
  };
  
  sessions.set(sessionId, session);
  console.log(`[AUTH] Usuario ${username} conectado`);
  
  return sessionId;
}

/**
 * Validar sesión
 */
function validateSession(sessionId) {
  const session = sessions.get(sessionId);
  
  if (!session) {
    return { valid: false, message: 'Sesión no válida' };
  }
  
  // Actualizar última actividad
  session.lastActivity = new Date();
  
  return { valid: true, session };
}

/**
 * Cerrar sesión
 */
function closeSession(sessionId) {
  const session = sessions.get(sessionId);
  
  if (session) {
    console.log(`[AUTH] Usuario ${session.username} desconectado`);
    sessions.delete(sessionId);
    return true;
  }
  
  return false;
}

/**
 * Limpiar sesiones expiradas (más de 24 horas)
 */
function cleanExpiredSessions() {
  const now = new Date();
  const maxAge = 24 * 60 * 60 * 1000; // 24 horas
  
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.lastActivity > maxAge) {
      closeSession(sessionId);
    }
  }
}

// Limpiar sesiones expiradas cada hora
setInterval(cleanExpiredSessions, 60 * 60 * 1000);

module.exports = {
  authenticate,
  createSession,
  validateSession,
  closeSession,
  hashPassword
};
