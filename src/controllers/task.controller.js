
import Task from '../models/Task' // <= import the db schema
import { getPagination } from '../libs/getPagination'


//-----------------------------------------------------------------------------------------get all tasks

/* NO PAGINATION
export const getAll = async (req,res)=>{
    try {
        const allTasks = await Task.find()
        res.send(allTasks)
    } catch (error) {
        res.status(500).json({
            message: error.message || "something goes wrong retrieving tasks"
        })
    }
    
}
*/

export const getAll = async (req,res)=>{
    try {

        const {size, page} = req.query
        const {limit, offset} = getPagination(page, size)

        const allTasks = await Task.paginate({}, {offset , limit})
        res.send(allTasks)
    } catch (error) {
        res.status(500).json({
            message: error.message || "something goes wrong retrieving tasks"
        })
    }
    
}
//-----------------------------------------------------------------------------------------creating a task


export const saveTask = async (req,res)=>{
    if (!req.body.title) {
        return res.status(400).send({message: 'content cannot be empty'})
    }

    try {
        const newTask = new Task ({
            title:req.body.title, 
            description:req.body.description,
            done: req.body.done? req.body.done : false
        })
    
        const taskSaved = await newTask.save()
        res.send(taskSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "something goes wrong SAVING tasks"
        })
    }
    
}

//-----------------------------------------------------------------------------------------get one task



export const oneTask= async (req,res)=>{
    const { id } = req.params

    try {
        const oneTask = await Task.findById(id)
        if (!oneTask) return res.status(404).json({ message: `task ${id} does not exist` })
        res.json(oneTask)
    } catch (error) {
        res.status(500).json({
            message: error.message || `error retrieving task with id: ${id}`})
    }

}

    
//-----------------------------------------------------------------------------------------delet a task



export const deleteTask= async(req,res)=>{
    const {id} = req.params

    try {
        
    await Task.findByIdAndDelete(id)
    res.json({message : `Tarea Eliminada ${id}`})

    } catch (error) {
        
    res.status(500).json({
        message: error.message || `Cannot delete task with id: ${id}`})
    }

}



//-----------------------------------------------------------------------------------------filter all done tasks
export const getAlldone = async(req,res)=>{
    const alldoneTasks = await Task.find({done:true})
    res.send(alldoneTasks)

}



//-----------------------------------------------------------------------------------------update a task
export const updateTask = async(req,res)=>{
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body)
    res.json({message:"task was updated"})

}