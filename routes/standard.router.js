const { Router } = require("express");

const StandardsClass = require("../models/standard").Standards;
const WorkStagesClass = new require("../models/workStage").WorkStages;

const router = Router();

const Standards = new StandardsClass();
const WorkStages = new WorkStagesClass();

router.post("/", async (req, res) => {
  const body = req.body;

  body.dataCreated = Date.now();

  const { error, data } = await Standards.new(body);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.get("/", async (req, res) => {
  const body = req.query;

  if (body.id) {
    const { data, error } = await Standards.findById(body.id);

    if (error) return res.status(400).send({ error });

    return res.send({ data });
  }

  const { data, error } = await Standards.all();

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.delete("/", async (req, res) => {
  const body = req.body;

  {
    //проверяем что нельзя удалить standard которые есть в связанных таблицах
    // - workareas
    const { data, error } = await WorkStages.findById(body.id, "standards");

    if (error) return res.status(400).send({ error });
    if (typeof data === "object")
      return res.send({ data: "this standards use table workStage" });
  }

  const { data, error } = await Standards.deleteById(body.id);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.put("/", async (req, res) => {
  const body = req.body;

  const { data, error } = await Standards.findById(body.id);

  if (error) return res.status(400).send({ error });

  if (typeof data === "string") return res.status(200).send({ data });

  const result = await Standards.update(body, data);

  if (result.error) return res.status(400).send({ error });

  res.send({ data: result.data });
});

module.exports = router;
