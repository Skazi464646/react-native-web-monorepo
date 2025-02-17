export const shared = 'SHANTANU IS PRO'
import { useRef, useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalError } from "./globalError/index";



const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const sharedVariable = 'SHANTANU APPS'


export const useFetchApiResp = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const newData = await fetchPosts(page);
        setPage(prev => prev + 1);
        setLoading(false);
    }, [page, loading, hasMore]);



    const fetchPosts = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const resp = await fetch(`${API_URL}?_limit=10&_page=${page}`);
            const response = await resp.json()
            if (response?.length === 0) {
                setHasMore(false);
            } else {
                setPosts((prev) => [...prev, ...response]);
                setPage(page + 1);
                setHasMore(response.length > 0);
            }
        } catch (error) {
            console.error("Error fetching posts", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, fetchPosts, loading, hasMore, loadMore };
};

export const useCommonTranslation = ()=>{
    const { t } = useTranslation();
    return {t}
}




export *  from './translation/index'
export *  from './globalError/index'
export *  from './crypto'
export { default as i18next } from "./translation/index";