import { useEffect } from "react"

const useScrollReveal = () => {
    useEffect(() => {
        const elements = document.querySelectorAll(".scroll-reveal")

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("scroll-reveal-visible")

                        observer.unobserve(entry.target)
                    }
                })
            },
            {
                threshold: 0.5,
            }
        )


        elements.forEach((element) => {
            observer.observe(element)
        })

        return () => {
            observer.disconnect()
        }
    }, [])
}

export default useScrollReveal
