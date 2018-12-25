import * as functions from 'firebase-functions';
import {db} from '../db/index';

export const addTestDog = functions.https.onRequest((request, response) => {
    db.ref('dog/3').set({nome:'jake',idade:10})
    .then(() =>{
        response.status(200).send("Dog adicionado com sucesso");
    })
    .catch(error => {
        response.status(500).send('Deu o erro ${error}');
    })
});

export const getTestDog = functions.https.onRequest((request, response) => {
    db.ref('dog').once('value')
    .then(snapshot => {
        const dog = snapshot.val();
        return dog;
    })
    .then(dog =>{
        response.status(200).send(dog);
    })
    .catch(error => {
        response.status(500).send("Deu o erro ${error}")
    }) 
});

export const addDog = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Error");
        // return 0
    }
    const age = request.body.age;
    const gender = request.body.gender;
    const habits = request.body.habits;
    const interaction_dogs = request.body.interaction_dogs;
    const interaction_external = request.body.interaction_external;
    const interaction_people = request.body.interaction_people;
    const name = request.body.name;
    const obs = request.body.obs;
    const owner = request.body.owner;
    const photoUrl = request.body.photoUrl;
    const port = request.body.port;
    const race = request.body.race;
    const vet_name = request.body.vet_name;
    const vet_phone = request.body.vet_phone;

    db.ref('dogs').push().set({
        age: age,
        gender: gender,
        habits: habits,
        interaction_dogs: interaction_dogs,
        interaction_external: interaction_external,
        interaction_people: interaction_people,
        name: name,
        obs: obs,
        owner: owner,
        photoUrl: photoUrl,
        port: port,
        race: race,
        vet_name: vet_name,
        vet_phone: vet_phone
    })
    .then(() => {
        response.status(200).send("Cão cadastrado com sucesso");
    })
    .catch(function (error) {
        console.log("Erro cadastrando cachorro:", error);
        response.status(400).send(error)
    }); 
});
