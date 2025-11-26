// Base de datos del restaurante
const baseDatos = {
    "informacion_general": {
        "nombre": "Restaurante Sabor Norteño",
        "descripcion": "Restaurante de comida tradicional peruana y norteña con los mejores sabores de Chiclayo",
        "telefono": "+51 957 246 125",
        "email": "contacto@sabornorteno.pe"
    },
    "horarios": {
        "lunes_viernes": "11:00 AM - 10:00 PM",
        "sabados": "10:00 AM - 11:00 PM",
        "domingos": "10:00 AM - 9:00 PM"
    },
    "ubicacion": {
        "direccion": "Av. Balta 512, Centro de Chiclayo",
        "ciudad": "Chiclayo, Lambayeque",
        "codigo_postal": "14001",
        "pais": "Perú"
    },
    "menu": {
        "entradas": [
            {"nombre": "Causa limeña", "precio": 18, "descripcion": "Puré de papa amarilla con pollo y mayonesa"},
            {"nombre": "Ceviche de pescado", "precio": 25, "descripcion": "Pescado fresco en leche de tigre con camote y choclo"},
            {"nombre": "Chicharrón de calamar", "precio": 22, "descripcion": "Calamares fritos crujientes con salsa criolla"},
            {"nombre": "Papa a la huancaína", "precio": 15, "descripcion": "Papas bañadas en salsa de ají amarillo"}
        ],
        "platos_principales": [
            {"nombre": "Arroz con pato", "precio": 32, "descripcion": "Plato típico chiclayano con pato tierno y arroz cilantrado"},
            {"nombre": "Cabrito a la norteña", "precio": 38, "descripcion": "Cabrito guisado con frejoles y yucas"},
            {"nombre": "Seco de cabrito", "precio": 35, "descripcion": "Cabrito en salsa de culantro con frejoles y arroz"},
            {"nombre": "Chinguirito", "precio": 28, "descripcion": "Plato típico con guitarra seca, yucas y zarza criolla"},
            {"nombre": "Espesado de pollo", "precio": 30, "descripcion": "Guiso espeso con pollo, zapallo y arroz"},
            {"nombre": "Lomo saltado", "precio": 32, "descripcion": "Carne salteada con cebolla, tomate y papas fritas"},
            {"nombre": "Aji de gallina", "precio": 28, "descripcion": "Gallina deshilachada en crema de ají amarillo"}
        ],
        "postres": [
            {"nombre": "King Kong de manjar blanco", "precio": 12, "descripcion": "Dulce típico lambayecano con galletas y manjar"},
            {"nombre": "Arroz con leche", "precio": 8, "descripcion": "Arroz cremoso con leche y canela"},
            {"nombre": "Mazamorra morada", "precio": 7, "descripcion": "Postre de maíz morado con frutas"},
            {"nombre": "Suspiro limeño", "precio": 10, "descripcion": "Dulce de leche con merengue"}
        ],
        "bebidas": [
            {"nombre": "Chicha morada", "precio": 5, "descripcion": "Bebida de maíz morado con piña y canela"},
            {"nombre": "Inca Kola", "precio": 4, "descripcion": "Gaseosa peruana"},
            {"nombre": "Pisco Sour", "precio": 18, "descripcion": "Cóctel de pisco con limón"},
            {"nombre": "Chicha de jora", "precio": 6, "descripcion": "Bebida fermentada de maíz"},
            {"nombre": "Jugo de maracuyá", "precio": 6, "descripcion": "Jugo natural de maracuyá"},
            {"nombre": "Emoliente", "precio": 4, "descripcion": "Bebida caliente de hierbas"}
        ]
    },
    "servicios": [
        "Delivery a domicilio",
        "Reservaciones",
        "Eventos y celebraciones",
        "Para llevar",
        "Estacionamiento disponible",
        "WiFi gratis"
    ],
    "metodos_pago": [
        "Efectivo",
        "Tarjeta de crédito/débito",
        "Yape",
        "Plin",
        "Transferencia bancaria"
    ]
};

