import 'react-native-url-polyfill/auto';
import EncryptedStorage from 'react-native-encrypted-storage';
import {createClient} from '@supabase/supabase-js';

import config from '../config.json';

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

export const supabase = createClient(
  config.SUPABASE_API_URL,
  config.SUPABASE_PUB_API_KEY,
  {
    auth: {
      storage: EncryptedStorageAdapter,
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
