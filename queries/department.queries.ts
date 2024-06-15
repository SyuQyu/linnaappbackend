import { prisma } from "./prisma";

// Interface for department data
interface DepartmentData {
    department_name: string;
    created_at?: Date;
    updated_at?: Date;
}

// Functions for department operations
async function createDepartment(departmentData: DepartmentData) {
    const department = await prisma.department.create({
        data: departmentData,
    });
    return department;
}

async function getDepartmentById(departmentId: number) {
    const department = await prisma.department.findUnique({
        where: { department_id: departmentId },
    });
    return department;
}

async function getAllDepartment() {
    const departments = await prisma.department.findMany();
    return departments;
}

async function updateDepartment(departmentId: number, updatedDepartmentData: DepartmentData) {
    const department = await prisma.department.update({
        where: { department_id: departmentId },
        data: updatedDepartmentData,
    });
    return department;
}

async function deleteDepartment(departmentId: number) {
    const department = await prisma.department.delete({
        where: { department_id: departmentId },
    });
    return department;
}

export { createDepartment, getDepartmentById, updateDepartment, deleteDepartment, getAllDepartment };