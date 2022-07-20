import {Router} from "express";
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    // @ts-ignore
    delete user.password;

    return res.json(user);
  } catch (err) {
    // @ts-ignore
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
  return res.json({ ok: true });
});

export default usersRouter;
