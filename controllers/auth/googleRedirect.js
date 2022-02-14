import pkg from 'http-errors';
import queryString from 'query-string';
import axios from 'axios';
import authService from '../../services/auth';

const { Unauthorized } = pkg;

export const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  console.log(code);

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const user = await authService.getUserGoogle(userData.data.email);
  if (!user) {
    throw new Unauthorized(
      'Google login for registered users only! Please register!',
    );
  }

  const token = authService.getToken(user);
  await authService.setToken(user.id, token);

  return res.redirect(`${process.env.FRONTEND_URL}?accessToken=${token}`);
};
