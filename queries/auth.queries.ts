// controllers/userQueries.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CustomError, errorHandler } from '../handler/customErrorHandler';

const prisma = new PrismaClient();

interface createUserProps {
    email: string;
    password: string;
    full_name: string;
    role_id?: number;
    phone_number: string;
    department_id?: number;
    office_id?: number;
    address?: string;
    gender: string;
}

interface updateUserProps {
    id: number;
    email?: string;
    password?: string;
    full_name?: string;
    role_id?: number;
    phone_number?: string;
    department_id: number;
    gender?: string;
    address?: string;
    leave_quota?: number;
    verified?: boolean;
}

async function checkIfUserExistsEmail(email?: string) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

async function checkIfUserExistsUserId(user_id?: number) {
    return await prisma.user.findUnique({
        where: { user_id }
    });

}

async function createUser(data: createUserProps) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const role_id = data.role_id ? data.role_id : 1;
        return await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
                role_id: role_id
            }
        });
    } catch (error) {
        throw new CustomError(500, 'User creation failed');
    }
}

async function updateUser(data: updateUserProps) {
    try {
        const { id, ...userData } = data;
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        console.log(userData);
        return await prisma.user.update({
            where: {
                user_id: id
            },
            data: userData
        });
    } catch (error:any) {
        throw new CustomError(500, error.message);
    }
}

async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            role: true, // Include the role relation to fetch role information
            department: true, // Include the department relation to fetch department information
            office: true // Include the office relation to fetch office information
        }
    });
    if (!user) {
        throw new CustomError(401, 'User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new CustomError(401, 'Invalid password');
    }
    return user;
}

export { checkIfUserExistsEmail, checkIfUserExistsUserId, createUser, loginUser, updateUser };
