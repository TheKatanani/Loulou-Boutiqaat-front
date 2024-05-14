import { useState } from "react";
import { ItemsStyle } from "./Styled";


const ItemList = ({ title, items, type }) => {
    const [showAll, setShowAll] = useState(false);
    const [showContent, setShowContent] = useState(true);

    const displayItems = showAll ? items : items.slice(0, 5);
    return (
        <ItemsStyle>
            <div className="title">
                <h6>{title}</h6>
                <span className="icon" onClick={() => (
                    setShowContent(preve => !preve)
                )}>{showContent ? ">" : "<"}</span>
            </div>
            {showContent && <ul>
                {displayItems.map(({ id, text }) => {
                    if (type === "li") {
                        return <li key={id}>{text}</li>;
                    } else if (type === "radio") {
                        return (
                            <li key={id}>
                                <input type="radio" id={id} name={title} />
                                <label htmlFor={id}>{text}</label>
                            </li>
                        );
                    } else if (type === "checkbox") {
                        return (
                            <li key={id}>
                                <input type="checkbox" id={id} name={title} />
                                <label htmlFor={id}>{text}</label>
                            </li>
                        );
                    }
                    return <p>samething is wrong</p> ;
                })}
            </ul>
            }
            {items.length > 5 && showContent&& (
                <button onClick={() => setShowAll(!showAll)}>
                    See {showAll ? "less" : "all"}
                </button>
            )}
        </ItemsStyle>
    );
};
export default ItemList;