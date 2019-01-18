
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import {addTestDog,getTestDog, addDog, getListDog, deleteDog, updateDog} from './doges/index'
export {addTestDog,getTestDog, addDog, getListDog, deleteDog, updateDog}

import {registerClient, getClient, getAllClients,updateClient, getPasseiosAgendados, getHistoricoCliente, getFaturaMensalCliente} from './clients/index'
export {registerClient, getClient, getAllClients,updateClient, getPasseiosAgendados, getHistoricoCliente, getFaturaMensalCliente}

import {registerWalker,getWalker, getAllWalkers,updateWalker, getPasseiosAberto, getPasseiosAtribuidos, getPasseiosHistorico, walkerScore} from './walkers/index'
export {registerWalker,getWalker, getAllWalkers,updateWalker, getPasseiosAberto, getPasseiosAtribuidos, getPasseiosHistorico, walkerScore}

import {newWalk, assignWalk,endWalk} from './walks/index'
export {newWalk, assignWalk, endWalk}




