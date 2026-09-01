import { Button } from "@/components/ui/button"
import { ArrowRight, } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface NotFoundProps {
    icon?: LucideIcon
    eyebrow?: string
    title: string
    description: string
    buttonText?: string
    onButtonClick?: () => void
    showButton?: boolean
}

const NotFound = ({
    icon: Icon,
    eyebrow = "Nothing here yet",
    title,
    description,
    buttonText,
    onButtonClick,
    showButton = true,
}: NotFoundProps) => {
    return (
        <div className="relative flex min-h-[83vh] w-full items-center justify-center overflow-hidden rounded-3xl border border-black/10 bg-muted/20 px-6 py-16">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

                <div className="absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-primary/30" />
                <div className="absolute right-[18%] top-[25%] h-3 w-3 rounded-full bg-primary/20" />
                <div className="absolute bottom-[20%] left-[20%] h-3 w-3 rounded-full bg-primary/20" />
                <div className="absolute bottom-[15%] right-[12%] h-2 w-2 rounded-full bg-primary/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
                {/* Icon */}
                <div className="relative mb-7">
                    <div className="absolute inset-0 scale-150 rounded-full bg-primary/5 blur-xl" />

                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-background shadow-sm">
                        {Icon && (
                            <Icon
                                className="h-10 w-10 text-foreground"
                                strokeWidth={1.5}
                            />
                        )}

                    </div>
                </div>
                <span className="mb-3 font-ibm-plex-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {eyebrow}
                </span>
                <h2 className="font-fraunces text-3xl font-bold tracking-tight md:text-4xl">
                    {title}
                </h2>

                <p className="mt-4 max-w-md font-ibm-plex-mono text-sm leading-6 text-muted-foreground">
                    {description}
                </p>
                {showButton && buttonText && onButtonClick && (
                    <Button
                        className="group mt-8 h-11 px-6 font-ibm-plex-mono mx-auto flex items-center gap-2"
                        onClick={onButtonClick}
                    >
                        {buttonText}

                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                )}
            </div>
        </div>
    )
}

export default NotFound
