import { Fragment } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useAppSelector } from '../../store'
import styles from "./styles.module.scss"

interface Props {
    handleClose: () => void
}

function ContactModal({ handleClose }: Props) {
    const contactsData = useAppSelector((state) => state.contactsReducer)
    const { modalTitle, contact } = contactsData
    return (
        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle + ' ' + contact.id || 'Modal heading'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.contactModal}>
                    <pre>
                        {
                            JSON.stringify(contact, null, 2)
                        }
                    </pre>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className='btn-modal-close' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Fragment>
    )
}

export default ContactModal