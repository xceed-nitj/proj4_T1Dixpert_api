const express = require("express");
const LockTimeTableRouter = express.Router();
const LockTimeTableController = require("../controllers/locktimetable");
const locktimetableController = new LockTimeTableController();
const protectRoute =require("../../usermanagement/privateroute")

LockTimeTableRouter.post("/locktt",protectRoute, async (req, res) => {
    try { 
      await locktimetableController.locktt(req, res);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });

  
  LockTimeTableRouter.get("/lockclasstt/:code/:sem", async (req, res) => {
    try { 
      await locktimetableController.classtt(req, res);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });



  LockTimeTableRouter.get("/lockfacultytt/:code/:faculty", async (req, res) => {
    try { 
      await locktimetableController.facultytt(req, res);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });

  LockTimeTableRouter.get("/lockroomtt/:code/:room", async (req, res) => {
    try { 
      await locktimetableController.roomtt(req, res);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });


// view timetable final

LockTimeTableRouter.get("/viewsem/:degree/:dept/:sem", async (req, res) => {
  try { 
    await locktimetableController.classtt(req, res);
  } 
  catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});



LockTimeTableRouter.get("/viewfaculty/:session/:faculty", async (req, res) => {
  try { 
    await locktimetableController.facultytt(req, res);
  } 
  catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});

LockTimeTableRouter.get("/viewroom/:session/:room", async (req, res) => {
  try { 
    await locktimetableController.roomtt(req, res);
  } 
  catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});



LockTimeTableRouter.get("/viewsem/:code", async (req, res) => {
  try { 
    const code=req.params.code;
   const updatedTime= await locktimetableController.getLastUpdatedTimeByCode(code);
   res.json({updatedTime})
  } 
  catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});

LockTimeTableRouter.delete("/deletebycode/:code",protectRoute, async (req, res) => {
  try {
    const code = req.params.code;
    await locktimetableController.deleteLockedTableByCode(code);
    res.status(200).json({ response: `Locked Time Table with code ${code} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




  module.exports = LockTimeTableRouter;