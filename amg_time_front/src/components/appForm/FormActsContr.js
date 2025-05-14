import { useEffect, useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import axios from "axios";
import Select from 'react-select';
import { API_URL_I } from "../../index";

const AppFormActsContr = (props) => {
    const API_URL = props.newItem ? API_URL_I + "acts_contr/" : API_URL_I + "acts_contr_d/"
    const [item, setItem] = useState({})
    const [projects, setProjects] = useState({})
    const [select, setSelect] = useState(props.newItem ? item.contractor : props.item.contractor.id);
    const [check, setCheck] = useState(props.newItem ? item.is_paid : props.is_paid)

    const onChange = (e) => {
        const newState = item
        newState[e.target.name] = e.target.value
        setItem(newState)
    }

    const onChangeSelect = (e) => {
        item['contractor_id'] = e.value
        setSelect(item['contractor_id'])
    }

    const onChangeCheck = (e) => {
        item['is_paid'] = !item['is_paid']
        setCheck(item['is_paid'])
    }

    useEffect(() => {
        getProjects()
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
        const project = item['contractor_id'] ? item['contractor_id'] : item['contractor']['id']

        const data = {
            act_number: item['act_number'],
            contractor: project,
            price: item['price'],
            description: item['description'],
            date: item['date'],
            is_paid: item['is_paid'],
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
            act_number: item['act_number'],
            contractor: item['contractor_id'],
            price: item['price'],
            description: item['description'],
            date: item['date'],
            is_paid: item['is_paid'],
        }

        // eslint-disable-next-line
        const result = await axios.post(API_URL, data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }

    // GET PROJECTS
    const getProjects = (e) => {
        axios.get(API_URL_I + "contractors/").then(projects => setProjects(projects.data))
    }

    const arr = []

    for (let i = 0; i < projects.length; i++) {
        arr.push({value: projects[i].pk, label: projects[i].title})
    }

    // Get today date for placeholder
    const today = () => {
        let date = new Date().toLocaleDateString("ru-RU");
        return date
    }



    return (
        <Form onSubmit={props.newItem ? submitDataAdd : submitDataEdit}>
            <FormGroup>
                <Label for="act_number">Номер акта</Label>
                <Input
                    type="text"
                    name="act_number"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.act_number)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="contractor_id">Подрядчик</Label>
                <Select
                    // name="contractor_id"
                    onChange={onChangeSelect}
                    options={arr}
                    value={arr.find(prj => prj.value === select)}
                    placeholder="Выберите подрядчика"
                >
                </Select>
            </FormGroup>
            <FormGroup>
                <Label for="description">Описание/Состав акта</Label>
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
                    defaultValue={defaultIfEmpty(item.price)}
                    required
                />
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
            <FormGroup check>
                <Label for="is_paid" style={{ "margin-right": "5px" }}> Оплачен </Label>
                <Input
                    type="checkbox"
                    name="is_paid"
                    onChange={onChangeCheck}
                    checked = {item.is_paid ? true : false}
                    // defaultChecked={item.is_paid ? true : false}
                />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button color="primary" type="submit" > Сохранить </Button>
                <Button onClick={props.toggle} color="secondary" outline> Отмена </Button>
            </div>
        </Form>
    )
}

export default AppFormActsContr;