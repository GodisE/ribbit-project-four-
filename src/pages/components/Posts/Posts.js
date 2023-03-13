// import CreateAComment from "../Comment/Comment"
import { useState } from "react"
import { deletePost } from "../../../utilities/post-api"
import Comment from "../Comment/Comment"
export default function Posts({post, thread, user, setThreadPosts}) {

    console.log(post)
    // console.log(post.comments)
    const [showComments, setShowComments] = useState(false)

    function toggleCommentVisiblity() {
        setShowComments(!showComments)
    }


    function handleDelete(event){
        event.preventDefault()
        try{
            deletePost(post._id)
            .then((res) => res.json())
            .then((resData) => setThreadPosts(resData.posts))
        }catch(error){
            console.error(error)
        }
    }


    const [commentArr, setCommentArr] = useState(post.comments)
    // console.log(commentArr)

    const commentMap = commentArr.map((comments, index) => (
        <Comment 
        comments={comments} 
        key={index} 
        user={user} 
        thread={thread}
        setCommentArr={setCommentArr}
    />
    ))

        console.log(commentArr)
    return (
        <>
            <div className="container  border rounded-4 shadow-sm my-4">
                <h3 className="mt-2">{post.category}</h3>
                <p>{post.title}</p>
                <p>{post.text}</p>
                <button
                    className="btn btn-success mb-3"
                    onClick={toggleCommentVisiblity}
                    >Show Comments
                </button>
                <button
                    className="btn btn-success mb-3"
                    onClick={handleDelete}
                    >Delete Post
                </button>
            </div>
            {showComments && commentMap}

        </>
    )
}