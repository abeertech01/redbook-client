import React from "react"

type CreatePostModalProps = {}

const CreatePostModal: React.FC<CreatePostModalProps> = () => {
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h1 className="mb-4 text-xl">Create a post</h1>
          <input
            type="text"
            placeholder="Post Title"
            className="input input-bordered w-full mb-4"
          />
          <textarea
            placeholder="Write your post..."
            className="textarea textarea-bordered textarea-lg w-full"
          ></textarea>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-outline btn-primary">
              Close!
            </label>
            <button className="btn btn-success">Post</button>
          </div>
          {/* <div className="flex gap-2 justify-end">
            <button className="btn btn-outline btn-primary">Cancel</button>
          </div> */}
        </div>
      </div>
    </>
    // <div className="bg-[#202020cb] centering fixed top-0 left-0 right-0 bottom-0 z-50">
    //   <form className="w-[700px] p-6 bg-base-300 rounded-lg shadow-sm shadow-zinc-800">

    //   </form>
    // </div>
  )
}
export default CreatePostModal
