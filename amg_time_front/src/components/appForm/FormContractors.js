import { useEffect, useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_I } from "../../index";

const AppFormContractors = (props) => {
    const API_URL = props.newItem ? API_URL_I + "contractors/" : API_URL_I + "contractors_d/"
    const [item, setItem] = useState({})
    const [projects, setProjects] = useState({})
    const [select, setSelect] = useState(props.newItem ? item.project : props.item.project.id);

    const onChange = (e) => {
        const newState = item
        newState[e.target.name] = e.target.value
        setItem(newState)

        setSelect((prev) => {
            e.target.name = e.target.value

        })
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
        const data = {
            title: item['title'],
            project: item['project_id'],
            price: item['price'],
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
            project: item['project_id'],
            price: item['price'],
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
        axios.get(API_URL_I + "projects/").then(projects => setProjects(projects.data))
    }

    const arr = []

    for (let i = 0; i < projects.length; i++) {
        arr.push(<option value={projects[i].pk} key={projects[i].pk}> {projects[i].title} </option>)
    }

    return (
        <Form onSubmit={props.newItem ? submitDataAdd : submitDataEdit}>
            <FormGroup>
                <Label for="title">Наименование</Label>
                <Input
                    type="text"
                    name="title"
                    placeholder="ИП Иванов"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.title)}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="project_id">Проект</Label>
                <Input
                    type="select"
                    name="project_id"
                    onChange={onChange}
                    value={select}
                >
                    <option value={0}>Выберите проект</option>
                    {arr}
                </Input>
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button color="primary" type="submit" > Сохранить </Button>
                <Button onClick={props.toggle} color="secondary" outline> Отмена </Button>
            </div>
        </Form>
    )
}

export default AppFormContractors;