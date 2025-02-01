# Crea una api con express

Imagina que trabajas para una pequeña empresa de desarrollo de software que está creando una aplicación de gestión de tareas para equipos. Necesitas diseñar la API que permitirá a los usuarios crear, leer, actualizar y eliminar tareas. Sin embargo, por ahora, la empresa no cuenta con una base de datos, por lo que deberás almacenar la información en memoria (usando un objeto o arreglo en JavaScript).

Requisitos del examen
Creación del proyecto:

- Crea un nuevo proyecto de Node.js.
- Instala las dependencias necesarias: express.
- Crea el archivo principal de la aplicación (index.js o similar).

## Definición de rutas:

Crea las siguientes rutas para la API:
- `POST /tasks`: Crea una nueva tarea.
- `GET /tasks`: Obtiene la lista de todas las tareas.
- `GET /tasks/:id`: Obtiene una tarea específica por su ID.
- `PUT /tasks/:id`: Actualiza una tarea existente.
- `DELETE /tasks/:id`: Elimina una tarea existente.


## Estructura de datos:

Define la estructura de datos para las tareas. Cada tarea debe tener al menos los siguientes campos:
- id: Un identificador único para la tarea (puedes usar un contador).
- title: El título de la tarea (texto).
- description: Una descripción detallada de la tarea (texto).
- completed: Un valor booleano que indica si la tarea está completada o no.


```js
const tasks = [
  {
    id: 1,
    title: "Diseñar la interfaz de usuario",
    description: "Crear los mockups y el diseño visual de la aplicación",
    completed: false,
  },
  {
    id: 2,
    title: "Implementar la lógica de negocio",
    description: "Desarrollar las funciones principales de la aplicación",
    completed: true,
  },
];
```
## Implementación de la lógica:

Implementa la lógica necesaria en cada ruta para crear, leer, actualizar y eliminar tareas.
- Almacena las tareas en un objeto o arreglo en memoria.
- Asegúrate de manejar los posibles errores (por ejemplo, si se intenta obtener una tarea que no existe).

## Criterios de evaluación

- Funcionalidad: La API debe cumplir con todos los requisitos y realizar las operaciones CRUD correctamente.

- Código limpio: El código debe estar bien estructurado, legible y fácil de entender.

- Manejo de errores: La API debe manejar los posibles errores de manera adecuada.

- Documentación: Se valorará la inclusión de comentarios en el código y la creación de un breve documento explicando el funcionamiento de la API.

- Recuerda usar buenas prácticas de programación, como la separación de responsabilidades y el uso de nombres descriptivos para las variables y funciones.