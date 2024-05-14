import { Label } from "../Input/style";
import { SelsctStyled } from "./styled";

const Select = ({ id, value, onChange, options, defualt, label }) => (
    <div className="select">
        {
            label &&
            <Label htmlFor={id}>{label}</Label>
        }
        <SelsctStyled id={id} defualt={defualt} value={value} onChange={onChange}>
            {options?.map((option, i) => (
                <option key={i} value={option.value}>{option.label}</option>
            ))}
        </SelsctStyled>
    </div>
);

export default Select;