const express = require("express");
const { Request, Response } = require("express");
const home = require("../../../models/conferenceModule/home");
const HomeController = require("../crud/home");

const router = express.Router();
const homeController = new HomeController();
const { checkRole } = require("../../checkRole.middleware");

router.get("/", async (req, res) => {
  try {
    const homeData = await homeController.getHome();
    res.status(200).json(homeData);
  } catch (e) {
    console.error("Error getting home data:", e);
    res
      .status(e?.code || 500)
      .json({ error: e?.message || "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const homeData = await homeController.getHomeById(req.params.id);
    res.status(200).json(homeData);
  } catch (e) {
    console.error("Error getting home data:", e);
    res
      .status(e?.code || 500)
      .json({ error: e?.message || "Internal server error" });
  }
});

router.get("/conf/:id", async (req, res) => {
  try {
    const homeData = await homeController.getHomeByConfId(req.params.id);
    res.status(200).json(homeData);
  } catch (e) {
    console.error("Error getting home data:", e);
    res
      .status(e?.code || 500)
      .json({ error: e?.message || "Internal server error" });
  }
});

router.post("/",checkRole(['EO']), async (req, res) => {
  try {
    const newHome = req.body;
    await homeController.addHome(newHome);
    res.status(201).json({ response: "Home Added Successfully" });
  } catch (e) {
    console.error("Error adding home data:", e);
    res
      .status(e?.code || 500)
      .json({ error: e?.message || "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedHome = req.body;
    await homeController.updateHome(updatedHome, req.params.id);
    res.status(200).json({ response: "Home Updated Successfully" });
  } catch (e) {
    console.error("Error updating home data:", e);
    res
      .status(e?.code || 500)
      .json({ error: e?.message || "Internal server error" });
  }
});

router.delete("/:id",checkRole(['EO']), async (req, res) => {
  try {
    await homeController.deleteHome(req.params.id);
    res.status(200).json({ response: "Home Deleted Successfully" });
  } catch (e) {
    console.error("Error deleting home data:", e);
    res
      .status(e?.code || 500)
      .json({ error: e?.message || "Internal server error" });
  }
});

module.exports = router;
