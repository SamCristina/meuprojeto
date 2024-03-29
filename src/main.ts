import express from "express";
import { db, firestore } from '../banco de dados/firebase';
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",

}))

app.get('/', (re, res) => {
    res.send("bem vindo a minha API");
})

app.post("/formulario", async (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone
    const email = req.body.email
    const descricao = req.body.descricao

    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'formulario'), {
            nome: nome,
            telefone: telefone,
            email: email,
            descricao: descricao
        })

        res.send("formulario adicionado: " + docRef.id)
    } catch (e) {
        console.log(e)

        res.status(500).send(e)
    }

});

app.get('/listarformulario', async (req, res) => {

    try {
        const usuarios = await firestore.getDocs(firestore.collection(db, 'formulario'))

        const usuariosLista = usuarios.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        res.send(usuariosLista)
    } catch (e) {
        console.log("Erro ao Listar Formulario: " + e)

        res.status(500).send("Erro ao Listar Formulario: " + e)


    }
})

app.put('/atualizarFormulario/:id', async (req, res) => {
    const id = req.params.id
    const nome = req.body.nome

    try {
        await firestore.updateDoc(firestore.doc(db, 'formulario', id), {
            nome: nome,
        })

        res.send('Formulario atualizado com sucesso')

    } catch (e) {
        console.log('Erro ao atualizar Formulario: ' + e)

        res.status(500).send('Erro ao atualizar Formulario: ' + e)
    }

})

app.delete('/deletarFormulario/:id', async (req, res) => {
    const id = req.params.id

    try {
        await firestore.deleteDoc(firestore.doc(db, 'formulario', id))

        res.send('Formulario deletado com sucesso!')
    } catch (e) {
        console.log('Error ao deletar Formulario: ' + e)
        res.status(500).send('Error ao deletar Formulario: ' + e)

    }
})


app.listen(3000, function () {
    console.log("servidor rodando em http://localhost:3000");
});
