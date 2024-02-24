import RoleModel from '../models/roles';
import UserModel from '../models/users';
import { encryptPassword} from '../utils/auth.utils';
import * as fs from 'fs';

export const createUploadsFolder = (): void => {
    const uploadsPath = './uploads';
    const imgPath = './uploads/img';

    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath);

        if (!fs.existsSync(imgPath)) {
            fs.mkdirSync(imgPath);
        }
    }
};


export const createRoles = async (): Promise<void> => {
    try {
        const count = await RoleModel.estimatedDocumentCount()

        if (count > 0) return;

        await Promise.all([
            new RoleModel({ name: 'user' }).save(),
            new RoleModel({ name: 'admin' }).save()
        ]);
    } catch (error) {
        console.log(error);
    }
}

export const createMasterUser = async (): Promise<void> => {
    try {
        const count = await UserModel.estimatedDocumentCount()

        if (count > 0) return;

        await Promise.all([
            new UserModel({
                username: 'Master',
                email: 'master@test.com',
                password: await encryptPassword('master'),
                role: ['653b246a4f78fec4eb3606d4', '653b246a4f78fec4eb3606d3'],
                master: true
            }).save()
        ]);
    } catch (error) {
        console.log(error);
    }
}  