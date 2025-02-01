import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => {
  // 🔥 Read initial values from cookies (if they exist)
  const storedId = Cookies.get('id') || '0';
  const storedUserType = Cookies.get('userType') || 'not-logged-in';

  return {
    id: storedId,
    userType: storedUserType,

    setId: (id) => {
      set({ id });
      Cookies.set('id', id, { expires: 7 }); 
    },

    setUserType: (userType) => {
      set({ userType });
      Cookies.set('userType', userType, { expires: 7 });
    },

    clearUserType: () => {
      set({ userType: 'not-logged-in' });
      Cookies.remove('userType');
    },

    clearId: () => {
      set({ id: '0' });
      Cookies.remove('id');
    },
  };
});

export default useAuthStore;
