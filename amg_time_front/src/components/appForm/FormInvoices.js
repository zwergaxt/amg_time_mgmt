import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Row, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL_I } from "../../index";
import HomeInvoicesDesc from "../appHome/HomeInvoicesDesc";
import Select from 'react-select';
import PdfCreate from "../appModal/PdfGen";

const AppFormInvoices = (props) => {
    const API_URL = props.newItem ? API_URL_I + "invoices/" : API_URL_I + "invoices_d/"
    const API_URL_DESC = API_URL_I + "invoices_desc/"
    const [descSet, setDescSet] = useState([])
    const [item, setItem] = useState({})
    const [projects, setProjects] = useState({})
    const [employee, setEmployee] = useState({})
    const [select, setSelect] = useState(props.newItem ? item.project : props.item.project.id);
    const [selectEmployee, setSelectEmployee] = useState(props.newItem ? item.employee : props.item.employee.id);
    const [renderModal, setRenderModal] = useState(false)

    const toggleRenderModal = () => {
        setRenderModal(true)
    }

    const onChange = (e) => {
        const newState = item
        // const newStateDesc = desc
        newState[e.target.name] = e.target.value
        // setDesc(newStateDesc)
        setItem(newState)

        // setSelect((prev) => {
        //     e.target.name = e.target.value
        // })

        setSelectEmployee((prev) => {
            e.target.name = e.target.value
        })

        // setDescSet((prev) => {
        //     e.target.name = e.target.value
        // })
    }

    const onChangeSelect = (e) => {
        item['project'] = e.value
        setSelect(item['project'])
    }

    // const onChangeSelectEmployee = (e) => {
    //     item['employee']['id'] = e.value
    //     setSelect(item['employee']['id'])
    // }

    useEffect(() => {
        // getDesc()
        getProjects()
        getEmployees()
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
        const project = item['project'] ? item['project'] : item['project']['id']


        // eslint-disable-next-line
        const data = {
            employee: item['employee']['id'],
            date: item['date'],
            project: project
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
            employee: item['employee'],
            date: item['date'],
            project: item['project']
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

    // GET Employees
    const getEmployees = (e) => {
        axios.get(API_URL_I + "employees/").then(employees => setEmployee(employees.data))
    }

    const arrEmployees = []

    for (let i = 0; i < employee.length; i++) {
        arrEmployees.push(<option value={employee[i].pk} key={employee[i].pk}> {employee[i].common_name} </option>)
    }

    // GET related invoice_desc objects
    // const getDesc = () => {
    //     axios.get(API_URL_I + "invoices_desc/").then(desc => {                
    //         setDescSet(desc.data.filter(desc => desc.invoice == props.item.pk))
    //     })
    // }


    // Get today date for placeholder
    const today = () => {
        let date = new Date().toLocaleDateString("ru-RU");
        return date
    }

    const genDoc = () => {
        return <PdfCreate />
    }

    if (renderModal) return <PdfCreate invoice={props.item} toggle={true} toggleParent={props.toggle}/>

    return (
        <Form onSubmit={props.newItem ? submitDataAdd : submitDataEdit}>
            <FormGroup>
                <Label for="employee">Сотрудник</Label>
                <Input
                    type="select"
                    name="employee"
                    onChange={onChange}
                    value={selectEmployee}
                >
                    <option value={0}>Выберите сотрудника</option>
                    {arrEmployees}
                </Input>
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
                <Label for="project">Проект</Label>
                <Select
                    // name="project_id"
                    onChange={onChangeSelect}
                    options={arr}
                    value={arr.find(prj => prj.value === select)}
                    placeholder="Выберите проект"
                >
                </Select>
            </FormGroup>
            {props.newItem ? "" : <HomeInvoicesDesc inv_pk={item.pk} setDescSet={setDescSet} submitDataAddP={submitDataAdd} />}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button color="primary" type="submit" > Сохранить </Button>
                <Button onClick={props.toggle} color="secondary" outline> Отмена </Button>
                <Button onClick={() => {toggleRenderModal()}}> Печать </Button>
            </div>
        </Form >
    )
}

export default AppFormInvoices;