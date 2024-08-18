import numbro from "numbro"
import { AxiosError } from "./types"

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

export { isAxiosError, formatNumber }
