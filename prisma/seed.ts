// main.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
    try {
        // Seed roles
        const roles = await Promise.all([
            prisma.role.create({ data: { role_id: 3, role_name: 'Admin' } }),
            prisma.role.create({ data: { role_id: 2, role_name: 'HR' } }),
            prisma.role.create({ data: { role_id: 1, role_name: 'User' } })
        ]);

        // Seed offices
        const office = await Promise.all([
            prisma.office.create({
                data: {
                    office_name: 'Jakarta',
                    office_lang: '-6.220124914635903',
                    office_long: '106.98772006742699'
                }
            }),
            prisma.office.create({
                data: {
                    office_name: 'Bandung',
                    office_lang: '-6.220124914635903',
                    office_long: '106.98772006742699'
                }
            })
        ]);

        // Seed departments
        const departments = await Promise.all([
            prisma.department.create({ data: { department_name: 'Superadmin' } }),
            prisma.department.create({ data: { department_name: 'IT' } }),
            prisma.department.create({ data: { department_name: 'HR' } }),
            prisma.department.create({ data: { department_name: 'Finance' } })
        ]);

        // Seed users
        const users = await Promise.all([
            prisma.user.create({
                data: {
                    email: 'alice@prisma.io',
                    full_name: 'Alice',
                    department: { connect: { department_id: departments[0].department_id } }, // Replace 'department_id_here' with the actual department ID for Superadmin
                    password: await bcrypt.hash("password456", 10), // Provide a password for the user
                    role: { connect: { role_id: roles[0].role_id } } // Replace 'admin_role_id_here' with the actual role ID for Admin
                }
            }),
            prisma.user.create({
                data: {
                    email: 'bob@prisma.io',
                    full_name: 'Bob',
                    password: await bcrypt.hash("password456", 10), // Provide a password for the user
                    role: { connect: { role_id: roles[1].role_id }, }, // Replace 'user_role_id_here' with the actual role ID for User
                    department: { connect: { department_id: departments[1].department_id } }, // Replace 'department_id_here' with the actual department ID for HR
                    absence_in: "09:00",
                    absence_out: "17:00",
                    office: { connect: { office_id: 1 } } // Replace 'office_id_here' with the actual office ID for the user
                }
            }),
            prisma.user.create({
                data: {
                    email: 'rian@prisma.io',
                    full_name: 'rian',
                    password: await bcrypt.hash("password456", 10), // Provide a password for the user
                    role: { connect: { role_id: roles[2].role_id }, }, // Replace 'user_role_id_here' with the actual role ID for User
                    department: { connect: { department_id: departments[2].department_id } }, // Replace 'department_id_here' with the actual department ID for HR
                    absence_in: "09:00",
                    absence_out: "17:00",
                    office: { connect: { office_id: 1 } } // Replace 'office_id_here' with the actual office ID for the user
                }
            })
        ]);

        // Seed absences
        const absences = await Promise.all([
            prisma.absence.create({
                data: {
                    user: { connect: { user_id: users[1].user_id } }, // Connect the absence to the first user
                    absence_type: 'Sick Leave',
                    absence_date: new Date('2024-05-01'),
                    absence_location_lang: '1231231231',
                    absence_location_long: '1231231231'
                }
            }),
            prisma.absence.create({
                data: {
                    user: { connect: { user_id: users[2].user_id } }, // Connect the absence to the second user
                    absence_type: 'Vacation',
                    absence_date: new Date('2024-05-05'),
                    absence_location_lang: '1231231231',
                    absence_location_long: '1231231231'
                }
            })
        ]);

        console.log('Data seeded successfully:', { users, absences });
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

