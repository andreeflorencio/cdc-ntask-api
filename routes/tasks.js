module.exports = app =>{
    const Tasks = app.db.models.Tasks

    app.route('/tasks')
        .all(app.auth.authenticate())
        .get((req, res)=>{
            // "/tasks": Lista de tarefas
            Tasks.findAll({where: {user_id: req.user.id}})
                .then(result =>{
                    res.json(result)
                })
                .catch(err =>{
                    res.status(412).json({msg: err.message});
                })
        })
        .post((req, res)=>{
            // "/tasks": Cadastra uma nova tarefa
            req.body.user_id=req.ser.id;
            Tasks.create(req.body)
            .then(result =>{
                res.json(result)
            })
            .catch(err=>{
                res.status(412).json({msg: err.message});
            })
        });
        
    app.route('/tasks/:id')
        .all(app.auth.authenticate())
        .get((req, res)=>{
            // "/tasks/1": Consulta 1 tarefa
            Tasks.findOne({where: {id: req.params.id, user_id: req.user.id}})
                .then(result=>{
                    if (result){
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }  
                })
                .catch(err=>{
                    res.status(412).json({msg: err.message});
                });
        })
        .put((req, res)=>{
            // "/tasks/1": Atualiza 1 tarefa
            Tasks.update(req.body, {where: {id: req.params.id, user_id: req.user.id}})
                .then(result =>{
                    res.sendStatus(204);
                })
                .catch(err=>{
                    res.status(412).json({msg: err.message});
                });
        })
        .delete((req, res)=>{
            // "/tasks/1": Deleta 1 tarefa
            Tasks.destroy({where: {id: req.params.id, user_id: req.user.id}})
                .then(result=>{
                    res.sendStatus(204);
                })
                .catch(err=>{
                    res.status(412).json({msg: err.message});
                });
        });
};