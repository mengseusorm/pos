import VueSimpleAlert from "vue3-simple-alert";

export  default {
    destroyConfirmation: () => {
        return new VueSimpleAlert.confirm(
            "You will not be able to recover the deleted record!",
            "Are you sure?",
            "warning",
            {
                confirmButtonText: "Yes, Delete it!",
                cancelButtonText: "No, Cancel!",
                confirmButtonColor: "#696cff",
                cancelButtonColor: "#8592a3",
            }
        );
    },
    modalShow: function (id = '.modal') {
        const dialog = ref(true) 
        const modalTarget = document?.querySelector(id);
        if (modalTarget) {
            dialog.value = true 
        } else {
            console.error(`Modal element with selector "${id}" not found`);
        }
    },

    modalHide: function (id = ".modal") {
        let modalDivs = document?.querySelectorAll(id);
        document.body.style.overflowY = "auto";
        modalDivs?.forEach((modalDiv) => modalDiv?.classList?.remove("active"));
    },
}
