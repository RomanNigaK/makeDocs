const { Router } = require("express");

const ClassTable = require("../models/workStage").WorkStages;
const ClassTable2 = require("../models/standard").Standards;

const router = Router();

const WorkStages = new ClassTable();
const Standards = new ClassTable2();

router.post("/", async (req, res) => {
  const body = req.body;

  body.dataCreated = Date.now();
  //проверяем если такой стандарт

  {
    const { error, data } = await Standards.findById(body.standards);

    if (error) return res.status(400).send({ error });

    if (typeof data === "string")
      return res.send({ data: "not id in standards table" });
  }

  const { error, data } = await WorkStages.new(body);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.get("/", async (req, res) => {
  const body = req.query;

  if (body.id) {
    const { data, error } = await WorkStages.findById(body.id);

    if (error) return res.status(400).send({ error });

    return res.send({ data });
  }

  const { data, error } = await WorkStages.all();

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.delete("/", async (req, res) => {
  const body = req.body;

  const { data, error } = await WorkStages.deleteById(body.id);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.put("/", async (req, res) => {
  const body = req.body;

  //проверяем если такой стандарт

  {
    const { error, data } = await Standards.findById(body.standards);

    if (error) return res.status(400).send({ error });

    if (typeof data === "string")
      return res.send({ data: "not id in standards table" });
  }

  const { data, error } = await WorkStages.findById(body.id);

  if (error) return res.status(400).send({ error });

  if (typeof data === "string") return res.status(200).send({ data });

  const result = await WorkStages.update(body, data);

  if (result.error) return res.status(400).send({ error });

  res.send({ data: result.data });
});

module.exports = router;
