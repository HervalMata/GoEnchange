import {getRepository} from "typeorm";
import User from "../entities/User";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";

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

    const user = await userRepository.findOne({ where: { email }});

    if (!user) {
      throw Error("Incorrect email/password combination.");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error("Incorrect email/password combination.");
    }

    const token = sign({}, "b371775560f0ae2df6e719b016627124", {
      subject: user.id, expiresIn: "1d"
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
