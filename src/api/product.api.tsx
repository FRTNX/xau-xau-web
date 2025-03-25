import config from "../config/config";


const createProduct = async (form: FormData) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/product`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json'
      },
      body: form
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const fetchProduct = async (productId: string) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/product?id=${productId}`, {
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

const fetchProducts = async () => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/products`, {
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

const fetchImages = async (productId: string) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/product/images?id=${productId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  } catch (error) {
    console.log(error)
  }
}

export {
  createProduct,
  fetchProduct,
  fetchProducts,
  fetchImages
};
