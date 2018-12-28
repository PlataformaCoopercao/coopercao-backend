import * as functions from 'firebase-functions';
import {
    auth,
    db
} from '../db/index';

export const getWalker = functions.https.onRequest((request,response) =>{
    console.log('hue')

    const uid = request.body.uid;
    db.ref('walkers/' + uid)
    .once('value', snapshot => {
        response.status(200).send(snapshot.val());
    })
    .catch(error =>{
        response.status(400).send(error);
    })

    // auth.verifyIdToken(request.body.token)
    //     .then(decodedToken => {
    //         const uid = decodedToken.uid;
    //         db.ref('clients/' + uid).once('value', snapshot => {
    //             response.status(200).send(snapshot.val());
    //         })
    //     })
    //     .catch(error => {
    //         response.status(400).send(error);
    //     })

});

export const updateWalker = functions.https.onRequest((request, response) =>{
    const uid = request.body.uid;
    const walker = request.body.walker;

    db.ref('walkers/' + uid).update(walker)
    .then(() => {
        response.status(200).send('user updated succesfully');
    })
    .catch(error => {
        response.status(400).send(error);
    })


    // auth.verifyIdToken(request.body.token)
    //     .then(decodedToken => {
    //         const uid = decodedToken.uid;
    //         let walkerRef =  db.ref('walkers/' + uid);
    //         walkerRed.update(walker)
    //         response.status(200).send('user updated succesfully');
    //     })
    //     .catch(error => {
    //         response.status(400).send(error);
    //     })
});

export const getPasseiosAberto = functions.https.onRequest((request, response) => {

    db.ref('walk_unassigned').once("value")
    .then(snapshot => {
        const data = snapshot.val()
        response.send(data)
    })
    .catch(function (error) {
        console.log("Erro buscando passeios em aberto:", error);
        response.status(400).send(error)
    }); 
});