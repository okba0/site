import multer from 'multer';
import fs from 'fs';
import path from 'path';

const upload = multer({ dest: './public/uploads/' });

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
      return res.status(500).json({ message: 'Failed to upload file' });
    }

    const file = req.file;
    const tempPath = file.path;
    const targetPath = path.join(process.cwd(), '/public/uploads', file.originalname);

    try {
      fs.renameSync(tempPath, targetPath);
      const filename = file.originalname;
      const filePath = targetPath;
      return res.status(200).json({ message: 'File uploaded successfully', filename, filePath });
    } catch (error) {
      console.error('Error moving file:', error);
      return res.status(500).json({ message: 'Failed to save file' });
    }
  });
};

export default handler;
