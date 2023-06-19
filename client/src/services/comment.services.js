import http from "../http-common";

class CommentDataService {
    get(userID) {
        return http.get(`/comments/${userID}`);
    }

    create(data) {
        return http.post("/comments", data);
    }

    updateLike(commentID) {
        return http.put(`/comments/likes/update/${commentID}`);
    }
}

export default new CommentDataService();