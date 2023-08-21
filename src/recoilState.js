import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()


const addressState = atom({
  key: "address",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

const weaveState = atom({
  key: "identity",
  default: null,
  effects_UNSTABLE: [persistAtom],
})

const providerState = atom({
  key: 'provider',
  default: null,
})

const progettiAddressState = atom({
  key: 'progettiAddress',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const progettiState = atom({
  key: 'progetti',
  default: [],
  effects_UNSTABLE: [persistAtom,
    /*({ setSelf }) => {
      window.addEventListener('beforeunload', () => {
        setSelf([]);
      });
    },({ setSelf }) => {
      setTimeout(() => {
        setSelf([]);
      }, 10 * 60 * 1000); // 10 minutes cookie expire
    },*/],
})

const blockHeightState = atom({
  key: 'blockHeightState',
  default: {},
  effects_UNSTABLE: [persistAtom],
})

const progettiImageState = atom({
  key: 'progettiImage',
  default: 0,
  effects_UNSTABLE: [persistAtom],
})


export {progettiAddressState, progettiState, blockHeightState, providerState, progettiImageState, addressState, weaveState}