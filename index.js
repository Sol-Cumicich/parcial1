import express from "express";

const app = express();

//middleware - el servidor interpreta mejor los datos complejos
app.use(express.urlencoded({extended: true}))

// app.post("/")
// app.put("/")
// app.delete("/")

app.get("/", (req, res) => {
    res.send("Hola con express!")
})

app.get("/params/:id", (req, res) => {
    let id = req.params.id;
    res.send(`Tu id es: ${id}`)
})

const usuarios = [
    {id: 1, nombre: "Sol", apellido: "Cumicich", edad: 34, userType: "Escritor"},
    {id: 2, nombre: "Evelyn", apellido: "Oliveira", edad: 32, userType: "Lector"},
    {id: 2, nombre: "Alex", apellido: "Rivero", edad: 26, userType: "Escritor"},
    {id: 3, nombre: "Solange", apellido: "Oliveira", edad: 32, userType: "Lector"}
]

const fanfics = [
    {id: 1, foto: "", titulo: "Fanfic1", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", autor: "userName1"},

    {id: 2, foto: "", titulo: "Fanfic2", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", autor: "userName1"},

    {id: 3, foto: "", titulo: "Fanfic3", descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", autor: "userName1"}
]

app.get("/users", (req, res) => {
    res.send(usuarios)
})

app.get("/users/userType", (req, res) => {
    let userType = req.query.userType;
    if(!userType || (userType !== "Escritor" && userType !== "Lector")) return res.send({error: "Tipo de usuario no valido"});
    let filtrado = usuarios.filter(u => u.userType === userType);
    res.send({usuarios: filtrado})
})

app.get("/fanfics", (req, res) => {
    res.send(fanfics)
})

app.get("/fanfics/filterbyid/:id", (req, res) => {
    let fanficId = req.params.id;
    let fanfic = fanfics.find(f => f.id === parseInt(fanficId));
    if(!fanfic) return res.send({error: "3312: Fanfic no encontrado!"});
    res.send({fanfic})
})


//lista de lectura - posible ruta
//filtrado por etiquetas
//


app.listen(3000, () => console.log("server running on port... \n open in https://localhost:3000"))