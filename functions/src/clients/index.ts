import * as functions from 'firebase-functions';
import {
    auth,
    db
} from '../db/index';


export const registerClient = functions.https.onRequest((request, response) => {

    if (request.method !== "POST") {
        response.status(400).send("Error");
        // return 0
    }

    const email = request.body.email;
    const pass = request.body.pass;
    const phoneNumber = request.body.phoneNumber;
    const name = request.body.name;
    const photoUrl = request.body.photoUrl;
    const birth_date = request.body.birth_date;
    const cpf = request.body.cpf;
    const adress = request.body.adress;

    auth.createUser({
            email: email,
            emailVerified: false,
            phoneNumber: phoneNumber,
            password: pass,
            displayName: name,
            photoURL: photoUrl,
            disabled: false
        })
        .then(userRecord => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
            return db.ref('clients/' + userRecord.uid).set({
                name: name,
                birth_date: birth_date,
                cpf: cpf,
                phoneNumber: phoneNumber,
                photoURL: photoUrl,
                email: email,
                adress: {
                    cep: adress.cep,
                    street: adress.street,
                    num: adress.num,
                    compl: adress.compl
                }
            })
        })
        .then(() => {
            response.status(200).send("Successfully created new user profile");
        })
        .catch(function (error) {
            console.log("Error creating new user:", error);
            response.status(400).send(error)
        });
});

export const updateClient = functions.https.onRequest((request, response) => {

    const uid = request.body.uid;
    const client = request.body.client;

    db.ref('clients/' + uid).update(client)
    .then(() => {
        response.status(200).send('user updated succesfully');
    })
    .catch(error => {
        response.status(400).send(error);
    })


    // auth.verifyIdToken(request.body.token)
    //     .then(decodedToken => {
    //         const uid = decodedToken.uid;
    //         let clientRef =  db.ref('clients/' + uid);
    //         clientRef.update(request.body)
    //         response.status(200).send('user updated succesfully');
    //     })
    //     .catch(error => {
    //         response.status(400).send(error);
    //     })
})

export const getClient = functions.https.onRequest((request, response) => {

    const uid = request.body.uid;
    db.ref('clients/' + uid)
        .once('value', snapshot => {
            response.status(200).send(snapshot.val());
        })
        .catch(error => {
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

export const getPasseiosAgendados = functions.https.onRequest((request, response) => {
    //RETORNA UM [X, Y] ONDE X SÃO OS PASSEIOS AGENDADOS COM PASSEADORES ALOCADOS E Y SÃO OS SEM PASSEADORES ALOCADOS
    //firebase serve --only functions
    if (request.method !== "POST") {
        response.status(400).send("Error");
        // return 0
    }
    const ownerKey = request.body.ownerKey;
    let data:any[] = [];

    db.ref('walk_assigned').orderByChild("dog/owner").equalTo(ownerKey).once("value")
    .then(snapshot => {
        data[0] = snapshot.val()
        //response.send(data)
    })
    .catch(function (error) {
        console.log("Erro pesquisando passeios agendados:", error);
        response.status(400).send(error)
    });
    db.ref('walk_unassigned').orderByChild("dog/owner").equalTo(ownerKey).once("value")
    .then(snapshot => {
        data[1] = snapshot.val()
        response.send(data)
    })
    .catch(function (error) {
        console.log("Erro pesquisando passeios agendados:", error);
        response.status(400).send(error)
    });
});

//envia {"ownerKey": } 
export const getHistoricoCliente = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Error");
        // return 0
    }
    const ownerKey = request.body.ownerKey;

    db.ref('walk_history').orderByChild('dog/owner').equalTo(ownerKey).once('value')
    .then(snapshot => {
        const data = snapshot.val()
        response.send(data)
    })
    .catch(function (error) {
        console.log("Erro pesquisando histórico de passeios:", error);
        response.status(400).send(error)
    });
});