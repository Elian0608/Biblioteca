// Referencias a los elementos del DOM
const categoryList = document.getElementById('categoryList');
const processDetail = document.getElementById('processDetail');
const processTitle = document.getElementById('processTitle');
const processDescription = document.getElementById('processDescription');
const processSteps = document.getElementById('processSteps');
const searchInput = document.getElementById('searchInput');

// Variable para controlar la vista actual
let currentView = 'categories'; // 'categories' o 'processDetail'

// Historial de navegación
let navigationHistory = []; // Usamos una pila para almacenar el historial de navegación

// Estructura de categorías y procesos
const categories = [
    {
        title: "SADMIN",
        description: "Todo lo relacionado con temas de facturación y pagos de las cuotas del crédito.",
        processes: []
    },
    {
        title: "REDEBAN",
        description: "Todo lo relacionado con la tarjeta de crédito.",
        processes: [
            {
                title: "Consulta de Cupo",
                description: "Aquí te mostramos cómo consultar el cupo disponible en la tarjeta de crédito.",
                steps: [
                    "1. Inicia sesión en la plataforma de REDEBAN.",
                    "2. Ve a la sección 'Consulta de cupo' e introduce el número de la tarjeta a consultar.",
                    "3. Selecciona tu tarjeta de crédito.",
                    "4. El cupo disponible aparecerá en la parte superior derecha."
                ]
            },
            {
                title: "Consulta de Movimientos",
                description: "Consulta los movimientos realizados en la tarjeta de crédito.",
                steps: [
                    "1. Inicia sesión en la plataforma de REDEBAN.",
                    "2. Dirígete a la sección 'Movimientos'.",
                    "3. Introduce el número de la tarjeta a buscar."
                ]
            },
            {
                title: "Consulta del Estado de la Tarjeta",
                description: "Verifica el estado de la tarjeta (normal, bloqueada preventivamente, retirada o pendiente de activación).",
                steps: [
                    "1. Inicia sesión en la plataforma de clientes.",
                    "2. Accede a la sección 'Estado de mi tarjeta'.",
                    "3. Consulta el estado de tu tarjeta."
                ]
            }
        ]
    },
    {
        title: "ONCREDIT",
        description: "Proceso relacionado con el CrediAgíl.",
        processes: []  // Esta categoría no tiene procesos definidos
    },
    {
        title: "GUIONES DE SALUDO",
        description: "Proceso relacionado con los guiones de bienvenida y despedida.",
        processes: [
            {
                title: "Atención telefónica",
                description: "Proceso de atención al cliente telefónicamente.",
                steps: [
                    "1. Inicia sesión en la plataforma de REDEBAN.",
                    "2. Ve a la sección 'Consulta de cupo' e introduce el número de la tarjeta a consultar.",
                    "3. Selecciona tu tarjeta de crédito.",
                    "4. El cupo disponible aparecerá en la parte superior derecha."
                ]
            },
            {
                title: "Atención vía chat",
                description: "Atención a través de chat.",
                steps: [
                    "1. Inicia sesión en la plataforma de REDEBAN.",
                    "2. Dirígete a la sección de chat.",
                    "3. Selecciona la opción para iniciar una conversación."
                ]
            },
            {
                title: "Atención presencial",
                description: "Proceso de atención en un centro de servicio.",
                steps: [
                    "1. Dirígete a la sede más cercana.",
                    "2. Solicita la atención de un ejecutivo."
                ]
            }
        ]
    }
];

// Mostrar las categorías disponibles
function displayCategories(categoriesToDisplay) {
    categoryList.innerHTML = ''; // Limpiar la lista de categorías
    if (categoriesToDisplay.length === 0) {
        categoryList.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
    } else {
        categoriesToDisplay.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category-card');
            categoryCard.innerHTML = `
                <h3>${category.title}</h3>
                <p>${category.description}</p>
                <button onclick="displayProcesses('${category.title}')">Ver Procesos</button>
            `;
            categoryList.appendChild(categoryCard);
        });
    }
}

// Mostrar los procesos de una categoría
function displayProcesses(categoryTitle) {
    const category = categories.find(c => c.title === categoryTitle);
    if (category) {
        // Guardamos la categoría en el historial antes de cambiar de vista
        navigationHistory.push({ view: 'categories', category: categoryTitle });
        
        categoryList.style.display = 'none'; // Ocultar las categorías
        processDetail.style.display = 'block'; // Mostrar los detalles del proceso

        processTitle.innerHTML = category.title;
        processDescription.innerHTML = category.description;
        processSteps.innerHTML = ''; // Limpiar los pasos anteriores

        if (category.processes.length === 0) {
            processSteps.innerHTML = "<p>No hay procesos disponibles para esta categoría.</p>";
        } else {
            category.processes.forEach((process, index) => {
                const processItem = document.createElement('div');
                processItem.classList.add('process-item');
                processItem.innerHTML = `
                    <h4>${process.title}</h4>
                    <p>${process.description}</p>
                    <button onclick="showProcessDetail(${index})">Ver Detalles</button>
                `;
                processSteps.appendChild(processItem);
            });
        }

        currentView = 'processDetail'; // Cambiar el estado a 'processDetail'
    }
}

// Mostrar los detalles de un proceso
function showProcessDetail(processIndex) {
    const category = categories.find(c => c.processes[processIndex]);
    const process = category.processes[processIndex];

    // Guardamos el proceso en el historial antes de cambiar de vista
    navigationHistory.push({ view: 'processDetail', category: category.title, processIndex });

    processTitle.innerHTML = process.title;
    processDescription.innerHTML = process.description;
    processSteps.innerHTML = ''; // Limpiar los pasos anteriores

    process.steps.forEach(step => {
        const stepItem = document.createElement('li');
        stepItem.textContent = step;
        processSteps.appendChild(stepItem);
    });

    currentView = 'processDetail'; // Asegurarnos de estar en 'processDetail'
}

// Volver a la lista de categorías
function goBack() {
    const lastNav = navigationHistory.pop(); // Obtener la última sección del historial

    if (lastNav) {
        if (lastNav.view === 'processDetail') {
            // Si veníamos de un proceso, mostrar los procesos de la categoría correspondiente
            displayProcesses(lastNav.category);
        } else if (lastNav.view === 'categories') {
            // Si veníamos de la vista de categorías, volver a mostrar las categorías
            categoryList.style.display = 'block'; // Mostrar categorías
            processDetail.style.display = 'none'; // Ocultar detalles
            currentView = 'categories'; // Volver a la vista de categorías
        }
    }
}

// Función de búsqueda
function search() {
    const query = searchInput.value.toLowerCase().trim();

    // Filtrar categorías y procesos que coincidan con la búsqueda
    const filteredCategories = categories.filter(category => {
        const categoryMatches = category.title.toLowerCase().includes(query) ||
            category.description.toLowerCase().includes(query);

        const filteredProcesses = category.processes.filter(process =>
            process.title.toLowerCase().includes(query) || 
            process.description.toLowerCase().includes(query)
        );

        if (categoryMatches || filteredProcesses.length > 0) {
            return true;
        }
        return false;
    });

    // Mostrar las categorías filtradas
    displayCategories(filteredCategories);
}

// Agregar event listener para buscar al escribir
searchInput.addEventListener('input', search);

// Mostrar las categorías al cargar la página
displayCategories(categories);
