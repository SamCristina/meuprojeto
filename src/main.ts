import express from "express";
import {db, firestore} from '../banco de dados/firebase';

const app = express();

app.use(express.json())

app.get('/', (re, res) => {
    res.send("bem vindo a minha API");
})

app.post("/usuario", async(req,res)=>{
    const nome = req.body.nome;
    const email = req.body.email
    const telefone = req.body.telefone

    try{
        const docRef = await firestore.addDoc(firestore.collection(db, 'usuarios'),{
            nome: nome,
            email: email,
            telefone: telefone
        })

        res.send("usuario adicionado: " + docRef.id)
    }catch(e){
        console.log(e)

        res.status(500).send(e)
    }

});

app.get('/listarUsuarios', async (req, res) =>{

    try {
        const usuarios = await firestore.getDocs(firestore.collection(db, 'usuarios'))

 const usuariosLista = usuarios.docs.map((doc)=>({
    id:doc.id,
    ...doc.data(),
 }))
 res.send(usuariosLista)
    } catch (e) {
        console.log("Erro ao Listar Usuarios: " + e)

        res.status(500).send("Erro ao Listar Usuarios: " + e)

        
    }
})

app.put('/atualizarUsuario/:id', async (req, res) => {
    const id = req.params.id
    const nome = req.body.nome

    try {
        await firestore.updateDoc(firestore.doc(db, 'usuarios', id), {
            nome: nome,
        })

    res.send('Usuario atualizado com sucesso')

    } catch (e) {
     console.log('Erro ao atualizar usuario: ' + e)

     res.status(500).send('Erro ao atualizar usuario: ' + e)
    }

})

app.listen(3000, function () {
    console.log("servidor rodando em http://localhost:3000");
});