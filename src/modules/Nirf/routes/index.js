const express = require('express');
// const path = require('path');
// const fileUploadMiddleware = require('../controller/uploadFileMiddleWare.js');
// const { findPaper, findAllPapers, updatePaper } = require('../controller/papers.js');
// const uploadPaper = require('../controller/uploadFile.js');
// const reupload = require('../controller/reupload.js');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// router.get('/papers', findAllPapers)
// router.get('/paper/:id', findPaper)   // To find paper using paperId (not _id)
// router.patch('/paper/:id', updatePaper)  // To update paper using paperId (not _id)
// router.post('/upload', fileUploadMiddleware, uploadPaper);
// router.get('/delete', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index2.html'));
// });
// router.post('/delete/:id', reupload);

router.use('/ranking', require('./nirfroutes.js'));
module.exports = router;