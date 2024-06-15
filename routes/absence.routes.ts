import { Router } from 'express';
import authorization from '../middlewares/authorization';
import {
    absenceController
} from '../controllers';

const router = Router();

router.post('/', absenceController.createAbsenceHandler);
router.get('/:absenceId', absenceController.getAbsenceByIdHandler);
router.put('/:absenceId', absenceController.updateAbsenceHandler);
router.delete('/:absenceId', absenceController.deleteAbsenceHandler);

export default router;