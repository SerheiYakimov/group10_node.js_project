import { HttpCode } from '../../lib/constants';


const currentUser = async (req, res, _next) => {

    const { email, balance } = req.user;
    if (!req.user.token || !req.user.id) {
      return res.status(HttpCode.UNAUTORIZED).json(
        {
        status: 'error',
        code: HttpCode.UNAUTORIZED,
        message: 'Not authorized',
        })  
    }
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { user: {email, balance} },
    });
  };

export { currentUser }