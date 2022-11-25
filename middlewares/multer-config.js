import multer,{diskStorage} from "multer";
import {join,dirname} from "path";
import { fileURLToPath } from "url";


const MIME_TYPE={
    "image/jpg":"jpg",
    "image/jpeg":"jpg",
    "image/png":"png",
};

export default multer({
    storage:diskStorage({
        destination:(req,file,callback)=>{
            const __dirname=dirname(fileURLToPath(import.meta.url));
            switch(req.originalUrl) {
                case "/user":
                    callback(null,join(__dirname,"../public/images/user"));
                  break;
                case "/post":
                    callback(null,join(__dirname,"../public/images/post"));
                  break;
                default:
                    callback(null,join(__dirname,"../public/images"));
              }
            
        },
        filename:(req,file,callback)=>{
            const f=file.originalname.substring(0,file.originalname.lastIndexOf("."));
            const name=f.split(" ").join("_");
            const extension=MIME_TYPE[file.mimetype];
            callback(null,name+Date.now()+"."+extension);
        },
    }),
    limits:{fileSize :5*1024*1024},
}).single("image");