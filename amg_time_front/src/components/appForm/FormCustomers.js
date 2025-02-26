import { useEffect, useState, useReducer } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_I } from "../../index";

const AppFormCustomers = (props) => {
    const API_URL = API_URL_I + "customers/"
    const [item, setItem] = useState({})

    const onChange = (e) => {
        const newState = item
        newState[e.target.name] = e.target.value
        setItem(newState)
    }

    useEffect(() => {
        if (!props.newItem) {
            setItem(item => props.item)
        }
        // eslint-disable-next-line
    }, [props.item])

    const defaultIfEmpty = value => {
        return value === "" ? "" : value;
    }

    const submitDataEdit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const data = {
            title: item['title'],
        }

        const result = await axios.put(API_URL + item.pk, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                props.resetState()
                props.toggle()
            })

        // window.location.reload()
    }
    const submitDataAdd = async (e) => {
        e.preventDefault();


        const data = {
            title: item['title'],
        }

        // eslint-disable-next-line
        const result = await axios.post(API_URL, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }

    return (
        <Form onSubmit={props.newItem ? submitDataAdd : submitDataEdit}>
            <FormGroup>
                <Label for="title">Наименование</Label>
                <Input
                    type="text"
                    name="title"
                    placeholder="Лучший заказчик на свете"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.title)}
                    required
                />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button color="primary" type="submit"> Сохранить </Button>
                <Button onClick={props.toggle} color="secondary" outline> Отмена </Button>
            </div>
        </Form>
    )
}

export default AppFormCustomers;