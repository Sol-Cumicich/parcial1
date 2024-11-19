import express from "express";

const app = express();
const port = 3000;
app.use(express.json())

// app.delete("/")

app.get('/', (req, res) => {
    res.send("Hola con express!")
})

app.get('/params/:id', (req, res) => {
    let id = req.params.id;
    res.send(`Tu id es: ${id}`)
})

const users = [
    {id: 1, name: "Sol", lastname: "Cumicich", age: 34, userType: "Escritor", email: "sol@gmail.com"},
    {id: 2, name: "Evelyn", lastname: "Oliveira", age: 32, userType: "Lector", email: "eve@gmail.com"},
    {id: 3, name: "Alex", lastname: "Rivero", age: 26, userType: "Escritor", email: "alex@gmail.com"},
    {id: 4, name: "Solange", lastname: "Oliveira", age: 32, userType: "Lector", email: "solange@gmail.com"}
]

const fanfics = [
    {id: 1, foto: "", titulo: "Fanfic1", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", autor: "userName1"},

    {id: 2, foto: "", titulo: "Fanfic2", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", autor: "userName1"},

    {id: 3, foto: "", titulo: "Fanfic3", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", autor: "userName1"}
]

/*-------------------------------------USERS------------------------------*/

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/users/userType', (req, res) => {
    let userType = req.query.userType;
    if(!userType || (userType !== "Escritor" && userType !== "Lector")) return res.send({error: "Tipo de usuario no valido"});
    let filtrado = users.filter(u => u.userType === userType);
    res.send({users: filtrado})
})

app.get('/users/filterbyid/:id', (req, res) => {
    let userId = parseInt(req.params.id);
    let user = users.find(u => u.id === userId);

    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message: "Usuario no encontrado!", code: 3312})
    }
})

//Crear Usuario
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        lastname: req.body.lastname,
        age: req.body.age,
        userType: req.body.userType,
        email: req.body.email
    }

    users.push(newUser);
    res.status(201).json(newUser)
});

//Actualizar Usuario
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex !== -1){
        users[userIndex] = {id: userId, ...req.body};
    }
});


/*---------------------FANFIC-------------------------*/

app.get('/fanfics', (req, res) => {
    res.send(fanfics)
})

app.get('/fanfics/filterbyid/:id', (req, res) => {
    let fanficId = parseInt(req.params.id);
    let fanfic = fanfics.find(f => f.id === fanficId);

    if(fanfic){
        res.status(200).json(fanfic);
    }else{
        res.status(404).json({message: "Fanfic no encontrado!", code: 3312})
    }
})


//lista de lectura - posible ruta
//filtrado por etiquetas
//


app.listen(port, () => {
    console.log(`server running on port... \n open in https://localhost:${port}`);
})