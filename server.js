// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // <-- Esto va aquí

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas usando .env
mongoose.connect(process.env.MONGO_URI,);

// Esquema y modelo
const ClienteSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  ruc: String,
  lugar: String,
  factura: String,
  monto: Number,
  pagado: Number,
  fechaVencimiento: String,
  abonos: Array,
  comprobantes: Array,
  fechaPago: Number
});
const Cliente = mongoose.model('Cliente', ClienteSchema);

// Rutas básicas
app.get('/clientes', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

app.post('/clientes', async (req, res) => {
  if (!Array.isArray(req.body.comprobantes)) req.body.comprobantes = [];
  console.log(req.body);
  const cliente = new Cliente(req.body);
  await cliente.save();
  res.json(cliente);
});

app.put('/clientes/:id', async (req, res) => {
  if (!Array.isArray(req.body.comprobantes)) req.body.comprobantes = [];
  const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cliente);
});

// Ruta para eliminar cliente por _id
app.delete('/clientes/:id', async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.listen(3008, () => console.log('Servidor backend escuchando en puerto 3008'));