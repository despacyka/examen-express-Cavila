const request = require("supertest");
const {app} = require("./app.js");


describe("Pruebas express", () => {beforeAll(() => {
    jest.setTimeout(10000);
});
  it('POST /tasks debería crear una nueva tarea', async () => {
    const nuevaTarea = {
      title: 'Completar informe',
      description: 'Redactar y enviar el informe mensual',
      completed: false,
    };

    const respuesta = await request(app)
      .post('/tasks')
      .send(nuevaTarea);

    expect(respuesta.statusCode).toBe(201);
    expect(respuesta.body.title).toBe(nuevaTarea.title);
    expect(respuesta.body.description).toBe(nuevaTarea.description);
    expect(respuesta.body.completed).toBe(nuevaTarea.completed);
    expect(respuesta.body.id).toBeDefined();
  });

  it('GET /tasks debería obtener todas las tareas', async () => {
    const respuesta = await request(app)
      .get('/tasks');

    expect(respuesta.statusCode).toBe(200);
    expect(Array.isArray(respuesta.body)).toBe(true);
  });

  it('GET /tasks/:id debería obtener una tarea por ID', async () => {
    // Primero, crea una tarea para obtener su ID
    const nuevaTarea = {
      title: 'Tarea de prueba',
      description: 'Descripción de prueba',
      completed: false,
    };
    const crearRespuesta = await request(app)
      .post('/tasks')
      .send(nuevaTarea);

    const respuesta = await request(app)
      .get(`/tasks/${crearRespuesta.body.id}`);

    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.body.id).toBe(crearRespuesta.body.id);
  });

  it('PUT /tasks/:id debería actualizar una tarea existente', async () => {
    // Primero, crea una tarea para obtener su ID
    const nuevaTarea = {
      title: 'Tarea antigua',
      description: 'Descripción antigua',
      completed: false,
    };
    const crearRespuesta = await request(app)
      .post('/tasks')
      .send(nuevaTarea);

    const tareaActualizada = {
      title: 'Tarea nueva',
      description: 'Descripción nueva',
      completed: true,
    };

    const respuesta = await request(app)
      .put(`/tasks/${crearRespuesta.body.id}`)
      .send(tareaActualizada);

    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.body.title).toBe(tareaActualizada.title);
    expect(respuesta.body.description).toBe(tareaActualizada.description);
    expect(respuesta.body.completed).toBe(tareaActualizada.completed);
  });

  it('DELETE /tasks/:id debería eliminar una tarea existente', async () => {
    // Primero, crea una tarea para obtener su ID
    const nuevaTarea = {
      title: 'Tarea a eliminar',
      description: 'Descripción a eliminar',
      completed: false,
    };
    const crearRespuesta = await request(app)
      .post('/tasks')
      .send(nuevaTarea);

    const respuesta = await request(app)
      .delete(`/tasks/${crearRespuesta.body.id}`);

    expect(respuesta.statusCode).toBe(200);

    // Intenta obtener la tarea eliminada y verifica que no exista
    const obtenerRespuesta = await request(app)
      .get(`/tasks/${crearRespuesta.body.id}`);

    expect(obtenerRespuesta.statusCode).toBe(404);
  });
});
