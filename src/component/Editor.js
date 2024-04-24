import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaBold, FaHeading, FaItalic, FaStrikethrough, FaLink, FaQuoteRight, FaCode, FaImage } from "react-icons/fa";

const Editor = () => {
    const [data, setData] = useState(JSON.parse(localStorage.getItem('notes')) || []);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(data));
    }, [data]);

    const handleButtonClick = (markdownSyntax) => {
        setData(prev => {
            const newData = prev.map((data, idx) => {
                if (idx === selectedIndex) {
                    return data + markdownSyntax;
                } else {
                    return data;
                }
            });
            return newData;
        });
    };

    return (
        <div className='entire-page' style={{ display: 'flex', margin: '10px 0px', gap: '40px' }}>
            <div className='sidebar' style={{ width: '150px' }}>
                <button style={{ padding: '5px 25px' }} onClick={() => { setData(prevValue => [...prevValue, "#Add title"]) }}>ADD Notes +</button>
                <hr />
                <div>
                    {data.map((markdown, index) => (
                        <div
                            key={index}
                            onClick={() => { setSelectedIndex(index) }}
                            style={{
                                borderRadius: '0 5px 0 5px',
                                position: 'relative',
                                width: selectedIndex === index ? "160px" : "auto",
                                padding: '0px',
                                border: '1px solid black',
                                overflow: 'hidden',
                                height: selectedIndex === index ? "60px" : "50px",
                                backgroundColor: selectedIndex === index ? "#3C91E6" : "white",
                                color: selectedIndex === index ? "#fff" : "black",
                            }}
                        >
                            {markdown}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setData(prevData => {
                                        const newData = [...prevData];
                                        newData.splice(index, 1);
                                        return newData;
                                    });
                                }}
                                style={{ position: 'absolute', right: '5px', top: '5px', zIndex: '1', backgroundColor: 'red', border: 'none', color: 'white' }}
                            >
                                <MdOutlineDeleteOutline />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className='main'>
                <button onClick={() => setShowPreview(prev => !prev)}>
                    {showPreview ? "code" : "preview"}
                </button>
                <div>
                    {!showPreview ?
                        (<LeftSection data={data} setData={setData} selectedIndex={selectedIndex} handleButtonClick={handleButtonClick} />)
                        :
                        (<RightSection data={data} selectedIndex={selectedIndex} />)
                    }
                </div>
            </div>
        </div>
    )
}

const LeftSection = ({ data, setData, selectedIndex, handleButtonClick }) => {
    const buttons = [
        { label: <FaHeading />, markdown: '\n# ' },
        { label: <FaBold />, markdown: '\n** ' },
        { label: <FaItalic />, markdown: '\n* ' },
        { label: <FaStrikethrough />, markdown: '\n~~ ' },
        { label: <FaLink />, markdown: '\n[](url) ' },
        { label: <FaQuoteRight />, markdown: '\n> ' },
        { label: <FaCode />, markdown: '\n` ` ' },
        { label: <FaImage />, markdown: '\n![](https://example.com/your-image.png)' },
    ];

    return (
        <div>
            <div className="all-btns" style={{ gap: '10px' }}>
                {buttons.map((button, index) => (
                    <button
                        style={{ all: 'unset', padding: '10px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}
                        key={index}
                        className="btn"
                        onClick={() => handleButtonClick(button.markdown)}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = 'red' }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = '#000' }}
                    >
                        {button.label}
                    </button>
                ))}
            </div><br />
            <textarea
                value={data[selectedIndex]}
                onChange={(e) => {
                    setData(prevData => {
                        const newData = [...prevData]
                        newData.splice(selectedIndex, 1, e.target.value)
                        return newData
                    })
                }}
                cols={100}
                rows={20}
            />
        </div>
    )
}

const RightSection = ({ data, selectedIndex }) => {
    return (
        <>
            <Markdown>
                {data[selectedIndex]}
            </Markdown>
        </>
    )
}

export default Editor;
