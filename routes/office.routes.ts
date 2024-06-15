import { Router } from 'express';
import authorization from '../middlewares/authorization';
import {
    officeController
} from '../controllers';

const router = Router();

router.post('/', officeController.createOfficeHandler);
router.get('/all', officeController.getAllOfficeHandler);
router.get('/:officeId', officeController.getOfficeByIdHandler);
router.put('/:officeId', officeController.updateOfficeHandler);
router.delete('/:officeId', officeController.deleteOfficeHandler);

export default router;
