# 🍽️ Chatbot Restaurante Sabor Norteño

## 📋 Índice
1. [Contexto de la Empresa](#contexto-de-la-empresa)
2. [Arquitectura Técnica](#arquitectura-técnica)
3. [Estructura de Archivos](#estructura-de-archivos)
4. [Instalación y Uso](#instalación-y-uso)
5. [Funcionalidades](#funcionalidades)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Mejoras Implementadas](#mejoras-implementadas)

---

## 🏢 Contexto de la Empresa

### Información General
**Restaurante Sabor Norteño** es un establecimiento gastronómico especializado en comida tradicional peruana y norteña, ubicado en el corazón de Chiclayo, Lambayeque, Perú.

- **Nombre:** Restaurante Sabor Norteño
- **Ubicación:** Av. Balta 512, Centro de Chiclayo
- **Ciudad:** Chiclayo, Lambayeque
- **País:** Perú
- **Teléfono:** +51 957 246 125
- **Email:** contacto@sabornorteno.pe
- **Versión:** 1.1
- **Última actualización:** Noviembre 2025

### Horarios de Atención
- **Lunes a Viernes:** 11:00 AM - 10:00 PM
- **Sábados:** 10:00 AM - 11:00 PM
- **Domingos:** 10:00 AM - 9:00 PM

### Menú Principal

#### 🥗 Entradas (S/ 15 - S/ 25)
- **Causa limeña** (S/ 18) - Puré de papa amarilla con pollo y mayonesa
- **Ceviche de pescado** (S/ 25) - Pescado fresco en leche de tigre con camote y choclo
- **Chicharrón de calamar** (S/ 22) - Calamares fritos crujientes con salsa criolla
- **Papa a la Huancaína** (S/ 15) - Papas bañadas en salsa de ají amarillo

#### 🍽️ Platos Principales (S/ 28 - S/ 38)
- **Arroz con pato** (S/ 32) ⭐ - Plato estrella chiclayano con pato tierno y arroz cilantrado
- **Cabrito a la norteña** (S/ 38) - Cabrito guisado con frejoles y yucas
- **Seco de cabrito** (S/ 35) - Cabrito en salsa de culantro con frejoles y arroz
- **Chinguirito** (S/ 28) - Plato típico con guitarra seca, yucas y zarza criolla
- **Espesado de pollo** (S/ 30) - Guiso espeso con pollo, zapallo y arroz
- **Lomo saltado** (S/ 32) - Carne salteada con cebolla, tomate y papas fritas
- **Ají de gallina** (S/ 28) - Gallina deshilachada en crema de ají amarillo

#### 🍰 Postres (S/ 7 - S/ 12)
- **King Kong de manjar blanco** (S/ 12) ⭐ - Dulce típico lambayecano con galletas y manjar
- **Arroz con leche** (S/ 8) - Arroz cremoso con leche y canela
- **Mazamorra morada** (S/ 7) - Postre de maíz morado con frutas
- **Suspiro limeño** (S/ 10) - Dulce de leche con merengue

#### 🥤 Bebidas (S/ 4 - S/ 18)
- **Chicha morada** (S/ 5) - Bebida de maíz morado con piña y canela
- **Inca Kola** (S/ 4) - Gaseosa peruana
- **Pisco Sour** (S/ 18) - Cóctel de pisco con limón
- **Chicha de jora** (S/ 6) - Bebida fermentada de maíz
- **Jugo de maracuyá** (S/ 6) - Jugo natural de maracuyá
- **Emoliente** (S/ 4) - Bebida caliente de hierbas

### Servicios Disponibles
- Delivery a domicilio
- Reservaciones
- Eventos y celebraciones
- Para llevar
- Estacionamiento disponible
- WiFi gratis

### Métodos de Pago
- Efectivo
- Tarjeta de crédito/débito
- Yape (billetera digital peruana)
- Plin (billetera digital peruana)
- Transferencia bancaria

---

## 🏗️ Arquitectura Técnica

### Descripción General
El chatbot es una aplicación web interactiva que funciona completamente en el navegador del cliente (frontend). Utiliza tecnologías modernas para proporcionar una experiencia conversacional con soporte para entrada de texto y voz.

### Componentes Principales

#### 1. **Frontend (Cliente)**
- **Tecnología:** HTML5, CSS3, JavaScript Vanilla
- **Ejecución:** Navegador web (Chrome, Edge, Safari, Firefox)
- **Tipo:** Single Page Application (SPA)

#### 2. **Datos**
- **Almacenamiento:** Archivos JavaScript
- **Ubicación:** Cliente (navegador)
- **Persistencia:** localStorage (historial y estadísticas)

#### 3. **Procesamiento**
- **Lógica:** JavaScript puro (sin frameworks)
- **Reconocimiento de voz:** Web Speech API
- **Síntesis de voz:** Web Speech API

### Flujo de Datos

```
Usuario Input (Texto/Voz)
        ↓
Reconocimiento de Voz (opcional)
        ↓
Procesamiento en JavaScript
        ↓
Búsqueda en base de datos (datos.js)
        ↓
Generación de respuesta
        ↓
Síntesis de voz (opcional)
        ↓
Visualización en interfaz
```

### Características Técnicas

#### ✅ Reconocimiento de Voz
- **API:** Web Speech API (SpeechRecognition)
- **Idioma:** Español de Perú (es-PE)
- **Navegadores soportados:** Chrome, Edge, Safari
- **Modo:** Continuo desactivado, resultados finales

#### ✅ Síntesis de Voz
- **API:** Web Speech API (SpeechSynthesis)
- **Idioma:** Español de Perú (es-PE)
- **Velocidad:** 0.95x (ligeramente más lenta para claridad)
- **Volumen:** 100%

#### ✅ Procesamiento de Lenguaje Natural
- **Método:** Búsqueda de palabras clave
- **Normalización:** Eliminación de acentos y conversión a minúsculas
- **Coincidencia:** Búsqueda parcial (contains)
- **Respuestas:** Dinámicas basadas en base de datos

#### ✅ Interfaz de Usuario
- **Diseño:** Responsive (adaptable a móviles y escritorio)
- **Componentes:** Chat bubbles, botones, área de entrada
- **Indicadores:** Estado de voz, animación de "escribiendo"
- **Accesibilidad:** Soporte para teclado (Enter para enviar)
- **Sugerencias:** 8 botones rápidos

---

## 📁 Estructura de Archivos

```
ChatBot/
├── chatbot_restaurante.html    # Archivo principal (punto de entrada)
├── chatbot.js                  # Lógica del chatbot (775+ líneas)
├── chatbot.css                 # Estilos y diseño responsivo
├── datos.js                    # Base de datos del restaurante (285+ líneas)
├── base_datos_restaurante.json # Datos en formato JSON (referencia)
└── README.md                   # Este archivo
```

### Descripción de Archivos

#### `chatbot_restaurante.html`
- **Propósito:** Estructura HTML de la aplicación
- **Contenido:**
  - Encabezado con información del restaurante
  - Área de sugerencias rápidas (8 botones)
  - Área de mensajes (chat)
  - Campo de entrada de texto
  - Botones de envío y micrófono
- **Scripts:** Carga `datos.js` y `chatbot.js` en ese orden

#### `datos.js`
- **Propósito:** Base de datos centralizada del restaurante
- **Contenido:**
  - Información general (nombre, teléfono, email, redes sociales)
  - Horarios de atención
  - Ubicación y datos de contacto
  - Menú completo (entradas, platos principales, postres, bebidas)
  - Servicios ofrecidos
  - Métodos de pago aceptados
  - Promociones especiales (3 combos)
  - Preguntas frecuentes (6 FAQs)
  - Reseñas de clientes (3 reseñas)
  - Recomendaciones por ocasión (4 tipos)
  - Información nutricional (4 platos)
  - Tips gastronómicos (6 consejos)

#### `chatbot.js`
- **Propósito:** Lógica principal del chatbot (775+ líneas)
- **Módulos principales:**
  1. **Reconocimiento de Voz** - Verificación, inicialización, manejo de eventos
  2. **Síntesis de Voz** - Conversión de texto a voz
  3. **Interfaz de Chat** - Envío de mensajes, agregar al chat
  4. **Procesamiento de Mensajes** - Análisis de palabras clave
  5. **Generadores de Respuestas** - 15+ funciones especializadas
  6. **Persistencia de Datos** - localStorage para historial y estadísticas
  7. **Inicialización** - Configuración al cargar la página

#### `chatbot.css`
- **Propósito:** Estilos visuales de la aplicación
- **Características:**
  - Diseño responsivo (mobile-first)
  - Tema de colores acorde al restaurante
  - Animaciones suaves
  - Burbujas de chat estilizadas
  - Botones interactivos

---

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Edge, Safari, Firefox)
- Archivos en la misma carpeta
- Sin necesidad de servidor (funciona localmente)

### Pasos para ejecutar

1. **Descargar/Clonar los archivos**
   ```
   Asegúrate de tener todos los archivos en la misma carpeta:
   - chatbot_restaurante.html
   - chatbot.js
   - chatbot.css
   - datos.js
   ```

2. **Abrir en navegador**
   - Haz doble clic en `chatbot_restaurante.html`
   - O arrastra el archivo al navegador
   - O usa clic derecho → "Abrir con" → Navegador

3. **Usar el chatbot**
   - Escribe preguntas en el campo de texto
   - Presiona Enter o haz clic en "Enviar"
   - Usa el botón 🎤 para hablar (si tu navegador lo soporta)

### Ejemplos de preguntas
- "¿Cuál es el menú?"
- "¿Cuáles son los horarios?"
- "¿Dónde están ubicados?"
- "Platos típicos"
- "¿Cuánto cuesta el ceviche?"
- "¿Hacen delivery?"
- "¿Qué métodos de pago aceptan?"
- "¿Qué me recomiendas?"
- "Promociones"
- "Reseñas"

---

## ✨ Funcionalidades

### 1. Chat Conversacional Avanzado
- Respuestas automáticas basadas en palabras clave
- Interfaz intuitiva con burbujas de chat
- Historial de conversación persistente (localStorage)
- Estadísticas de uso en tiempo real
- 8 sugerencias rápidas en la interfaz

### 2. Reconocimiento de Voz
- Entrada por micrófono
- Soporte para español de Perú
- Manejo de errores (micrófono no disponible, sin sonido, etc.)
- Indicador visual de estado

### 3. Síntesis de Voz
- Respuestas leídas en voz alta
- Idioma: Español de Perú
- Velocidad ajustada para claridad

### 4. Información del Restaurante
- Menú completo con precios y descripciones
- Horarios de atención
- Ubicación y contacto
- Servicios disponibles
- Métodos de pago (incluyendo Yape y Plin)
- Redes sociales

### 5. Promociones y Ofertas
- Combos especiales con descuentos
- Tabla de degustación
- Menú del día
- Información de precios comparativos

### 6. Reseñas y Valoraciones
- Comentarios de clientes reales
- Calificaciones por estrellas
- Fechas de reseñas

### 7. Preguntas Frecuentes (FAQ)
- 6 preguntas comunes respondidas
- Información sobre delivery, horarios, eventos
- Opciones vegetarianas
- Platos más populares

### 8. Recomendaciones Personalizadas
- Por ocasión (primera vez, almuerzo rápido, cena especial, grupo de amigos)
- Sugerencias contextuales basadas en el mensaje
- Recomendaciones generales

### 9. Información Nutricional
- Calorías, proteínas, carbohidratos y grasas
- Información de alergenos
- Disponible para platos seleccionados

### 10. Tips Gastronómicos
- Consejos sobre preparación de platos
- Información sobre ingredientes
- Recomendaciones culinarias

### 11. Búsqueda de Platos Específicos
- Búsqueda por nombre de plato
- Información detallada del plato
- Seguimiento de platos más consultados

### 12. Interfaz Responsiva
- Adaptable a dispositivos móviles
- Diseño limpio y moderno
- Accesibilidad por teclado
- 8 botones de sugerencias rápidas

### 13. Persistencia de Datos
- Historial de conversación guardado
- Estadísticas de uso almacenadas
- Datos recuperables entre sesiones

---

## 🛠️ Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| HTML5 | - | Estructura |
| CSS3 | - | Estilos y diseño responsivo |
| JavaScript | ES6+ | Lógica e interactividad |

### APIs del Navegador
| API | Propósito |
|-----|----------|
| Web Speech API (SpeechRecognition) | Reconocimiento de voz |
| Web Speech API (SpeechSynthesis) | Síntesis de voz |
| localStorage API | Persistencia de datos |
| DOM API | Manipulación de elementos |


---

## 📊 Estadísticas del Código

| Métrica | Valor |
|---------|-------|
| Líneas de código (chatbot.js) | 775+ |
| Líneas de código (datos.js) | 285+ |
| Funciones principales | 30+ |
| Palabras clave procesadas | 100+ |
| Categorías de menú | 4 |
| Platos disponibles | 18 |
| Bebidas disponibles | 6 |
| Promociones | 3 |
| Preguntas frecuentes | 6 |
| Reseñas de clientes | 3 |
| Recomendaciones por ocasión | 4 |
| Platos con info nutricional | 4 |
| Tips gastronómicos | 6 |
| Sugerencias rápidas | 8 |

---

## 🚀 Mejoras Implementadas

### Versión 1.1 (Actual)

#### Nuevas Características
1. **Promociones y Ofertas** - 3 combos especiales con descuentos
2. **Reseñas y Valoraciones** - Comentarios de clientes con calificaciones
3. **Preguntas Frecuentes** - 6 FAQs respondidas
4. **Recomendaciones Personalizadas** - Por ocasión y contexto
5. **Información Nutricional** - Calorías, proteínas, grasas, alergenos
6. **Tips Gastronómicos** - 6 consejos culinarios
7. **Búsqueda de Platos** - Búsqueda por nombre con seguimiento
8. **Persistencia de Datos** - localStorage para historial y estadísticas
9. **Interfaz Mejorada** - 8 sugerencias rápidas (antes 4)
10. **Redes Sociales** - Enlaces integrados a Facebook, Instagram, WhatsApp

#### Mejoras Técnicas
- +54% más líneas de código en chatbot.js
- +91% más líneas de código en datos.js
- +50% más funciones principales
- +100% más palabras clave procesadas
- Mejor normalización de acentos
- Respuestas más contextuales
- Código mejor organizado

---

## 🔧 Mantenimiento y Actualizaciones

### Para actualizar el menú
1. Edita `datos.js`
2. Modifica la sección `"menu"` con los nuevos platos
3. Guarda el archivo
4. Recarga la página en el navegador

### Para cambiar información de contacto
1. Edita `datos.js`
2. Actualiza `"informacion_general"` con nuevos datos
3. Guarda el archivo
4. Recarga la página

### Para agregar nuevas palabras clave
1. Edita `chatbot.js`
2. Busca la función `procesarMensaje()`
3. Agrega nuevas condiciones con `contienePalabras()`
4. Guarda el archivo

### Para agregar promociones
1. Edita `datos.js`
2. Agrega nuevas promociones en la sección `"promociones"`
3. Guarda el archivo
4. Recarga la página

---

## 🎯 Mejoras Futuras Potenciales

1. **Backend Integration**
   - Conectar con base de datos real
   - Gestión de reservaciones online
   - Historial de pedidos persistente

2. **Machine Learning**
   - Procesamiento de lenguaje natural más avanzado
   - Respuestas más contextuales
   - Aprendizaje de patrones de usuario

3. **Sistema de Pedidos**
   - Carrito de compras
   - Procesamiento de pagos en línea
   - Integración con Yape/Plin

4. **Análisis y Reportes**
   - Dashboard de estadísticas
   - Reportes de tendencias
   - Análisis de feedback

5. **Multiidioma**
   - Soporte para inglés
   - Soporte para quechua
   - Selector de idioma

6. **Integración de Mapas**
   - Google Maps integrado
   - Rutas de delivery
   - Ubicación en tiempo real

---

## 📝 Notas Técnicas

### Decisiones de Diseño

1. **Sin Framework Frontend**
   - Ventaja: Carga rápida, sin dependencias externas
   - Desventaja: Menos escalable para aplicaciones grandes

2. **Datos en Cliente**
   - Ventaja: No requiere servidor, funciona offline
   - Desventaja: No hay persistencia entre sesiones (se usa localStorage)

3. **Búsqueda de Palabras Clave**
   - Ventaja: Rápido y predecible
   - Desventaja: Menos flexible que NLP real

4. **Separación de Datos (datos.js)**
   - Ventaja: Fácil mantenimiento, reutilizable
   - Desventaja: Duplicación con base_datos_restaurante.json

### Limitaciones Actuales

1. Procesamiento de lenguaje limitado a palabras clave
2. No hay integración con sistemas externos
3. Reconocimiento de voz solo en navegadores soportados
4. Sin autenticación de usuarios
5. Sin integración de pagos

---

## 📞 Soporte

Para preguntas o reportar problemas, contacta al Restaurante Sabor Norteño:
- **Teléfono:** +51 957 246 125
- **Email:** contacto@sabornorteno.pe
- **Ubicación:** Av. Balta 512, Centro de Chiclayo
- **Facebook:** facebook.com/sabornorteno
- **Instagram:** @sabornorteno
- **WhatsApp:** +51 957 246 125

---
