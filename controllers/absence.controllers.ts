import { absenceQueries } from "../queries";
import { Request, Response } from "express";
import { CustomError } from "../handler/customErrorHandler";

export async function createAbsenceHandler(req: Request, res: Response): Promise<void> {
    try {
        const absenceData = req.body;
        const newAbsence = await absenceQueries.createAbsence(absenceData);
        res.status(201).json({
            message: 'Absence created successfully',
            absence: newAbsence
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}

export async function getAbsenceByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        const absenceId = parseInt(req.params.absenceId);
        const absence = await absenceQueries.getAbsenceById(absenceId);
        if (!absence) {
            throw new CustomError(404, 'Absence not found');
        }
        res.status(200).json({
            message: 'Absence found',
            absence
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}

export async function updateAbsenceHandler(req: Request, res: Response): Promise<void> {
    try {
        const absenceId = parseInt(req.params.absenceId);
        const updatedAbsenceData = req.body;
        const updatedAbsence = await absenceQueries.updateAbsence(absenceId, updatedAbsenceData);
        if (!updatedAbsence) {
            throw new CustomError(404, 'Absence not found');
        }
        res.status(200).json({
            message: 'Absence updated successfully',
            absence: updatedAbsence
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}

export async function deleteAbsenceHandler(req: Request, res: Response): Promise<void> {
    try {
        const absenceId = parseInt(req.params.absenceId);
        const deletedAbsence = await absenceQueries.deleteAbsence(absenceId);
        if (!deletedAbsence) {
            throw new CustomError(404, 'Absence not found');
        }
        res.status(200).json({
            message: 'Absence deleted successfully',
            absence: deletedAbsence
        });
    } catch (error: any) {
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}