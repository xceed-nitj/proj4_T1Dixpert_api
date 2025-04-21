const express = require("express");
const ClassTimeTableRouter = express.Router();
const ClassTimeTableController = require("../controllers/classtimetable");
const classtimetableController = new ClassTimeTableController();


ClassTimeTableRouter.post("/savett", async (req, res) => {
    try { 
      await classtimetableController.savett(req, res);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });

  ClassTimeTableRouter.post("/saveslot/:day/:slot", async (req, res) => {
    try { 
      await classtimetableController.saveslot(req, res);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });




  ClassTimeTableRouter.get("/viewclasstt/:code/:sem", async (req, res) => {
    try { 
      await classtimetableController.classtt(req, res);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });



  ClassTimeTableRouter.get("/viewfacultytt/:code/:facultyname", async (req, res) => {
    try { 
      await classtimetableController.facultytt(req, res);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });

  ClassTimeTableRouter.get("/viewroomtt/:code/:room", async (req, res) => {
    try { 
      await classtimetableController.roomtt(req, res);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });

  ClassTimeTableRouter.delete("/deletebycode/:code", async (req, res) => {
    try {
      const code = req.params.code;
      await classtimetableController.deleteClassTableByCode(code);
      res.status(200).json({ response: `Class Time Table with code ${code} deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  ClassTimeTableRouter.post("/savelunchslot", async (req, res) => {
    try { 
      const lunchrecord = await classtimetableController.savelunchslot(req, res);
      res.status(200).json(lunchrecord);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });

  ClassTimeTableRouter.get("/getlunchslot/:code", async (req, res) => {
    try { 
      const record = await classtimetableController.getlunchslot(req, res);
      // res.status(200).json(record);
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });

  ClassTimeTableRouter.delete("/deletelunchslot/:id", async (req, res) => {
    try { 
      const record = await classtimetableController.deletelunchslot(req, res);
      res.status(200).json({message:"record deleted successfully"});
    } 
    catch (e) {
      res
        .status(e?.status || 500)
        .json({ error: e?.message || "Internal Server Error" });
    }
  });

  module.exports = ClassTimeTableRouter;