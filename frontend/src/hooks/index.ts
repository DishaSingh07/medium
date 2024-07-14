import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config"; // Ensure this import is correct and points to your backend URL config
import { Blog } from "../types";


export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    setBlog(response.data.post);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching blogs:', error);
                    setLoading(false);
                });
        } else {
            console.error('No token found in localStorage');
            setLoading(false);
        }
    }, [id]);

    return {
        loading,
        blog

    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    setBlogs(response.data.posts);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching blogs:', error);
                    setLoading(false);
                });
        } else {
            console.error('No token found in localStorage');
            setLoading(false);
        }
    }, []);

    return {
        loading,
        blogs
    };
};
