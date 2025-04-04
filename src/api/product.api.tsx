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

const fetchProducts = async (category: string | null = null, limit: number | null = null) => {
  try {
    let query = ``;
    if (category) {
      query = `?category=${category}`
    }

    if (limit) {
      if (query.length > 0) {
        query = `${query}&&limit=${limit}`
      } else {
        query = `?limit=${limit}`
      }
    }

    const response = await fetch(`${config.baseUrl}/api/v0/products${query}`, {
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

const productEmail = async (params) => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/product/email`, {
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

const fetchCategories = async () => {
  try {
    const response = await fetch(`${config.baseUrl}/api/v0/categories`, {
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
  fetchImages,
  fetchCategories,
  productEmail
};
