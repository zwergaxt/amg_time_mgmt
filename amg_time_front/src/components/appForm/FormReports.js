import { useEffect, useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import axios from "axios";
import Select from 'react-select';
import { API_URL_I } from "../../index";

const AppFormReports = (props) => {
    const API_URL = props.newItem ? API_URL_I + "reports/" : API_URL_I + "reports_d/"
    const [item, setItem] = useState({})
    const [projects, setProjects] = useState({})
    const [select, setSelect] = useState(props.newItem ? item.project : props.item.project.id);

    const onChange = (e) => {
        const newState = item
        newState[e.target.name] = e.target.value
        setItem(newState)

        // setSelect((prev) => {
        //     e.target.name = e.target.value

        // })
    }

    const onChangeSelect = (e) => {
        item['project_id'] = e.value
        setSelect(item['project_id'])
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

        const project = item['project_id'] ? item['project_id'] : item['project']['id']

        const data = {
            date: item['date'],
            project: project,
            time_spent: item['time_spent'],
            description: item['description'],
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
            date: item['date'],
            project: item['project_id'],
            time_spent: item['time_spent'],
            description: item['description'],
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
        axios.get(API_URL_I + "projects_select/").then(projects => setProjects(projects.data))
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
                <Label for="date">Дата</Label>
                <Input
                    type="text"
                    name="date"
                    // placeholder={today()}
                    onChange={onChange}
                    defaultValue={today()}
                />
            </FormGroup>
            <FormGroup>
                <Label for="project_id">Проект</Label>
                <Select
                    // name="project_id"
                    onChange={onChangeSelect}
                    options={arr}
                    value={arr.find(prj => prj.value === select)}
                    placeholder="Выберите проект"
                >
                </Select>
            </FormGroup>
            <FormGroup>
                <Label for="time_spent">Часы</Label>
                <Input
                    type="number"
                    name="time_spent"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(item.time_spent)}
                    required
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button color="primary" type="submit" > Сохранить </Button>
                <Button onClick={props.toggle} color="secondary" outline> Отмена </Button>
            </div>
        </Form>
    )
}

export default AppFormReports;