const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Invernadero = require('./models/Invernadero');
const Pez = require('./models/Pez');
const Sensor = require('./models/sensor');
const PhChart = require('./models/phchart');
const NivelChart = require('./models/nivelchart');
const HumedadChart = require('./models/humedadchart');
const TemperaturaChart = require('./models/temperaturaschart');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://AgroSmart:Agro123456789@cluster0.jgsyops.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión a la base de datos MongoDB establecida');
}).catch((err) => {
  console.error('Error al conectar a la base de datos MongoDB:', err);
});
 
app.post('/register', async (req, res) => {
  const { email, password, usuario, tipo, name, cantidad, cultivo, capacidad } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: true, msg: 'El usuario ya existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = new User({ email, password: hashedPassword, usuario });
    await newUser.save();

    // Crea un nuevo pez
    const newPez = new Pez({ cantidad, tipo: tipo, usuario: newUser._id });
    await newPez.save();

    // Crea un nuevo invernadero
    const newInvernadero = new Invernadero({ name, pez: newPez._id, cultivo, capacidad, usuario: newUser._id, status: true, fechaAlta: new Date() });
    await newInvernadero.save();

    const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: true, msg: 'Error al registrar el usuario.' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: true, msg: 'Credenciales inválidas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: true, msg: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error al autenticar el usuario:', error);
    res.status(500).json({ error: true, msg: 'Error al autenticar el usuario.' });
  }
});

app.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: true, msg: 'Token no proporcionado.' });
  }

  jwt.verify(token, 'your-secret-key', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: true, msg: 'Token inválido.' });
    }

    const email = decoded.email;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: true, msg: 'Usuario no encontrado.' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      res.status(500).json({ error: true, msg: 'Error al obtener información del usuario.' });
    }
  });
});

app.get('/peces', async (req, res) => {
  try {
    const peces = await Pez.find().populate('usuario'); 
    res.json(peces);
  } catch (error) {
    console.error('Error al obtener los peces:', error);
    res.status(500).json({ error: true, msg: 'Error al obtener los peces.' });
  }
});

app.get('/sensores', async (req, res) => {
  try {
    const sensores = await Sensor.findOne().select('humedadAmbiente nivel ph temperaturaAmbiente temperaturaEstanque');
    res.json(sensores);
  } catch (error) {
    console.error('Error al obtener los valores de los sensores:', error);
    res.status(500).json({ error: true, msg: 'Error al obtener los valores de los sensores.' });
  }
});

app.get('/phcharts/latest', async (req, res) => {
  try {
      // Encuentra todos los documentos PhChart y selecciona el último
      const latestPhChart = await PhChart.findOne().sort({ fechaInsercion: -1 });

      // Si no se encuentra ningún documento, devuelve un error
      if (!latestPhChart) {
          return res.status(404).json({ message: 'No se encontraron datos de pH.' });
      }

      // Obtiene el último valor de la matriz de datos
      const latestPhValue = latestPhChart.datos[latestPhChart.datos.length - 1];

      // Devuelve el último valor de pH
      res.json({ ph: latestPhValue });
  } catch (error) {
      console.error('Error al obtener el último valor de pH:', error);
      res.status(500).json({ message: 'Error al obtener el último valor de pH.' });
  }
});
app.get('/nivelcharts/latest', async (req, res) => {
  try {
      // Encuentra todos los documentos PhChart y selecciona el último
      const latestNivelChart = await NivelChart.findOne().sort({ fechaInsercion: -1 });

      // Si no se encuentra ningún documento, devuelve un error
      if (!latestNivelChart) {
          return res.status(404).json({ message: 'No se encontraron datos de Nivel.' });
      }

      // Obtiene el último valor de la matriz de datos
      const latestNivelValue = latestNivelChart.datos[latestNivelChart.datos.length - 1];

      // Devuelve el último valor de nivel
      res.json({ nivel: latestNivelValue });
  } catch (error) {
      console.error('Error al obtener el último valor de nivel:', error);
      res.status(500).json({ message: 'Error al obtener el último valor de Nivel.' });
  }
});
app.get('/humedadcharts/latest', async (req, res) => {
  try {
      const latestHumedadChart = await HumedadChart.findOne().sort({ fechaInsercion: -1 });

      if (!latestHumedadChart) {
          return res.status(404).json({ message: 'No se encontraron datos de humedad.' });
      }

      const latestHumedadValue = latestHumedadChart.datos[latestHumedadChart.datos.length - 1];

      res.json({ humedad: latestHumedadValue });
  } catch (error) {
      console.error('Error al obtener el último valor de humedad:', error);
      res.status(500).json({ message: 'Error al obtener el último valor de humedad.' });
  }
});
app.get('/ambientecharts/latest', async (req, res) => {
  try {
      const latestAmbienteChart = await TemperaturaChart.findOne().sort({ fechaInsercion: -1 });

      if (!latestAmbienteChart) {
          return res.status(404).json({ message: 'No se encontraron datos de ambiente.' });
      }

      const latestAmbienteValue = latestAmbienteChart.datosAmbiente[latestAmbienteChart.datosAmbiente.length - 1];

      res.json({ datosAmbiente: latestAmbienteValue }); // Modificado para devolver solo datosAmbiente
  } catch (error) {
      console.error('Error al obtener el último valor de ambiente:', error);
      res.status(500).json({ message: 'Error al obtener el último valor de ambiente.' });
  }
});

