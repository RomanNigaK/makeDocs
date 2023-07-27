const { Router } = require("express");
const verification = require("../middleware/project.valid");
const ClassTable = require("../models/project").Project;
const router = Router();

const Project = new ClassTable();

router.post("/", async (req, res) => {
  const body = req.body;
  console.log(body);
  body.dataCreated = Date.now();

  const { error, data } = await Project.new(body);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.delete("/", verification, async (req, res) => {
  const body = req.body;

  const { data, error } = await Project.deleteById(body.id);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

//получение всей таблицы
router.get("/", async (req, res) => {
  const body = req.query;

  if (body.id) {
    const { data, error } = await Project.findById(body.id);

    if (error) return res.status(400).send({ error });

    return res.send({ data });
  }

  const { data, error } = await Project.all();

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.put("/", async (req, res) => {
  const body = req.body;

  const { data, error } = await Project.findById(body.id);

  if (error) return res.status(400).send({ error });

  if (typeof data === "string") return res.status(200).send({ data });

  const result = await Project.update(body, data);

  if (result.error) return res.status(400).send({ error });

  res.send({ data: result.data });
});

module.exports = router;
