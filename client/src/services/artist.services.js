import http from "../http-common";

class ArtistDataService {
    getAll() {
        return http.get("/users/artist_interests");
    }

    get(userID) {
        return http.get(`/users/artist_interests/${userID}`);
    }

    create(data) {
        return http.post("/users/artist_interests", data);
    }

    update(userID, data) {
        return http.put(`/users/artist_interests/${userID}`, data);
    }

    delete(userID) {
        return http.delete(`/users/artist_interests/${userID}`);
    }

    deleteAll() {
        return http.delete(`/users/artist_interests`);
    }
}

export default new ArtistDataService();