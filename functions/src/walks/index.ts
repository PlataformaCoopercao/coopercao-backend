import * as functions from 'firebase-functions';
import {
    auth,
    db
} from '../db/index';
import { ClientResponse } from 'http';

export const newWalk = functions.https.onRequest((request, response) =>{
    console.log('lol');

    if(request.method !== 'POST'){
        response.status(400).send('Error');
    }

    const walk = request.body.walk;

    let myRef = db.ref('walk_unassigned').push();
    myRef.set({
        id : myRef.key,
        address : walk.address,
        dog : walk.dog,
        date : walk.date,
        time : walk.time,
        value : walk.value,
        walk_type : walk.walk_type,
        owner_month_year : walk.owner_month_year 
    })
    .then(() => {
        response.status(200).send('Walk addes successfully');
    })
    .catch(error => {
        response.status(400).send(error);
    })
})

export const assignWalk = functions.https.onRequest((request, response) =>{

    if(request.method !== 'POST'){
        response.status(400).send('Error');
    }

    const walk = request.body.walk;
    const walker = request.body.walker;

    let myRef = db.ref('walk_assigned').push();
    myRef.set({
        id : myRef.key,
        address : walk.address,
        dog : walk.dog,
        date : walk.date,
        time : walk.time,
        value : walk.value,
        walk_type : walk.walk_type,
        owner_month_year : walk.owner_month_year,
        walker : walker
    })
    .then(() => {
      return db.ref('walk_unassigned/'+ walk.id).remove()
    })
    .then(() => {
        response.status(200).send('the walk was assigned successfully');
    })
    .catch(error => {
        response.status(400).send(error);
    })
})

export const endWalk = functions.https.onRequest((request, response) =>{
    if(request.method != 'POST'){
        response.status(400).send('Error, request must be POST');
    }

    const walk = request.body.walk;
    const activities = request.body.activities;
    const photoUrls = request.body.photoUrls;
    const walk_duration = request.body.walk_duration;
    const feedback = request.body.feedback;
    const route = request.body.route;
    const obs = request.body.obs;

    let myRef = db.ref('walk_history').push();
    myRef.set({
        id: myRef.key,
        address : walk.address,
        dog : walk.dog,
        date : walk.date,
        time : walk.time,
        value : walk.value,
        walk_type : walk.walk_type,
        owner_month_year : walk.owner_month_year,
        walker : walk.walker,
        activities: activities,
        photoUrls: photoUrls,
        walk_duration : walk_duration,
        feedback:feedback,
        route : route,
        obs: obs
    })
    .then(() => {
        response.status(200).send('The walk ended successfully');
    })
    .catch(error =>{
        response.status(500).send(error);
    })
})