import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';
import { selectNameFilter } from '../../redux/filtersSlice';
import styles from './SearchBox.module.css';

export default function SearchBox() {
    const dispatch = useDispatch();
    const filter = useSelector(selectNameFilter);

    return (
        <div className={styles.wrapper}>
            <p>Find contacts by name</p>
            <input
                type="text"
                value={filter}
                onChange={e => dispatch(changeFilter(e.target.value))}
                className={styles.input}
            />
        </div>
    );
} 