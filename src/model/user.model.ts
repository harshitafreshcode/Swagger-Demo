import { AppDataSource } from "../config/db";
import { Role } from "../entities/role.entity";
import { User } from "../entities/user.entity";

export async function addUser(where: any, data: any, callback: any) {
    try {
        let { roleId } = where
        const res = JSON.parse(JSON.stringify(data));

        await AppDataSource.manager.save(User, res).then(async (response: any) => {

            // const user = JSON.parse(JSON.stringify(response));

            // var userdata = {
            //     email: user?.email,
            //     user_id: user.id,
            //     phone: user?.phone,
            //     roleId: roleId,
            //     isAdmin: roleId == 1 ? true : false,
            // };

            // // const token = await sign(userdata);
            // // user.authToken = token;

            const roleRepository = AppDataSource.getRepository(Role);
            // const userrole = await roleRepository.findOneBy({ id: Number(roleId) });

            // user.role = userrole;
            // const userRepository = AppDataSource.getRepository(User);

            // const userDetails = await userRepository.findOneBy({ id: user.id });

            // await AppDataSource.manager.update(User, user.id, user);

            if (response) {
                callback("", response);
            } else {
                callback("error", "");
            }

        }).catch((err: any) => {

            var errMsg = err.driverError?.detail;

            if (errMsg.includes("phone")) {
                errMsg = 'Mobile Number Already Registered';
            }

            callback(errMsg, "");
        });

    } catch (error: any) {
        console.log(error);
        return callback(error, '')
    }
}


export async function FindAllUser(where: any, data: any, callback: any) {
    try {
        const userId = 1;

        const userRepository = AppDataSource.getRepository(User);

        const usersList = await userRepository
            .createQueryBuilder('user')
            // .innerJoin('user.module', 'module')
            // .innerJoin('module.modulePermissions', 'modulePermission')
            // .innerJoin('modulePermission.permission', 'permission')
            // .innerJoin('permission.roles', 'role')
            // .innerJoin('role.users', 'user')
            // .where('user.id = :userId', { userId })
            .getMany();

            return callback('', usersList)

    } catch (error: any) {
        console.log(error);
        return callback(error, '')
    }
}


