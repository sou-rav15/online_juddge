import { toast } from 'react-toastify';

export const HandleSuccess = (message, isDark) => {
    console.log('isDark->',isDark);
    toast.success(message, {
        position:'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            backgroundColor: isDark ? '#333' : '#28a745', // Dark background for dark theme
            color: isDark ? '#fff' : '#000' // White text for dark theme
        }
    });
};
//#28a745 

export const HandleError = (message, isDark) => {
    console.log('isDark->',isDark);
    
    toast.error(message, {
        position: 'top-left',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            backgroundColor: isDark ? '#343a40' : '#dc3545',
            color: isDark ? '#fff' : '#000'
        }
    });
};
// 343a40

export const notifyInfo = (message, isDark) => {
    toast.info(message, {
        position:'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            backgroundColor: isDark ? '#343a40' : '#17a2b8',
            color: isDark ? '#fff' : '#000'
        }
    });
};
