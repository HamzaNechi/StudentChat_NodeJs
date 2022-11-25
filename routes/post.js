import { Router } from "express";
import { getAll,add ,getPostUser} from "../controllers/post.js";
import multer from "../middlewares/multer-config.js";


const router=Router();


router
    .route('/')
    .get(getAll)
    .post(
        multer,
        add);

router
    .route('/:id_user')
    .get(getPostUser);

export default router;