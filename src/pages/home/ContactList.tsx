import { Fragment, useEffect, useState } from 'react'
import styles from "./styles.module.scss"
import { InfiniteScroll } from '../../components'
import { Loader } from '../../components'
import { FormCheck } from 'react-bootstrap';

interface Props {
    data: number[],
    showContact: (id: number) => void,
    fetchDataOnScroll: () => void,
    hasMore: boolean
}

function ContactList({ data, showContact, fetchDataOnScroll, hasMore }: Props) {
    const [list, setList] = useState<any[]>([])
    const getEven = (e: any) => {
        if (e.target.checked) {
            const x = data.map((e: number) => e % 2 === 0 ? e : null)
            setList(x)
        } else {
            setList(data)
        }
    }

    useEffect(() => {
        if (data.length > 0) {
            setList(data)
        }
        return () => {

        }
    }, [data])

    return (
        <Fragment>
            {
                data && Array.isArray(data) && data.length > 0 ?
                    <Fragment>
                        <div className="col-12">
                            <div className="input-group mb-3">
                                <input type="text" name='input-s' className="form-control" placeholder="Names and Number" aria-describedby="button-addon2" />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                            </div>
                        </div>
                        <div className={styles.scrollableDiv}>
                            <InfiniteScroll
                                load={fetchDataOnScroll}
                                hasMore={hasMore}
                                loader={<h4 className='mt-2'>
                                    <Loader />
                                </h4>}
                                endMessage={
                                    <div className='border col-12 my-2 p-2 text-center'>
                                        <b>Yay! You have seen it all contacts.</b>
                                    </div>
                                }
                            >
                                <div className='row w-100 m-0'>
                                    {list.map((id, index) => (
                                        id &&
                                        <div className="col-4 text-center border p-2" key={id + index}>
                                            <button
                                                key={'btn' + (id + index)}
                                                className='btn btn-link'
                                                onClick={() => showContact(id)}>
                                                {id}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                        <div className='col-12'>
                            <FormCheck
                                type={`checkbox`}
                                id={`default-checkbox`}
                                label={`Only even`}
                                onChange={getEven}
                                defaultChecked={false}
                            />
                        </div>
                    </Fragment>
                    :
                    <div className="col-12 m-auto text-center">
                        <h3>No contacts Found..!!</h3>
                    </div>
            }
        </Fragment>
    )
}

export default ContactList