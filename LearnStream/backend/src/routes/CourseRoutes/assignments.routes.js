import { Router } from 'express';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

// Assignments
router.route('/:courseId/assignments').post(upload.array('files'));

export default router;