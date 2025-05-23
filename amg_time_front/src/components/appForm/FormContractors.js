import { Fragment, useEffect, useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import axios from "axios";
import Select from 'react-select';
import { Tabs } from "@consta/uikit/Tabs";
import { API_URL_I } from "../../index";
import HomeProjects from "../appHome/HomeProjects";
import HomeActsContr from "../appHome/HomeActsContr";

const tabItems = [
    {
        name: "Подрядчик"
    },
    {
        name: "Договор"
    },
    {
        name: "Акты"
    }
]

const AppFormContractors = (props) => {
    const API_URL = props.newItem ? API_URL_I + "contractors/" : API_URL_I + "contractors_d/"
    const [item, setItem] = useState(props.item)
    const [projects, setProjects] = useState({})
    const [select, setSelect] = useState(props.newItem ? item.project : props.item.project.id);
    const [tab, setTab] = useState(tabItems[0].name)
    
    var searchPrj = 0
    var search = 0
    
    if (!props.newItem) {
        searchPrj = "?prj_number="+item.project.prj_number
        search = "?contractor="+item.pk
    }
    
    
    console.log(props.item)

    const onChange = (e) => {
        const newState = item
        newState[e.target.name] = e.target.value
        setItem(newState)

    }

    const handleTabChange = (tab) => {
        if (tab === "Подрядчик") {
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
                    <Label for="project_id">Договор</Label>
                    <Select
                        // name="project_id"
                        onChange={onChangeSelect}
                        options={arr}
                        value={arr.find(prj => prj.value === select)}
                        placeholder="Выберите договор"
                    >
                    </Select>
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
        } else if (tab === "Договор" && !props.newItem) {
            return (
                <Fragment>
                    <HomeProjects search={searchPrj} />
                    <Button onClick={props.toggle} color="secondary" outline> Закрыть </Button>
                </Fragment>
            )
        } else if (tab === "Акты" && !props.newItem) {
            return (
                <Fragment>
                    <HomeActsContr search={search} />
                    <Button onClick={props.toggle} color="secondary" outline> Закрыть </Button>
                </Fragment>
            )
        }
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
        arr.push({value: projects[i].pk, label: projects[i].prj_number})
    }

    return (
        <Fragment>
                <Tabs
                    value={tab}
                    size="m"
                    view="bordered"
                    linePosition="bottom"
                    fitMode="scroll"
                    onChange={(tab) => setTab(tab.name)}
                    items={tabItems}
                    getItemLabel={(tab) => tab.name}
                    style={{
                        position:"sticky"
                    }}
                />
                {handleTabChange(tab)}
                
        </Fragment>        
    )
}

export default AppFormContractors;