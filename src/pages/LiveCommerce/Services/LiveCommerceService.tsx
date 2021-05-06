export const apiURL = "https://livetron.herokuapp.com/api/";

export const createLivecommerce = async (livecommerce: any) => {
  let response = { data: null, error: null };

  try {
    const res = await fetch(`${apiURL}event/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(livecommerce)
    });
    console.log({ res });

    const data = await res.json();
    response.data = data;
  } catch (error) {
    response.data = error;
  }
  return response;
};

export const getShowBySlug = async (path: string) => {
  const res = await fetch(`${apiURL}event/showBySlug/${path}`);

  const data = await res.json();
  return data;
};

export const getProductsForEvent = async (eventId: number) => {
  const res = await fetch(`${apiURL}event/${eventId}/product`);

  const data = await res.json();
  return data;
};

export const getUpcomingEvents = async (eventId: number) => {
  const res = await fetch(`${apiURL}event/upcoming`);

  const data = await res.json();
  return data;
};

export const getEventProducts = async (id: number) => {
  const res = await fetch(`${apiURL}event/${id}/products`);
  console.log({ res });

  const data = await res.json();
  return data;
};
export const getProducts = async () => {
  const res = await fetch(`${apiURL}product/getOmnitron`);
  console.log({ res });

  const data = await res.json();
  return data;
};

export const getLivecommerces = async () => {
  const res = await fetch(`${apiURL}event/list`);
  const data = await res.json();
  return data;
};
export const getLivecommerce = async (id: number) => {
  const res = await fetch(`${apiURL}event/${id}`);
  const data = await res.json();
  return data;
};
export const updateLivecommerce = async (livecommerce: any) => {
  const res = await fetch(`${apiURL}event/${livecommerce.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(livecommerce)
  });
  const data = await res.json();
  return data;
};
export const eventStartByUpdateRequest = async (livecommerceId: string | undefined) => {
  const res = await fetch(`${apiURL}event/${livecommerceId}/start`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({})
  });
  const data = await res.json();
  return data;
};
export const postProductNewPrice = async (prodId: number, discount: any) => {
  const res = await fetch(`${apiURL}event/product/${prodId}/discount`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(discount)
  });
  const data = await res.json();
  return data;
};
export const highlightProductById = async (productId: number) => {
  const res = await fetch(`${apiURL}event/product/${productId}/highlight`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({}) // sending empty object
  });
  const data = await res.json();
  return data;
};
export const getCollections = async () => {
  const res = await fetch(`${apiURL}product/getCollections`);
  const data = await res.json();
  return data;
};
export const getProductList = async () => {
  const res = await fetch(`${apiURL}product/list`);
  const data = await res.json();
  return data;
};
export const getEventRefLinks = async () => {
  const res = await fetch(`${apiURL}event/reflink/list`);
  const data = await res.json();
  return data;
};
export const getEventReport = async () => {
  const res = await fetch(`${apiURL}event/report`);
  const data = await res.json();
  return data;
};
export const getEventUpcomings = async () => {
  const res = await fetch(`${apiURL}event/upcoming`);
  const data = await res.json();
  return data;
};
export const getEventPasts = async () => {
  const res = await fetch(`${apiURL}event/past`);
  const data = await res.json();
  return data;
};
export const getProviderStatus = async () => {
  const res = await fetch(`${apiURL}event/provider/status`);
  const data = await res.json();
  return data;
};
export const createEventRefLink = async (eventRefLink: any) => {
  const res = await fetch(`${apiURL}event/reflink/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(eventRefLink)
  });
  const data = await res.json();
  return data;
};
export const createOrder = async (eventId: number, productId: number) => {
  const res = await fetch(`${apiURL}event/order/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "product_id": productId,
      "event_id": eventId
    })
  });
  console.log({ createdOrder: res });
  const data = await res.json();
  console.log({ createdOrder2: data });

  return data;
};