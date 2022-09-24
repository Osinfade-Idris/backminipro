const express = require('express')
const router = express.Router();
const {
    getPeople,getSinglePerson,createPerson,editPerson,deletePerson
} = require('../controllers/people')

//api/people will be set as base path, so we need to remocve it here

// router.post('/',createPerson)
// router.put('/:id',editPerson )
// router.delete('/:id',deletePerson )
// router.get('/',getPeople)
// router.get('/:name',getSinglePerson)

//use route chaining

router.route('/').get(getPeople).post(createPerson);
router.route('/:id').put(editPerson).delete(deletePerson);
router.route('/:name').get(getSinglePerson);

module.exports = router