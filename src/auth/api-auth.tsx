// @ts-nocheck
import config from "../config/config";

const register = async (user) => {
    console.log('registering:', user)
    try {
        let response = await fetch(`${config.baseUrl}/api/v0/user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch(err) {
        console.log(err)
    }
};

const signin = async (user) => {
    try {
        let response = await fetch(`${config.baseUrl}/api/v0/user/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // credentials: 'include',
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch(err) {
        console.log(err)
    }
};

const signout = async () => {
    try {
        let response = await fetch(`${config.baseUrl}/api/v0/user/signout`, { method: 'GET' });
        return await response.json();
    } catch(err) {
        console.log(err);
    }
};

export {
    signin,
    signout,
    register
};
