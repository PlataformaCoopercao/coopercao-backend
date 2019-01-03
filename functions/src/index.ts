
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import {addTestDog,getTestDog, addDog, getListDog, deleteDog, updateDog} from './doges/index'
export {addTestDog,getTestDog, addDog, getListDog, deleteDog, updateDog}

import {registerClient, getClient, updateClient, getPasseiosAgendados, getHistoricoCliente} from './clients/index'
export {registerClient, getClient, updateClient, getPasseiosAgendados, getHistoricoCliente}

import {getWalker, updateWalker, getPasseiosAberto, getPasseiosAtribuidos, getPasseiosHistorico} from './walkers/index'
export {getWalker, updateWalker, getPasseiosAberto, getPasseiosAtribuidos, getPasseiosHistorico}

import {newWalk} from './walks/index'
export {newWalk}




