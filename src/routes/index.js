const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({"Estado del servidor":"Funcionando"});
});

module.exports = router;