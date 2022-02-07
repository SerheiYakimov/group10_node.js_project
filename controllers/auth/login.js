import { HttpCode } from '../../lib/constants';
import AuthService from '../../service/auth';
const authService = new AuthService();

export const login = async (req, res, _next) => {
    const { email, password } = req.body;
    const user = await authService.getUser(email, password)
    if (!user) {
        return res.status(HttpCode.UNAUTORIZED).json(
            {
                status: 'error',
                code: HttpCode.UNAUTORIZED,
                message: 'Invalid credentials',
            });

    }
    const token = authService.getToken(user);
    await authService.setToken(user.id, token);
    res.status(HttpCode.OK).json(
        {
            status: 'success',
            code: HttpCode.OK,
            data: { token },
        });
}