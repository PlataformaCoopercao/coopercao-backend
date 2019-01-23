
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import {addDog, clientDogs, deleteDog, updateDog} from './doges/index'
export {addDog, clientDogs, deleteDog, updateDog}

import {registerClient, getClient, getAllClients,updateClient, clientScheduledWalks, clientWalkHistory, clientBill} from './clients/index'
export {registerClient, getClient, getAllClients,updateClient, clientScheduledWalks, clientWalkHistory, clientBill}

import {registerWalker,getWalker, getAllWalkers,updateWalker, getUnassignedWalks, getAssignedWalks, getWalkerHistory, walkerScore} from './walkers/index'
export {registerWalker,getWalker, getAllWalkers,updateWalker, getUnassignedWalks, getAssignedWalks, getWalkerHistory, walkerScore}

import {newWalk, assignWalk,endWalk, walkFeedback} from './walks/index'
export {newWalk, assignWalk, endWalk, walkFeedback}

import {getAreas, getWalksByMonthYear, getWalkHistory, getMonthFinance} from './general/index'
export {getAreas, getWalksByMonthYear, getWalkHistory, getMonthFinance}

