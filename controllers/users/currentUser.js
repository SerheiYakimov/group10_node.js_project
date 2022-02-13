import { HttpCode } from "../../lib/constants";

export const currentUser = async (req, res, _next) => {

    const { email, balance, avatarURL } = req.user;
  if (!req.user.token || !req.user.id) {
    return res.status(HttpCode.UNAUTORIZED).json(
        {
        status: 'error',
        code: HttpCode.UNAUTORIZED,
        message: 'Not authorized',
        })  
    }

    const name = req.user.email;
    const currentName = name.split('@')[0];

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        user: {
            email,
            name: currentName,
            balance,
            avatarURL,
        } 
      },
    });
};