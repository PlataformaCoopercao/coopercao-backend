
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import {addTestDog,getTestDog, addDog, getListDog, deleteDog, updateDog} from './doges/index'
export {addTestDog,getTestDog, addDog, getListDog, deleteDog, updateDog}

import {registerClient, getClient, getAllClients,updateClient, getPasseiosAgendados, getHistoricoCliente, getFaturaMensalCliente} from './clients/index'
export {registerClient, getClient, getAllClients,updateClient, getPasseiosAgendados, getHistoricoCliente, getFaturaMensalCliente}

import {registerWalker,getWalker, getAllWalkers,updateWalker, getPasseiosAberto, getPasseiosAtribuidos, getWalkerHistory, walkerScore} from './walkers/index'
export {registerWalker,getWalker, getAllWalkers,updateWalker, getPasseiosAberto, getPasseiosAtribuidos, getWalkerHistory, walkerScore}

import {newWalk, assignWalk,endWalk, walkFeedback} from './walks/index'
export {newWalk, assignWalk, endWalk, walkFeedback}

import {getAreas, getWalksByMonthYear, getWalkHistory, getMonthFinance} from './general/index'
export {getAreas, getWalksByMonthYear, getWalkHistory, getMonthFinance}

