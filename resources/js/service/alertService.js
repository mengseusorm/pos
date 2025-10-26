import i18n from "@/plugins/i18n";
import {useToast} from "vue-toastification";
 
/*
 * Position
 * --------------
 * top-right
 * top-center
 * top-left
 * bottom-right
 * bottom-center
 * bottom-left
 * */
export default {
    default: function (message = "Default", position = "top-right") {
        const toast = useToast();
        toast(message, {
            position: position,
        });
    },

    success: function (message = "Success", position = "top-right") {
        const toast = useToast(); 
        toast.success(message, {
            position: position,
        });
    },

    info: function (message = "Info", position = "top-right") {
        const toast = useToast();
        toast.info(message, {
            position: position,
        });
    },

    warning: function (message = "Warning", position = "top-right") {
        const toast = useToast();
        toast.warning(message, {
            position: position,
        });
    },

    error: function (message = "Error", position = "top-right") {
        const toast = useToast();
        toast.error(message, {
            position: position,
        });
    },

    successFlip: function (status = null, message = "", position = "top-right") {
        const toast = useToast();
        if (status != null) {
            if (status) {
                message = message + " Updated Successfully.";
            } else {
                message = message + " Created Successfully.";
            }
        } else {
            message = message + " Deleted Successfully.";
        }

        toast.success(message, {
            position: position,
        });
    },

    successInfo: function (status = null, message = "", position = "top-right") {
        const toast = useToast();
        toast.success(message, {
            position: position,
        });
    },

    deleteConfirm: function (message = "Are you sure you want to delete this item?", position = "top-right") {
        const toast = useToast();
        return toast.error(message, {
            position: position,
            timeout: false,
            closeOnClick: false,
            draggable: false,
            hideProgressBar: true,
            closeButton: false,
            toastClassName: 'toast-delete-confirm',
            action: [
                {
                    text: 'yes',
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                        return true;
                    },
                },
                {
                    text: 'no',
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                        return false;
                    },
                },
            ],
        });
    },

    

};
