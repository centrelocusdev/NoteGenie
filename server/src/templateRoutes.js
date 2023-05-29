const router = require("express").Router();
const Template = require('./templateModal')
const User = require("./userModal");

router.post('/create-template', async (req, res) => {
  try {
    const template = new Template(req.body) 
    template.type = 'custom'

    await template.save()
    res.status(200).send({msg: 'template created successfully'})
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
})

router.get('/get-templates/:token', async (req, res) => {
  try {
    const token = req.params.token
    const user = await User.findOne({token})

    await template.save()
    res.status(200).send({msg: 'template created successfully'})
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
})

module.exports = router