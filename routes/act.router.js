const { Router } = require("express");

const ClassTable = require("../models/act").Act;

const router = Router();

const Act = new ClassTable();

router.post("/", async (req, res) => {
  const body = req.body;

  body.dataCreated = Date.now();
  console.log(body);
  const { error, data } = await Act.new(body);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.get("/", async (req, res) => {
  const body = req.query;

  if (body.id) {
    const { data, error } = await Act.findById(body.id);

    if (error) return res.status(400).send({ error });

    return res.send({ data });
  }

  const { data, error } = await Act.all();

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.delete("/", async (req, res) => {
  const body = req.body;

  const { data, error } = await Act.deleteById(body.id);

  if (error) return res.status(400).send({ error });

  res.send({ data });
});

router.put("/", async (req, res) => {
  const body = req.body;

  const { data, error } = await Act.findById(body.id);

  if (error) return res.status(400).send({ error });

  if (typeof data === "string") return res.status(200).send({ data });

  const result = await Act.update(body, data);

  if (result.error) return res.status(400).send({ error });

  res.send({ data: result.data });
});

module.exports = router;