// Variables globales
let reconocimientoVoz = null;
let escuchando = false;
let sintesisVoz = window.speechSynthesis;
let vozDisponible = false;

// Verificar compatibilidad del navegador
function verificarCompatibilidadVoz() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.log('❌ Reconocimiento de voz NO disponible');
        mostrarMensajeSistema('⚠️ El reconocimiento de voz no está disponible en este navegador. Usa Chrome, Edge o Safari para activar esta función.');
        document.getElementById('botonVoz').classList.add('no-disponible');
        document.getElementById('botonVoz').title = 'No disponible en este navegador';
        return false;
    }

    console.log('✓ Reconocimiento de voz disponible');
    vozDisponible = true;
    return true;
}

// Inicializar reconocimiento de voz con mejor manejo de errores
function inicializarReconocimientoVoz() {
    if (!vozDisponible) {
        return false;
    }

    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        reconocimientoVoz = new SpeechRecognition();

        // Configuración para español 
        reconocimientoVoz.lang = 'es-PE';
        reconocimientoVoz.continuous = false;
        reconocimientoVoz.interimResults = false;
        reconocimientoVoz.maxAlternatives = 1;

        reconocimientoVoz.onstart = function() {
            console.log('🎤 Micrófono activado');
            mostrarEstadoVoz('Escuchando...');
        };

        reconocimientoVoz.onresult = function(event) {
            const texto = event.results[0][0].transcript;
            console.log('🗣️ Texto reconocido:', texto);
            document.getElementById('campoEntrada').value = texto;
            mostrarEstadoVoz('✓ Listo');
            setTimeout(() => {
                enviarMensaje();
            }, 500);
        };

        reconocimientoVoz.onerror = function(event) {
            console.error('❌ Error de reconocimiento:', event.error);

            let mensajeError = '';
            switch(event.error) {
                case 'not-allowed':
                case 'permission-denied':
                    mensajeError = '🚫 Permiso de micrófono denegado. Por favor, permite el acceso al micrófono en la configuración del navegador.';
                    mostrarMensajeSistema(mensajeError);
                    break;
                case 'no-speech':
                    mensajeError = '🔇 No se detectó ningún sonido. Intenta hablar más cerca del micrófono.';
                    mostrarEstadoVoz(mensajeError);
                    break;
                case 'audio-capture':
                    mensajeError = '🎤 No se detectó ningún micrófono. Verifica que tu dispositivo tenga uno conectado.';
                    mostrarMensajeSistema(mensajeError);
                    break;
                case 'network':
                    mensajeError = '📡 Error de red. Verifica tu conexión a internet.';
                    mostrarEstadoVoz(mensajeError);
                    break;
                default:
                    mensajeError = `⚠️ Error: ${event.error}`;
                    mostrarEstadoVoz(mensajeError);
            }

            detenerReconocimientoVoz();
        };

        reconocimientoVoz.onend = function() {
            console.log('🎤 Micrófono desactivado');
            detenerReconocimientoVoz();
        };

        console.log('✓ Reconocimiento de voz inicializado correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al inicializar reconocimiento de voz:', error);
        mostrarMensajeSistema('⚠️ Error al inicializar el reconocimiento de voz: ' + error.message);
        return false;
    }
}

// Mostrar mensaje del sistema
function mostrarMensajeSistema(mensaje) {
    const areaMensajes = document.getElementById('areaMensajes');
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje sistema';

    const burbujaDiv = document.createElement('div');
    burbujaDiv.className = 'burbuja-mensaje';
    burbujaDiv.innerHTML = mensaje;

    mensajeDiv.appendChild(burbujaDiv);
    areaMensajes.appendChild(mensajeDiv);
    areaMensajes.scrollTop = areaMensajes.scrollHeight;
}

