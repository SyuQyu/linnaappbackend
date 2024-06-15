// roleCrud.mjs

import { prisma } from "./prisma";
import { roleData } from "../types/roles";

async function createRole(roleData: roleData) {
    const role = await prisma.role.create({
        data: roleData,
    });
    return role;
}

async function getRoleById(roleId: number) {
    const role = await prisma.role.findUnique({
        where: { role_id: roleId },
    });
    return role;
}

async function updateRole(roleId: number, updatedRoleData: roleData) {
    const role = await prisma.role.update({
        where: { role_id: roleId },
        data: updatedRoleData,
    });
    return role;
}

async function deleteRole(roleId: number) {
    const role = await prisma.role.delete({
        where: { role_id: roleId },
    });
    return role;
}

export { createRole, getRoleById, updateRole, deleteRole };
