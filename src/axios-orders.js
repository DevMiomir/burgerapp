import axios from "axios";

const Instance = axios.create ({
    baseURL: 'https://ract-my-burger.firebaseio.com/'
})

export default Instance;