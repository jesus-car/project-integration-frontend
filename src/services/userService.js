import {API_URLS} from "../utils/apiConfig.js";
import axios from "axios";
import {users} from "../utils/fakeData.js";

async function getUsers() {
    // todo

    return users

    /*
    try {
        const response = await axios.get(API_URLS.PROPERTIES);
        return response.data;
    } catch (error) {
        console.error("Error en getUsers:", error);
        throw error;
    }

     */

}


export const userService = {
    getUsers
}