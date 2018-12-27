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

})