import React from "react";
import Modal from "antd/lib/modal";
function CustomModal(props) {
  return (
    <Modal
      onCancel={() => props.setShow(false)}
      onOk={() => props.setShow(true)}
      visible={props.show}
      footer={props.footer ? [props.footer] : false}
      maskClosable={props.closeOnMask ? true : false}
      centered={props.centered ? true : false}
      closable={props.showCloseIcon ? true : false}
      closeIcon={props.closeIcon ? props.closeIcon : undefined}
      keyboard={!props.closeOnMask ? false : true}
      maskStyle={{ background: props.overlayColor }} // Mask Opacity
      width={props.width ? props.width : 520}
      title={props.title ? props.title : undefined}
    >
      {props.children}
    </Modal>
  );
}
export default CustomModal;
