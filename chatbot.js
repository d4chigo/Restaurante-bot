// Base de datos del restaurante - Se carga desde datos.js
// (baseDatos se define en datos.js)

// Variables globales
let reconocimientoVoz = null;
let escuchando = false;
let sintesisVoz = window.speechSynthesis;
let vozDisponible = false;

// Variables para historial y estadísticas
let historialMensajes = [];
let estadisticasUso = {
    totalMensajes: 0,
    preguntasMenu: 0,
    preguntasHorarios: 0,
    preguntasUbicacion: 0,
    preguntasContacto: 0,
    preguntasDelivery: 0,
    preguntasReservas: 0,
    preguntasPromociones: 0,
    preguntasValoraciones: 0,
    platosMasConsultados: {}
};

// Cargar datos del localStorage
function cargarDatos() {
    const datosGuardados = localStorage.getItem('chatbotDatos');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        historialMensajes = datos.historial || [];
        estadisticasUso = datos.estadisticas || estadisticasUso;
    }
}

// Guardar datos en localStorage
function guardarDatos() {
    const datos = {
        historial: historialMensajes,
        estadisticas: estadisticasUso
    };
    localStorage.setItem('chatbotDatos', JSON.stringify(datos));
}

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
        
        // Registrar respuesta del bot
        historialMensajes.push({
            tipo: 'bot',
            mensaje: respuesta,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // Guardar datos
        guardarDatos();
        
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
    
    // Registrar en historial
    historialMensajes.push({
        tipo: 'usuario',
        mensaje: mensaje,
        timestamp: new Date().toLocaleTimeString()
    });
    estadisticasUso.totalMensajes++;

    // Saludos
    if (contienePalabras(mensajeLower, ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'saludos', 'hey', 'alo', 'buenos', 'buenas'])) {
        return '¡Hola! 😊 Bienvenido al Restaurante Sabor Norteño, lo mejor de la comida peruana en Chiclayo. ¿En qué puedo ayudarte?';
    }

    // Despedidas
    if (contienePalabras(mensajeLower, ['adios', 'chao', 'hasta luego', 'nos vemos', 'bye', 'ciao', 'hasta', 'adiós'])) {
        return '¡Hasta pronto! 👋 Esperamos verte pronto en Sabor Norteño. ¡Buen provecho!';
    }

    // Agradecimientos
    if (contienePalabras(mensajeLower, ['gracias', 'muchas gracias', 'te agradezco', 'excelente', 'chevere', 'graciasss'])) {
        return '¡De nada! 😊 Estoy aquí para ayudarte. ¿Necesitas algo más?';
    }

    // Preguntas frecuentes
    if (contienePalabras(mensajeLower, ['pregunta frecuente', 'preguntas frecuentes', 'faq', 'dudas comunes'])) {
        estadisticasUso.preguntasValoraciones++;
        return generarRespuestaFAQ();
    }

    // Promociones y ofertas
    if (contienePalabras(mensajeLower, ['promocion', 'promociones', 'oferta', 'ofertas', 'descuento', 'combo', 'especial'])) {
        estadisticasUso.preguntasPromociones++;
        return generarRespuestaPromociones();
    }

    // Reseñas y valoraciones
    if (contienePalabras(mensajeLower, ['resena', 'reseña', 'opinion', 'opiniones', 'valoracion', 'calificacion', 'comentarios'])) {
        estadisticasUso.preguntasValoraciones++;
        return generarRespuestaResenas();
    }

    // Recomendaciones personalizadas
    if (contienePalabras(mensajeLower, ['recomendacion', 'recomendaciones', 'que me recomiendas', 'que debo pedir', 'que es bueno', 'que me sugiere'])) {
        return generarRecomendaciones(mensaje);
    }

    // Información nutricional
    if (contienePalabras(mensajeLower, ['calorias', 'nutricion', 'nutricional', 'proteina', 'carbohidratos', 'alergeno', 'dieta', 'saludable'])) {
        return generarRespuestaNutricional(mensaje);
    }

    // Tips gastronómicos
    if (contienePalabras(mensajeLower, ['tip', 'tips', 'consejo', 'consejos', 'como preparar', 'receta', 'gastronomico'])) {
        return generarRespuestaTips();
    }

    // Redes sociales
    if (contienePalabras(mensajeLower, ['facebook', 'instagram', 'whatsapp', 'redes', 'social', 'seguir', 'contactar'])) {
        return generarRespuestaRedesSociales();
    }

    // Menú completo
    if (contienePalabras(mensajeLower, ['menu', 'carta', 'platillos', 'comida', 'que tienen', 'que ofrecen', 'platos', 'todo el menu'])) {
        estadisticasUso.preguntasMenu++;
        return generarRespuestaMenu();
    }

    // Platos típicos peruanos/norteños
    if (contienePalabras(mensajeLower, ['tipico', 'tipicos', 'norteno', 'nortenos', 'peruano', 'peru', 'chiclayo', 'lambayeque', 'tradicional', 'autentico'])) {
        return '🇵🇪 <strong>Nuestros Platos Típicos Norteños:</strong><br><br>' +
               '<strong>Arroz con pato</strong> - S/ 32<br>Plato estrella chiclayano con pato tierno y arroz cilantrado<br><br>' +
               '<strong>Cabrito a la norteña</strong> - S/ 38<br>Cabrito guisado con frejoles y yucas<br><br>' +
               '<strong>Seco de cabrito</strong> - S/ 35<br>En salsa de culantro con frejoles<br><br>' +
               '<strong>Chinguirito</strong> - S/ 28<br>Con guitarra seca y zarza criolla<br><br>' +
               '<strong>King Kong</strong> - S/ 12<br>El dulce más famoso de Lambayeque<br><br>' +
               '¡Lo mejor de la cocina norteña!';
    }

    // Entradas/Ceviche
    if (contienePalabras(mensajeLower, ['entrada', 'entradas', 'aperitivo', 'ceviche', 'causa', 'papa a la huancaina'])) {
        return generarRespuestaCategoria('entradas', '🥗 Nuestras Entradas:');
    }

    // Platos principales
    if (contienePalabras(mensajeLower, ['plato principal', 'platos principales', 'plato fuerte', 'comida principal', 'almuerzo', 'fuerte'])) {
        estadisticasUso.preguntasMenu++;
        return generarRespuestaCategoria('platos_principales', '🍽️ Nuestros Platos Principales:');
    }

    // Postres
    if (contienePalabras(mensajeLower, ['postre', 'postres', 'dulce', 'king kong', 'mazamorra', 'suspiro', 'arroz con leche'])) {
        return generarRespuestaCategoria('postres', '🍰 Nuestros Postres:');
    }

    // Bebidas
    if (contienePalabras(mensajeLower, ['bebida', 'bebidas', 'tomar', 'beber', 'chicha', 'inca kola', 'pisco', 'jugo', 'emoliente'])) {
        return generarRespuestaCategoria('bebidas', '🥤 Nuestras Bebidas:');
    }

    // Precios
    if (contienePalabras(mensajeLower, ['precio', 'precios', 'costo', 'cuanto cuesta', 'cuanto vale', 'cuanto sale', 'valor'])) {
        return 'Nuestros precios son:<br>• Entradas: S/ 15 - S/ 25<br>• Platos principales: S/ 28 - S/ 38<br>• Postres: S/ 7 - S/ 12<br>• Bebidas: S/ 4 - S/ 18<br><br>¿Te gustaría conocer algún platillo específico?';
    }

    // Horarios
    if (contienePalabras(mensajeLower, ['horario', 'horarios', 'hora', 'abierto', 'abren', 'cierran', 'que hora', 'atencion', 'cuando'])) {
        estadisticasUso.preguntasHorarios++;
        return generarRespuestaHorarios();
    }

    // Ubicación
    if (contienePalabras(mensajeLower, ['ubicacion', 'direccion', 'donde estan', 'donde se encuentra', 'como llego', 'ubicado', 'donde quedan', 'mapa'])) {
        estadisticasUso.preguntasUbicacion++;
        return generarRespuestaUbicacion();
    }

    // Contacto
    if (contienePalabras(mensajeLower, ['telefono', 'contacto', 'llamar', 'numero', 'email', 'correo', 'celular', 'comunicarse'])) {
        estadisticasUso.preguntasContacto++;
        return generarRespuestaContacto();
    }

    // Servicios
    if (contienePalabras(mensajeLower, ['servicio', 'servicios', 'ofrece', 'ofrecen', 'disponible', 'que hacen'])) {
        return generarRespuestaServicios();
    }

    // Reservaciones
    if (contienePalabras(mensajeLower, ['reservacion', 'reservar', 'reserva', 'apartar', 'grupo', 'evento', 'cumpleaños'])) {
        estadisticasUso.preguntasReservas++;
        return generarRespuestaReservas();
    }

    // Domicilio/Delivery
    if (contienePalabras(mensajeLower, ['domicilio', 'delivery', 'entrega', 'llevar', 'para llevar', 'pedido', 'envio'])) {
        estadisticasUso.preguntasDelivery++;
        return generarRespuestaDelivery();
    }

    // Métodos de pago (incluyendo Yape y Plin)
    if (contienePalabras(mensajeLower, ['pago', 'pagar', 'aceptan', 'tarjeta', 'efectivo', 'como pago', 'yape', 'plin', 'transferencia'])) {
        return generarRespuestaPago();
    }

    // Estacionamiento
    if (contienePalabras(mensajeLower, ['estacionamiento', 'parking', 'donde estacionar', 'parqueo', 'cochera', 'auto', 'carro'])) {
        return '🚗 Contamos con estacionamiento disponible para nuestros clientes. ¡Ven tranquilo!';
    }

    // WiFi
    if (contienePalabras(mensajeLower, ['wifi', 'internet', 'contraseña wifi', 'red', 'clave', 'conexion'])) {
        return '📶 Ofrecemos WiFi gratis para todos nuestros clientes. Pregunta por la contraseña al mesero.';
    }

    // Búsqueda de platos específicos
    const platoBuscado = buscarPlatoEspecifico(mensaje);
    if (platoBuscado) {
        return platoBuscado;
    }

    // Respuesta por defecto
    return 'Disculpa, no estoy seguro de entender tu pregunta. 🤔<br><br>Puedo ayudarte con:<br>• Menú y platos típicos<br>• Precios y promociones<br>• Horarios y ubicación<br>• Contacto y reservas<br>• Delivery y métodos de pago<br>• Reseñas y recomendaciones<br>• Información nutricional<br><br>¿Sobre qué te gustaría saber?';
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

// Generar respuesta de promociones
function generarRespuestaPromociones() {
    let respuesta = '🎉 <strong>Nuestras Promociones Especiales:</strong><br><br>';
    baseDatos.promociones.forEach(promo => {
        respuesta += `<strong>${promo.titulo}</strong> - ${promo.descuento} OFF<br>`;
        respuesta += `${promo.descripcion}<br>`;
        respuesta += `Antes: S/ ${promo.precio_original} → Ahora: S/ ${promo.precio_descuento}<br><br>`;
    });
    respuesta += '¡Aprovecha nuestras ofertas! 💰';
    return respuesta;
}

// Generar respuesta de reseñas
function generarRespuestaResenas() {
    let respuesta = '⭐ <strong>Lo que dicen nuestros clientes:</strong><br><br>';
    baseDatos.resenas.forEach(resena => {
        respuesta += `<strong>${resena.cliente}</strong> - ${'⭐'.repeat(resena.calificacion)}<br>`;
        respuesta += `"${resena.comentario}"<br>`;
        respuesta += `<em>${resena.fecha}</em><br><br>`;
    });
    return respuesta;
}

// Generar respuesta de preguntas frecuentes
function generarRespuestaFAQ() {
    let respuesta = '❓ <strong>Preguntas Frecuentes:</strong><br><br>';
    baseDatos.preguntas_frecuentes.forEach((faq, index) => {
        respuesta += `<strong>${index + 1}. ${faq.pregunta}</strong><br>`;
        respuesta += `${faq.respuesta}<br><br>`;
    });
    return respuesta;
}

// Generar recomendaciones personalizadas
function generarRecomendaciones(mensaje) {
    const mensajeLower = mensaje.toLowerCase();
    
    if (contienePalabras(mensajeLower, ['primera vez', 'primera', 'nuevo', 'primeriza'])) {
        let respuesta = '🌟 <strong>Recomendaciones para tu Primera Visita:</strong><br><br>';
        baseDatos.recomendaciones_por_ocasion.primera_vez.forEach(plato => {
            respuesta += `✓ ${plato}<br>`;
        });
        return respuesta;
    }
    
    if (contienePalabras(mensajeLower, ['rapido', 'rápido', 'almuerzo', 'prisa', 'rapida'])) {
        let respuesta = '⚡ <strong>Recomendaciones para Almuerzo Rápido:</strong><br><br>';
        baseDatos.recomendaciones_por_ocasion.almuerzo_rapido.forEach(plato => {
            respuesta += `✓ ${plato}<br>`;
        });
        return respuesta;
    }
    
    if (contienePalabras(mensajeLower, ['cena', 'especial', 'noche', 'romantica', 'pareja'])) {
        let respuesta = '🌙 <strong>Recomendaciones para Cena Especial:</strong><br><br>';
        baseDatos.recomendaciones_por_ocasion.cena_especial.forEach(plato => {
            respuesta += `✓ ${plato}<br>`;
        });
        return respuesta;
    }
    
    if (contienePalabras(mensajeLower, ['grupo', 'amigos', 'familia', 'compartir'])) {
        let respuesta = '👥 <strong>Recomendaciones para Grupo de Amigos:</strong><br><br>';
        baseDatos.recomendaciones_por_ocasion.grupo_amigos.forEach(plato => {
            respuesta += `✓ ${plato}<br>`;
        });
        return respuesta;
    }
    
    // Recomendación general
    let respuesta = '💡 <strong>Nuestras Recomendaciones:</strong><br><br>';
    respuesta += '✓ Arroz con pato - Nuestro plato estrella<br>';
    respuesta += '✓ Ceviche de pescado - Clásico peruano<br>';
    respuesta += '✓ Combo Norteño - Mejor relación precio-calidad<br>';
    respuesta += '✓ King Kong - Postre típico lambayecano<br><br>';
    respuesta += '¿Cuál te atrae más?';
    return respuesta;
}

// Generar respuesta nutricional
function generarRespuestaNutricional(mensaje) {
    const mensajeLower = mensaje.toLowerCase();
    
    for (const [plato, info] of Object.entries(baseDatos.informacion_nutricional)) {
        if (mensajeLower.includes(plato.toLowerCase())) {
            return `📊 <strong>Información Nutricional - ${plato}:</strong><br><br>` +
                   `🔥 Calorías: ${info.calorias}<br>` +
                   `💪 Proteína: ${info.proteina}<br>` +
                   `🌾 Carbohidratos: ${info.carbohidratos}<br>` +
                   `🧈 Grasas: ${info.grasas}<br>` +
                   `⚠️ Alergenos: ${info.alergenos}<br><br>` +
                   `¿Te gustaría conocer la información de otro plato?`;
        }
    }
    
    let respuesta = '📊 <strong>Información Nutricional Disponible:</strong><br><br>';
    for (const plato of Object.keys(baseDatos.informacion_nutricional)) {
        respuesta += `• ${plato}<br>`;
    }
    respuesta += '<br>Pregunta por el plato que te interesa.';
    return respuesta;
}

// Generar respuesta de tips gastronómicos
function generarRespuestaTips() {
    let respuesta = '👨‍🍳 <strong>Tips Gastronómicos:</strong><br><br>';
    baseDatos.tips_gastronomicos.forEach((tip, index) => {
        respuesta += `${index + 1}. ${tip}<br><br>`;
    });
    return respuesta;
}

// Generar respuesta de redes sociales
function generarRespuestaRedesSociales() {
    const redes = baseDatos.informacion_general.redes_sociales;
    return `📱 <strong>Síguenos en Redes Sociales:</strong><br><br>` +
           `📘 Facebook: ${redes.facebook}<br>` +
           `📷 Instagram: ${redes.instagram}<br>` +
           `💬 WhatsApp: ${redes.whatsapp}<br><br>` +
           `¡Mantente actualizado con nuestras promociones y novedades!`;
}

// Generar respuesta de delivery
function generarRespuestaDelivery() {
    return '🛵 <strong>Servicio de Delivery:</strong><br><br>' +
           '✓ Entregamos en toda Chiclayo<br>' +
           '✓ Tiempo de entrega: 30-45 minutos<br>' +
           '✓ Costo de envío: S/ 5 (menores a S/ 50) | Gratis (mayores a S/ 50)<br>' +
           '✓ Pedidos mínimos: S/ 30<br><br>' +
           '📞 Llámanos al ' + baseDatos.informacion_general.telefono + ' para hacer tu pedido<br>' +
           '💬 O contáctanos por WhatsApp<br><br>' +
           '¡Te lo llevamos caliente y fresco!';
}

// Generar respuesta de reservas
function generarRespuestaReservas() {
    return '📞 <strong>Reservaciones:</strong><br><br>' +
           '✓ Aceptamos reservaciones para grupos<br>' +
           '✓ Se recomienda reservar con 24 horas de anticipación<br>' +
           '✓ Grupos mayores a 6 personas: reserva obligatoria<br>' +
           '✓ Organizamos eventos, cumpleaños y celebraciones<br><br>' +
           '📞 Teléfono: ' + baseDatos.informacion_general.telefono + '<br>' +
           '📧 Email: ' + baseDatos.informacion_general.email + '<br>' +
           '💬 WhatsApp: ' + baseDatos.informacion_general.redes_sociales.whatsapp + '<br><br>' +
           '¡Estaremos encantados de atenderte!';
}

// Buscar platos específicos
function buscarPlatoEspecifico(mensaje) {
    const mensajeLower = mensaje.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    
    // Buscar en todas las categorías
    for (const [categoria, platos] of Object.entries(baseDatos.menu)) {
        if (Array.isArray(platos)) {
            for (const plato of platos) {
                const nombrePlato = plato.nombre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
                if (mensajeLower.includes(nombrePlato)) {
                    // Registrar en estadísticas
                    if (!estadisticasUso.platosMasConsultados[plato.nombre]) {
                        estadisticasUso.platosMasConsultados[plato.nombre] = 0;
                    }
                    estadisticasUso.platosMasConsultados[plato.nombre]++;
                    
                    return `🍽️ <strong>${plato.nombre}</strong> - S/ ${plato.precio}<br><br>` +
                           `${plato.descripcion}<br><br>` +
                           `¿Te gustaría saber más sobre este plato o hacer un pedido?`;
                }
            }
        }
    }
    
    return null;
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando chatbot...');

    // Cargar datos guardados
    cargarDatos();
    console.log('✓ Datos cargados');

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
    console.log('📊 Total de mensajes en historial:', historialMensajes.length);
});