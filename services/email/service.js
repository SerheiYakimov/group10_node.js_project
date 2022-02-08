import Mailgen from 'mailgen';

class EmailService {
    constructor(env, sender) {
        this.sender = sender;
        switch (env) {
            case 'development':
                this.link = 'http://localhost:3001/';
                break;
            case 'production':
                this.link = 'https://name.herokuapp.com/';
                break;
            default:
                this.link ='http://localhost:3001/';
            
        }
    }

    createEmailTemplate(username, verifyToken) {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'твоя Kapusta',
                link: this.link,
            }
        });

        const email = {
            body: {
                name: username,
                intro: 'Приветствуем',
                action: {
                    instructions: 'Чтобы начать использовать приложение нажмите на кнопку для подтверждения аккаунта:',
                    button: {
                        color: '#ff751d',
                        text: 'Подтвердить',
                        link: `${this.link}api/users/verify/${verifyToken}}`,
                    }
                },
                outro: 'Нужна помощь или есть вопросы? Просто ответьте на это письмо, мы будем рады помочь'
            }
            
        };

        return mailGenerator.generate(email)
    }

    async sendVerifyEmail(email, username, verifyToken) {
        const emailBody = this.createEmailTemplate(username, verifyToken);
        const msg = {
            to: email,
            subject: 'Verify email',
            html: emailBody,
        }
        try {
            const result = await this.sender.send(msg)
            console.log(result);
            return true;
        } catch (error) {
            console.error(error.message);
            return false;
            
        }
    }
 }

export default EmailService;