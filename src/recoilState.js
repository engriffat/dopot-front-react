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

const IpfsState = atom({
  key: "IPFS",
  default: null
});

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
    ({ setSelf }) => {
      setTimeout(() => {
        setSelf([]);
      }, 6 * 60 * 60 * 1000); // 6 hours cookie expire
    },],
})

const progettiImageState = atom({
  key: 'progettiImage',
  default: {},
  effects_UNSTABLE: [persistAtom],
})


export {IpfsState, progettiAddressState,progettiState, providerState, progettiImageState, addressState, weaveState}