import { prisma } from "./prisma";

interface officeData {
    office_name: string;
    office_lang: string;
    office_long: string;
    created_at?: Date;
    updated_at?: Date;
}

async function createOffice(officeData: officeData) {
    const office = await prisma.office.create({
        data: officeData,
    });
    return office;
}

async function getOfficeById(officeId: number) {
    const office = await prisma.office.findUnique({
        where: { office_id: officeId },
    });
    return office;
}

async function getAllOffice() {
    const offices = await prisma.office.findMany();
    return offices;

}

async function updateOffice(officeId: number, updatedOfficeData: officeData) {
    const office = await prisma.office.update({
        where: { office_id: officeId },
        data: updatedOfficeData,
    });
    return office;
}

async function deleteOffice(officeId: number) {
    const office = await prisma.office.delete({
        where: { office_id: officeId },
    });
    return office;
}

export { createOffice, getOfficeById, updateOffice, deleteOffice, getAllOffice };
