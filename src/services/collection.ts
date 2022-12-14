import  { service } from ".";

export default {
  // getAllCollections
  getAllCollections: () => 
    service.get("/api/collection/all", {
      headers: {
        "Content-Type": "application/json"
      }
    }),
  // getAllItmes
  getAllItems: () => 
    service.get("api/item/all?page=1&limit=10", {
      headers: {
        "Content-Type": "application/json"
      }
    }),
  // getOneCollection by id
  getOneCollectionId: (id: any) => service.get(`/api/collection/one/${id}`),
  // get one item by id
  getOneItemId: (id: any) => service.get(`/api/item/one/${id}`),
  addCollection: ( data: any) =>
    service.post("/api/collection/create", data,  {
      headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  addItem: ( data: any, id: any) =>
    service.post(`/api/item/create`, data,  {
      headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        collectionId: id
      }
    }),
    getUserOwnCollections: () => service.get(`/api/collection/all/created/${localStorage.getItem("userId")}`, {
        headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      // params: {
      //   id: localStorage.getItem("userId")
      // }
    }),
    // edit collection
    editCollection: ( data: any, id: any) =>
    service.patch(`/api/collection/edit/${id}`, data,  {
      headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }),
    // edit item
    editItem: ( data: any, id: any) =>
    service.patch(`/api/item/edit/${id}`, data,  {
      headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }),
    // del collection
    delCollection: (id: any) =>
    service.delete(`/api/collection/delete/one/${id}`,  {
      headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }),
    // del item
    delItem: (id: any) =>
    service.delete(`/api/item/delete/one/${id}`,  {
      headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
};