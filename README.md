Sistema de Tareas

Descripción

API para gestionar tareas

Configuración Inicial

Asegúrate de tener Node.js instalado.

Instala las dependencias:

npm install express body-parser


Ejecuta el servidor:

node app.js

Endpoints:

1. Crear una nueva tarea

URL: /tasks

Método: POST

Body:

{
    "title": "Nombre de la tarea",
    "description": "Descripción de la tarea",
    "user": 1
}

Respuesta:

Código: 201 Created

Body:

{
    "id": 1,
    "title": "Nombre de la tarea",
    "description": "Descripción de la tarea",
    "user": 1
}

Error:

400 Bad Request: Si falta el título o el usuario.

2. Mostrar tareas

URL: /tasks

Método: GET

Parámetros de Consulta (Opcional):

user: ID del usuario

Respuesta:

Código: 200 OK

Body:

[
    {
        "id": 1,
        "title": "Nombre de la tarea",
        "description": "Descripción de la tarea",
        "user": 1
    }
]

3. Modificar una tarea

URL: /tasks/:id

Método: PUT

Body:

{
    "title": "Nuevo nombre de la tarea",
    "description": "Nueva descripción",
    "user": 1
}

Respuesta:

Código: 200 OK

Body:

{
    "id": 1,
    "title": "Nuevo nombre de la tarea",
    "description": "Nueva descripción",
    "user": 1
}

Error:

404 Not Found: Si la tarea no existe.

403 Forbidden: Si el usuario no es el creador de la tarea.

4. Eliminar una tarea

URL: /tasks/:id

Método: DELETE

Body:

{
    "user": 1
}

Respuesta:

Código: 200 OK

Body:

{
    "id": 1,
    "title": "Nombre de la tarea",
    "description": "Descripción de la tarea",
    "user": 1
}

Error:

404 Not Found: Si la tarea no existe.

403 Forbidden: Si el usuario no es el creador de la tarea.