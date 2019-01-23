import * as functions from 'firebase-functions';
import {
    auth,
    db
} from '../db/index';
const cors = require('cors')({ origin: true });


export const registerWalker = functions.https.onRequest((request, response) => {

    response.set('Access-Control-Allow-Headers', 'content-type');
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Controll-Allow-Methods', 'OPTIONS,POST');

    cors(request, response, () => {
        if (request.method !== "POST") {
            response.status(400).send("Error");
        }

        console.log(request.body);

        const email = request.body.email;
        const pass = request.body.pass;
        const phoneNumber = request.body.phoneNumber;
        const name = request.body.name;
        const photoUrl = request.body.photoUrl;
        const cpf = request.body.cpf;
        const address = request.body.address;
        const areas = request.body.areas;
        const profession = request.body.profession;
        const civilState = request.body.civilState

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
                console.log("Successfully created new walker:", userRecord.uid);
                return db.ref('walkers/' + userRecord.uid).set({
                    name: name,
                    cpf: cpf,
                    phoneNumber: phoneNumber,
                    photoURL: photoUrl,
                    email: email,
                    areas: areas,
                    profession: profession,
                    civilState: civilState,
                    score: 0,
                    accumulated_score: 0,
                    total_walks: 0,
                    address: {
                        cep: address.cep,
                        street: address.street,
                        num: address.num,
                        compl: address.compl,
                        district: address.district
                    }
                })
            })
            .then(() => {
                response.status(200).send("Successfully created new user profile");
            })
            .catch(function (error) {
                response.status(400).send(error)
            });

    })
})

export const getAllWalkers = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Controll-Allow-Methods', 'GET');

    db.ref('walkers').once('value', snapshot => {
        const walkersList = [];
        snapshot.forEach((childSnapshot => {
            walkersList.push(childSnapshot);
        }))
        response.status(200).send(walkersList)
    })
        .catch(error => {
            response.status(400).send(error);
        })
})

export const getWalker = functions.https.onRequest((request, response) => {

    const uid = request.body.uid;
    db.ref('walkers/' + uid)
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

export const updateWalker = functions.https.onRequest((request, response) => {
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

    cors(request, response, () => {
        db.ref('walk_unassigned').once('value')
            .then(snapshot => {
                let unassigned_walks = [];
                snapshot.forEach((childSnapshot => {
                    let key = childSnapshot.key;
                    let childData = childSnapshot.val();
                    unassigned_walks.push(childData);
                }))
    
                response.status(200).send(unassigned_walks);
            })
            .catch(error => {
                response.status(400).send(error);
            })
    })

    //     db.ref('walk_unassigned').once("value")
    //     .then(snapshot => {
    //         const data = snapshot.val()
    //         let walk_list = [];
    //         Object.keys(data).map(key =>{
    //             walk_list.push({[key]:data[key]})
    //         })
    //         response.send(walk_list);
    //     })
    //     .catch(function (error) {
    //         console.log("Erro buscando passeios em aberto:", error);
    //         response.status(400).send(error)
    // }); 
});

//RECEBE passeadorKey E RETORNA PASSEIOS ATIRBUIDOS A ESTE PASSEADOR
export const getPasseiosAtribuidos = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Error");
        // return 0
    }
    const passeadorKey = request.body.passeadorKey;

    db.ref('walk_assigned').orderByChild('walker').equalTo(passeadorKey).once('value')
        .then(snapshot => {
            let assigned_walks = [];
            snapshot.forEach((childSnapshot => {
                let key = childSnapshot.key;
                let childData = childSnapshot.val();
                assigned_walks.push(childData);
            }))

            response.status(200).send(assigned_walks);
        })
        .catch(error => {
            response.status(400).send(error);
        })

    //db.ref('walk_assigned').orderByChild('walker').equalTo(passeadorKey).once('value')
    //.then(snapshot => {
    //    const data = snapshot.val()
    //    response.send(data)
    //})
    //.catch(function (error) {
    //    console.log("Erro pesquisando passeios atribuidos ao passeador:", error);
    //    response.status(400).send(error)
    //});
});

//RECEBE passeadorKey E RETORNA PASSEIOS DO HISTORICO DESTE PASSEADOR
export const getWalkerHistory = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Error");
        // return 0
    }
    const walker_id = request.body.walker_id;

    db.ref('walk_history').orderByChild('walker').equalTo(walker_id).once('value')
        .then(snapshot => {
            let walks = [];
            snapshot.forEach((childSnapshot => {
                let key = childSnapshot.key;
                let childData = childSnapshot.val();
                walks.push(childData);
            }))

            response.status(200).send(walks);
        })
        .catch(error => {
            response.status(400).send(error);
        })

});

export const walkerScore = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("Error");
    }

    const id = request.body.id;
    const walker_score = request.body.score;

    let total_walks;
    let accumulated_score;

    db.ref('walkers/' + id).once('value')
        .then(snapshot => {
            const walker = snapshot.val();
            total_walks = walker.total_walks;
            accumulated_score = walker.accumulated_score;

        })
        .then(() => {
            const newTotal_walks = total_walks + 1;
            const newAccumulated_Score = accumulated_score + walker_score;
            const newScore = (newAccumulated_Score / newTotal_walks).toFixed(1);

            return db.ref('walkers/' + id).update({
                total_walks: newTotal_walks,
                accumulated_score: newAccumulated_Score,
                score: newScore
            })
        })
        .then(() => {
            response.status(200).send('Score updated');
        })
        .catch(error => {
            response.status(400).send(error);
        })
});