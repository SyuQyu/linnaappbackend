import { Router } from 'express';
// import authorization from '../middlewares/authorization';
import {
    createDepartmentHandler,
    getDepartmentByIdHandler,
    updateDepartmentHandler,
    deleteDepartmentHandler,
    getAllDepartmentHandler
} from '..//controllers/department.controllers';

const router = Router();

router.post('/', createDepartmentHandler);
router.get('/all', getAllDepartmentHandler);
router.get('/:departmentId', getDepartmentByIdHandler);
router.put('/:departmentId', updateDepartmentHandler);
router.delete('/:departmentId', deleteDepartmentHandler);

export default router;
