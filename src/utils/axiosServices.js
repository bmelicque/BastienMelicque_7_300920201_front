const axios = require('axios');
const { getCookie } = require('./functions');

const token = getCookie('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Handles signup
export async function signup(email, password) {
    try {
        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
            data: {
                email,
                password
            }
        });
    } catch (error) {
        throw error.response.data.message;
    }
}

// Handles login
export async function login(email, password) {
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
        throw error.response.data.message
    }
}

// Gets the list of all users
export async function getUsersList() {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user`);
        return [...res.data.users];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function updatePassword(password, newPassword) {
    try {
        await axios.put(
            `${process.env.REACT_APP_API_URL}api/user`,
            { password, newPassword }
        )
        return;
    } catch (error) {
        throw error.response.data.message;
    }
}

export async function deleteAccount(password) {
    try {
        await axios.delete(
            `${process.env.REACT_APP_API_URL}api/user`,
            { data: { password } }
        )
    } catch (error) {
        throw error.response.data.message;
    }
}

// Creates a new post and sends it to the database
export async function createPost(text, file = null) {
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
export async function getPosts() {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/post`);
        return [...res.data.posts];
    } catch (error) {
        console.log(error);
        throw error.response.data.message;
    }
}

// Handles likes and dislikes
export async function likePost(postId, like) {
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
export async function editPost(postId, text) {
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
export async function deletePost(postId) {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}api/post/${postId}`)
        return 0;
    } catch (error) {
        return error;
    }
}

// Creates a new post and sends it to the database
export async function createComment(postId, text) {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
            { text }
        )

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

// Gets all the comments of a post
export async function getComments(postId) {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/comment/${postId}`);
        return [...res.data.comments];
    } catch (error) {
        console.log(error);
        return 0;
    }
}

// Handles modifications of a comment
export async function editComment(commentId, text) {
    try {
        await axios.put(
            `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
            { text }
        )
        return 0;
    } catch (error) {
        return error;
    }
}

// Handles deletion of a comment
export async function deleteComment(commentId) {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}api/comment/${commentId}`)
        return 0;
    } catch (error) {
        return error;
    }
}