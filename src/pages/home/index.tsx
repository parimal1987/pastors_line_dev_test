import { useState } from "react"
import { Stack, Button } from 'react-bootstrap';
import { CustomModal } from '../../components';
import { useAppDispatch } from '../../store';
import { useNavigate, useParams } from "react-router-dom";
import ContactListModal from "./ContactListModal";
import { fetchContacts, resetContacts, setModalTitle } from "../../store/contacts/contactsSlice";
import ContactModal from "./ContactModal";

function Home() {
    const [show, setShow] = useState(false);
    const [contactModalShow, setContactModalShow] = useState(false)
    const param = useParams()

    const handleContactModalClose = () => {
        setContactModalShow(false)

        if (param && param.country) {
            if (param.country == 'all') {
                handleAllContacts()
            } else if (param.country == 'us') {
                handleUSContacts()
            }
        }
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const handleClose = () => {
        navigate("/contacts");
        setShow(false)
    };

    const handleModalClose = () => {
        setShow(false)
    };

    const handleShow = () => setShow(true);
    const handleContactModal = () => setContactModalShow(true);

    const handleAllContacts = () => {
        navigate("/contacts/all");
        handleShow()
        dispatch(resetContacts())
        dispatch(setModalTitle('All Contacts'))
        dispatch(fetchContacts({
            page: 1
        }))
    }

    const handleUSContacts = () => {
        navigate("/contacts/us");
        handleShow()
        dispatch(resetContacts())
        dispatch(setModalTitle('US Contacts'))
        dispatch(fetchContacts({
            page: 1,
            countryId: 226
        }))
    }



    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Stack direction="horizontal" gap={2}>
                <Button variant="primary" className="btn-all" onClick={handleAllContacts}>
                    All Contacts
                </Button>
                <Button variant="success" className="btn-us" onClick={handleUSContacts}>
                    US Contacts
                </Button>
            </Stack>
            <CustomModal
                show={show}
                handleClose={handleClose}
            >
                <ContactListModal
                    handleClose={handleClose}
                    handleAllContacts={handleAllContacts}
                    handleUSContacts={handleUSContacts}
                    showContactModal={handleContactModal}
                    handleModalClose={handleModalClose}
                />
            </CustomModal>

            <CustomModal
                show={contactModalShow}
                handleClose={handleContactModalClose}>
                <ContactModal
                    handleClose={handleContactModalClose}
                />
            </CustomModal>
        </div>
    )
}

export default Home