// Mostrar estado de voz
function mostrarEstadoVoz(mensaje) {
    const estadoVoz = document.getElementById('estadoVoz');
    estadoVoz.textContent = mensaje;
    estadoVoz.classList.add('activo');

    setTimeout(() => {
        estadoVoz.classList.remove('activo');
    }, 3000);
}

// Alternar reconocimiento de voz
function alternarReconocimientoVoz() {
    if (!vozDisponible) {
        mostrarMensajeSistema('⚠️ El reconocimiento de voz no está disponible. Asegúrate de usar Chrome, Edge o Safari en HTTPS o localhost.');
        return;
    }

    if (!reconocimientoVoz) {
        if (!inicializarReconocimientoVoz()) {
            return;
        }
    }

    if (escuchando) {
        detenerReconocimientoVoz();
    } else {
        iniciarReconocimientoVoz();
    }
}

// Iniciar reconocimiento de voz
function iniciarReconocimientoVoz() {
    try {
        reconocimientoVoz.start();
        escuchando = true;
        document.getElementById('botonVoz').classList.add('escuchando');
        console.log('🎤 Iniciando escucha...');
    } catch (error) {
        console.error('❌ Error al iniciar reconocimiento:', error);
        mostrarMensajeSistema('⚠️ Error al iniciar el micrófono. Intenta de nuevo.');
        detenerReconocimientoVoz();
    }
}

// Detener reconocimiento de voz
function detenerReconocimientoVoz() {
    if (reconocimientoVoz && escuchando) {
        try {
            reconocimientoVoz.stop();
        } catch (error) {
            console.error('Error al detener reconocimiento:', error);
        }
    }
    escuchando = false;
    document.getElementById('botonVoz').classList.remove('escuchando');
}

// Función para hablar el texto (síntesis de voz)
function hablar(texto) {
    if (!sintesisVoz) {
        return;
    }

    try {
        // Cancelar cualquier síntesis en progreso
        sintesisVoz.cancel();

        // Limpiar HTML para síntesis de voz
        const textoLimpio = texto.replace(/<br\s*\/?>/gi, '. ')
                                 .replace(/<[^>]*>/g, '')
                                 .replace(/•/g, '')
                                 .replace(/\s+/g, ' ')
                                 .trim();

        const utterance = new SpeechSynthesisUtterance(textoLimpio);
        utterance.lang = 'es-PE'; // Español de Perú
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Intentar usar una voz en español
        const voces = sintesisVoz.getVoices();
        const vozEspanol = voces.find(voz => voz.lang.startsWith('es'));
        if (vozEspanol) {
            utterance.voice = vozEspanol;
        }

        sintesisVoz.speak(utterance);
    } catch (error) {
        console.error('Error en síntesis de voz:', error);
    }
}

// Función para enviar mensaje
function enviarMensaje() {
    const campo = document.getElementById('campoEntrada');
    const mensaje = campo.value.trim();

    if (mensaje === '') return;

    // Agregar mensaje del usuario
    agregarMensaje(mensaje, 'usuario');
    campo.value = '';

    // Simular tiempo de procesamiento
    mostrarEscribiendo();

    setTimeout(() => {
        const respuesta = procesarMensaje(mensaje);
        ocultarEscribiendo();
        agregarMensaje(respuesta, 'bot');
        hablar(respuesta);
    }, 800);
}

// Función para manejar Enter
function manejarEnter(event) {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
}

// Función para enviar sugerencia
function enviarSugerencia(texto) {
    document.getElementById('campoEntrada').value = texto;
    enviarMensaje();
}

