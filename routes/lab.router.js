const { Router } = require("express");
const file = require("../middleware/uploadFile");
const ClassTable = require("../models/lab").Labs;

const router = Router();

const Labs = new ClassTable();

router.post("/", file.single("file"), async (req, res) => {
  const body = req.body;

  if (req.errorFile) return res.status(400).send({ error: req.errorFile });
  body.dataCreated = Date.now();

  const { error, data } = await Labs.new(body);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.get("/", async (req, res) => {
  const body = req.query;

  if (body.id) {
    const { data, error } = await Labs.findById(body.id);

    if (error) return res.status(400).send({ error });

    return res.send({ data });
  }

  const { data, error } = await Labs.all();

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.delete("/", async (req, res) => {
  const body = req.body;

  console.log(body);

  const { data, error } = await Labs.deleteById(body.id);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.put("/", file.single("file"), async (req, res) => {
  const body = req.body;

  const { data, error } = await Labs.findById(body.id);

  if (error) return res.status(400).send({ error });

  if (typeof data === "string") return res.status(200).send({ data });

  const result = await Labs.update(body, data);

  if (result.error) return res.status(400).send({ error });

  res.send({ data: result.data });
});

module.exports = router;
