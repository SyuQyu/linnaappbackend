// roleCrud.mjs

import { prisma } from "./prisma";

// userCrud.js

async function createUser(userData: any) {
    const user = await prisma.user.create({
        data: userData,
    });
    return user;
}

async function getUserById(userId: number) {
    const user = await prisma.user.findUnique({
        where: { user_id: userId },
        include: {
            role: true,
            department: true,
            office: true
        },
    });
    return user;
}

async function updateUser(userId: number, updatedUserData: any) {
    const user = await prisma.user.update({
        where: { user_id: userId },
        data: updatedUserData,
    });
    return user;
}

async function deleteUser(userId: number) {
    const user = await prisma.user.delete({
        where: { user_id: userId },
    });
    return user;
}

async function getUsersByRole(roleId: number) {
    const users = await prisma.user.findMany({
        where: { role_id: roleId },
        include: { role: true },
    });
    return users;
}

async function getUsers() {
    const users = await prisma.user.findMany({
        include: {
            role: true,
            department: true,
            office: true
        },
    });
    return users;
}

export { getUsers, createUser, getUserById, updateUser, deleteUser, getUsersByRole };
