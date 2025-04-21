const express = require("express");
const { findAllPapers,updateDecision,addAuthorbyId ,addReviewer, findEventPaper, findPaper, updatePaper, removeReviewer, findPaperById,findPaperByReviewer,findPaperByAuthor, addAuthor, PaperCountByTrack, PaperStatusCount, ReviewsStatusCount, dupliCheck, download } = require("../controller/papers");
const fileUploadMiddleware = require("../controller/uploadFileMiddleWare");
const uploadPaper = require("../controller/uploadFile");
const privateroute = require("../../usermanagement/privateroute");
const reupload = require("../controller/reupload");
const router = express.Router();
const path = require('path');
router.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (for API requests)
router.use(express.json());
router.get("/uploadpaper", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
router.get("/reuploadpaper", (req, res) => {
  res.sendFile(path.join(__dirname, "index2.html"));
});

router.get("/", findAllPapers);
router.get("/duplicheck/:id",dupliCheck);//checking is same paper is being uploaded
router.get("/:id", findEventPaper);
router.get("/paper/:id", findEventPaper);// To find paper using paperId (not _id)
router.get("/getPaperDetail/:id",findPaperById);
router.get("/reviewer/:id", findPaperByReviewer);//to find paper using UserID
router.get("/author/:id", findPaperByAuthor);//to find paper using UserID
router.get("/trackcount/:id",PaperCountByTrack);
router.get("/trackreviews/:id",ReviewsStatusCount);
router.get("/status/:id",PaperStatusCount); //to count status of paper
router.post("/addpaper/:id", fileUploadMiddleware, uploadPaper); // upload paper
router.post("/downloadPaper",download);
router.post('/addReviewer/:id', addReviewer);
router.patch('/addAuthor/:paperId/:authorId', addAuthorbyId);
router.post('/addAuthor', addAuthor);
router.post('/removeReviewer/:id', removeReviewer);
router.post("/reuploadPaper/:id", fileUploadMiddleware, reupload);
router.patch("/:id", updatePaper); // By _id
router.patch('/updateDecision/:eventId/:paperId', updateDecision);


module.exports = router;
