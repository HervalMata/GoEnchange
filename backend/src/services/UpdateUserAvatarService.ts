import User from "../entities/User";
import {getRepository} from "typeorm";
import * as path from "path";
import uploadConfig from '../config/upload';
import * as fs from "fs";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    // @ts-ignore
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error("Only authenticated users can change avatar.");
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
