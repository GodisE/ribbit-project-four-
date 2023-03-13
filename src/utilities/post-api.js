import { getToken } from "./users-service"

export function createPost(data){
    const token = getToken()
    console.log(data)
return fetch ("/api/posts/new", {
    method: "POST",
    headers:{
        Accept: "application/json",
        'Content-Type': "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
})
}

export function deletePost(id){
    const token = getToken()
    return fetch (`/api/posts/${id}`, {
        method: "DELETE",
        headers:{
            'Authorization': `Bearer ${token}`,
        },
    })
}