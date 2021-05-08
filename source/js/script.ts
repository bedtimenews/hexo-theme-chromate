/* Add elements listener */
window.addEventListener("load", () => {

    // Menubar burgers click listenr
    const burgers: Element[] = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"), 0);
    if (burgers.length > 0) {
        burgers.forEach((element) => {
            element.addEventListener("click", () => {
                const idstr = element.getAttribute("data-target");
                element.classList.toggle("is-active");
                if (!idstr) return;
                const target = document.getElementById(idstr);
                target?.classList.toggle("is-active");
            }, false);
        });
    }

    // Add header hover page class changer
    darklistener.add((mode) => {
        const page = document.getElementById("header-page");
        if (mode === SystemDarkmodePrefrence.dark) {
            page?.classList.add("is-dark");
            page?.classList.remove("is-light");
        } else {
            page?.classList.add("is-light");
            page?.classList.remove("is-dark");
        }
    });
});

/* Darkmode listener */
enum SystemDarkmodePrefrence {
    dark = 0,
    light = 1
};

class DarkmodeListener {
    private _mode: SystemDarkmodePrefrence;
    private _handlers: ((mode: SystemDarkmodePrefrence) => void)[];

    public constructor() {
        let darking = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this._mode = darking ? SystemDarkmodePrefrence.dark : SystemDarkmodePrefrence.light;
        this._handlers = [];
        this._listen();
    }

    private _listen(): void {
        let media = window.matchMedia('(prefers-color-scheme: dark)');
        let callback = (event: MediaQueryListEvent) => {
            let mode = event.matches ? SystemDarkmodePrefrence.dark : SystemDarkmodePrefrence.light;
            this._handlers.forEach(handler => {
                handler(mode);
            });
            this._mode = mode;
        };
        media.addEventListener("change", callback);
    }

    public add(callback: (mode: SystemDarkmodePrefrence) => void): void {
        this._handlers.push(callback);
    }

    public mode(): SystemDarkmodePrefrence {
        return this._mode;
    }
};

var darklistener = new DarkmodeListener();
