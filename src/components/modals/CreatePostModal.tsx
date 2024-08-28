import React from "react"
import { Button, Input, Textarea } from "react-daisyui"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useCreatePostMutation } from "../../app/api/api"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { CREATE_POST_REQ_BODY } from "../../utils/types"

type CreatePostModalProps = {
  toggleCreatePostModal: () => void
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  toggleCreatePostModal,
}) => {
  const { user } = useSelector((state: RootState) => state.auth)
  const [createPost] = useCreatePostMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    await createPost({
      ...formData,
      authorId: user?.id,
    } as CREATE_POST_REQ_BODY).unwrap()
    toggleCreatePostModal()
  }

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
          <div className="mb-4">
            <Input
              placeholder="Title Here..."
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
              className="w-full"
            ></Input>
            {errors.title && (
              <p className="text-red-500 my-1">
                {errors.title.message as string}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Textarea
              placeholder="Write Content Here..."
              {...register("content", {
                required: "Post is empty",
                minLength: {
                  value: 3,
                  message: "Post must be at least 3 characters",
                },
              })}
              rows={4}
              className="w-full"
            />
            {errors.content && (
              <p className="text-red-500 my-1">
                {errors.content.message as string}
              </p>
            )}
          </div>
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
