import { useEffect, useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_I } from "../../index";

const AppFormProjects = (props) => {
    const API_URL = props.newItem ? API_URL_I + "projects/" : API_URL_I + "projects_d/"
    const [item, setItem] = useState({})
    const [customers, setCustomers] = useState({})
    const [select, setSelect] = useState(props.newItem ? item.cust : props.item.cust.id);
    const [check, setCheck] = useState(props.newItem ? item.is_archived : props.is_archived)

    const onChange = (e) => {
        const newState = item
        newState[e.target.name] = e.target.value
        setItem(newState)

        setSelect((prev) => {
            e.target.name = e.target.value
        })
    }

    const onChangeCheck = (e) => {
        item['is_archived'] = !item['is_archived']
        setCheck(item['is_archived'])
    }

    useEffect(() => {
        getCustomers()
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
            cust: item['cust_id'],
            prj_number: item['prj_number'],
            date: item['date'],
            description: item['description'],
            price: item['price'],
            is_archived: item['is_archived']
        }

        const result = await axios.put(API_URL + item.pk, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                props.resetState()
                props.toggle()
            })

    }
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const data = {
            title: item['title'],
            cust: item['cust_id'],
            prj_number: item['prj_number'],
            date: item['date'],
            description: item['description'],
            price: item['price'],
            is_archived: item['is_archived']
        }

        // eslint-disable-next-line
        const result = await axios.post(API_URL, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }

    // GET CUSTOMERS
    const getCustomers = (e) => {
        axios.get(API_URL_I + "customers/").then(custs => setCustomers(custs.data))
    }

    const arr = []

    for (let i = 0; i < customers.length; i++) {
        arr.push(<option value={customers[i].pk} key={customers[i].pk}> {customers[i].title} </option>)
    }

    // Get today date for placeholder
    const today = () => {
        let date = new Date().toLocaleDateString("ru-RU");
        return date
    }

    return (
        <Form onSubmit={props.newItem ? submitDataAdd : submitDataEdit}>
            <FormGroup>
                <Label for="title">Наименование</Label>
                <Input
                    type="text"
                    name="title"
                    placeholder="Ленина 42"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.title)}
                    required
                />
                <FormText>Краткое наименование проекта</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="cust_id">Заказчик</Label>
                <Input
                    type="select"
                    name="cust_id"
                    onChange={onChange}
                    value={select}
                >
                    <option value={0}>Выберите заказчика</option>
                    {arr}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="prj_number">Номер проекта</Label>
                <Input
                    type="text"
                    name="prj_number"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.prj_number)}
                />
                <FormText>Номер по договору</FormText>
            </FormGroup>
            <FormGroup>
                <Label for="date">Дата</Label>
                <Input
                    type="text"
                    name="date"
                    placeholder={today()}
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.date)}
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
                <Label for="price">Сумма</Label>
                <Input
                    type="number"
                    name="price"
                    onChange={onChange}
                    defaultValue={0}
                    required
                />
            </FormGroup>
            <FormGroup check>
                <Label for="is_archived" style={{ "margin-right": "5px" }}> Архив </Label>
                <Input
                    type="checkbox"
                    name="is_archived"
                    onChange={onChangeCheck}
                    checked={item['is_archived'] ? true : false}
                />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button color="primary" type="submit" > Сохранить </Button>
                <Button onClick={props.toggle} color="secondary" outline> Отмена </Button>
            </div>
        </Form>
    )
}

export default AppFormProjects;