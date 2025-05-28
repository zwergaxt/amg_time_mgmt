import { InputGroup, Button, Input } from "reactstrap";
import { useState } from 'react';

const SearchFilter = (props) => {
    const [val, setVal] = useState(props.val)

    const handleChange = (val) => props.setVal(val);

    const onChange = (e) => {
        setVal(e.target.value)
    }

    console.log("SEARCH >>>", val)
    return (
        <InputGroup>
            <Input
                bsSize="sm"
                className="mb-3"
                onChange={onChange}

            />
            <Button
                onClick={() => handleChange(val)}
                size="sm"
                style={{"z-index": "0"}}
                className="mb-3"
            > Поиск </Button>
        </InputGroup>
    )
}
export default SearchFilter;