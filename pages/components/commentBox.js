import React, { useState } from 'react';

function CommentBox() {
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');

    const handleClick = () => {
        setIsClicked(true);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <div className="heading text-center font-bold text-2xl m-5 text-white">Say something to TeamAzuki?</div>
            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border-gray-300 p-4 shadow-lg max-w-2xl">
                <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="text" />
                <textarea
                    className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                    spellCheck="false"
                    placeholder="Say something to TeamAzuki here"
                    onChange={handleTextChange}
                ></textarea>

                <div className="icons flex text-gray-500 m-2">
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">{`${text.length}/300`}</div>
                </div>
                {/* button here*/}
                <button
                    onClick={handleClick}
                    className={`${isClicked ? (isLoading ? 'bg-blue-500' : 'bg-green-500') : 'bg-blue-500'
                        } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center`}
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        !isClicked && 'Submit'
                    )}
                    {!isLoading && isClicked && (
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>

            </div>
        </div>
    );
}

export default CommentBox
