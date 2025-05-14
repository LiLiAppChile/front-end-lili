export const formatHour = (timestamp) => {
    if (!timestamp) return 'No disponible';
    try {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return 'No disponible';
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    } catch {
        return 'No disponible';
    }
};


export const getImageForCategory = (category) => {
    const images = {
        Gasfitería: '/tipos/Gasfiteria.png',
        Electricidad: '/tipos/Electricidad.png',
        Albañilería: '/tipos/Albanileria.png',
        Artefactos: '/tipos/Artefactos.png',
        Carpintería: '/tipos/Carpinteria.png',
        Cerrajería: '/tipos/Cerrajeria.png',
        Climatización: '/tipos/Climatizacion.png',
        'Control de Plagas': '/tipos/ControlPlagas.png',
        Jardinería: '/tipos/Jardineria.png',
        Limpieza: '/tipos/Limpieza.png',
        Pintura: '/tipos/Pintura.png',
        Seguridad: '/tipos/Seguridad.png',
        Otros: '/tipos/Otros.png',
    };
    return images[category] || null;
};

export const getCategoryDescription = (category) => {
    const descriptions = {
        Gasfitería:
            'Servicios de instalación, reparación y mantenimiento de sistemas de agua, gas y desagüe en hogares y edificios.',
        Electricidad:
            'Trabajos de instalación, reparación y mejoras en sistemas eléctricos, iluminación y redes eléctricas domiciliarias.',
        Albañilería:
            'Servicios de construcción, reparación y remodelación de estructuras de concreto, ladrillos y otros materiales.',
        Artefactos:
            'Instalación, mantenimiento y reparación de electrodomésticos y aparatos eléctricos o a gas.',
        Carpintería:
            'Fabricación, instalación y reparación de estructuras y muebles de madera.',
        Cerrajería:
            'Instalación y reparación de cerraduras, llaves y sistemas de seguridad para puertas y accesos.',
        Climatización:
            'Instalación y mantenimiento de sistemas de aire acondicionado, calefacción y ventilación.',
        'Control de Plagas':
            'Eliminación y prevención de insectos, roedores y otras plagas en hogares y edificios.',
        Jardinería:
            'Diseño, mantenimiento y cuidado de jardines, áreas verdes y plantas.',
        Limpieza:
            'Servicios de limpieza profunda, sanitización y organización para hogares y espacios comerciales.',
        Pintura:
            'Trabajos de pintura interior y exterior, preparación de superficies y acabados decorativos.',
        Seguridad:
            'Instalación y mantenimiento de sistemas de seguridad, alarmas y cámaras de vigilancia.',
        Otros:
            'Otros servicios especializados para el hogar y edificios comerciales.',
    };
    return descriptions[category] || 'Servicios generales para el hogar y edificios.';
};
