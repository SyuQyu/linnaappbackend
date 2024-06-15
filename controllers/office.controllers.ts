import { Request, Response } from "express";
import { CustomError } from "../handler/customErrorHandler";
import { officeQueries } from "../queries";

export async function createOfficeHandler(req: Request, res: Response): Promise<void> {
    try {
        const officeData = req.body;
        const newOffice = await officeQueries.createOffice(officeData);
        res.status(201).json({
            status: 'success',
            message: 'Office created successfully',
            office: newOffice
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function getOfficeByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        const officeId = parseInt(req.params.officeId);
        const office = await officeQueries.getOfficeById(officeId);
        if (!office) {
            throw new CustomError(404, 'Office not found');
        }
        res.status(200).json({
            status: 'success',
            message: 'Office found',
            office
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function getAllOfficeHandler(req: Request, res: Response): Promise<void> {
    try {
        const offices = await officeQueries.getAllOffice();
        res.status(200).json({
            status: 'success',
            message: 'Offices found',
            offices
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function updateOfficeHandler(req: Request, res: Response): Promise<void> {
    try {
        const officeId = parseInt(req.params.officeId);
        const updatedOfficeData = req.body;
        const updatedOffice = await officeQueries.updateOffice(officeId, updatedOfficeData);
        if (!updatedOffice) {
            throw new CustomError(404, 'Office not found');
        }
        res.status(200).json({
            status: 'success',
            message: 'Office updated successfully',
            office: updatedOffice
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function deleteOfficeHandler(req: Request, res: Response): Promise<void> {
    try {
        const officeId = parseInt(req.params.officeId);
        const deletedOffice = await officeQueries.deleteOffice(officeId);
        if (!deletedOffice) {
            throw new CustomError(404, 'Office not found');
        }
        res.status(200).json({
            status: 'success',
            message: 'Office deleted successfully',
            office: deletedOffice
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}
