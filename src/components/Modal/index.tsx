import { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';

interface Props {
    show: boolean
    handleClose: () => void
    children: React.ReactElement
}

function CustomModal(props: Props) {
    const { show, handleClose, children } = props
    return (
        <Fragment>
            <Modal show={show} onHide={handleClose}>
                {children}
            </Modal>
        </Fragment>
    );
}

export default CustomModal;