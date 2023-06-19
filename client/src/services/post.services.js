import http from "../http-common";

class PostDataService {
    get(userID) {
        return http.get(`/posts/${userID}`);
    }

    create(data) {
        return http.post("/posts", data);
    }

    updateLike(postID) {
        return http.put(`/posts/likes/update/${postID}`);
    }
}

export default new PostDataService();