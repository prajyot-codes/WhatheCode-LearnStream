import { Router } from 'express';
import courseRoutes from './courses.routes.js';
import lectureRoutes from './lectures.routes.js';
import assignmentRoutes from './assignments.routes.js';

const router = Router();

// Group the routes under /courses
router.use('/', courseRoutes);
router.use('/', lectureRoutes);
router.use('/', assignmentRoutes);

export default router;