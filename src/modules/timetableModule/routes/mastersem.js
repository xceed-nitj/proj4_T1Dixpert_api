const express = require("express");
const mastersemRouter = express.Router();
const MastersemController = require("../controllers/mastersemprofile");
const mastersemController = new MastersemController();

const ttadminRoute=require("../../usermanagement/ttadminroute")


// mastersemRouter.use(["/","/:id"], customMiddleware);



mastersemRouter.post("/",ttadminRoute, async (req, res) => {
  try {
    await mastersemController.createSemester(req, res);
  } catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});

mastersemRouter.get("/", async (req, res) => {
  try {
    await mastersemController.getSemester(req, res);
  } catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});

mastersemRouter.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await mastersemController.getSemesterById(id);
    res.status(200).json(resp);
  } catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});

mastersemRouter.get("/dept/:dept", async (req, res) => {
  try {
    const department = req.params.dept;
    const resp = await mastersemController.getSemesterByDepartment(department);
    res.status(200).json(resp);
  } catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});


mastersemRouter.put('/:id',ttadminRoute, async (req, res) => {
  try {
    const semesterId = req.params.id;
    const updatedSemester = req.body;
    await mastersemController.updateSemester(
      semesterId, updatedSemester
    );
    res.status(200).json({ response: "Semester updated successfully" });
  } catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});

mastersemRouter.delete("/:id",ttadminRoute, async (req, res) => {
  try {
    const semesterId = req.params.id;
    await mastersemController.deleteSemester(semesterId);
    res.status(200).json({ response: "Semester deleted successfully" });
  } catch (e) {
    res
      .status(e?.status || 500)
      .json({ error: e?.message || "Internal Server Error" });
  }
});

mastersemRouter.get('/dept', async (req, res) => {
  try {
    const departments = await mastersemController.getDepartments(); 
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = mastersemRouter;
