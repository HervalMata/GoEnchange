import User from "../entities/User";
import {getRepository} from "typeorm";
import {hash} from "bcryptjs";
import {uuid} from "uuidv4";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {

  async execute({ password, name, email }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw Error("Email already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      id: uuid(), name, email, password: passwordHash
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
