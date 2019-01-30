import * as functions from 'firebase-functions';
import {
    auth,
    db
} from '../db/index';


export const newWalk = functions.https.onRequest((request, response) => {

    if (request.method !== 'POST') {
        response.status(400).send('Error');
    }

    const walk = request.body.walk;

    const myRef = db.ref('walk_unassigned').push();
    myRef.set({
            id: myRef.key,
            address: walk.address,
            dog: walk.dog,
            date: walk.date,
            obs_client: walk.obs_client,
            time: walk.time,
            value: walk.value,
            walk_type: walk.walk_type,
            owner_month_year: walk.owner_month_year
        })
        .then(() => {
            response.status(200).send('Walk addes successfully');
        })
        .catch(error => {
            response.status(400).send(error);
        })
})

export const assignWalk = functions.https.onRequest((request, response) => {

    if (request.method !== 'POST') {
        response.status(400).send('Error');
    }

    const walk = request.body.walk;
    const walker_id = request.body.walker_id;

    db.ref('walkers/' + walker_id).once('value')
        .then((snapshot) => {
            return snapshot.val();
        })
        .then(walkerData => {
            const myRef = db.ref('walk_assigned').push();
            return myRef.set({
                id: myRef.key,
                address: walk.address,
                dog: walk.dog,
                date: walk.date,
                time: walk.time,
                obs_client: walk.obs_client,
                value: walk.value,
                walk_type: walk.walk_type,
                owner_month_year: walk.owner_month_year,
                walker: walkerData
            })
        })
        .then(() => {
            return db.ref('walk_unassigned/' + walk.id).remove()
        })
        .then(() => {
            response.status(200).send('the walk was assigned successfully');
        })
        .catch(error => {
            response.status(400).send('Failed to assign walk');
        })
})

export const endWalk = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        response.status(400).send('Error, request must be POST');
    }

    const walk = request.body.walk;
    const walk_duration = request.body.walk_duration;
    const route = request.body.route;

    const myRef = db.ref('walk_history').push();
    myRef.set({
            id: myRef.key,
            address: walk.address,
            dog: walk.dog,
            date: walk.date,
            time: walk.time,
            value: walk.value,
            walk_type: walk.walk_type,
            owner_month_year: walk.owner_month_year,
            walker: walk.walker,
            //activities: activities,
            //photoUrls: photoUrls,
            walk_duration: walk_duration,
            //feedback: feedback,
            route: route,
            //obs: obs
        })
        .then(() => {
            return db.ref('walk_assigned/' + walk.id).remove()
        })
        .then(() => {
            response.status(200).send('The walk ended successfully');
        })
        .catch(error => {
            response.status(500).send(error);
        })
})

export const walkFeedback = functions.https.onRequest((request, response) => {
    if (request.method !== 'POST') {
        response.status(400).send('Error, request must be POST');
    }

    const walk_id = request.body.walk_id;
    const photoUrls = request.body.photoUrls;
    const obs = request.body.obs;
    const feedback = request.body.feedback;
    const activities = request.body.activities;

    const updates ={}
    updates['/walk_history/' + walk_id + '/photoUrls'] = photoUrls;
    updates['/walk_history/' + walk_id + '/obs'] = obs;
    updates['/walk_history/' + walk_id + '/feedback'] = feedback;
    updates['/walk_history/' + walk_id + '/activities'] = activities;

    db.ref().update(updates)
    .then(() =>{
        response.status(200).send('Histórico atualizado com sucesso');
    })
    .catch(error => {
        response.status(400).send(error);
    })

})

export const cancelAssignedWalk = functions.https.onRequest((request, response) =>{

    if(request.method !== 'POST'){
        response.status(400).send('Error, request must be POST');
    }

    const walk = request.body.walk;
    const cancelled_by = request.body.cancelled_by;

    db.ref('walk_cancelled/'+ walk.id)
    .set({
        walk:walk,
        cancelled_by:cancelled_by
    })
    .then(() => {
        return db.ref('walk_assigned/'+walk.id).remove();
    })
    .then(() => {
        response.status(200).send('The walk was cancelled successfully');
    })
    .catch(error =>{
        response.status(400).send(error);
    })
})