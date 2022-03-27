import express from "express";
import SchoolModel from "../model/school.model";

const router = express.Router();
type School = {
  name: string;
};
router.get("/", async (req, res) => {
  const data: SchoolModel[] = await SchoolModel.findAll();
  return res.status(200).json(data);
});

router.post("/", (req, res) => {
  const school: School = req.body as School;
  if (!school) {
    return res.status(400).json();
  }
  SchoolModel.create({
    name: school.name,
  });
  return res.status(201).json();
});
router.get("/:schoolId", async (req, res) => {
  const { schoolId } = req.params;
  if (!schoolId) {
    return res.status(400).json();
  }
  const schoolIdNumber = parseInt(schoolId, 10);
  const school: SchoolModel | null = await SchoolModel.findByPk(schoolIdNumber);
  if (!school) {
    return res.status(404).json();
  }
  return res.status(200).json(school);
});
export default router;
