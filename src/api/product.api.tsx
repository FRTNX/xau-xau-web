import config from "../config/config";


const createProduct = async (params: Object) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/user`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const fetchProduct = async (params: Object) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/auth/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (params: Object) => {

}

const readImage = async (userId: string) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/user/image?id=${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export {
  createUser,
  signIn,
  readImage,
  update
};
