import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authQueries } from "../queries";
import { Request, Response } from "express";
import { CustomError } from "../handler/customErrorHandler";

export async function register(req: Request, res: Response) {
    const { email, password, full_name, role_id, phone_number, department_id, gender, address, office_id } = req.body;
    const data = {
        email: email,
        password: password,
        full_name: full_name,
        role_id: role_id,
        phone_number: phone_number,
        department_id: department_id,
        gender: gender,
        address: address,
        office_id: office_id
    }
    try {
        const existingUser = await authQueries.checkIfUserExistsEmail(email);
        if (existingUser) {
            throw new CustomError(400, 'User already exists');
        }
        const user = await authQueries.createUser(data);
        return res.status(201).json({ status: 'success', message: 'User registered successfully', user });
    } catch (error: any) {
        console.error('Error registering user:', error);
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}

export async function updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const { email, password, full_name, role_id, phone_number, department_id, gender, address, leave_quota, verified, office_id } = req.body;
    const data = {
        email: email,
        password: password,
        full_name: full_name,
        role_id: parseInt(role_id),
        phone_number: phone_number,
        department_id: parseInt(department_id),
        gender: gender,
        address: address,
        leave_quota: leave_quota,
        verified: verified,
        office_id: parseInt(office_id)
    }
    try {
        let existingUser = await authQueries.checkIfUserExistsUserId(userId);
        if (existingUser) {
            // If the user already exists, update the user instead of throwing an error
            const updatedUser = await authQueries.updateUser({ ...req.body, id: existingUser.user_id });
            return res.status(200).json({ status: 'success', message: 'User updated successfully', user: updatedUser });
        } else {
            throw new CustomError(400, 'User not exists');
        }
    } catch (error: any) {
        console.error('Error registering user:', error);
        const statusCode = error instanceof CustomError ? error.code : 500;
        res.status(statusCode).json({ message: error.message });
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log('email:', email);
    console.log('password:', password);
    try {
        const user = await authQueries.loginUser(email, password);
        const token = jwt.sign({ userId: user.user_id, roleName: user.role.role_name }, process.env.JWT_SECRET!, { expiresIn: '24h' });
        return res.status(200).json({ status: 'success', message: 'Login successful', user: user, token });
    } catch (error: any) {
        console.error('Error logging in:', error);
        return res.status(error.statusCode || 500).json({
            status: 'error',
            message: error.message
        });
    }
}

export async function logout(req: Request, res: Response) {
    // You can implement logout functionality here, such as revoking JWT tokens
    // This will depend on your specific requirements
    // For example, you may want to invalidate the JWT token on the client side
    return res.status(200).json({ status: 'success', message: 'Logout successful' });
}

export async function checkToken(req: Request, res: Response) {
    // This function is just a placeholder to demonstrate how you can check the token
    // You can implement more complex logic here, such as checking if the token is blacklisted
    return res.status(200).json({ status: 'success', message: 'Token is valid' });
}
