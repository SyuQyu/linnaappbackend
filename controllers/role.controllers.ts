import { roleQueries } from "../queries";
import { Request, Response } from "express";
import { CustomError } from "../handler/customErrorHandler";

export async function createRoleHandler(req: Request, res: Response): Promise<void> {
    try {
        const roleData = req.body;
        const newRole = await roleQueries.createRole(roleData);
        res.status(201).json({
            message: 'Role created successfully',
            role: newRole
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}

export async function getRoleByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        const roleId = parseInt(req.params.roleId);
        const role = await roleQueries.getRoleById(roleId);
        if (!role) {
            throw new CustomError(404, 'Role not found');
        }
        res.status(200).json({
            message: 'Role found',
            role
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}

export async function updateRoleHandler(req: Request, res: Response): Promise<void> {
    try {
        const roleId = parseInt(req.params.roleId);
        const updatedRoleData = req.body;
        const updatedRole = await roleQueries.updateRole(roleId, updatedRoleData);
        if (!updatedRole) {
            throw new CustomError(404, 'Role not found');
        }
        res.status(200).json({
            message: 'Role updated successfully',
            role: updatedRole
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}

export async function deleteRoleHandler(req: Request, res: Response): Promise<void> {
    try {
        const roleId = parseInt(req.params.roleId);
        const deletedRole = await roleQueries.deleteRole(roleId);
        if (!deletedRole) {
            throw new CustomError(404, 'Role not found');
        }
        res.status(200).json({
            message: 'Role deleted successfully',
            role: deletedRole
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}