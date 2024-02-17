import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/uploads/images', // Specify the destination folder for image uploads
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF) are allowed.'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  upload.single('file')(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ message: 'Failed to upload file', error: err.message });
    }

    const file = req.file;
    const tempPath = file.path;
    const targetPath = path.join(process.cwd(), '/public/uploads/images', file.originalname);

    try {
      fs.renameSync(tempPath, targetPath);
      const filename = file.originalname;
      const filePath = targetPath;
      return res.status(200).json({ message: 'File uploaded successfully', filename, filePath });
    } catch (error) {
      console.error('Error moving file:', error);
      return res.status(500).json({ message: 'Failed to save file', error: error.message });
    }
  });
};

export default handler;
