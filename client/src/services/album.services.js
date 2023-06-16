import http from "../http-common";

class AlbumDataService {
    getAll() {
        return http.get(`/users/album_interests`);
    }

    get(userID) {
        return http.get(`/users/album_interests${userID}`);
    }

    create(data) {
        return http.post("/users/album_interests", data);
    }

    update(userID, data) {
        return http.put(`/users/album_interests/${userID}`, data);
    }

    delete(userID) {
        return http.delete(`/users/album_interests/${userID}`);
    }

    deleteAll() {
        return http.delete(`/users/album_interests`);
    }
}

export default new AlbumDataService();