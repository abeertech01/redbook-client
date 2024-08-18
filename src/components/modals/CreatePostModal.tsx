import React, { useEffect } from "react"
import { Button, Input, Textarea } from "react-daisyui"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../app/store"
import { createPost as createPostThunk } from "../../app/thunks/post"
import { CREATE_POST_INPUTS } from "../../utils/types"

type CreatePostModalProps = {
  toggleCreatePostModal: () => void
  refetchPosts: () => void
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  toggleCreatePostModal,
  refetchPosts,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    formState: { errors: _ },
  } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    dispatch(createPostThunk(formData as CREATE_POST_INPUTS))
    toggleCreatePostModal()
  }

  useEffect(() => {
    return () => refetchPosts()
  }, [])

  /**
   * FIXME:
   * problem: content field styling doesn't appear on chrome and firefox as well.
   * problem: in chrome refetch doesn't work.
   */

  return (
    <div className="fixed z-[100] top-0 left-0 right-0 bottom-0 bg-[#000000cf] centering">
      <div className="bg-base-200 shadow-lg w-[600px] p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-[1.2rem] font-bold mb-4">Create Post</h1>
          <Input
            placeholder="Title Here..."
            {...register("title")}
            className="w-full mb-4"
          ></Input>
          <Textarea
            placeholder="Write Content Here..."
            {...register("content")}
            rows={4}
            className="w-full mb-4"
          />
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              onClick={() => toggleCreatePostModal()}
              className="btn-neutral"
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-error">
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreatePostModal
