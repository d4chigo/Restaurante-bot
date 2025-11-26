// Base de datos del restaurante
const baseDatos = {
  "informacion_general": {
    "nombre": "Restaurante Sabor Norteño",
    "descripcion": "Restaurante de comida tradicional peruana y norteña con los mejores sabores de Chiclayo",
    "telefono": "+51 957 246 125",
    "email": "contacto@sabornorteno.pe",
    "redes_sociales": {
      "facebook": "facebook.com/sabornorteno",
      "instagram": "@sabornorteno",
      "whatsapp": "+51 957 246 125"
    },
    "version": "1.1",
    "ultima_actualizacion": "Noviembre 2025"
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
      {
        "nombre": "Causa limeña",
        "precio": 18,
        "descripcion": "Puré de papa amarilla con pollo y mayonesa"
      },
      {
        "nombre": "Ceviche de pescado",
        "precio": 25,
        "descripcion": "Pescado fresco en leche de tigre con camote y choclo"
      },
      {
        "nombre": "Chicharrón de calamar",
        "precio": 22,
        "descripcion": "Calamares fritos crujientes con salsa criolla"
      },
      {
        "nombre": "Papa a la huancaína",
        "precio": 15,
        "descripcion": "Papas bañadas en salsa de ají amarillo"
      }
    ],
    "platos_principales": [
      {
        "nombre": "Arroz con pato",
        "precio": 32,
        "descripcion": "Plato típico chiclayano con pato tierno y arroz cilantrado"
      },
      {
        "nombre": "Cabrito a la norteña",
        "precio": 38,
        "descripcion": "Cabrito guisado con frejoles y yucas"
      },
      {
        "nombre": "Seco de cabrito",
        "precio": 35,
        "descripcion": "Cabrito en salsa de culantro con frejoles y arroz"
      },
      {
        "nombre": "Chinguirito",
        "precio": 28,
        "descripcion": "Plato típico con guitarra seca, yucas y zarza criolla"
      },
      {
        "nombre": "Espesado de pollo",
        "precio": 30,
        "descripcion": "Guiso espeso con pollo, zapallo y arroz"
      },
      {
        "nombre": "Lomo saltado",
        "precio": 32,
        "descripcion": "Carne salteada con cebolla, tomate y papas fritas"
      },
      {
        "nombre": "Aji de gallina",
        "precio": 28,
        "descripcion": "Gallina deshilachada en crema de ají amarillo"
      }
    ],
    "postres": [
      {
        "nombre": "King Kong de manjar blanco",
        "precio": 12,
        "descripcion": "Dulce típico lambayecano con galletas y manjar"
      },
      {
        "nombre": "Arroz con leche",
        "precio": 8,
        "descripcion": "Arroz cremoso con leche y canela"
      },
      {
        "nombre": "Mazamorra morada",
        "precio": 7,
        "descripcion": "Postre de maíz morado con frutas"
      },
      {
        "nombre": "Suspiro limeño",
        "precio": 10,
        "descripcion": "Dulce de leche con merengue"
      }
    ],
    "bebidas": [
      {
        "nombre": "Chicha morada",
        "precio": 5,
        "descripcion": "Bebida de maíz morado con piña y canela"
      },
      {
        "nombre": "Inca Kola",
        "precio": 4,
        "descripcion": "Gaseosa peruana"
      },
      {
        "nombre": "Pisco Sour",
        "precio": 18,
        "descripcion": "Cóctel de pisco con limón"
      },
      {
        "nombre": "Chicha de jora",
        "precio": 6,
        "descripcion": "Bebida fermentada de maíz"
      },
      {
        "nombre": "Jugo de maracuyá",
        "precio": 6,
        "descripcion": "Jugo natural de maracuyá"
      },
      {
        "nombre": "Emoliente",
        "precio": 4,
        "descripcion": "Bebida caliente de hierbas"
      }
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
  ],
  "promociones": [
    {
      "titulo": "Combo Norteño",
      "descripcion": "Arroz con pato + Bebida + Postre",
      "precio_original": 50,
      "precio_descuento": 42,
      "descuento": "16%"
    },
    {
      "titulo": "Tabla Degustación",
      "descripcion": "Prueba 3 platos típicos en porciones pequeñas",
      "precio_original": 45,
      "precio_descuento": 38,
      "descuento": "15%"
    },
    {
      "titulo": "Menú del Día",
      "descripcion": "Entrada + Plato Principal + Bebida",
      "precio_original": 35,
      "precio_descuento": 28,
      "descuento": "20%"
    }
  ],
  "preguntas_frecuentes": [
    {
      "pregunta": "¿Hacen entregas a domicilio?",
      "respuesta": "Sí, realizamos entregas a domicilio en toda Chiclayo. El costo de envío es de S/ 5 para pedidos menores a S/ 50 y gratis para pedidos mayores."
    },
    {
      "pregunta": "¿Cuál es el tiempo de entrega?",
      "respuesta": "El tiempo promedio de entrega es de 30-45 minutos dependiendo de la zona. En horarios pico puede tomar hasta 60 minutos."
    },
    {
      "pregunta": "¿Puedo hacer reservaciones?",
      "respuesta": "Claro, aceptamos reservaciones llamando al +51 957 246 125 o por WhatsApp. Se recomienda reservar con 24 horas de anticipación para grupos mayores a 6 personas."
    },
    {
      "pregunta": "¿Tienen opciones vegetarianas?",
      "respuesta": "Sí, ofrecemos Papa a la Huancaína, Causa Limeña (sin pollo) y otros platos que pueden adaptarse. Consulta con nuestro personal."
    },
    {
      "pregunta": "¿Aceptan eventos privados?",
      "respuesta": "Sí, organizamos eventos, cumpleaños y celebraciones. Contáctanos para conocer nuestros paquetes especiales y disponibilidad."
    },
    {
      "pregunta": "¿Cuál es el plato más popular?",
      "respuesta": "El Arroz con Pato es nuestro plato estrella y el favorito de nuestros clientes. Es un auténtico plato chiclayano que no puedes dejar de probar."
    }
  ],
  "informacion_nutricional": {
    "Arroz con pato": {
      "calorias": 650,
      "proteina": "35g",
      "carbohidratos": "65g",
      "grasas": "18g",
      "alergenos": "Gluten, Mariscos"
    },
    "Ceviche de pescado": {
      "calorias": 280,
      "proteina": "42g",
      "carbohidratos": "15g",
      "grasas": "5g",
      "alergenos": "Pescado, Mariscos"
    },
    "Lomo saltado": {
      "calorias": 520,
      "proteina": "38g",
      "carbohidratos": "45g",
      "grasas": "15g",
      "alergenos": "Gluten"
    },
    "Papa a la Huancaína": {
      "calorias": 320,
      "proteina": "12g",
      "carbohidratos": "38g",
      "grasas": "12g",
      "alergenos": "Frutos secos, Gluten"
    }
  },
  "resenas": [
    {
      "cliente": "María García",
      "calificacion": 5,
      "comentario": "¡Excelente comida! El arroz con pato es delicioso y el servicio muy atento. Volveré pronto.",
      "fecha": "Hace 2 días"
    },
    {
      "cliente": "Carlos López",
      "calificacion": 5,
      "comentario": "Auténtica comida norteña. El ambiente es acogedor y los precios son justos.",
      "fecha": "Hace 1 semana"
    },
    {
      "cliente": "Ana Martínez",
      "calificacion": 4,
      "comentario": "Muy buena comida, aunque el tiempo de espera fue un poco largo. Recomendado.",
      "fecha": "Hace 2 semanas"
    }
  ],
  "recomendaciones_por_ocasion": {
    "primera_vez": [
      "Arroz con pato - Nuestro plato estrella",
      "Ceviche de pescado - Clásico peruano",
      "King Kong - Postre típico lambayecano"
    ],
    "almuerzo_rapido": [
      "Menú del Día - Entrada + Plato + Bebida",
      "Lomo saltado - Rápido y delicioso",
      "Ají de gallina - Tradicional"
    ],
    "cena_especial": [
      "Cabrito a la norteña - Plato premium",
      "Seco de cabrito - Auténtico norteño",
      "Suspiro limeño - Postre elegante"
    ],
    "grupo_amigos": [
      "Tabla Degustación - Prueba varios platos",
      "Combo Norteño - Relación precio-calidad",
      "Pisco Sour - Bebida tradicional"
    ]
  },
  "tips_gastronomicos": [
    "El Arroz con Pato se prepara mejor con pato joven y arroz cilantrado fresco.",
    "El Ceviche debe consumirse fresco, idealmente dentro de 30 minutos de preparado.",
    "El Cabrito a la norteña es un plato que requiere cocción lenta para obtener la ternura perfecta.",
    "La Chicha Morada es la bebida tradicional que acompaña perfectamente los platos norteños.",
    "El King Kong es un postre que combina capas de galleta, manjar blanco y piña.",
    "El Pisco Sour es un cóctel que representa la gastronomía peruana en el mundo."
  ]
};
