import * as functions from 'firebase-functions';
import {
    auth,
    db
} from '../db/index';
const cors = require('cors')({ origin: true });

export const getAreas = functions.https.onRequest((request,response) =>{

    cors(request, response, () => {
        db.ref('areas').once('value', snapshot =>{
            const areas = []
            snapshot.forEach((childSnapshot) =>{
                areas.push(childSnapshot.key);
            })
            response.status(200).send(areas);
        })
        .catch(error => {
            response.status(400).send(error);
        })
    })
})

export const getWalksByMonthYear = functions.https.onRequest((request,response) =>{

    cors(request, response, ()=>{
        if (request.method !== "POST") {
            response.status(400).send("Error");
        }

        const month :String = request.body.month;
        const year :String = request.body.year;

        db.ref('walk_history').orderByChild('date').once('value', snapshot=>{ 
            const walks =[];
            snapshot.forEach((childSnapshot) =>{
                const walk = childSnapshot.val();
                const date :String= walk.date;
                if(date.includes(month+'.'+year))
                    walks.push(walk);
            })
            response.status(200).send(walks);
        })
        .catch(error => {
            response.status(400).send(error);
        })
    })
})

export const getWalkHistory = functions.https.onRequest((request,response) =>{

    cors(request, response, ()=>{
        if (request.method !== "GET") {
            response.status(400).send("Error");
        }

        db.ref('walk_history').orderByChild('date').once('value', snapshot=>{ 
            const walks =[];
            snapshot.forEach((childSnapshot) =>{
                const walk = childSnapshot.val();
                walks.push(walk);
            })
            response.status(200).send(walks);
        })
        .catch(error => {
            response.status(400).send(error);
        })
    })
})

export const getMonthFinance = functions.https.onRequest((request,response) =>{

    cors(request, response, ()=>{
        if (request.method !== "POST") {
            response.status(400).send("Error");
        }

        const month :String = request.body.month;
        const year :String = request.body.year;

        const finance ={
            earnings:[],
            spendings:[]
        }

        db.ref('payment_clients').orderByChild('date').once('value')
        .then(snapshot=>{ 
            const walks =[];
            snapshot.forEach((childSnapshot) =>{
                const entry = childSnapshot.val();
                const date = entry.date;
                if(date.includes(month+'.'+year))
                    finance.earnings.push(entry);
            })
        })
        .then(() =>{
            return db.ref('payment_walkers').orderByChild('date').once('value', snapshot =>{
                snapshot.forEach((childSnapshot) =>{
                    const entry = childSnapshot.val();
                    const date = entry.date;
                    if(date.includes(month+'.'+year))
                        finance.spendings.push(entry);
                })
            }).then(()=>{
                response.status(200).send(finance);
            }) 
        })
        .catch(error => {
            response.status(400).send(error);
        })
    })
})