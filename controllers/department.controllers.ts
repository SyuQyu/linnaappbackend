import { Request, Response } from "express";
import { CustomError } from "../handler/customErrorHandler";
import { departmentQueries } from "../queries";

export async function createDepartmentHandler(req: Request, res: Response): Promise<void> {
    try {
        const departmentData = req.body;
        const newDepartment = await departmentQueries.createDepartment(departmentData);
        res.status(201).json({
            status: 'success',
            message: 'Department created successfully',
            department: newDepartment
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function getAllDepartmentHandler(req: Request, res: Response): Promise<void> {
    try {
        const departments = await departmentQueries.getAllDepartment();
        res.status(200).json({
            status: 'success',
            message: 'Departments found',
            departments
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }

}

export async function getDepartmentByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        const departmentId = parseInt(req.params.departmentId);
        const department = await departmentQueries.getDepartmentById(departmentId);
        if (!department) {
            throw new CustomError(404, 'Department not found');
        }
        res.status(200).json({
            status: 'success',
            message: 'Department found',
            department
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function updateDepartmentHandler(req: Request, res: Response): Promise<void> {
    try {
        const departmentId = parseInt(req.params.departmentId);
        const updatedDepartmentData = req.body;
        const updatedDepartment = await departmentQueries.updateDepartment(departmentId, updatedDepartmentData);
        if (!updatedDepartment) {
            throw new CustomError(404, 'Department not found');
        }
        res.status(200).json({
            status: 'success',
            message: 'Department updated successfully',
            department: updatedDepartment
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function deleteDepartmentHandler(req: Request, res: Response): Promise<void> {
    try {
        const departmentId = parseInt(req.params.departmentId);
        const deletedDepartment = await departmentQueries.deleteDepartment(departmentId);
        if (!deletedDepartment) {
            throw new CustomError(404, 'Department not found');
        }
        res.status(200).json({
            status: 'success',
            message: 'Department deleted successfully',
            department: deletedDepartment
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}
