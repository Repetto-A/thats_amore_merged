const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Configuración de CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Asegurarse de que existe el directorio de datos
const dataDir = 'data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Archivo para almacenar metadatos de fotos
const PHOTOS_FILE = path.join(dataDir, 'photos.json');

// Inicializar archivo de fotos si no existe
if (!fs.existsSync(PHOTOS_FILE)) {
  fs.writeFileSync(PHOTOS_FILE, JSON.stringify([]));
}

// Función para leer los datos de fotos
const getPhotosData = () => {
  try {
    const data = fs.readFileSync(PHOTOS_FILE);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading photos data:', error);
    return [];
  }
};

// Función para guardar los datos de fotos
const savePhotosData = (data) => {
  try {
    fs.writeFileSync(PHOTOS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving photos data:', error);
    return false;
  }
};

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const filename = `photo_${timestamp}${ext}`;
    cb(null, filename);
  }
});

// Configurar multer
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Ruta para obtener todas las fotos
app.get('/api/photos', (req, res) => {
  const photos = getPhotosData();
  res.json(photos);
});

// Ruta para subir una nueva foto
app.post('/api/photos', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const caption = req.body.caption || 'Untitled';
  const photoUrl = `/uploads/${req.file.filename}`;
  
  // Guardar la información de la foto
  const newPhoto = {
    url: photoUrl,
    caption: caption
  };
  
  // Añadir a la base de datos
  const photos = getPhotosData();
  photos.push(newPhoto);
  savePhotosData(photos);

  res.json(newPhoto);
});

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static('uploads'));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Para cualquier otra ruta, devolver el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});