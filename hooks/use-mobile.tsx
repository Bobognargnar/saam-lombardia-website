import { useMediaQuery } from "react-responsive"

const MOBILE_BREAKPOINT = 768

export const useMobile = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  return isMobile
}
