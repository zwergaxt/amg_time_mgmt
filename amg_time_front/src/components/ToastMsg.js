import { Row } from 'reactstrap';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

function ToastMsg(props) {
  const show = props.show;
  const setShow = props.setShow;
  const msg = props.msg;

  return (
    <Row>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <ToastHeader>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Notification</strong>
        </ToastHeader>
        <ToastBody>{msg}</ToastBody>
      </Toast>

    </Row>
  );
}

export default ToastMsg;