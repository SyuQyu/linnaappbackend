import { Router } from "express";
import absenceRoutes from "./absence.routes";
import userRoutes from "./user.routes";
import roleRoutes from "./role.routes";
import authRoutes from "./auth.routes";
import officeRoutes from "./office.routes";
import departmentRoutes from "./department.routes";
const router = Router();
router.use("/absence", absenceRoutes);
router.use("/user", userRoutes);
router.use("/role", roleRoutes);    
router.use("/auth", authRoutes);
router.use("/office", officeRoutes);
router.use("/department", departmentRoutes);

export default router;
