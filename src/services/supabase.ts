import 'react-native-url-polyfill/auto';
import EncryptedStorage from 'react-native-encrypted-storage';
import {createClient} from '@supabase/supabase-js';

import config from '../config.json';

const supabaseUrl = config.API_URL;
const supabaseAnonKey = config.PUB_API_KEY;

const EncryptedStorageAdapter = {
  getItem: (key: string) => {
    return EncryptedStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    EncryptedStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    EncryptedStorage.removeItem(key).catch(() => {});
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: EncryptedStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
