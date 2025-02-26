
import { useState } from 'react';
import React, { Fragment } from 'react';
import { Modal, Button, Table } from 'reactstrap';
import { Text } from '@consta/uikit/Text';
import { useRef } from 'react';
import { useReactToPrint } from "react-to-print";

const PdfCreate = (props) => {
    const [visible, setVisible] = useState(false)

    var button = <Button onClick={() => { toggle() }} view="secondary" size="s"> Печать </Button>;

    const toggle = () => {
        setVisible(!visible)
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: props.invoice.inv_number,
        contentRef: componentRef,
    });

    return (
        <Fragment >
            {button}
            <Modal isOpen={visible} toggle={toggle} position="center" style={{ minWidth: "100%", minHeight: "100%" }} >
                <div ref={componentRef}>
                    <img src="" alt="" />
                    <h1 align="center">
                        Накладная № {props.invoice.inv_number}
                    </h1>
                    <div style={{ width: "100%" }}>
                        <div style={{ marginLeft: "30px", marginRight: "30px" }}>
                            <p align="left">
                                Кому  (Заказчик): {props.invoice.project.cust.title}
                            </p>
                            <p align="left">
                                По  договору: {props.invoice.project.prj_number}
                            </p>
                            <p align="left">
                                Объект: {props.invoice.project.description}
                            </p>
                            <p align="left">
                                От  кого: ООО “АМ ГРУП”
                            </p>
                            <Table width="100%" cellPadding="4" cellSpacing="0" className='table table-bordered'>
                                <colgroup>
                                    <col width="14*" />
                                    <col width="158*" />
                                    <col width="85*" />
                                </colgroup>
                                <tbody>
                                    <tr valign="top">
                                        <td width="5%">
                                            <p align="center">
                                                N
                                            </p>
                                        </td>
                                        <td width="62%">
                                            <p align="left">
                                                Наименование документации
                                            </p>
                                        </td>
                                        <td width="33%">
                                            <p align="left">
                                                Кол-во экземпляров                          (копий)
                                            </p>
                                        </td>
                                    </tr>
                                    {props.invoice.invoicedesc_set.map(element => (

                                        <tr key={element.pk}>
                                            <td>
                                                <Text font="mono">{element.row_num}</Text>
                                            </td>
                                            <td>
                                                <Text>{element.description}</Text>
                                            </td>
                                            <td>
                                                <Text>{element.quantity}</Text>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <p align="left">
                                Сдал: {props.invoice.employee.common_name}
                            </p>
                            <hr></hr>
                            <p align="left">
                                (ФИО,  должность, подпись)
                            </p>
                            <p align="left">
                                Принял:
                            </p>
                            <hr></hr>
                            <p align="left">
                                (ФИО,  должность, подпись)
                            </p>
                        </div>
                    </div>
                </div>
                <Button onClick={() => handlePrint()}>Печать формы</Button>
            </Modal>
        </Fragment>
    )
}
export default PdfCreate;

