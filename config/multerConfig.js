import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,"public/uploads")
    },
    filename:(req,file,cb)=>{
        const primage = 'Image' + Date.now() + file.originalname
        cb(null,primage)
    }
})
const upload = multer({storage:storage})

export default upload