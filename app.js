const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;
const TASKS_FILE = "tasks.json";

app.use(bodyParser.json());

/**
 * Funcion para agregar las tareas, si el archivo esta vacio o no existe
 * retorna vacio
*/
const cargarTask = () => {
    try {
        const data = fs.readFileSync(TASKS_FILE, "utf8");
        return data.trim() ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

const guardarTarea = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// Routes

// Agregar una nueva tarea
app.post("/tasks", (req, res) => {
    const { title, description, user } = req.body;
    if (!title || !user) {
        return res.status(400).send("Título y usuario son obligatorios.");
    }

    const tasks = cargarTask();
    
    const nueva = {
        id: tasks.length + 1,
        title,
        description,
        user,
    };

    tasks.push(nueva);
    guardarTarea(tasks);
    res.status(201).send(nueva);
});

// Mostras tareas ingresadas
app.get("/tasks", (req, res) => {
    const { user } = req.query;
    const tasks = cargarTask();

    if (user) {
        const lista = tasks.filter((task) => task.user == user);
        return res.json(lista);
    }
    res.json(tasks);
});

// Modificar tarea
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, user } = req.body;

    const tasks = cargarTask();
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).send("Tarea no encontrada.");
    }

    if (tasks[taskIndex].user !== user) {
        return res.status(403).send("No tienes permisos para realizar esta acción.");
    }

    tasks[taskIndex] = { ...tasks[taskIndex], title, description };
    guardarTarea(tasks);
    res.json(tasks[taskIndex]);
});

// Eliminar tarea
app.delete("/tasks/:id/:user", (req, res) => {
    const { id, user } = req.params;

    const tasks = cargarTask();
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).send("Tarea no encontrada.");
    }

    if (tasks[taskIndex].user != user) {
        return res.status(403).send("No tienes permisos para realizar esta acción.");
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    guardarTarea(tasks);
    res.json(deletedTask);
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
