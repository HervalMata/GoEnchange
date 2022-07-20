import {getRepository} from "typeorm";
import User from "../entities/User";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import authConfig from '../config/auth';
import AppError from "../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {

  async execute({ password, email }: IRequest): Promise<IResponse> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id, expiresIn: expiresIn
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