app.get('/aguacharts/latest', async (req, res) => {
  try {
      const latestAguaChart = await TemperaturaChart.findOne().sort({ fechaInsercion: -1 });

      if (!latestAguaChart) {
          return res.status(404).json({ message: 'No se encontraron datos de agua.' });
      }

      const latestAguaValue = latestAguaChart.datosAgua[latestAguaChart.datosAgua.length - 1];

      res.json({ datosAgua: latestAguaValue }); // Modificado para devolver solo datosAgua
  } catch (error) {
      console.error('Error al obtener el último valor de agua:', error);
      res.status(500).json({ message: 'Error al obtener el último valor de agua.' });
  }
});


app.get('/phcharts/all', async (req, res) => {
  try {
    const last23PhCharts = await PhChart.find().sort({ fechaInsercion: -1 }).limit(23);

    if (!last23PhCharts || last23PhCharts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de pH.' });
    }

    const allPhValues = last23PhCharts.flatMap(chart => chart.datos);

    res.json({ ph: allPhValues });
  } catch (error) {
    console.error('Error al obtener los datos de pH:', error);
    res.status(500).json({ message: 'Error al obtener los datos de pH.' });
  }
});



app.get('/nivelcharts/all', async (req, res) => {
  try {
    const last23NivelCharts = await NivelChart.find().sort({ fechaInsercion: -1 }).limit(23);

    if (!last23NivelCharts || last23NivelCharts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de nivel.' });
    }

    const allNivelValues = last23NivelCharts.flatMap(chart => chart.datos);

    res.json({ nivel: allNivelValues });
  } catch (error) {
    console.error('Error al obtener los datos de nivel:', error);
    res.status(500).json({ message: 'Error al obtener los datos de nivel.' });
  }
});

app.get('/humedadcharts/all', async (req, res) => {
  try {
    const last23HumedadCharts = await HumedadChart.find().sort({ fechaInsercion: -1 }).limit(23);

    if (!last23HumedadCharts || last23HumedadCharts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de humedad.' });
    }

    const allHumedadValues = last23HumedadCharts.flatMap(chart => chart.datos);

    res.json({ humedad: allHumedadValues });
  } catch (error) {
    console.error('Error al obtener los datos de humedad:', error);
    res.status(500).json({ message: 'Error al obtener los datos de humedad.' });
  }
});

app.get('/aguacharts/all', async (req, res) => {
  try {
    const last23AguaCharts = await TemperaturaChart.find().sort({ fechaInsercion: -1 }).limit(23);

    if (!last23AguaCharts || last23AguaCharts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de agua.' });
    }

    const allAguaValues = last23AguaCharts.flatMap(chart => chart.datosAgua);

    res.json({ agua: allAguaValues });
  } catch (error) {
    console.error('Error al obtener los datos de agua:', error);
    res.status(500).json({ message: 'Error al obtener los datos de agua.' });
  }
});

app.get('/ambientecharts/all', async (req, res) => {
  try {
    const last23AmbienteCharts = await TemperaturaChart.find().sort({ fechaInsercion: -1 }).limit(23);

    if (!last23AmbienteCharts || last23AmbienteCharts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de ambiente.' });
    }

    const allAmbienteValues = last23AmbienteCharts.flatMap(chart => chart.datosAmbiente);

    res.json({ ambiente: allAmbienteValues });
  } catch (error) {
    console.error('Error al obtener los datos de ambiente:', error);
    res.status(500).json({ message: 'Error al obtener los datos de ambiente.' });
  }
});





app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
