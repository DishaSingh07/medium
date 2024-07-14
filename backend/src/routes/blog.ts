import { Hono } from "hono";
import { verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from '@prisma/client/edge'
import { createBlogInput, CreateBlogInput, updateBlogInput } from "@dishasingh077/medium-again";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;

    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    // extract the user id
    // pass it down to thwe rour hanfler
    console.log("in auth")
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET)
    if (user && typeof user.id === "string") {
        c.set("userId", user.id);
        await next();
    } else {
        c.status(401);
        return c.json({
            error: "you are not logged in"
        });
    }


})


blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({ error: "inputs not correct" })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    // create a new blog
    console.log("control reached here")
    const post = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })
    return c.json({
        id: post.id,
    })
})

blogRouter.put('/', async (c) => {
    // update the title and the description
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({ error: "inputs not correct" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.blog.update({
        where: { id: body.id },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: post.id,
    })
})


// TDOD: pagination - first 10 and then scrolling

blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: c.env?.DATABASE_URL,
                },
            },
        }).$extends(withAccelerate());

        const posts = await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        c.status(500);
        return c.json({ error: 'Error fetching posts' });
    }
});


// blogRouter.get('/:id', async (c) => {
//     try {
//         const id = c.req.param("id");
//         const prisma = new PrismaClient({
//             datasources: {
//                 db: {
//                     url: c.env?.DATABASE_URL,
//                 },
//             },
//         }).$extends(withAccelerate());

//         const post = await prisma.blog.findFirst({
//             where: { id: id },
//         });

//         return c.json({ post });
//     } catch (error) {
//         c.status(411)
//         return c.json({
//             messgae: "Error while fetching"
//         })
//     }
// });





blogRouter.get('/:id', async (c) => {
    try {
        let id = c.req.param("id").trim();  // Trim the ID
        console.log('Fetching blog with ID:', id);  // Log the trimmed ID

        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: c.env?.DATABASE_URL,
                },
            },
        }).$extends(withAccelerate());

        const post = await prisma.blog.findFirst({
            where: { id: id },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        if (post) {
            console.log('Post found:', post);  // Log the post if found
            return c.json({ post });
        } else {
            console.log('No post found with ID:', id);  // Log if no post is found
            return c.json({ post: null });
        }
    } catch (error) {
        console.error('Error while fetching post:', error);  // Log the error
        c.status(500);
        return c.json({
            message: "Error while fetching",
        });
    }
});