// Función para agregar mensaje al chat
function agregarMensaje(texto, tipo) {
    const areaMensajes = document.getElementById('areaMensajes');
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje ${tipo}`;

    const burbujaDiv = document.createElement('div');
    burbujaDiv.className = 'burbuja-mensaje';
    burbujaDiv.innerHTML = texto;

    mensajeDiv.appendChild(burbujaDiv);
    areaMensajes.appendChild(mensajeDiv);

    // Scroll automático al último mensaje
    areaMensajes.scrollTop = areaMensajes.scrollHeight;
}

// Mostrar indicador de "escribiendo"
function mostrarEscribiendo() {
    const areaMensajes = document.getElementById('areaMensajes');
    const escribiendoDiv = document.createElement('div');
    escribiendoDiv.id = 'escribiendo';
    escribiendoDiv.className = 'mensaje bot';
    escribiendoDiv.innerHTML = `
        <div class="escribiendo activo">
            <span></span><span></span><span></span>
        </div>
    `;
    areaMensajes.appendChild(escribiendoDiv);
    areaMensajes.scrollTop = areaMensajes.scrollHeight;
}

// Ocultar indicador de "escribiendo"
function ocultarEscribiendo() {
    const escribiendo = document.getElementById('escribiendo');
    if (escribiendo) {
        escribiendo.remove();
    }
}

// Función principal para procesar mensajes
function procesarMensaje(mensaje) {
    const mensajeLower = mensaje.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

    // Saludos
    if (contienePalabras(mensajeLower, ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'hey', 'alo'])) {
        return '¡Hola! 😊 Bienvenido al Restaurante Sabor Norteño, lo mejor de la comida peruana en Chiclayo. ¿En qué puedo ayudarte?';
    }

    // Despedidas
    if (contienePalabras(mensajeLower, ['adios', 'chao', 'hasta luego', 'nos vemos', 'bye'])) {
        return '¡Hasta pronto! 👋 Esperamos verte pronto en Sabor Norteño. ¡Buen provecho!';
    }

    // Agradecimientos
    if (contienePalabras(mensajeLower, ['gracias', 'muchas gracias', 'te agradezco', 'excelente', 'chevere'])) {
        return '¡De nada! 😊 Estoy aquí para ayudarte. ¿Necesitas algo más?';
    }

    // Menú completo
    if (contienePalabras(mensajeLower, ['menu', 'carta', 'platillos', 'comida', 'que tienen', 'que ofrecen', 'platos'])) {
        return generarRespuestaMenu();
    }

    // Platos típicos peruanos/norteños
    if (contienePalabras(mensajeLower, ['tipico', 'tipicos', 'norteno', 'nortenos', 'peruano', 'peru', 'chiclayo', 'lambayeque', 'tradicional'])) {
        return '🇵🇪 <strong>Nuestros Platos Típicos Norteños:</strong><br><br>' +
               '<strong>Arroz con pato</strong> - S/ 32<br>Plato estrella chiclayano con pato tierno y arroz cilantrado<br><br>' +
               '<strong>Cabrito a la norteña</strong> - S/ 38<br>Cabrito guisado con frejoles y yucas<br><br>' +
               '<strong>Seco de cabrito</strong> - S/ 35<br>En salsa de culantro con frejoles<br><br>' +
               '<strong>Chinguirito</strong> - S/ 28<br>Con guitarra seca y zarza criolla<br><br>' +
               '<strong>King Kong</strong> - S/ 12<br>El dulce más famoso de Lambayeque<br><br>' +
               '¡Lo mejor de la cocina norteña!';
    }

    // Entradas/Ceviche
    if (contienePalabras(mensajeLower, ['entrada', 'entradas', 'aperitivo', 'ceviche', 'causa'])) {
        return generarRespuestaCategoria('entradas', '🥗 Nuestras Entradas:');
    }

    // Platos principales
    if (contienePalabras(mensajeLower, ['plato principal', 'platos principales', 'plato fuerte', 'comida principal', 'almuerzo'])) {
        return generarRespuestaCategoria('platos_principales', '🍽️ Nuestros Platos Principales:');
    }

    // Postres
    if (contienePalabras(mensajeLower, ['postre', 'postres', 'dulce', 'king kong', 'mazamorra'])) {
        return generarRespuestaCategoria('postres', '🍰 Nuestros Postres:');
    }

    // Bebidas
    if (contienePalabras(mensajeLower, ['bebida', 'bebidas', 'tomar', 'beber', 'chicha', 'inca kola', 'pisco'])) {
        return generarRespuestaCategoria('bebidas', '🥤 Nuestras Bebidas:');
    }

    // Precios
    if (contienePalabras(mensajeLower, ['precio', 'precios', 'costo', 'cuanto cuesta', 'cuanto vale', 'cuanto sale'])) {
        return 'Nuestros precios son:<br>• Entradas: S/ 15 - S/ 25<br>• Platos principales: S/ 28 - S/ 38<br>• Postres: S/ 7 - S/ 12<br>• Bebidas: S/ 4 - S/ 18<br><br>¿Te gustaría conocer algún platillo específico?';
    }

    // Horarios
    if (contienePalabras(mensajeLower, ['horario', 'horarios', 'hora', 'abierto', 'abren', 'cierran', 'que hora', 'atencion'])) {
        return generarRespuestaHorarios();
    }

    // Ubicación
    if (contienePalabras(mensajeLower, ['ubicacion', 'direccion', 'donde estan', 'donde se encuentra', 'como llego', 'ubicado', 'donde quedan'])) {
        return generarRespuestaUbicacion();
    }

    // Contacto
    if (contienePalabras(mensajeLower, ['telefono', 'contacto', 'llamar', 'numero', 'email', 'correo', 'celular'])) {
        return generarRespuestaContacto();
    }

    // Servicios
    if (contienePalabras(mensajeLower, ['servicio', 'servicios', 'ofrece', 'ofrecen', 'disponible'])) {
        return generarRespuestaServicios();
    }

    // Reservaciones
    if (contienePalabras(mensajeLower, ['reservacion', 'reservar', 'reserva', 'apartar'])) {
        return '📞 Para hacer una reservación, puedes llamarnos al ' + baseDatos.informacion_general.telefono + ' o enviarnos un correo a ' + baseDatos.informacion_general.email + '. ¡Estaremos encantados de atenderte!';
    }

    // Domicilio/Delivery
    if (contienePalabras(mensajeLower, ['domicilio', 'delivery', 'entrega', 'llevar', 'para llevar', 'pedido'])) {
        return '🛵 ¡Claro! Tenemos delivery a domicilio en Chiclayo y servicio para llevar. Llámanos al ' + baseDatos.informacion_general.telefono + ' para hacer tu pedido. ¡Te lo llevamos caliente!';
    }

    // Métodos de pago (incluyendo Yape y Plin)
    if (contienePalabras(mensajeLower, ['pago', 'pagar', 'aceptan', 'tarjeta', 'efectivo', 'como pago', 'yape', 'plin'])) {
        return generarRespuestaPago();
    }

    // Estacionamiento
    if (contienePalabras(mensajeLower, ['estacionamiento', 'parking', 'donde estacionar', 'parqueo', 'cochera'])) {
        return '🚗 Contamos con estacionamiento disponible para nuestros clientes. ¡Ven tranquilo!';
    }

    // WiFi
    if (contienePalabras(mensajeLower, ['wifi', 'internet', 'contraseña wifi', 'red', 'clave'])) {
        return '📶 Ofrecemos WiFi gratis para todos nuestros clientes. Pregunta por la contraseña al mesero.';
    }

    // Respuesta por defecto
    return 'Disculpa, no estoy seguro de entender tu pregunta. 🤔<br><br>Puedo ayudarte con:<br>• Menú y platos típicos<br>• Precios<br>• Horarios<br>• Ubicación y contacto<br>• Delivery y reservas<br>• Métodos de pago<br><br>¿Sobre qué te gustaría saber?';
}

// Función auxiliar para verificar palabras clave
function contienePalabras(texto, palabras) {
    return palabras.some(palabra => texto.includes(palabra));
}

// Generar respuesta del menú completo
function generarRespuestaMenu() {
    let respuesta = '📋 <strong>Nuestro Menú Peruano:</strong><br><br>';

    respuesta += '<strong>🥗 ENTRADAS:</strong><br>';
    baseDatos.menu.entradas.forEach(item => {
        respuesta += `• ${item.nombre} - S/ ${item.precio}<br>`;
    });

    respuesta += '<br><strong>🍽️ PLATOS PRINCIPALES:</strong><br>';
    baseDatos.menu.platos_principales.forEach(item => {
        respuesta += `• ${item.nombre} - S/ ${item.precio}<br>`;
    });

    respuesta += '<br><strong>🍰 POSTRES:</strong><br>';
    baseDatos.menu.postres.forEach(item => {
        respuesta += `• ${item.nombre} - S/ ${item.precio}<br>`;
    });

    respuesta += '<br><strong>🥤 BEBIDAS:</strong><br>';
    baseDatos.menu.bebidas.forEach(item => {
        respuesta += `• ${item.nombre} - S/ ${item.precio}<br>`;
    });

    return respuesta;
}

// Generar respuesta por categoría
function generarRespuestaCategoria(categoria, titulo) {
    let respuesta = `${titulo}<br><br>`;
    baseDatos.menu[categoria].forEach(item => {
        respuesta += `<strong>${item.nombre}</strong> - S/ ${item.precio}<br>${item.descripcion}<br><br>`;
    });
    return respuesta;
}

// Generar respuesta de horarios
function generarRespuestaHorarios() {
    return `🕐 <strong>Nuestros Horarios de Atención:</strong><br><br>
            📅 Lunes a Viernes: ${baseDatos.horarios.lunes_viernes}<br>
            📅 Sábados: ${baseDatos.horarios.sabados}<br>
            📅 Domingos: ${baseDatos.horarios.domingos}<br><br>
            ¡Te esperamos en Chiclayo!`;
}

// Generar respuesta de ubicación
function generarRespuestaUbicacion() {
    return `📍 <strong>Nuestra Ubicación en Chiclayo:</strong><br><br>
            ${baseDatos.ubicacion.direccion}<br>
            ${baseDatos.ubicacion.ciudad}<br>
            ${baseDatos.ubicacion.pais}<br>
            C.P. ${baseDatos.ubicacion.codigo_postal}<br><br>
            ¡Estamos en el centro de Chiclayo! 🇵🇪`;
}

// Generar respuesta de contacto
function generarRespuestaContacto() {
    return `📞 <strong>Información de Contacto:</strong><br><br>
            Teléfono: ${baseDatos.informacion_general.telefono}<br>
            Email: ${baseDatos.informacion_general.email}<br><br>
            ¡Contáctanos cuando quieras!`;
}

// Generar respuesta de servicios
function generarRespuestaServicios() {
    let respuesta = '⚙️ <strong>Nuestros Servicios:</strong><br><br>';
    baseDatos.servicios.forEach(servicio => {
        respuesta += `✓ ${servicio}<br>`;
    });
    return respuesta;
}

// Generar respuesta de métodos de pago
function generarRespuestaPago() {
    let respuesta = '💳 <strong>Métodos de Pago Aceptados:</strong><br><br>';
    baseDatos.metodos_pago.forEach(metodo => {
        respuesta += `✓ ${metodo}<br>`;
    });
    respuesta += '<br>¡Aceptamos Yape y Plin! 📱';
    return respuesta;
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando chatbot...');

    // Verificar y configurar reconocimiento de voz
    if (verificarCompatibilidadVoz()) {
        inicializarReconocimientoVoz();
        console.log('✓ Sistema de voz listo');
    } else {
        console.log('⚠️ Sistema de voz no disponible');
    }

    // Cargar voces disponibles para síntesis
    if (sintesisVoz) {
        sintesisVoz.onvoiceschanged = function() {
            const voces = sintesisVoz.getVoices();
            console.log('Voces disponibles:', voces.length);
        };
    }

    console.log('✓ Chatbot inicializado correctamente');
});