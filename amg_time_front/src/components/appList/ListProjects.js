import { Table } from "reactstrap";
import { Text } from "@consta/uikit/Text"
import AppModalProjects from "../appModal/ModalProjects";
import AppRemoveProjects from "../appRemove/RemoveProjects";

const AppListProjects = (props) => {

    const textStyleHeader = (text) => {
        return <Text view="secondary" font="mono" transform="uppercase" weight="light" truncate> {text} </Text>
    }

    return (
        <Table hover className="fixed-header">
            <thead>
                <tr>
                    <th>{textStyleHeader("Номер проекта")}</th>
                    <th>{textStyleHeader("Наименование")}</th>
                    <th>{textStyleHeader("Заказчик")}</th>
                    <th>{textStyleHeader("Архив")}</th>
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
                            <Text font="mono" view={item.is_archived ? "secondary" : "primary"}>{item.prj_number}</Text>
                        </td>
                        <td>
                            <Text view={item.is_archived ? "secondary" : "primary"}>{item.title}</Text>
                        </td>
                        <td>
                            <Text view={item.is_archived ? "secondary" : "primary"}>{item.cust.title}</Text>
                        </td>
                        <td>
                            <Text view={item.is_archived ? "secondary" : "primary"}>{item.is_archived ? 'Да' : 'Нет'}</Text>
                        </td>
                        <td>
                            <AppModalProjects
                                create={false}
                                item={item}
                                resetState={props.resetState}
                                newItem={props.newItem}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveProjects
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

export default AppListProjects