import { Table } from "reactstrap";
import { Text } from "@consta/uikit/Text"
import AppModalReports from "../appModal/ModalReports";
import AppRemoveReports from "../appRemove/RemoveReports";

const AppListReports = (props) => {

    const textStyleHeader = (text) => {
        return <Text view="secondary" font="mono" transform="uppercase" weight="light" truncate> {text} </Text>
    }

    return (
        <Table hover className="fixed-header">
            <thead>
                <tr>
                    <th>{textStyleHeader("Сотрудник")}</th>
                    <th>{textStyleHeader("Дата")}</th>
                    <th>{textStyleHeader("Проект")}</th>
                    <th>{textStyleHeader("Часы")}</th>
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
                            <Text font="mono">{item.user.username}</Text>
                        </td>
                        <td>
                            <Text>{item.date}</Text>
                        </td>
                        <td>
                            <Text>{item.project.title}</Text>
                        </td>
                        <td>
                            <Text>{item.time_spent}</Text>
                        </td>
                        <td>
                            <AppModalReports
                                create={false}
                                item={item}
                                resetState={props.resetState}
                                newItem={props.newItem}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveReports
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

export default AppListReports