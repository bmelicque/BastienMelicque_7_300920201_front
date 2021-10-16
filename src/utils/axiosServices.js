const axios = require('axios');
const { getCookie } = require('./functions');

const token = getCookie('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Handles signup
exports.signup = async (email, password) => {
    try {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
            data: {
                email,
                password
            }
        });
        return 0;
    } catch (error) {
        return error;
    }
}

// Handles login
exports.login = async (email, password) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}api/auth/login`,
            { email, password }
        );
        const maxAge = 2 * 86400000; // 2 days
        const { token, userId, userRole } = res.data;
        document.cookie = `token=${token}; max-age=${maxAge}`;
        document.cookie = `userId=${userId}; max-age=${maxAge}`;
        document.cookie = `role=${userRole}; max-age=${maxAge}`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
        console.log(error);
        return error.response.data.message
    }
}

// Gets the list of all users
exports.getUsersList = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user`);
        return [...res.data.users];
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Creates a new post and sends it to the database
exports.createPost = async (text, file = null) => {
    try {
        const data = new FormData();
        data.append('text', text);
        if (file) data.append('image', file);

        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}api/post`,
            data
        )

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

// Goes fetch all posts
exports.getPosts = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/post`);
        return [...res.data.posts];
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Handles likes and dislikes
exports.likePost = async (postId, like) => {
    try {
        await axios.post(
            `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
            { like }
        )
    } catch (error) {
        console.log(error);
    }
}

// Handles modifications of a post
exports.editPost = async (postId, text) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            { text }
        )
        return 0;
    } catch (error) {
        return error;
    }
}

// Handles deletion of a post
exports.deletePost = async (postId) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}api/post/${postId}`)
        return 0;
    } catch (error) {
        return error;
    }
}

// Gets all the comments of a post
exports.getComments = async (postId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/comment/${postId}`);
        return [...res.data.comments];
    } catch (error) {
        console.log(error);
        return 0;
    }
}