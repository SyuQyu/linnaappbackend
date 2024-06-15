import { prisma } from "./prisma";

async function createAbsence(absenceData: any) {
    const absence = await prisma.absence.create({
        data: absenceData,
    });
    return absence;
}

async function getAbsenceById(absenceId: number) {
    const absence = await prisma.absence.findUnique({
        where: { absence_id: absenceId },
        include: { user: true },
    });
    return absence;
}

async function updateAbsence(absenceId: number, updatedAbsenceData: any) {
    const absence = await prisma.absence.update({
        where: { absence_id: absenceId },
        data: updatedAbsenceData,
    });
    return absence;
}

async function deleteAbsence(absenceId: number) {
    const absence = await prisma.absence.delete({
        where: { absence_id: absenceId },
    });
    return absence;
}

export { createAbsence, getAbsenceById, updateAbsence, deleteAbsence };