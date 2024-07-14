// //atomFamilies/selectorFamiies

// import { BlogSkeleton } from "../components/BlogSkeleton";
// import { FullBlog } from "../components/FullBlog";
// import { useBlog } from "../hooks"


// export const Blog = ()=> {
//     const {loading, blog} = useBlog();
//     if(loading)
//     {
//         return <div>
//             <BlogSkeleton/>
//         </div>
//     }

//     return <div>
//         <FullBlog/>
//     </div>
// }


import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";
// import { Spinner } from "../components/Spinner";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
            <Appbar />

            <div className="h-screen flex flex-col justify-center">

                <div className="flex justify-center">
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog} />
        
    </div>
}