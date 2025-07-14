import hljs from "highlight.js";
import { useState } from "react";
import { sleep } from "./utils";

interface Props {
    code: string,
    programmingLanguage: string;
}

export function ShowCode(props: Props) {
    const [copybuttonText, setCopyButtonText] = useState("Copy format");
    const [isCopying, setIsCopying] = useState(false);
    const originalCopyButtonText = copybuttonText;

    async function handleCopyText() {
        if (isCopying) {
            return;
        }

        setIsCopying(true);

        navigator.clipboard.writeText(props.code);

        setCopyButtonText("Copied")
        await sleep(3000);
        setCopyButtonText(originalCopyButtonText)
        setIsCopying(false);
    }

    const highlightedCode = hljs.highlight(props.code, {
        language: props.programmingLanguage
    });

    return (
        <div className="flex m-5">
            <pre className="secondary-color-bg relative p-2 w-80 sm:w-100">
                <button className="absolute top-0 right-0 bg-blue-500 p-2 lg:p-3 text-white rounded-xs cursor-pointer mt-1 mr-1" onClick={handleCopyText}>{copybuttonText}</button>
                <code className="text-sm sm:text-md" dangerouslySetInnerHTML={{ __html: highlightedCode.value }}></code>
            </pre>
        </div>
    );
}