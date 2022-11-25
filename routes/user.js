import express from 'express';
import multer from '../middlewares/multer-config.js';

import { signin, signup,getAllUser,deleteUser,getUserById,getAllUsersPost} from '../controllers/user.js';
  
const router = express.Router();

router
    .route('/')
    .get(getAllUser)
    .post(
      multer,
      signup);

router
  .route('/signin')
  .post(signin);
  

router
    .route('/delete')
    .post(deleteUser);


router
  .route('/:id')
  .get(getUserById);
  
export default router;