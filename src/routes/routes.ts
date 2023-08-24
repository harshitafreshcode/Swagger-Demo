import express, { Request, Response } from 'express'
import { createUser } from '../Controller/userController';
const router = express.Router()
/**
 * @openapi
   * /user:
   *  get:
   *     tags:
   *     - user
   *     summary: Get User.
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.get("/user", (req: Request, res: Response) => {
    res.send('results 1234');
});

/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - user
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/src/entities/user.entity.ts'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/src/entities/user.entity.ts'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */

router.post("/add-user", createUser);

export default router;


// *               type: object
// *               properties:
// *                     first_name:
// *                       type: string
// *                       description: The user's first name.
// *                       example: Leanne Graham
// *                     last_name:
// *                       type: string
// *                       description: The user's last name.
// *                       example: Leanne Graham
// *                     email:
// *                       type: string
// *                       description: The user's email.
// *                       example: test@gmail.com
// *                     phone:
// *                       type: string
// *                       description: The user's phone.
// *                       example: 1234567893
// *                     password:
// *                       type: string
// *                       description: The user's password.
// *                       example: Test@123
// *                     rolesId:
// *                       type: integer
// *                       description: The user's rolesId.
// *                       example: 1
// *                     status:
// *                       type: boolean
// *                       description: The user's status.
// *                       example: true
