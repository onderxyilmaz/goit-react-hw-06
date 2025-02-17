import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { selectContacts } from '../../redux/contactsSlice';
import { changeFilter } from '../../redux/filtersSlice';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.elements.name.value.trim();
        const number = form.elements.number.value.trim();

        if (!name || !number) return;

        const isExist = contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase()
        );

        if (isExist) {
            alert(`${name} is already in contacts.`);
            return;
        }

        dispatch(addContact({ id: crypto.randomUUID(), name, number }));
        dispatch(changeFilter(''));
        form.reset();
        form.elements.name.focus();
    };

    const handleKeyPress = (e) => {
        const charCode = e.charCode;
        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32 && charCode !== 45 && charCode !== 39) {
            e.preventDefault();
        }
    };

    const handleNumberKeyPress = (e) => {
        const charCode = e.charCode;
        if (charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const form = e.target.form;
            const formInputs = Array.from(form.elements);
            const currentIndex = formInputs.indexOf(e.target);
            const nextInput = formInputs[currentIndex + 1];

            if (nextInput && nextInput.tagName === 'INPUT') {
                nextInput.focus();
            } else {
                const name = form.elements.name.value.trim();
                const number = form.elements.number.value.trim();

                if (name && number) {
                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
            }
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Contact Name"
                pattern="[A-Za-z '-]+"
                title="Name may contain only letters, apostrophe, dash and spaces."
                onKeyPress={handleKeyPress}
                onKeyDown={handleKeyDown}
                autoFocus
                required
            />
            <input
                type="tel"
                name="number"
                placeholder="Phone Number"
                pattern="[0-9]+"
                title="Phone number must contain only digits"
                onKeyPress={handleNumberKeyPress}
                onKeyDown={handleKeyDown}
                required
            />
            <button type="submit">Add contact</button>
        </form>
    );
} 