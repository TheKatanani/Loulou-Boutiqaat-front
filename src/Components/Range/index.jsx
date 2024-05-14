import React, { useState } from "react";
import { ItemsStyle } from "./Styled";
import { Input } from "../Input/style";
import { MainButton } from "../../Global/components";

function Range() {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(100);
    const [value, setValue] = useState(start);
    const [showContent, setShowContent] = useState(true);

    const handleStartChange = (event) => {
        setStart(event.target.value);
    };

    const handleEndChange = (event) => {
        setEnd(event.target.value);
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <ItemsStyle>
            <div className="title">
                <h6>Price range</h6>
                <span className="icon" onClick={() => (
                    setShowContent(preve => !preve)
                )}>{showContent ? ">" : "<"}</span>
            </div>
            {showContent &&
                <>
                    <Input
                        type="range"
                        min={start}
                        max={end}
                        value={value}
                        onChange={handleValueChange}
                    />
                    <div>
                        <div>
                            <label>Min</label>
                            <Input type="number" value={start} onChange={handleStartChange} />
                        </div>
                        <div>
                            <label>Max</label>
                            <Input type="number" value={end} onChange={handleEndChange} />
                        </div>
                    </div>
                    <MainButton>Apply</MainButton>
                </>
            }
        </ItemsStyle>
    );
}

export default Range;
