import { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Row, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_I } from "../../index";

const AppFormInvoicesDesc = (props) => {
    const API_URL = API_URL_I + "invoices_desc/"
    const [item, setItem] = useState({})


    const onChange = (e) => {
        const newState = item
        // const newStateDesc = desc
        newState[e.target.name] = e.target.value
        // setDesc(newStateDesc)
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
            row_num: item['row_num'],
            description: item['description'],
            quantity: item['quantity'],
            invoice: props.inv_pk
        }

        const result = await axios.put(API_URL + item.pk, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                props.resetState()
                props.toggleDesc()
            })

    }
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const data = {
            row_num: item['row_num'],
            description: item['description'],
            quantity: item['quantity'],
            invoice: props.inv_pk
        }

        // eslint-disable-next-line 
        const result = await axios.post(API_URL, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                props.resetState()
                props.toggleDesc()
            })
    }

    // GET INVOICE DESC
    // const getDesc = (e) => {
    //     axios.get(API_URL_I + "invoices_desc/").then(desc => {
    //         setDesc(desc.data.filter(d => d.invoice_id == props.item.pk))
    //     })
    // }

    // Get today date for placeholder
    // const today = () => {
    //     let date = new Date().toLocaleDateString("ru-RU");
    //     return date
    // }

    // HANDLE TO ADD NEW DESC
    // const handleAddDesc = () => {
    //     setItem(item['invoicedesc_set'].concat([{ row_num: "", description: "", quantity: "" }]))
    // }

    return (
        <Form >
            <FormGroup>
                <Label for="row_num">N п\п</Label>
                <Input
                    type="number"
                    name="row_num"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.row_num)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="description">Описание</Label>
                <Input
                    type="text"
                    name="description"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.description)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="quantity">Кол-во</Label>
                <Input
                    type="number"
                    name="quantity"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.quantity)}
                />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button color="primary" onClick={props.newItem ? submitDataAdd : submitDataEdit}> Сохранить </Button>
                <Button onClick={props.toggleDesc} color="secondary" outline> Отмена </Button>
            </div>
        </Form >
    )
}

export default AppFormInvoicesDesc;