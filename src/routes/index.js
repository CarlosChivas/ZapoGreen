const {Router} = require('express');
const router = Router();
const admin = require('firebase-admin');


var serviceAccount = require("Credencial de base de datos");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'Ruta de base de datos',
});

const db = admin.database();

router.get('/',(req,res) =>{
    res.render('home');
});

router.get('/semaforo-calidad',(req,res) =>{
    db.ref().once('value', (snapshot) =>{
        const data = snapshot.val();
        const rioPrueba = (data.Temperatura_C + data.oxigenoD + data.PH)/3;
        res.render('tabla1',{datos:data.Niveles, rio:rioPrueba, layout:'layTabla1'});
    })
});

router.get('/comparacion',(req,res) =>{
    db.ref().once('value', (snapshot) =>{
        const data = snapshot.val();
        const rioPrueba = (data.Temperatura_C + data.oxigenoD + data.PH)/3;
        res.render('grafica1',{datos:data.Niveles, rio: rioPrueba, layout:'layGrafica'});
    });
});

router.get('/dashboard',(req,res) =>{
    res.render('dashboard',{layout:'layDashboard'})
});


module.exports = router;
