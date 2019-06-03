module.exports = app =>{
    const Tasks = app.db.models.Tasks

    app.route('/tasks')
        .get((req, res)=>{
            // "/tasks": Lista de tarefas
            Tasks.findAll({})
                .then(result =>{
                    res.json(result)
                })
                .catch(err =>{
                    res.status(412).json({msg: err.message});
                })
        })
        .post((req, res)=>{
            // "/tasks": Cadastra uma nova tarefa
            Tasks.create(req.body)
            .then(result =>{
                res.json(result)
            })
            .catch(err=>{
                res.status(412).json({msg: err.message});
            })
        });
        
    app.route('/tasks/:id')
        .get((req, res)=>{
            // "/tasks/1": Consulta 1 tarefa
            Tasks.findOne({where: req.params})
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
            Tasks.update(req.body, {where: req.params})
                .then(result =>{
                    res.sendStatus(204);
                })
                .catch(err=>{
                    res.status(412).json({msg: err.message});
                });
        })
        .delete((req, res)=>{
            // "/tasks/1": Deleta 1 tarefa
            Tasks.destroy({where: req.params})
                .then(result=>{
                    res.sendStatus(204);
                })
                .catch(err=>{
                    res.status(412).json({msg: err.message});
                });
        });
};