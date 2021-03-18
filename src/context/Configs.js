import {createContext, useContext} from 'react';

const Configs = createContext({});

const useConfigs = () => useContext(Configs);
const ConfigsProvider = Configs.Provider;

export {useConfigs, ConfigsProvider};
