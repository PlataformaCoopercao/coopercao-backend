import * as functions from 'firebase-functions';
import { db } from '../db/index';

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
    const owner_id = request.body.owner_id;
    const owner_data = request.body.owner_data;
    const photoUrl = request.body.photoUrl;
    const port = request.body.port;
    const race = request.body.race;
    const vet_name = request.body.vet_name;
    const vet_phone = request.body.vet_phone;

    const myRef = db.ref('dogs').push();
    myRef.set({
        id: myRef.key,
        age: age,
        gender: gender,
        habits: habits,
        interaction_dogs: interaction_dogs,
        interaction_external: interaction_external,
        interaction_people: interaction_people,
        name: name,
        obs: obs,
        owner_id: owner_id,
        owner_data: owner_data,
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

export const clientDogs = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Error");
        // return 0
    }
    const owner_id = request.body.owner_id;

    db.ref('dogs').orderByChild('owner_id').equalTo(owner_id).once('value')
        .then(snapshot => {
            const dogs = [];
            snapshot.forEach((childSnapshot => {
                const childData = childSnapshot.val();
                dogs.push(childData);
            }))

            response.status(200).send(dogs);
        })
        .catch(error => {
            response.status(400).send(error);
        })

    //db.ref('dogs').orderByChild("owner").equalTo(owner).once("value")
    //.then(snapshot => {
    //    const data = snapshot.val()
    //     response.send(data)
    //})
    //.catch(function (error) {
    //    console.log("Erro pesquisando cachorro(s):", error);
    //    response.status(400).send(error)
    //}); 
});

export const deleteDog = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Error");
        // return 0
    }
    const id = request.body.id;

    db.ref('dogs/' + id).remove()
        .then(() => {
            response.status(200).send("Cão removido com sucesso");
        })
        .catch(function (error) {
            console.log("Erro removendo cachorro:", error);
            response.status(400).send(error)
        });
});

export const updateDog = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Error");
        // return 0
    }
    const dog = request.body.dog;

    db.ref('dogs/' + dog.id).update(dog)
        .then(() => {
            response.status(200).send("Cão atualizado com sucesso");
        })
        .catch(function (error) {
            console.log("Erro atualizando cachorro:", error);
            response.status(400).send(error)
        });
});