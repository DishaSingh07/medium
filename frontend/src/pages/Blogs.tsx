// // // import { BlogCard } from "../components/BlogCard"
// // // import { Appbar } from "../components/Appbar"
// // // import { useBlogs } from "../hooks";

// // // export const Blogs = () => {
// // //     // can be stored in state
// // //     //or  directly here
// // //     // in a context variable
// // //     // create our own custom hooks called useBlogs 
// // //     const { loading, blogs } = useBlogs();

// // //     if (loading) {
// // //         return <div>
// // //             loading...
// // //         </div>
// // //     }
// // //     return <div >
// // //         <Appbar />
// // //         <div className="flex justify-center">
// // //             <div className="max-w-xl">
// // //                 {
// // //                     blogs.map(blog => <BlogCard
// // //                         authorName="David Rodenas PhD"
// // //                         title="How Cookie Clicker Ruined My Weekly Software Development Article
// // //     "
// // //                         content="This game has been criticized as ‘super dumb’ and ‘super addictive.’ It’s so addictive that it took away my chance to write this week’s article. And it’s so dumb that I’m almost embarrassed to admit I’ve been playing it, if not for what I’ve learned. It turns out the game has a strong algorithmic and planning component, and many decisions and implications remind me of software development. So, shall we first look at the game and then the mathematics behind it that can help with software development? Have I mentioned the game is super addictive? Yes, I’m repeating myself, but consider yourselves warned!"


// // //                         publishedDate="Nov 20, 2022"
// // //                     />

// // //                     )
// // //                 }


// // //             </div>
// // //         </div>
// // //     </div>

// // // }













// // src/pages/Blogs.tsx
import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
// import { Blog } from "../types"; // Adjust the path as needed

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    key={blog.id}
                    id={blog.id}
                    // authorName={blog.author.name || "Anonymous"}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}

