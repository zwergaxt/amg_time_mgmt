import { Table } from "reactstrap";
import { Text } from "@consta/uikit/Text"
import AppModalActsContr from "../appModal/ModalActsContr";
import AppRemoveActsContr from "../appRemove/RemoveActsContr";

const AppListActsContr = (props) => {

    const textStyleHeader = (text) => {
        return <Text view="secondary" font="mono" transform="uppercase" weight="light" truncate> {text} </Text>
    }

    return (
        <Table hover className="fixed-header">
            <thead>
                <tr>
                    <th>{textStyleHeader("Номер")}</th>
                    <th>{textStyleHeader("Подрядчик")}</th>
                    <th>{textStyleHeader("Сумма")}</th>
                    <th>{textStyleHeader("Дата")}</th>
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
                            <Text font="mono" view={item.is_paid ? "secondary" : "primary"}>{item.act_number}</Text>
                        </td>
                        <td>
                            <Text view={item.is_paid ? "secondary" : "primary"}>{item.contractor.title}</Text>
                        </td>
                        <td>
                            <Text view={item.is_paid ? "secondary" : "primary"}>{item.price}</Text>
                        </td>
                        <td>
                            <Text view={item.is_paid ? "secondary" : "primary"}>{item.date}</Text>
                        </td>
                        <td>
                            <AppModalActsContr
                                create={false}
                                item={item}
                                resetState={props.resetState}
                                newItem={props.newItem}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveActsContr
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

export default AppListActsContr