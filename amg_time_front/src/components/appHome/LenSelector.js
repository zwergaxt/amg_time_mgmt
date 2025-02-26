import { Form, Input } from "reactstrap";

const Selector = (props) => {
    // const [len, setLen] = useState(10)

    const arrSelect = [
        <option value={"?len=5"} key={5}> 5 </option>,
        <option value={"?len=10"} key={10}> 10 </option>,
        <option value={"?len=100"} key={100}> 100 </option>,
        <option value={""} key={0}> Все </option>
    ]

    const onChange = (e) => {
        props.setLen(e.target.value)
    }


    return (
        <Form>
            <Input
                type="select"
                name="value"
                onChange={onChange}
                value={props.len}
                bsSize="sm"
            >
                {arrSelect}
            </Input>

        </Form>

    )
}
export default Selector;