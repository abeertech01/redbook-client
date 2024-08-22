import numbro from "numbro"
import { AxiosError, FetchedPosts } from "./types"

function isAxiosError(error: any): error is AxiosError {
  return (
    error.response &&
    error.response.data &&
    typeof error.response.data.message === "string"
  )
}

const formatNumber = (value: number): string => {
  // Determine the length of the number
  const absValue = Math.abs(value)
  const length = Math.floor(Math.log10(absValue) + 1)

  // Find out the unit (thousands, millions, etc.)
  let divisor: number
  let unit: string

  if (length > 6) {
    divisor = 1e6
    unit = "M"
  } else if (length > 3) {
    divisor = 1e3
    unit = "k"
  } else {
    divisor = 1
    unit = ""
  }

  // Calculate the leading number
  const leadingNumber = absValue / divisor

  // Check if the leading number is a round number or not
  const hasFraction = leadingNumber % 1 !== 0

  // Format with mantissa only if there's a fraction or if it's not a round divisor
  return numbro(value).format({
    output: "number",
    mantissa: hasFraction ? 1 : 0,
    average: true,
    spaceSeparated: false,
    optionalMantissa: true,
    roundingFunction: Math.floor,
  })
}

const upvoteHelper = (
  draft: FetchedPosts,
  postIndex: number,
  authorId: string
) => {
  if (postIndex !== -1) {
    if (!draft.posts[postIndex].upvoteIds.includes(authorId)) {
      draft.posts[postIndex].upvoteIds.push(authorId)

      if (draft.posts[postIndex].downvoteIds.includes(authorId)) {
        draft.posts[postIndex].downvoteIds.splice(
          draft.posts[postIndex].downvoteIds.indexOf(authorId),
          1
        )
      }
    } else {
      draft.posts[postIndex].upvoteIds.splice(
        draft.posts[postIndex].upvoteIds.indexOf(authorId),
        1
      )
    }
  }
}

const downvoteHelper = (
  draft: FetchedPosts,
  postIndex: number,
  authorId: string
) => {
  if (postIndex !== -1) {
    if (!draft.posts[postIndex].downvoteIds.includes(authorId)) {
      draft.posts[postIndex].downvoteIds.push(authorId)

      if (draft.posts[postIndex].upvoteIds.includes(authorId)) {
        draft.posts[postIndex].upvoteIds.splice(
          draft.posts[postIndex].upvoteIds.indexOf(authorId),
          1
        )
      }
    } else {
      draft.posts[postIndex].downvoteIds.splice(
        draft.posts[postIndex].downvoteIds.indexOf(authorId),
        1
      )
    }
  }
}

export { isAxiosError, formatNumber, upvoteHelper, downvoteHelper }
