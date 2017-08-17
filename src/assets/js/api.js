let host="https://cnodejs.org/api/v1";

const api={
    postUrl: "/API/index.ashx?t=" + Math.random(),
    ordUrl: "/API/order.ashx?t=" + Math.random()
}




export default {
    indexAPI: api.postUrl,
    orderAPI: api.ordUrl
}