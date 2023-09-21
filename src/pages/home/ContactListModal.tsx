import { Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../store';
import styles from "./styles.module.scss"
import ContactList from './ContactList';
import { Loader } from '../../components';
import { fetchContacts, setContactById } from '../../store/contacts/contactsSlice';

interface Props {
    handleClose: () => void
    handleUSContacts: () => void
    handleAllContacts: () => void
    showContactModal: () => void
    handleModalClose: () => void
}

function ContactListModal(props: Props) {
    const dispatch = useAppDispatch()
    const { handleClose, handleUSContacts, handleAllContacts, showContactModal, handleModalClose } = props
    const contactsData = useAppSelector((state) => state.contactsReducer)
    const { modalTitle, contacts, loading, contactsId, totalContacts, pagination } = contactsData
    const { activePage } = pagination
    const { contacts: contactsDetail } = contacts
    const [hasMore, setHasMore] = useState(true)

    const showContact = (id: number) => {
        console.log(contactsDetail[id])
        const data = contactsDetail[id]
        dispatch(setContactById(data))
        handleModalClose()
        showContactModal()
    }

    const fetchDataOnScroll = () => {
        if (contactsId.length >= totalContacts) {
            setHasMore(false)
        }
        setTimeout(() => {
            dispatch(fetchContacts({
                page: activePage + 1
            }))
        }, 1500);

    }

    return (
        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle || 'Modal heading'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={`row align-items-start ${styles.contactList}`}>
                    {loading === 'pending' ?
                        <Loader />
                        : <ContactList
                            fetchDataOnScroll={fetchDataOnScroll}
                            data={contactsId || []}
                            showContact={showContact}
                            hasMore={hasMore}
                        />
                    }

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className="btn-all" onClick={handleAllContacts}>
                    All Contacts
                </Button>
                <Button variant="primary" className="btn-us" onClick={handleUSContacts}>
                    US Contacts
                </Button>
                <Button variant="secondary" className='btn-modal-close' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Fragment>
    )
}

export default ContactListModal

