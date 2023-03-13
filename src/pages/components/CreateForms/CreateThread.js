import { createThread, indexThread } from "../../../utilities/thread-api"

import { useState } from 'react'

export default function CreateThread({user, setThreadArr}) {
    const [thread, setThread] = useState({
        topic: "",
        owner: `${user._id}`,
        posts: []
    })

    function handleChange(event) {
        setThread({
            ...thread,
            [event.target.name]: event.target.value,
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const formData = {...thread}
            // console.log(formData)
            await createThread(formData)
                .then(() => {
                    return indexThread()
                })
                    .then((res) => res.json())
                    .then((resData) => setThreadArr(resData.threads))
            // console.log(formData)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="container-sm my-3">
        <form>
            <div className="form-floating">
                <input
                    className="form-control"
                    type="text"
                    name="topic"
                    placeholder="Create A Topic For This Thread!"
                    defaultValue={thread.topic}
                    onChange={handleChange}
                />
                <label className="form-label">Title</label>
            </div>
            <button className="btn btn-success my-3 " onClick={handleSubmit}>Create Thread</button>
        </form>
        </div>
    )
}









