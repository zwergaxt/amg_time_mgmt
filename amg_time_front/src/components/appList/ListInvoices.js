import { Table } from "reactstrap";
import { Text } from "@consta/uikit/Text"
import AppModalInvoices from "../appModal/ModalInvoices";
import AppRemoveInvoices from "../appRemove/RemoveInvoices";

const AppListInvoices = (props) => {

    const textStyleHeader = (text) => {
        return <Text view="secondary" font="mono" transform="uppercase" weight="light" truncate> {text} </Text>
    }

    return (
        <Table hover className="fixed-header">
            <thead>
                <tr>
                    <th>{textStyleHeader("Номер")}</th>
                    <th>{textStyleHeader("Дата")}</th>
                    <th>{textStyleHeader("Проект")}</th>
                    <th>{textStyleHeader("Сотрудник")}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {!props.data || props.data.length <= 0 ? (
                    <tr>
                        <td colSpan="5" align="center">
                            <b>Пока ничего нет</b>
                        </td>
                    </tr>
                ) : props.data.map(item => (
                    <tr key={item.pk}>
                        <td>
                            <Text font="mono">{item.inv_number}</Text>
                        </td>
                        <td>
                            <Text>{item.date}</Text>
                        </td>
                        <td>
                            <Text>{item.project.title}</Text>
                        </td>
                        <td>
                            <Text>{item.employee.common_name}</Text>
                        </td>
                        <td>
                            <AppModalInvoices
                                create={false}
                                item={item}
                                resetState={props.resetState}
                                newItem={props.newItem}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveInvoices
                                pk={item.pk}
                                resetState={props.resetState}
                            />
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </Table>
    )
}

export default AppListInvoices