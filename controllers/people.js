const {people} = require('../data')

const getPeople = (req,res)=>{
    res.status(200).json({
        success: true,
        data: people
    })
}
const getSinglePerson =  (req,res)=>{
    const {name} = req.params;

    const onePerson = people.find((person)=>{
        return  person.name === name;
    })
    if(!onePerson){
        return res.status(400).send({
            success: true,
            data: [],
            mesg: 'Person does not exist'
        })
    }
    res.status(200).json(onePerson);
}
const createPerson = (req,res)=>{
    const{name} = req.body;
    if(!name)
    {
        return res.status(400).json({
            success: false,
            msg: "Please provide creential"

        })
    }
    res.status(201).json({
        success : true,
        people : name
    })
}
const editPerson = (req,res)=>{
    const {id} = req.params;
    //then what you want to change

    const {name} = req.body;
    const prod =  people.find((pers)=>{
       return pers.id === Number(id)
    })
    if(!prod){
        return res
        .status(404)
        .json({
            success: false,
            msg: `person with id: ${id} does not exist`
        })
    } else{
        prod["name"] = name;

    }
    res.send(people)
}
const deletePerson = (req,res)=>{
    const {id} = req.params;
    //then what you want to change

    const prod =  people.find((pers)=>{
       return pers.id === Number(id)
    })
    if(!prod){
        return res
        .status(404)
        .json({
            success: false,
            msg: `person with id: ${id} does not exist`
        })
    } 
    const newPeople = people.filter((persons)=>{
        return persons.id !== Number(id);
    })
    res
    .status(200)
    .json({
        success: true,
        data: newPeople
    })
}

module.exports= {
    getPeople,getSinglePerson,createPerson,editPerson,deletePerson
}