import { ReactElement } from "react";

function NoMatch(): ReactElement {
    return (
        <div className="h-screen w-screen bg-zinc-800 text-white gap-6 flex flex-1 flex-col items-center justify-center">
            <p className="text-3xl font-extrabold text-green-300">
              Not found!
            </p>
            <h2 className="text-2xl font-medium">Nothing to see here</h2>
        </div>
    );
}

export { NoMatch }
