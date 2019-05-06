import axios from "axios";

const setAuthToken = token => {
    //alert(token);
    // hada commentaire zedto bech berk ne9der npushi
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;

    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;
