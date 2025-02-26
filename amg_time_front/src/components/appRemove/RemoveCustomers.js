import { Fragment, useState } from "react";
import axios from "axios";
import { API_URL_I } from "../../index";
import { IconTrash } from "@consta/icons/IconTrash";
import { Button } from "@consta/uikit/Button";
import { Modal } from "@consta/uikit/Modal";
import { Text } from "@consta/uikit/Text";
import { Layout } from '@consta/uikit/Layout';
import { cnMixSpace } from '@consta/uikit/MixSpace';

const AppRemoveCustomers = (props) => {
    const API_URL = API_URL_I + "customers/"
    const [visible, setVisible] = useState(false)
    const toggle = () => {
        setVisible(!visible)
    }
    const deleteItem = () => {
        axios.delete(API_URL + props.pk).then(() => {
            props.resetState()
            toggle();
        });
    }

    const iconTrash = () => {
        return <IconTrash view="alert" size="s" />
    }

    return (
        <Fragment>
            <Button onClick={() => toggle()} iconLeft={iconTrash} size="s" view="secondary" color="Danger"></Button>
            <Modal isOpen={visible} toggle={toggle} hasOverlay={true} style={{ "min-height": "100px" }}>
                <Layout direction="column">
                    <Text
                        view="primary"
                        size="xl"
                        align="center"
                        transform="uppercase"
                        className={cnMixSpace({
                            m: "l"
                        })}>удалить запись?</Text>
                    <Layout direction="row">
                        <Layout flex={1}>
                            <Button
                                label={"Да"}
                                onClick={() => deleteItem()}
                                view="ghost"
                                width="default"
                                className={cnMixSpace({
                                    m: "l"
                                })} />
                        </Layout>
                        <Layout flex={1}>
                            <Button
                                label={"Отмена"}
                                onClick={() => toggle()}
                                view="primary"
                                width="default"
                                className={cnMixSpace({
                                    m: "l"
                                })} />
                        </Layout>
                    </Layout>
                </Layout>
            </Modal>
        </Fragment>
    )
}
export default AppRemoveCustomers;