import express, { response } from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.nextTick.PORT || 3000;
let users = [
    { id: 1, name: 'Leandro Almeida', age: 41},
    { id: 2, name: 'Cida Ambrosio', age: 74 }
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor express.</h1>');
});

//get users
app.get('/users', (request, response) => {
    return response.send(users);
})

//get user
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId
    const user = users.find(user => {
        return (user.id === Number(userId))
    })
    return response.send(user);
})

//post
app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    //return response.status(201).send(newUser);
    return response.status(StatusCodes.CREATED).send(newUser);
});

//put
app.put('/users/:userId', (request, response) =>{
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }

        return user;
    });

    return response.status(StatusCodes.ACCEPTED).send(updatedUser);
});

//delete
app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});

