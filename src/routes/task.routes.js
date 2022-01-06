//URLs definition

import {Router} from "express";
import * as TaskCtrl from '../controllers/task.controller'


const router = Router()

router.get('/', TaskCtrl.getAll)

router.get('/done', TaskCtrl.getAlldone)

router.get('/:id',TaskCtrl.oneTask)

router.post('/',TaskCtrl.saveTask)

router.delete('/:id',TaskCtrl.deleteTask)

router.put('/:id',TaskCtrl.updateTask)

export default router