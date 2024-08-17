import React, { forwardRef } from "react"
import { Button, Modal } from "react-daisyui"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { AppDispatch } from "../../app/store"
import { useDispatch } from "react-redux"
import { createPost as createPostThunk } from "../../app/thunks/post"
import { CREATE_POST_INPUTS } from "../../utils/types"

type CreatePostModalProps = {
  closeCreatePost: () => void
  refetchPosts: () => void
}

const CreatePostModal = forwardRef<HTMLDialogElement, CreatePostModalProps>(
  ({ closeCreatePost, refetchPosts }, ref) => {
    const dispatch = useDispatch<AppDispatch>()
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()

    const onSubmit: SubmitHandler<FieldValues> = (formData) => {
      dispatch(createPostThunk(formData as CREATE_POST_INPUTS))
      closeCreatePost()
      refetchPosts()
    }

    return (
      <div className="font-sans">
        <Modal ref={ref}>
          <Modal.Header className="font-bold">Create a post</Modal.Header>
          <Modal.Actions>
            {/* <form method="dialog">
              <Button>Close</Button>
            </form> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="mb-4 text-xl">Create a post</h1>
              <input
                type="text"
                placeholder="Post Title"
                {...register("title")}
                className="input input-bordered w-full mb-4"
              />
              <textarea
                placeholder="Write your post..."
                {...register("content")}
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
              <div className="modal-action flex gap-4">
                <Button
                  type="button"
                  onClick={() => closeCreatePost()}
                  className="btn-neutral"
                >
                  Close
                </Button>
                <Button type="submit" className="btn-accent">
                  Post
                </Button>
              </div>
            </form>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
)
export default CreatePostModal
