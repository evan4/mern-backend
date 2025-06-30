import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
});

const fileFIlter = (req, file, cb) => {
  const allowedType = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg, png or jpg are allowed formats"), false);
  }
}

const upload = multer({
  storage: fileFIlter,
})

export default upload;
