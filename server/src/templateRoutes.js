const router = require("express").Router();
const Template = require('./templateModal')
const User = require("./userModal");

router.post('/create-template', async (req, res) => {
  try {
    console.log(req.body)
    const template = new Template(req.body) 

    await template.save()
    res.status(200).send({msg: 'template created successfully'})
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
})

router.get('/get-templates/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const templates = await Template.find({userId})

    res.status(200).send(templates)
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
})

router.delete('/delete-template/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Template.findByIdAndDelete(id)
    res.send({msg: 'deleted template successfuy'})
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
})

module.exports = router