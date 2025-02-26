import { Table } from "reactstrap";
import { Text } from "@consta/uikit/Text"
import AppModalActs from "../appModal/ModalActs";
import AppRemoveActs from "../appRemove/RemoveActs";

const AppListActs = (props) => {

    const textStyleHeader = (text) => {
        return <Text view="secondary" font="mono" transform="uppercase" weight="light" truncate> {text} </Text>
    }

    return (
        <Table hover className="fixed-header">
            <thead>
                <tr>
                    <th>{textStyleHeader("Номер")}</th>
                    <th>{textStyleHeader("Проект")}</th>
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
                            <Text font="mono">{item.act_number}</Text>
                        </td>
                        <td>
                            <Text>{item.project.title}</Text>
                        </td>
                        <td>
                            <Text>{item.price}</Text>
                        </td>
                        <td>
                            <Text>{item.date}</Text>
                        </td>
                        <td>
                            <AppModalActs
                                create={false}
                                item={item}
                                resetState={props.resetState}
                                newItem={props.newItem}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveActs
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

export default AppListActs