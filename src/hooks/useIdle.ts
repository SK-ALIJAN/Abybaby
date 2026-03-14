import { useEffect, useState } from "react";

export function useIdle(timeout = 6000) {
    const [idle, setIdle] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        function reset() {
            clearTimeout(timer);
            setIdle(false);

            timer = setTimeout(() => {
                setIdle(true);
            }, timeout);
        }

        const events = ["mousemove", "keydown", "scroll", "click"];

        events.forEach((e) =>
            window.addEventListener(e, reset)
        );

        reset();

        return () => {
            events.forEach((e) =>
                window.removeEventListener(e, reset)
            );
            clearTimeout(timer);
        };
    }, [timeout]);

    return idle;
}
