import Express from "express";
import Cors from "cors";


const app = Express();
app.use(Cors());
app.use(Express.json());

// Tu código va desde aquí ⬇️
// ¡IMPORTANTE! Importa las funciones globales de Jest explícitamente

let tasks = [
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

// Variable para generar IDs únicos para nuevas tareas.
// Se inicializa con el ID más alto existente + 1 para evitar duplicados al inicio.
let nextId = Math.max(...tasks.map((task) => task.id)) + 1;

// Función auxiliar para generar un nuevo ID
const generateNewId = () => {
  return nextId++;
};

// --- Rutas de la API (Operaciones CRUD para Tareas) ---

// 1. POST: Crear una nueva tarea  Ruta: /tasks
app.post("/tasks", (req, res) => {
  console.log("POST /tasks - Solicitud para crear una nueva tarea");
  // El cuerpo de la petición (req.body) contiene los datos de la nueva tarea
  const newTaskData = req.body;

  // Validación: Asegúrate de que el 'title' esté presente
  if (!newTaskData.title) {
    console.log("Error: El título de la tarea es requerido.");
    return res
      .status(400)
      .json({ message: "El título de la tarea es requerido." });
  }

  // Crea la nueva tarea, asignándole un ID único
  const newTask = {
    id: generateNewId(), // Genera un nuevo ID
    title: newTaskData.title,
    description: newTaskData.description || "", // Descripción opcional, por defecto string vacío
    completed:
      typeof newTaskData.completed === "boolean"
        ? newTaskData.completed
        : false, // completed por defecto false
  };

  // Añade la nueva tarea al arreglo en memoria
  tasks.push(newTask);
  console.log("Nueva tarea creada:", newTask);

  // Devuelve la tarea creada con un estado 201 (Created)
  res.status(201).json(newTask);
});

// 2. GET: Obtener todas las tareas
// Ruta: /tasks
app.get("/tasks", (req, res) => {
  console.log("GET /tasks - Solicitud para obtener todas las tareas");
  res.status(200).json(tasks); // Devuelve el arreglo completo de tareas
});

// 3. GET: Obtener una tarea por ID
app.get("/tasks/:id", (req, res) => {
  // El ID se obtiene de los parámetros de la URL y se convierte a número
  const id = parseInt(req.params.id);
  console.log(`GET /tasks/${id} - Solicitud para obtener tarea por ID`);

  // Busca la tarea en el arreglo por su ID
  const task = tasks.find((t) => t.id === id);

  // Si la tarea no se encuentra, devuelve un error 404 (Not Found)
  if (!task) {
    console.log(`Tarea con ID ${id} no encontrada.`);
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  // Si se encuentra, devuelve la tarea
  res.status(200).json(task);
});

// 4. PUT: Actualizar completamente una tarea existente
// Ruta: /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(
    `PUT /tasks/${id} - Solicitud para actualizar completamente la tarea por ID`,
  );

  // Encuentra el índice de la tarea en el arreglo
  const taskIndex = tasks.findIndex((t) => t.id === id);

  // Si la tarea no se encuentra, devuelve un error 404
  if (taskIndex === -1) {
    console.log(`Tarea con ID ${id} no encontrada para actualización PUT.`);
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  // El cuerpo de la petición (req.body) contiene los nuevos datos para la tarea
  const updatedTaskData = req.body;

  // Validación: Asegúrate de que el 'title' esté presente
  if (!updatedTaskData.title) {
    console.log(
      "Error: El título de la tarea es requerido para la actualización PUT.",
    );
    return res
      .status(400)
      .json({ message: "El título de la tarea es requerido." });
  }

  // Crea la tarea actualizada. Para PUT, se reemplaza el objeto completo.
  const updatedTask = {
    id: id, // Asegura que el ID no cambie
    title: updatedTaskData.title,
    description: updatedTaskData.description || "",
    completed:
      typeof updatedTaskData.completed === "boolean"
        ? updatedTaskData.completed
        : false,
  };

  // Reemplaza la tarea en el arreglo
  tasks[taskIndex] = updatedTask;
  console.log("Tarea actualizada completamente (PUT):", updatedTask);

  // Devuelve la tarea actualizada
  res.status(200).json(updatedTask);
});

// 5. DELETE: Eliminar una tarea
// Ruta: /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`DELETE /tasks/${id} - Solicitud para eliminar tarea por ID`);

  // Filtra el arreglo para crear uno nuevo sin la tarea a eliminar.
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  // Si la longitud del arreglo no cambió, significa que la tarea no se encontró
  if (tasks.length === initialLength) {
    console.log(`Tarea con ID ${id} no encontrada para eliminación.`);
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  // Devuelve un estado 200 (OK) para indicar que la eliminación fue exitosa.
  // El test.js espera un 200, no un 204.
  console.log(`Tarea con ID ${id} eliminada exitosamente.`);
  res.status(200).send();
});

// Hasta aquí ⬇⬆️

export { app };
