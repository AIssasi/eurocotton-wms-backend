const fs = require('fs');
const path = require('path');

exports.deleteFile = async (req, res, next) => {
  const fileName = req.params.fileName;

  try {
    // Verificar la existencia del archivo
    const filePath = path.join(__dirname, '..', fileName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Eliminar el archivo
    fs.unlinkSync(filePath);

    // Responder con éxito
    return res.status(200).json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    // Manejar errores
    return next(error);
  }
};

exports.deleteAllFiles = async (req, res, next) => {
  try {
    // Directorio de la carpeta de archivos a eliminar
    const directoryPath = path.join(__dirname, '..', 'uploads');

    // Verificar si el directorio existe
    if (!fs.existsSync(directoryPath)) {
      return res.status(404).json({ success: false, message: 'Directory not found' });
    }

    // Función recursiva para eliminar archivos y subdirectorios
    const deleteFolderRecursive = (dirPath) => {
      if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
          const curPath = path.join(dirPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
            // Recursivamente eliminar subdirectorios
            deleteFolderRecursive(curPath);
          } else {
            // Eliminar archivos
            fs.unlinkSync(curPath);
          }
        });
        // Eliminar el directorio una vez que esté vacío
        fs.rmdirSync(dirPath);
      }
    };

    // Ejecutar la función para eliminar archivos y subdirectorios
    deleteFolderRecursive(directoryPath);

    // Responder con éxito
    return res
      .status(200)
      .json({ success: true, message: 'All files and subdirectories deleted successfully' });
  } catch (error) {
    // Manejar errores
    return next(error);
  }
};
