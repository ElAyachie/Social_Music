import http from "../http-common";

class SongDataService {
    getAll() {
        return http.get("/users/song_interests");
    }

    get(userID) {
        return http.get(`/users/song_interests/${userID}`);
    }

    create(data) {
        return http.post("/users/song_interests", data);
    }

    update(userID, data) {
        return http.put(`/users/song_interests/${userID}`, data);
    }

    delete(userID) {
        return http.delete(`/users/song_interests/${userID}`);
    }

    deleteAll() {
        return http.delete(`/users/song_interests`);
    }
}

export default new SongDataService();