import * as functions from 'firebase-functions';
import {
    auth,
    db
} from '../db/index';

export const newWalk = functions.https.onRequest((request, response) =>{
    console.log('lol');

    if(request.method !== 'POST'){
        response.status(400).send('Error');
    }

    const walk = request.body.walk;

    db.ref('walk_unassigned').push().set({
        address : walk.adress,
        dog : walk.dog,
        date : walk.date,
        time : walk.time,
        value : walk.value
    })
    .then(() => {
        response.status(200).send('Walk addes successfully');
    })
    .catch(error => {
        response.status(400).send(error);
    })
})