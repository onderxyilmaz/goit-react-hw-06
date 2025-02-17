import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';
import { deleteContact } from '../../redux/contactsSlice';
import styles from './ContactList.module.css';

export default function ContactList() {
    const contacts = useSelector(selectContacts);
    const filter = useSelector(selectNameFilter);
    const dispatch = useDispatch();

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <ul className={styles.list}>
            {filteredContacts.map(({ id, name, number }) => (
                <li key={id} className={styles.item}>
                    <p>
                        {name}: {number}
                    </p>
                    <button
                        type="button"
                        onClick={() => dispatch(deleteContact(id))}
                        className={styles.button}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
} 